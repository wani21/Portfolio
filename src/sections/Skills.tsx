import type { ComponentType } from "react";
import { motion } from "framer-motion";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiBootstrap,
  SiSpringboot,
  SiSpring,
  SiPostgresql,
  SiMongodb,
  SiMysql,
  SiPython,
  SiJavascript,
  SiGit,
  SiGithub,
  SiDocker,
  SiPostman,
  SiCisco,
} from "react-icons/si";
import {
  FiCode,
  FiLayout,
  FiServer,
  FiDatabase,
  FiCpu,
  FiTool,
  FiCloud,
} from "react-icons/fi";
import { skillCategories } from "../data/portfolio";
import type { SkillTag } from "../data/portfolio";

type IconComp = ComponentType<{ size?: number; className?: string }>;

// Tag-level icon map — all iconKeys used in portfolio.ts tags
const ICON_MAP: Record<string, IconComp> = {
  // Frontend
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiBootstrap,
  // Backend
  SiSpringboot,
  SiSpring,
  // Databases
  SiPostgresql,
  SiMongodb,
  SiMysql,
  // Languages
  SiPython,
  SiJavascript,
  // Tools
  SiGit,
  SiGithub,
  SiDocker,
  SiPostman,
  SiCisco,
  // Fallbacks for icons not available in this react-icons version
  SiJava: SiJavascript,        // Java → JS logo as nearest fallback
  SiOpenai: FiCpu as IconComp, // OpenAI → CPU icon
  SiAmazonwebservices: FiCloud as IconComp,
};

// Category header icon map — one icon per category
const CATEGORY_ICON_MAP: Record<string, IconComp> = {
  SiJava: FiCode as IconComp,
  SiReact: FiLayout as IconComp,
  SiSpringboot: FiServer as IconComp,
  SiMysql: FiDatabase as IconComp,
  SiOpenai: FiCpu as IconComp,
  SiGit: FiTool as IconComp,
};

function SkillTagPill({ tag }: { tag: SkillTag }) {
  const Icon = tag.iconKey ? ICON_MAP[tag.iconKey] : null;
  return (
    <span className="skill-tag flex items-center gap-1.5 bg-[#0a0a0f] border border-white/[0.08] text-[#94a3b8] text-xs font-medium px-3 py-1.5 rounded-full cursor-default">
      {Icon && <Icon size={12} className="text-[#60a5fa]" />}
      {tag.label}
    </span>
  );
}

function CategoryCard({
  category,
  index,
}: {
  category: (typeof skillCategories)[0];
  index: number;
}) {
  const HeaderIcon = category.iconKey ? CATEGORY_ICON_MAP[category.iconKey] : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
      className="card p-6 flex flex-col gap-4"
    >
      <div className="flex items-center gap-3">
        {HeaderIcon && (
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#60a5fa]/10 to-[#818cf8]/10 border border-[#60a5fa]/20 flex items-center justify-center">
            <HeaderIcon size={18} className="text-[#60a5fa]" />
          </div>
        )}
        <h3 className="font-heading font-bold text-white text-base">
          {category.name}
        </h3>
      </div>

      <div className="flex flex-wrap gap-2">
        {category.tags.map((tag) => (
          <SkillTagPill key={tag.label} tag={tag} />
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative py-24 bg-[#0d0d14]/75 backdrop-blur-sm"
      aria-label="Skills section"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-0 w-96 h-96 opacity-5"
        style={{
          background: "radial-gradient(circle, #818cf8, transparent 70%)",
          filter: "blur(60px)",
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
          <p className="section-eyebrow mb-3">What I Work With</p>
          <h2 className="section-heading" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            Skills & Technologies
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <CategoryCard key={category.name} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
