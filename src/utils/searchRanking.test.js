import test from 'node:test';
import assert from 'node:assert/strict';
import { buildSearchSuggestions, getPopularSearchTerms, recordSearchTerm } from './searchRanking.js';

test('buildSearchSuggestions prefers close prefix and near matches', () => {
  const vocabulary = ['apple', 'apricot', 'application', 'grapple', 'banana'];

  const suggestions = buildSearchSuggestions('appl', vocabulary, 4);

  assert.equal(suggestions[0], 'apple');
  assert.ok(suggestions.includes('application'));
  assert.ok(suggestions.includes('grapple'));
  assert.ok(suggestions.includes('apricot'));
});

test('getPopularSearchTerms uses recorded searches before fallback words', () => {
  const stats = recordSearchTerm('computer', {});
  const ranked = getPopularSearchTerms(stats, ['beautiful', 'resilience', 'technology'], 4);

  assert.deepEqual(ranked, ['computer', 'beautiful', 'resilience', 'technology']);
});
