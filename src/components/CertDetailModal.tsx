import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiExternalLink,
  FiX,
  FiAward,
  FiCalendar,
  FiBookOpen,
  FiCheckCircle,
} from "react-icons/fi";
import type { ComponentType } from "react";
import {
  SiGooglecloud,
  SiDocker,
  SiGithub,
  SiPython,
  SiJavascript,
  SiCisco,
} from "react-icons/si";
import { FiCloud, FiCpu } from "react-icons/fi";
import type { Certification } from "../data/portfolio";

type IconComp = ComponentType<{ size?: number; className?: string }>;

const CERT_ICON_MAP: Record<string, IconComp> = {
  SiGooglecloud,
  SiDocker,
  SiGithub,
  SiPython,
  SiJavascript,
  SiCisco,
  SiJava: SiJavascript,
  SiAmazonwebservices: FiCloud as IconComp,
  SiOpenai: FiCpu as IconComp,
};

// ── Framer-Motion variants ────────────────────────────────────────────────────
const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.28, ease: "easeOut" as const } },
  exit: { opacity: 0, transition: { duration: 0.22, ease: "easeIn" as const } },
};

const panelVariants = {
  hidden: { opacity: 0, scale: 0.86, y: 48 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 26, mass: 0.75 },
  },
  exit: {
    opacity: 0,
    scale: 0.91,
    y: 28,
    transition: { duration: 0.2, ease: "easeIn" as const },
  },
};

const skillsContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.055, delayChildren: 0.2 } },
};

const skillChip = {
  hidden: { opacity: 0, scale: 0.75 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.32, ease: "easeOut" as const } },
};

// ── Helper: map color string to CSS gradient ─────────────────────────────────
const gradientMap: Record<string, string> = {
  "from-orange-500 to-red-500": "linear-gradient(135deg, #f97316, #ef4444)",
  "from-blue-500 to-cyan-400": "linear-gradient(135deg, #3b82f6, #22d3ee)",
  "from-amber-400 to-orange-500": "linear-gradient(135deg, #fbbf24, #f97316)",
  "from-blue-400 to-yellow-400": "linear-gradient(135deg, #60a5fa, #facc15)",
};

export default function CertDetailModal({
  cert,
  onClose,
}: {
  cert: Certification | null;
  onClose: () => void;
}) {
  // Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = cert ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [cert]);

  if (!cert) return null;

  const IconComp = cert.badgeIcon ? CERT_ICON_MAP[cert.badgeIcon] : null;
  const gradient = gradientMap[cert.color] ?? "linear-gradient(135deg, #60a5fa, #818cf8)";

  return (
    <AnimatePresence mode="wait">
      {cert && (
        <motion.div
          key="cert-overlay"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6"
          style={{ background: "rgba(5,5,12,0.88)", backdropFilter: "blur(14px)" }}
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
          role="dialog"
          aria-modal="true"
          aria-label={`${cert.name} certificate details`}
        >
          {/* Soft ambient glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
          >
            <div
              className="w-[500px] h-[500px] rounded-full opacity-10"
              style={{ background: gradient, filter: "blur(90px)" }}
            />
          </div>

          {/* Panel */}
          <motion.div
            key="cert-panel"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg max-h-[88vh] overflow-y-auto rounded-2xl"
            style={{
              background: "linear-gradient(135deg, #0f0f1a 0%, #111118 60%, #0a0a14 100%)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow:
                "0 0 0 1px rgba(255,255,255,0.06), 0 32px 80px rgba(0,0,0,0.75)",
            }}
          >
            {/* Gradient top bar matching cert colour */}
            <div
              className="h-1 w-full rounded-t-2xl"
              style={{ background: gradient }}
            />

            {/* Header section */}
            <div className="relative p-6 pb-4">
              {/* Close button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center rounded-full text-[#94a3b8] hover:text-white transition-colors duration-200"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.09)",
                }}
                aria-label="Close certificate details"
              >
                <FiX size={17} />
              </motion.button>

              {/* Icon + issuer row */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08, duration: 0.4 }}
                className="flex items-center gap-4 mb-4"
              >
                {/* Badge */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg"
                  style={{
                    background: gradient,
                    boxShadow: `0 8px 24px rgba(0,0,0,0.4)`,
                  }}
                >
                  {IconComp ? (
                    <IconComp size={26} className="text-white" />
                  ) : (
                    <FiAward size={26} className="text-white" />
                  )}
                </div>

                {/* Issuer + date */}
                <div className="min-w-0">
                  <span className="text-[#94a3b8] text-xs font-medium flex items-center gap-1.5 mb-1">
                    <FiBookOpen size={11} />
                    {cert.issuer}
                  </span>
                  <span className="text-[#94a3b8] text-xs flex items-center gap-1.5">
                    <FiCalendar size={11} />
                    {cert.date}
                  </span>
                </div>
              </motion.div>

              {/* Certificate name */}
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12, duration: 0.45 }}
                className="font-heading font-bold text-white pr-10"
                style={{ fontSize: "clamp(1.2rem, 2.8vw, 1.6rem)", lineHeight: 1.25 }}
              >
                {cert.name}
              </motion.h2>
            </div>

            {/* Divider */}
            <div className="mx-6 h-px bg-white/5" />

            {/* Body */}
            <div className="p-6 flex flex-col gap-5">
              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18, duration: 0.45 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <FiAward size={13} className="text-[#60a5fa]" />
                  <h3 className="text-white text-xs font-semibold uppercase tracking-wider">
                    About this Certification
                  </h3>
                </div>
                <p className="text-[#94a3b8] text-sm leading-relaxed">
                  {cert.description}
                </p>
              </motion.div>

              {/* Skills covered */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.24, duration: 0.4 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <FiCheckCircle size={13} className="text-[#818cf8]" />
                  <h3 className="text-white text-xs font-semibold uppercase tracking-wider">
                    Skills Covered
                  </h3>
                </div>
                <motion.div
                  variants={skillsContainer}
                  initial="hidden"
                  animate="visible"
                  className="flex flex-wrap gap-2"
                >
                  {cert.skills.map((skill) => (
                    <motion.span
                      key={skill}
                      variants={skillChip}
                      className="text-xs font-medium px-3 py-1.5 rounded-full border"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        borderColor: "rgba(255,255,255,0.1)",
                        color: "#cbd5e1",
                      }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>

              {/* CTA: View Certificate */}
              {cert.credentialUrl && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.32, duration: 0.45 }}
                  className="pt-1"
                >
                  <motion.a
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    id={`view-cert-${cert.name.toLowerCase().replace(/\s+/g, "-")}`}
                    className="flex items-center justify-center gap-2.5 w-full px-5 py-3.5 rounded-xl text-sm font-semibold text-white transition-all duration-200"
                    style={{
                      background: gradient,
                      boxShadow: "0 4px 20px rgba(0,0,0,0.35)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.opacity = "0.88";
                      (e.currentTarget as HTMLElement).style.boxShadow =
                        "0 8px 28px rgba(0,0,0,0.45)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.opacity = "1";
                      (e.currentTarget as HTMLElement).style.boxShadow =
                        "0 4px 20px rgba(0,0,0,0.35)";
                    }}
                  >
                    <FiExternalLink size={16} />
                    View Certificate
                  </motion.a>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
