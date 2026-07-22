import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiGithub,
  FiExternalLink,
  FiX,
  FiCheckCircle,
  FiTag,
  FiLayers,
} from "react-icons/fi";
import type { Project } from "../data/portfolio";

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

const categoryColors: Record<string, string> = {
  "Full Stack": "from-blue-500/20 to-indigo-500/20 border-blue-500/30 text-blue-300",
  "AI / ML": "from-purple-500/20 to-pink-500/20 border-purple-500/30 text-purple-300",
  Hackathon: "from-amber-500/20 to-orange-500/20 border-amber-500/30 text-amber-300",
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
  exit: { opacity: 0, transition: { duration: 0.25, ease: "easeIn" } },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.88, y: 40 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 280, damping: 24, mass: 0.8 },
  },
  exit: {
    opacity: 0,
    scale: 0.92,
    y: 24,
    transition: { duration: 0.22, ease: "easeIn" },
  },
};

const listVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const chipVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.35, ease: "easeOut" } },
};

export default function ProjectDetailModal({
  project,
  onClose,
}: ProjectDetailModalProps) {
  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Prevent body scroll when modal open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [project]);

  const categoryClass =
    (project && categoryColors[project.category]) ||
    "from-blue-500/20 to-indigo-500/20 border-blue-500/30 text-blue-300";

  return (
    <AnimatePresence mode="wait">
      {project && (
        <motion.div
          key="modal-overlay"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6"
          style={{ background: "rgba(5, 5, 12, 0.88)", backdropFilter: "blur(12px)" }}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
          aria-modal="true"
          role="dialog"
          aria-label={`${project.title} project details`}
        >
          {/* Ambient glow behind modal */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
          >
            <div
              className="w-[600px] h-[600px] rounded-full opacity-10"
              style={{
                background:
                  "radial-gradient(circle, #60a5fa 0%, #818cf8 40%, transparent 70%)",
                filter: "blur(80px)",
              }}
            />
          </div>

          <motion.div
            key="modal-panel"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl"
            style={{
              background:
                "linear-gradient(135deg, #0f0f1a 0%, #111118 50%, #0a0a14 100%)",
              border: "1px solid rgba(96, 165, 250, 0.2)",
              boxShadow:
                "0 0 0 1px rgba(96,165,250,0.1), 0 24px 80px rgba(0,0,0,0.7), 0 0 60px rgba(96,165,250,0.06)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top gradient bar */}
            <div
              className="h-1 w-full rounded-t-2xl"
              style={{
                background: "linear-gradient(to right, #60a5fa, #818cf8, #a78bfa)",
              }}
            />

            {/* Header */}
            <div className="relative p-6 pb-4">
              {/* Close button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center rounded-full text-[#94a3b8] hover:text-white transition-colors duration-200"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
                aria-label="Close project details"
              >
                <FiX size={17} />
              </motion.button>

              {/* Category badge */}
              <motion.span
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border bg-gradient-to-r ${categoryClass} mb-4`}
              >
                <FiTag size={11} />
                {project.category}
              </motion.span>

              {/* Title */}
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.5 }}
                className="font-heading font-bold text-white pr-10"
                style={{ fontSize: "clamp(1.4rem, 3vw, 1.9rem)", lineHeight: 1.2 }}
              >
                {project.title}
              </motion.h2>

              {/* Short description */}
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-[#60a5fa] text-sm mt-2 font-medium"
              >
                {project.description}
              </motion.p>
            </div>

            {/* Divider */}
            <div className="mx-6 h-px bg-white/5" />

            {/* Body */}
            <div className="p-6 flex flex-col gap-6">
              {/* Long description */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.22, duration: 0.5 }}
              >
                <p className="text-[#94a3b8] text-sm leading-relaxed">
                  {project.longDescription}
                </p>
              </motion.div>

              {/* Key Features */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28, duration: 0.4 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <FiCheckCircle size={15} className="text-[#60a5fa]" />
                  <h3 className="text-white text-sm font-semibold tracking-wide uppercase">
                    Key Features
                  </h3>
                </div>
                <motion.ul
                  variants={listVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 sm:grid-cols-2 gap-2"
                >
                  {project.features.map((feature) => (
                    <motion.li
                      key={feature}
                      variants={itemVariants}
                      className="flex items-start gap-2 text-sm text-[#94a3b8]"
                    >
                      <span
                        className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-gradient-to-br from-[#60a5fa] to-[#818cf8]"
                        aria-hidden="true"
                      />
                      {feature}
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>

              {/* Tech Stack */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.34, duration: 0.4 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <FiLayers size={15} className="text-[#818cf8]" />
                  <h3 className="text-white text-sm font-semibold tracking-wide uppercase">
                    Tech Stack
                  </h3>
                </div>
                <motion.div
                  variants={listVariants}
                  initial="hidden"
                  animate="visible"
                  className="flex flex-wrap gap-2"
                >
                  {project.techStack.map((tech) => (
                    <motion.span
                      key={tech}
                      variants={chipVariants}
                      className="text-[#60a5fa] bg-[#60a5fa]/8 border border-[#60a5fa]/20 text-xs font-medium px-3 py-1.5 rounded-full"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="flex flex-col sm:flex-row gap-3 pt-2"
              >
                {project.githubUrl && (
                  <motion.a
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    id={`github-link-${project.title.toLowerCase().replace(/\s+/g, "-")}`}
                    className="flex items-center justify-center gap-2.5 flex-1 px-5 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-200"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.12)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background =
                        "rgba(255,255,255,0.1)";
                      (e.currentTarget as HTMLElement).style.borderColor =
                        "rgba(255,255,255,0.22)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background =
                        "rgba(255,255,255,0.06)";
                      (e.currentTarget as HTMLElement).style.borderColor =
                        "rgba(255,255,255,0.12)";
                    }}
                  >
                    <FiGithub size={17} />
                    View on GitHub
                  </motion.a>
                )}
                {project.liveUrl && (
                  <motion.a
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    id={`live-link-${project.title.toLowerCase().replace(/\s+/g, "-")}`}
                    className="flex items-center justify-center gap-2.5 flex-1 px-5 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-200"
                    style={{
                      background:
                        "linear-gradient(135deg, #60a5fa 0%, #818cf8 100%)",
                      boxShadow: "0 4px 20px rgba(96, 165, 250, 0.3)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.boxShadow =
                        "0 6px 28px rgba(96, 165, 250, 0.45)";
                      (e.currentTarget as HTMLElement).style.opacity = "0.92";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.boxShadow =
                        "0 4px 20px rgba(96, 165, 250, 0.3)";
                      (e.currentTarget as HTMLElement).style.opacity = "1";
                    }}
                  >
                    <FiExternalLink size={17} />
                    Live Demo
                  </motion.a>
                )}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
