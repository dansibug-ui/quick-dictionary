import { useState } from "react";
import SearchBar from "./components/SearchBar";
import SearchResult from "./components/SearchResult";
import PopularWords from "./components/PopularWords";
import WordOfTheDay from "./components/WordOfTheDay";
import Footer from "./components/Footer";
import ThemeToggle from "./components/ThemeToggle";

function App() {
  const [result, setResult] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [view, setView] = useState("dictionary");
  const showResult = (entry) => { setResult(entry); setView("word"); };
  const compactHeader = <header className="app-header app-topbar"><button className="topbar-brand" type="button" onClick={() => setView("dictionary")}>Quick Dictionary</button><SearchBar setResult={showResult} word={searchTerm} setWord={setSearchTerm} variant="header" /><ThemeToggle /></header>;

  if (view === "word") return <>{compactHeader}<SearchResult result={result} onBack={() => setView("dictionary")} /><Footer /></>;

  return <><header className="app-header"><div className="header-content"><h1>Quick Dictionary</h1><p>Learn a new word every day.</p></div><ThemeToggle /></header><main className="app-layout"><div className="main-content"><SearchBar setResult={showResult} word={searchTerm} setWord={setSearchTerm} /><PopularWords setSearchTerm={setSearchTerm} /></div><aside><WordOfTheDay onOpenWord={showResult} /></aside></main><Footer /></>;
}

export default App;
