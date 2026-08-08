import SearchBar from "./SearchBar";

function Hero() {
  return (
   <section>
  <div className="container">

    <h1>Expand Your Vocabulary</h1>

    <p>
      Discover definitions, pronunciations,
      and synonyms in a simple, focused experience.
    </p>

    <SearchBar />

  </div>
</section>
  );
}

export default Hero;