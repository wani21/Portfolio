import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiEye, FiDownload } from "react-icons/fi";
import { personalInfo } from "../data/portfolio";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const p = docHeight > 0 ? scrollTop / docHeight : 0;
      setProgress(p);
      setScrolled(scrollTop > 20);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on outside click
  useEffect(() => {
    if (!mobileOpen) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("#mobile-menu") && !target.closest("#hamburger-btn")) {
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [mobileOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Scroll progress bar */}
      <div
        ref={progressRef}
        className="scroll-progress-bar"
        style={{ transform: `scaleX(${progress})` }}
        aria-hidden="true"
      />

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[rgba(10,10,15,0.85)] backdrop-blur-xl border-b border-white/[0.06]"
            : "bg-transparent"
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a
              href="#hero"
              onClick={(e) => handleNavClick(e, "#hero")}
              className="flex items-center gap-2 group"
              aria-label="Go to top"
            >
              <span className="font-heading text-xl font-bold select-none">
                <span className="text-[#94a3b8] group-hover:text-[#60a5fa] transition-colors duration-200">
                  &lt;
                </span>
                <span className="text-white">{personalInfo.initials[0]}</span>
                <span className="text-[#38bdf8]">{personalInfo.initials[1]}</span>
                <span className="text-[#94a3b8] group-hover:text-[#818cf8] transition-colors duration-200">
                  /&gt;
                </span>
              </span>
            </a>

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center gap-6">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="relative text-sm font-medium text-[#94a3b8] hover:text-white transition-colors duration-200 group py-1"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-[#60a5fa] to-[#818cf8] group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </div>

            {/* Desktop right: View & Download Resume buttons */}
            <div className="hidden md:flex items-center gap-2">
              <a
                href={personalInfo.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="gradient-btn text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-full flex items-center gap-1.5"
                id="navbar-view-resume-btn"
                title="View Resume in new tab"
              >
                <FiEye size={14} /> Resume
              </a>
              <a
                href={personalInfo.resumeUrl}
                download="Rohan_Wani_Resume.pdf"
                className="px-3.5 py-2 rounded-full border border-[#60a5fa]/40 text-[#60a5fa] hover:bg-[#60a5fa]/10 transition-colors text-xs sm:text-sm font-semibold flex items-center gap-1.5"
                id="navbar-download-resume-btn"
                title="Download Resume PDF"
              >
                <FiDownload size={14} /> Download
              </a>
            </div>

            {/* Mobile hamburger */}
            <button
              id="hamburger-btn"
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden text-[#94a3b8] hover:text-white transition-colors p-1"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
              className="md:hidden glass border-t border-white/[0.06]"
            >
              <div className="flex flex-col gap-1 px-4 py-4">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-[#94a3b8] hover:text-white py-2.5 text-sm font-medium border-b border-white/[0.04] last:border-0 transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                ))}
                <div className="flex items-center gap-2 mt-3">
                  <a
                    href={personalInfo.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 gradient-btn text-white text-sm font-semibold py-2.5 rounded-full text-center flex items-center justify-center gap-1.5"
                  >
                    <FiEye size={15} /> View Resume
                  </a>
                  <a
                    href={personalInfo.resumeUrl}
                    download="Rohan_Wani_Resume.pdf"
                    className="flex-1 px-4 py-2.5 rounded-full border border-[#60a5fa]/40 text-[#60a5fa] hover:bg-[#60a5fa]/10 transition-colors text-sm font-semibold text-center flex items-center justify-center gap-1.5"
                  >
                    <FiDownload size={15} /> Download
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
