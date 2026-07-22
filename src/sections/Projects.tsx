import { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FiGithub, FiExternalLink, FiArrowRight } from "react-icons/fi";
import { projects } from "../data/portfolio";
import ProjectDetailModal from "../components/ProjectDetailModal";
import type { Project } from "../data/portfolio";

// ── Category badge colour map ─────────────────────────────────────────────────
const categoryColors: Record<string, { bg: string; text: string; dot: string }> = {
  "Full Stack": {
    bg: "bg-blue-500/10 border-blue-500/25",
    text: "text-blue-300",
    dot: "#60a5fa",
  },
  "AI / ML": {
    bg: "bg-purple-500/10 border-purple-500/25",
    text: "text-purple-300",
    dot: "#a78bfa",
  },
  Hackathon: {
    bg: "bg-amber-500/10 border-amber-500/25",
    text: "text-amber-300",
    dot: "#fbbf24",
  },
};

// ── 3-D tilt card ─────────────────────────────────────────────────────────────
function TiltCard({
  project,
  index,
  onClick,
}: {
  project: Project;
  index: number;
  onClick: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  // Mouse-relative raw values
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // Spring-smoothed
  const springX = useSpring(rawX, { stiffness: 180, damping: 20 });
  const springY = useSpring(rawY, { stiffness: 180, damping: 20 });

  // Map to rotation + glare position
  const rotateY = useTransform(springX, [-0.5, 0.5], [-8, 8]);
  const rotateX = useTransform(springY, [-0.5, 0.5], [8, -8]);
  const glareX = useTransform(springX, [-0.5, 0.5], [0, 100]);
  const glareY = useTransform(springY, [-0.5, 0.5], [0, 100]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  const cat = categoryColors[project.category] ?? categoryColors["Full Stack"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
      style={{ perspective: 900 }}
    >
      <motion.div
        ref={ref}
        style={{ rotateY, rotateX, transformStyle: "preserve-3d" }}
        whileHover={{ scale: 1.025 }}
        transition={{ type: "spring", stiffness: 200, damping: 18 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative rounded-2xl cursor-pointer h-full"
        onClick={onClick}
        tabIndex={0}
        role="button"
        aria-label={`View details for ${project.title}`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") onClick();
        }}
      >
        {/* Glare overlay */}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-2xl z-10 opacity-0 group-hover:opacity-100"
          style={{
            background: useTransform(
              [glareX, glareY],
              ([gx, gy]) =>
                `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.06) 0%, transparent 60%)`
            ),
          }}
        />

        {/* Card body */}
        <div
          className="group relative flex flex-col gap-4 p-6 h-full rounded-2xl overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #111118 0%, #0d0d14 100%)",
            border: "1px solid rgba(255,255,255,0.07)",
            transition: "border-color 0.3s ease, box-shadow 0.3s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor =
              "rgba(96,165,250,0.28)";
            (e.currentTarget as HTMLElement).style.boxShadow =
              "0 12px 40px rgba(96,165,250,0.1), 0 0 0 1px rgba(96,165,250,0.1)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor =
              "rgba(255,255,255,0.07)";
            (e.currentTarget as HTMLElement).style.boxShadow = "none";
          }}
        >
          {/* Shimmer sweep on hover */}
          <div
            className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background:
                "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.04) 50%, transparent 70%)",
              animation: "shimmer 1.6s ease-in-out infinite",
            }}
          />

          {/* Top row: category + links */}
          <div className="flex items-center justify-between">
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold border ${cat.bg} ${cat.text}`}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: cat.dot }}
              />
              {project.category}
            </span>

            <div className="flex items-center gap-2">
              {project.githubUrl && (
                <motion.a
                  whileHover={{ scale: 1.2, y: -1 }}
                  whileTap={{ scale: 0.9 }}
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title} GitHub repository`}
                  onClick={(e) => e.stopPropagation()}
                  className="text-[#94a3b8] hover:text-white transition-colors duration-200"
                  id={`card-github-${project.title.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  <FiGithub size={16} />
                </motion.a>
              )}
              {project.liveUrl && (
                <motion.a
                  whileHover={{ scale: 1.2, y: -1 }}
                  whileTap={{ scale: 0.9 }}
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title} live demo`}
                  onClick={(e) => e.stopPropagation()}
                  className="text-[#94a3b8] hover:text-[#38bdf8] transition-colors duration-200"
                  id={`card-live-${project.title.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  <FiExternalLink size={16} />
                </motion.a>
              )}
            </div>
          </div>

          {/* Title */}
          <h3 className="font-heading font-bold text-white text-lg leading-snug group-hover:text-[#60a5fa] transition-colors duration-300">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-[#94a3b8] text-sm leading-relaxed flex-1">
            {project.description}
          </p>

          {/* Tech chips */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="text-[#60a5fa] bg-[#60a5fa]/8 border border-[#60a5fa]/15 text-[11px] font-medium px-2.5 py-0.5 rounded-full"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span className="text-[#94a3b8] text-[11px] font-medium px-2 py-0.5">
                +{project.techStack.length - 4} more
              </span>
            )}
          </div>

          {/* "View Details" footer row */}
          <motion.div
            className="flex items-center gap-1.5 text-xs font-semibold text-[#60a5fa] opacity-0 group-hover:opacity-100 -mb-1"
            initial={{ x: -8 }}
            whileHover={{ x: 0 }}
            transition={{ duration: 0.25 }}
          >
            <span>View Details</span>
            <FiArrowRight size={13} />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Main Section ──────────────────────────────────────────────────────────────
export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      {/* Inject shimmer keyframe once */}
      <style>{`
        @keyframes shimmer {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>

      <section
        id="projects"
        className="relative py-24 bg-transparent"
        aria-label="Projects section"
      >
        {/* Ambient glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-72 opacity-5"
          style={{
            background: "radial-gradient(ellipse, #60a5fa, transparent 70%)",
            filter: "blur(60px)",
          }}
        />

        <div className="section-wrapper relative z-10">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="section-eyebrow mb-3">What I've Built</p>
            <h2
              className="section-heading"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              Projects
            </h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="text-[#94a3b8] mt-4 text-sm max-w-xl mx-auto"
            >
              Click any card to explore full project details, features, and tech stack.
            </motion.p>
          </motion.div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <TiltCard
                key={project.title}
                project={project}
                index={index}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Detail modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}
