import { useEffect, useState } from "react";
import { dictionaryApiUrl } from "../utils/dictionaryApi";

const words = ["serendipity", "eloquent", "resilience", "ephemeral", "wanderlust", "benevolent", "meticulous", "tranquil", "magnificent", "innovative", "nostalgia", "curious"];
const CACHE_VERSION = 2;

function WordOfTheDay({ onOpenWord }) {
  const [word, setWord] = useState(null);

  useEffect(() => {
    async function loadWord() {
      const day = Math.floor(new Date().getTime() / (1000 * 60 * 60 * 24));
      const saved = JSON.parse(localStorage.getItem("wordOfTheDay"));
      if (saved?.version === CACHE_VERSION && saved?.day === day && saved?.data) return setWord(saved.data);
      try {
        const response = await fetch(dictionaryApiUrl(words[day % words.length]));
        if (!response.ok) throw new Error("Word not found");
        const [entry] = await response.json();
        setWord(entry);
        localStorage.setItem("wordOfTheDay", JSON.stringify({ version: CACHE_VERSION, day, data: entry }));
      } catch { /* Keep the loading card if the dictionary is unavailable. */ }
    }
    loadWord();
  }, []);

  function playAudio() {
    const audio = word?.phonetics?.find((item) => item.audio)?.audio;
    if (audio) new Audio(audio).play();
  }

  if (!word) return <section className="word-day-card">Loading word...</section>;
  const definition = word.meanings?.[0]?.definitions?.[0];
  const pronunciation = word.phonetic || word.phonetics?.find((item) => item.text)?.text;

  return <section className="word-day-card">
    <h3>✦ Word of the Day</h3><h2>{word.word}</h2>
    <div className="word-pronunciation"><span>{pronunciation || "No pronunciation"}</span>{word.phonetics?.some((item) => item.audio) && <button className="audio-button" type="button" onClick={playAudio}>Listen</button>}</div>
    <p>{definition?.definition || "No definition found."}</p>
    <button className="card-detail-hint" type="button" onClick={() => onOpenWord(word)}>View full details →</button>
  </section>;
}

export default WordOfTheDay;
