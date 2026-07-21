import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { SiLeetcode, SiGeeksforgeeks } from "react-icons/si";
import { personalInfo } from "../data/portfolio";

const FOOTER_LINKS = [
  {
    icon: FiGithub,
    href: personalInfo.github,
    label: "GitHub",
    hoverColor: "hover:text-white",
  },
  {
    icon: FiLinkedin,
    href: personalInfo.linkedin,
    label: "LinkedIn",
    hoverColor: "hover:text-[#0A66C2]",
  },
  {
    icon: SiLeetcode,
    href: personalInfo.leetcode,
    label: "LeetCode",
    hoverColor: "hover:text-[#FFA116]",
  },
  {
    icon: SiGeeksforgeeks,
    href: personalInfo.gfg,
    label: "GeeksforGeeks",
    hoverColor: "hover:text-[#2F8D46]",
  },
  {
    icon: FiMail,
    href: `mailto:${personalInfo.email}`,
    label: "Email",
    hoverColor: "hover:text-[#38bdf8]",
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative py-10 bg-[#0d0d14]/85 backdrop-blur-sm border-t border-white/[0.06]"
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
          {FOOTER_LINKS.map(({ icon: Icon, href, label, hoverColor }) => (
            <motion.a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              aria-label={label}
              title={label}
              whileHover={{ scale: 1.2, y: -2 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className={`text-[#94a3b8] transition-colors duration-200 ${hoverColor}`}
            >
              <Icon size={17} />
            </motion.a>
          ))}
        </div>
      </div>
    </footer>
  );
}
