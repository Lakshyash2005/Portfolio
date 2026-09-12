import { useState } from "react";
import Intro from "./components/intro";
import Hero from "./components/hero";
import Nav from "./components/Nav";
import Marquee from "./components/Marquee";
import About from "./components/About";
import Projects from "./components/Projects";
import Cta69 from "./components/Cta69";
import "./App.css";

function App() {
  const [introFinished, setIntroFinished] = useState(false);

  return (
    <>
      <Nav />
      {!introFinished && (
        <Intro onComplete={() => setIntroFinished(true)} />
      )}

      <main className={introFinished ? "portfolio visible" : "portfolio"}>
        <Hero />
        <About />
        <Projects />
        {/* <Marquee /> */}
        <Cta69 />
      </main>
    </>
  );
}

export default App;