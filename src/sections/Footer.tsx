import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { personalInfo } from "../data/portfolio";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative py-10 bg-[#0d0d14] border-t border-white/[0.06]"
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <a href="#hero" className="font-heading font-bold text-base">
          <span className="text-[#94a3b8]">&lt;</span>
          <span className="text-white">{personalInfo.initials[0]}</span>
          <span className="text-[#38bdf8]">{personalInfo.initials[1]}</span>
          <span className="text-[#94a3b8]">/&gt;</span>
        </a>

        {/* Copyright */}
        <p className="text-[#94a3b8] text-xs text-center">
          © {year} {personalInfo.firstName} {personalInfo.lastName}. Built with React + Vite.
        </p>

        {/* Social icons */}
        <div className="flex items-center gap-4">
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="text-[#94a3b8] hover:text-white transition-colors duration-200"
          >
            <FiGithub size={17} />
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="text-[#94a3b8] hover:text-[#60a5fa] transition-colors duration-200"
          >
            <FiLinkedin size={17} />
          </a>
          <a
            href={`mailto:${personalInfo.email}`}
            aria-label="Send email"
            className="text-[#94a3b8] hover:text-[#38bdf8] transition-colors duration-200"
          >
            <FiMail size={17} />
          </a>
        </div>
      </div>
    </footer>
  );
}
