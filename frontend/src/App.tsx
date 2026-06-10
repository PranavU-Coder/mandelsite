import "./App.css";
import { useSmoothScroll } from "./hooks/useSmoothScroll";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import GamesTeaser from "./components/GamesTeaser";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  useSmoothScroll();

  return (
    <div style={{ background: "#000D0A", minHeight: "100vh" }}>
      <Header />
      <main>
        <Hero />
        <About />
        <GamesTeaser />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
