function collectRelations(word, type) {
  const values = word?.meanings?.flatMap((meaning) => [
    ...(meaning[type] || []),
    ...meaning.definitions.flatMap((definition) => definition[type] || []),
  ]) || [];

  return [...new Set(values.map((value) => value.trim()).filter(Boolean))].slice(0, 8);
}

function WordRelations({ word }) {
  const synonyms = collectRelations(word, "synonyms");
  const antonyms = collectRelations(word, "antonyms");
  const examples = word?.meanings?.flatMap((meaning) =>
    meaning.definitions.map((definition) => definition.example).filter(Boolean),
  ) || [];
  const example = [...new Set(examples)][0];

  if (!synonyms.length && !antonyms.length && !example) return null;

  return (
    <div className="word-relations">
      {synonyms.length > 0 && <div><span>Synonyms</span><p>{synonyms.join(" · ")}</p></div>}
      {antonyms.length > 0 && <div><span>Antonyms</span><p>{antonyms.join(" · ")}</p></div>}
      {example && <div><span>Example usage</span><p className="relation-example">“{example}”</p></div>}
    </div>
  );
}

export default WordRelations;
