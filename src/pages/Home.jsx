import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import WordOfTheDay from "../components/WordOfTheDay";
import PopularWords from "../components/PopularWords";
import Footer from "../components/Footer";

function Home() {
  return (
    <>

      <Navbar />

      <main>
      <Hero />
      <WordOfTheDay />
      <PopularWords />
      </main>

      <Footer />

      <h1>Dictionary+</h1>
    </>
  );
}

export default Home;