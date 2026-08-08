import { useEffect, useState } from "react";

function PopularWords({ setSearchTerm }) {
  const [recentWords, setRecentWords] = useState([]);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const readRecentWords = () => {
      try {
        const storedWords = JSON.parse(window.localStorage.getItem("dictionary-recent-searches") || "[]");
        setRecentWords(Array.isArray(storedWords) ? storedWords : []);
      } catch {
        setRecentWords([]);
      }
    };

    readRecentWords();
    window.addEventListener("dictionary-search-stats-updated", readRecentWords);
    return () => window.removeEventListener("dictionary-search-stats-updated", readRecentWords);
  }, []);

  return (
    <section className="popular-section" aria-label="Recent searches">
      <h3>Recent Searches</h3>
      {recentWords.length > 0 ? (
        <div className="popular-list">
          {recentWords.map((word) => (
            <button key={word} className="popular-word" type="button" onClick={() => setSearchTerm(word)}>
              {word}
            </button>
          ))}
        </div>
      ) : (
        <p className="empty-search-state">Your recent searches will appear here.</p>
      )}
    </section>
  );
}

export default PopularWords;
