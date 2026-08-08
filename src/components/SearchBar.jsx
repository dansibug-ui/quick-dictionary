import { useState } from "react";
import LoadingSkeleton from "./LoadingSkeleton";
import { dictionaryApiUrl } from "../utils/dictionaryApi";

function SearchBar({ setResult, word, setWord, variant = "default" }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function searchWord(searchTerm = word) {
    const trimmedWord = searchTerm.trim();
    if (!trimmedWord) return;
    try {
      setLoading(true);
      setError("");
      const response = await fetch(dictionaryApiUrl(trimmedWord));
      if (!response.ok) throw new Error("Word not found");
      const [data] = await response.json();
      setResult(data);
      if (typeof window !== "undefined") {
        const storedRecent = JSON.parse(window.localStorage.getItem("dictionary-recent-searches") || "[]");
        const nextRecent = [trimmedWord.toLowerCase(), ...storedRecent.filter((item) => item.toLowerCase() !== trimmedWord.toLowerCase())].slice(0, 8);
        window.localStorage.setItem("dictionary-recent-searches", JSON.stringify(nextRecent));
        window.dispatchEvent(new Event("dictionary-search-stats-updated"));
      }
    } catch {
      setError("Sorry, we couldn't find that word.");
    } finally {
      setLoading(false);
    }
  }

  const form = <div className="search-autocomplete">
    <form className="search-box" onSubmit={(event) => { event.preventDefault(); searchWord(); }}>
      <div className="search-input-wrap">
        <input
          value={word}
          onChange={(event) => setWord(event.target.value)}
          onFocus={() => {}}
          placeholder="Search a word..."
          aria-label="Search a word"
        />
      </div>
      <button type="submit">Search</button>
    </form>
  </div>;

  if (variant === "header") return <div className="header-search">{form}{error && <p className="header-search-error">{error}</p>}</div>;

  return <section className="search-container"><h2>Explore the world of words</h2><p>Type an english word to look it up.</p>{loading && <LoadingSkeleton />}{form}{error && <p className="error-message">{error}</p>}</section>;
}

export default SearchBar;
