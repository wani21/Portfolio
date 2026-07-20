import { motion } from "framer-motion";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import { projects } from "../data/portfolio";

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.08, duration: 0.6, ease: "easeOut" }}
      className="card p-6 flex flex-col gap-4 group"
    >
      <div className="flex items-start justify-between">
        <h3 className="font-heading font-bold text-white text-lg group-hover:text-[#60a5fa] transition-colors duration-300">
          {project.title}
        </h3>
        <div className="flex items-center gap-2 flex-shrink-0 ml-2">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} GitHub repository`}
              className="text-[#94a3b8] hover:text-white transition-colors duration-200"
            >
              <FiGithub size={18} />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} live demo`}
              className="text-[#94a3b8] hover:text-[#38bdf8] transition-colors duration-200"
            >
              <FiExternalLink size={18} />
            </a>
          )}
        </div>
      </div>

      <p className="text-[#94a3b8] text-sm leading-relaxed flex-1">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2 pt-1">
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className="text-[#60a5fa] bg-[#60a5fa]/8 border border-[#60a5fa]/15 text-xs font-medium px-2.5 py-1 rounded-full"
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative py-24 bg-[#0a0a0f]"
      aria-label="Projects section"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-64 opacity-5"
        style={{
          background: "radial-gradient(ellipse, #60a5fa, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      <div className="section-wrapper relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="section-eyebrow mb-3">What I've Built</p>
          <h2 className="section-heading" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            Projects
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
