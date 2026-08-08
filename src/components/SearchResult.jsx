import WordRelations from "./WordRelations";

function SearchResult({ result, onBack }) {
  if (!result) return null;
  const pronunciation = result.phonetic || result.phonetics?.find((item) => item.text)?.text;
  const playAudio = () => { const audio = result.phonetics?.find((item) => item.audio)?.audio; if (audio) new Audio(audio).play(); };

  return <main className="word-detail-page"><button className="back-button" type="button" onClick={onBack}>← Back to dictionary</button><article className="word-detail-card"><p className="modal-kicker">Dictionary entry</p><div className="word-detail-title"><div><h1>{result.word}</h1>{pronunciation && <p>{pronunciation}</p>}</div>{result.phonetics?.some((item) => item.audio) && <button className="audio-button" type="button" onClick={playAudio}>Listen</button>}</div>{result.origin && <section className="word-origin"><h2>Origin</h2><p>{result.origin}</p></section>}<section className="word-meanings"><h2>Definitions</h2>{result.meanings.map((meaning, index) => <div className="meaning-group" key={index}><h3>{meaning.partOfSpeech}</h3>{meaning.definitions.map((definition, definitionIndex) => <div className="definition-item" key={definitionIndex}><p><b>{definitionIndex + 1}.</b> {definition.definition}</p>{definition.example && <blockquote>“{definition.example}”</blockquote>}</div>)}</div>)}</section><WordRelations word={result} />{result.sourceUrls?.length > 0 && <p className="word-source">Source: <a href={result.sourceUrls[0]} target="_blank" rel="noreferrer">DictionaryAPI entry</a></p>}</article></main>;
}

export default SearchResult;
