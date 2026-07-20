import NetworkBackground from "./components/NetworkBackground";
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
    <div className="relative min-h-screen bg-[#0a0a0f]">
      {/* Fixed background — sits behind everything */}
      <NetworkBackground />

      {/* Mouse trail canvas — on top of background, below UI */}
      <MouseTrail />

      {/* Sticky navbar */}
      <Navbar />

      {/* Page sections */}
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

      {/* Floating scroll-to-top FAB */}
      <ScrollToTop />
    </div>
  );
}
