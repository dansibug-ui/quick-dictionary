import { useState } from "react";
import vocabulary from "../data/vocabulary.json";
import WordRelations from "./WordRelations";
import { dictionaryApiUrl } from "../utils/dictionaryApi";

function RandomWord() {
  const [word, setWord] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function findRandomWord() {
    setLoading(true);
    setError("");
    setWord(null);
    const candidate = vocabulary[Math.floor(Math.random() * vocabulary.length)];

    try {
      const response = await fetch(dictionaryApiUrl(candidate));
      if (!response.ok) throw new Error("Word not found");
      const [entry] = await response.json();
      setWord(entry);
    } catch {
      setError("That word could not be loaded. Try another one.");
    } finally {
      setLoading(false);
    }
  }

  function playAudio() {
    const audio = word?.phonetics?.find((item) => item.audio)?.audio;
    if (audio) new Audio(audio).play();
  }

  const definition = word?.meanings?.[0]?.definitions?.[0]?.definition;
  const pronunciation = word?.phonetic || word?.phonetics?.find((item) => item.text)?.text;

  return <>
    <button className="random-word-button" type="button" onClick={findRandomWord}>✦ Surprise me with a word</button>
    {(loading || word || error) && <div className="random-modal-backdrop" onMouseDown={() => !loading && (setWord(null), setError(""))}>
      <section className="random-modal" role="dialog" aria-modal="true" aria-label="Random word" onMouseDown={(event) => event.stopPropagation()}>
        <button className="close-popup" type="button" onClick={() => { setWord(null); setError(""); }} aria-label="Close random word">×</button>
        {loading && <p className="popup-status">Finding a delightful word…</p>}
        {error && <p className="popup-error">{error}</p>}
        {word && <>
          <p className="modal-kicker">Your random word</p>
          <h2>{word.word}</h2>
          {pronunciation && <p className="popup-pronunciation">{pronunciation}</p>}
          {word.phonetics?.some((item) => item.audio) && <button className="audio-button" type="button" onClick={playAudio}>Listen</button>}
          <p className="popup-definition">{definition}</p>
          <WordRelations word={word} />
          <button className="modal-refresh" type="button" onClick={findRandomWord}>Another word</button>
        </>}
      </section>
    </div>}
  </>;
}

export default RandomWord;
