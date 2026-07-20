import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail, FiArrowRight } from "react-icons/fi";
import { useTypewriter } from "../hooks/useTypewriter";
import { personalInfo, typewriterRoles } from "../data/portfolio";

const SOCIAL_LINKS = [
  { icon: FiGithub, href: personalInfo.github, label: "GitHub" },
  { icon: FiLinkedin, href: personalInfo.linkedin, label: "LinkedIn" },
  { icon: FiMail, href: `mailto:${personalInfo.email}`, label: "Email" },
];

export default function Hero() {
  const role = useTypewriter({ words: typewriterRoles });

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-24 pb-16"
      aria-label="Hero section"
    >
      {/* Gradient radial accent glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10"
        style={{
          background: "radial-gradient(circle, #60a5fa 0%, #818cf8 50%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <motion.div
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
        }}
        className="relative z-10 flex flex-col items-center text-center max-w-4xl"
      >
        {/* Eyebrow */}
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 28 },
            show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
          }}
          className="section-eyebrow mb-4"
        >
          Hello, I'm
        </motion.p>

        {/* Name */}
        <motion.h1
          variants={{
            hidden: { opacity: 0, y: 28 },
            show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
          }}
          className="font-heading font-extrabold leading-tight mb-4"
          style={{ fontSize: "clamp(2.75rem, 7vw, 5.5rem)" }}
        >
          <span className="text-white">{personalInfo.firstName} </span>
          <span className="gradient-text">{personalInfo.lastName}</span>
        </motion.h1>

        {/* Typewriter */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 28 },
            show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
          }}
          className="flex items-center justify-center gap-2 text-xl sm:text-2xl font-medium mb-6 h-9"
        >
          <span className="text-[#94a3b8]">I build</span>
          <span className="text-[#38bdf8] font-semibold min-w-[200px] text-left">
            {role}
          </span>
          <span className="typewriter-cursor" aria-hidden="true" />
        </motion.div>

        {/* Tagline */}
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 28 },
            show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
          }}
          className="text-[#94a3b8] text-base sm:text-lg max-w-xl mb-10 leading-relaxed"
        >
          {personalInfo.tagline}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 28 },
            show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
          }}
          className="flex flex-col sm:flex-row items-center gap-4 mb-12"
        >
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="gradient-btn text-white font-semibold px-8 py-3 rounded-full flex items-center gap-2 text-sm sm:text-base"
            id="hero-view-projects-btn"
          >
            View Projects <FiArrowRight />
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-8 py-3 rounded-full border border-[#60a5fa]/40 text-[#60a5fa] hover:bg-[#60a5fa]/10 hover:border-[#60a5fa] transition-all duration-300 font-semibold text-sm sm:text-base"
            id="hero-contact-btn"
          >
            Get In Touch
          </a>
        </motion.div>

        {/* Social icons */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 28 },
            show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
          }}
          className="flex items-center gap-4 mb-16"
        >
          {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              aria-label={label}
              className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center text-[#94a3b8] hover:text-white hover:border-[#60a5fa]/50 hover:bg-[#60a5fa]/10 transition-all duration-300"
            >
              <Icon size={18} />
            </a>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 28 },
            show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
          }}
          className="flex flex-col items-center gap-2 text-[#94a3b8]"
        >
          <span className="text-xs tracking-widest uppercase">Scroll Down</span>
          <div className="scroll-indicator w-6 h-10 rounded-full border-2 border-[#94a3b8]/40 flex items-start justify-center pt-2">
            <div className="w-1 h-2.5 rounded-full bg-[#38bdf8] opacity-80" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
