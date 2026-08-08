const DEFAULT_FALLBACK_TERMS = ["beautiful", "computer", "resilience", "serendipity", "technology"];

function normalizeTerm(value) {
  return String(value || "").trim().toLowerCase();
}

function getCommonPrefixLength(first, second) {
  const limit = Math.min(first.length, second.length);
  let sharedLength = 0;
  for (let index = 0; index < limit; index += 1) {
    if (first[index] !== second[index]) break;
    sharedLength += 1;
  }
  return sharedLength;
}

function getLevenshteinDistance(first, second) {
  if (first === second) return 0;
  if (!first.length) return second.length;
  if (!second.length) return first.length;

  const previousRow = Array.from({ length: second.length + 1 }, (_, index) => index);
  const currentRow = Array(second.length + 1).fill(0);

  for (let rowIndex = 1; rowIndex <= first.length; rowIndex += 1) {
    currentRow[0] = rowIndex;
    for (let columnIndex = 1; columnIndex <= second.length; columnIndex += 1) {
      const substitutionCost = first[rowIndex - 1] === second[columnIndex - 1] ? 0 : 1;
      currentRow[columnIndex] = Math.min(
        previousRow[columnIndex] + 1,
        currentRow[columnIndex - 1] + 1,
        previousRow[columnIndex - 1] + substitutionCost,
      );
    }
    previousRow.splice(0, previousRow.length, ...currentRow);
  }

  return previousRow[second.length];
}

function getSimilarityScore(query, entry) {
  const normalizedQuery = normalizeTerm(query);
  const normalizedEntry = normalizeTerm(entry);
  if (!normalizedQuery) return 0;

  const commonPrefix = getCommonPrefixLength(normalizedQuery, normalizedEntry);
  const startsWithQuery = normalizedEntry.startsWith(normalizedQuery) ? 18 : 0;
  const containsQuery = normalizedEntry.includes(normalizedQuery) ? 20 : 0;
  const sequenceBonus = normalizedEntry.includes(normalizedQuery) ? normalizedQuery.length * 4 : 0;
  const prefixBonus = commonPrefix * 3;
  const editDistance = getLevenshteinDistance(normalizedQuery, normalizedEntry);
  const editBonus = Math.max(0, 10 - editDistance * 2);
  const exactMatch = normalizedEntry === normalizedQuery ? 40 : 0;

  return exactMatch + startsWithQuery + containsQuery + sequenceBonus + prefixBonus + editBonus;
}

function scoreSuggestion(query, entry) {
  const normalizedQuery = normalizeTerm(query);
  const normalizedEntry = normalizeTerm(entry);
  if (!normalizedQuery) return 0;

  return getSimilarityScore(normalizedQuery, normalizedEntry);
}

export function buildSearchSuggestions(query, vocabulary, limit = 6) {
  const normalizedQuery = normalizeTerm(query);
  if (!normalizedQuery) return [];

  return [...vocabulary]
    .filter((entry) => {
      const normalizedEntry = normalizeTerm(entry);
      const isLiteralMatch = normalizedEntry.includes(normalizedQuery);
      const hasSharedPrefix = getCommonPrefixLength(normalizedQuery, normalizedEntry) >= 2;
      const isCloseMatch = getLevenshteinDistance(normalizedQuery, normalizedEntry) <= Math.max(3, Math.ceil(normalizedQuery.length / 2));
      const containsSequence = normalizedEntry.includes(normalizedQuery);
      return isLiteralMatch || hasSharedPrefix || isCloseMatch || containsSequence;
    })
    .map((entry) => ({ entry, score: scoreSuggestion(normalizedQuery, entry) }))
    .sort((first, second) => {
      if (second.score !== first.score) return second.score - first.score;
      return first.entry.localeCompare(second.entry);
    })
    .slice(0, limit)
    .map(({ entry }) => entry);
}

export function recordSearchTerm(term, searchStats = {}) {
  const normalizedTerm = normalizeTerm(term);
  if (!normalizedTerm) return searchStats;

  const currentCount = Number(searchStats[normalizedTerm] || 0);
  return {
    ...searchStats,
    [normalizedTerm]: currentCount + 1,
  };
}

export function getPopularSearchTerms(searchStats = {}, fallbackTerms = DEFAULT_FALLBACK_TERMS, limit = 6) {
  const rankedTerms = Object.entries(searchStats)
    .filter(([, count]) => Number(count) > 0)
    .sort((first, second) => second[1] - first[1] || first[0].localeCompare(second[0]))
    .map(([term]) => term);

  const fallback = fallbackTerms
    .map((term) => normalizeTerm(term))
    .filter((term) => term && !rankedTerms.includes(term));

  return [...rankedTerms, ...fallback].slice(0, limit);
}
