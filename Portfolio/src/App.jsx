import { useState } from "react";
import Intro from "./components/intro";
import Hero from "./components/hero";
import Nav from "./components/Nav";
import Marquee from "./components/Marquee";
import About from "./components/About";
import Projects from "./components/Projects";
import Cta69 from "./components/Cta69";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  const [introFinished, setIntroFinished] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <>
      <Nav onOpenContact={() => setIsContactOpen(true)} />

      {!introFinished && (
        <Intro onComplete={() => setIntroFinished(true)} />
      )}

      <main className={introFinished ? "portfolio visible" : "portfolio"}>
        <Hero />
        <About />
        <Projects />
        {/* <Marquee /> */}
        <Cta69 onOpenContact={() => setIsContactOpen(true)} />
      </main>

      <Contact
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
      <Footer onOpenContact={() => setIsContactOpen(true)} />
    </>
  );
}

export default App;