import AtomBackground from "./components/AtomBackground";
import MouseTrail from "./components/MouseTrail";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Experience from "./sections/Experience";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Certifications from "./sections/Certifications";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";

export default function App() {
  return (
    <>
      {/* ── Layer 0: Fixed animated atom background ── */}
      <AtomBackground />

      {/* ── Layer 1: Mouse trail (above background, below UI) ── */}
      <MouseTrail />

      {/* ── Layer 2: All page content sits above both ── */}
      <div className="relative" style={{ zIndex: 10 }}>
        <Navbar />

        <main>
          <Hero />
          <About />
          <Experience />
          <Skills />
          <Projects />
          <Certifications />
          <Contact />
        </main>

        <Footer />

        <ScrollToTop />
      </div>
    </>
  );
}
