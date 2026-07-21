import { motion } from "framer-motion";
import { FiExternalLink } from "react-icons/fi";
import { experiences } from "../data/portfolio";
import type { ExperienceEntry } from "../data/portfolio";

interface TimelineCardProps {
  entry: ExperienceEntry;
  index: number;
  isLeft: boolean;
}

function TimelineCard({ entry, index, isLeft }: TimelineCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: "easeOut" }}
      className={`relative flex items-start gap-4 ${
        isLeft
          ? "md:pr-[calc(50%+2rem)] md:flex-row-reverse"
          : "md:pl-[calc(50%+2rem)]"
      } pl-10 md:pl-0`}
    >
      {/* Mobile timeline dot */}
      <div className="absolute left-0 top-5 w-5 h-5 rounded-full flex items-center justify-center md:hidden">
        <div className="w-3 h-3 rounded-full bg-gradient-to-br from-[#60a5fa] to-[#818cf8] shadow-blue-glow" />
        <div className="absolute w-5 h-5 rounded-full border border-[#60a5fa]/40 animate-ping opacity-30" />
      </div>

      <div className="card p-6 w-full">
        {/* Date pill */}
        <span className="inline-block gradient-btn text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">
          {entry.dateRange}
        </span>

        {/* Title & company */}
        <h3 className="font-heading font-bold text-white text-lg mb-1">
          {entry.title}
        </h3>
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span className="text-[#94a3b8] text-sm">{entry.company}</span>
          {entry.companyDescription && (
            <span className="text-[#94a3b8]/50 text-xs">· {entry.companyDescription}</span>
          )}
          {entry.liveUrl && (
            <a
              href={entry.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-semibold px-2 py-0.5 rounded-full hover:bg-green-500/20 transition-colors duration-200"
              aria-label={`Visit ${entry.liveBadgeText ?? "Live Platform"}`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              {entry.liveBadgeText ?? "LIVE PLATFORM"}
              <FiExternalLink size={10} />
            </a>
          )}
        </div>

        {/* Bullets */}
        <ul className="space-y-1.5">
          {entry.bullets.map((bullet, i) => (
            <li key={i} className="flex items-start gap-2 text-[#94a3b8] text-sm">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-br from-[#60a5fa] to-[#818cf8] flex-shrink-0" />
              {bullet}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative py-24 bg-transparent"
      aria-label="Experience section"
    >
      {/* Subtle left-side glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 -left-32 w-96 h-96 rounded-full opacity-5"
        style={{
          background: "radial-gradient(circle, #60a5fa, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      <div className="section-wrapper relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="section-eyebrow mb-3">Where I've Worked</p>
          <h2 className="section-heading" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            Experience
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Desktop vertical line */}
          <div className="timeline-line hidden md:block" aria-hidden="true" />
          {/* Mobile vertical line */}
          <div
            className="absolute left-2 top-0 bottom-0 w-px md:hidden"
            style={{
              background:
                "linear-gradient(to bottom, transparent, #60a5fa 10%, #818cf8 90%, transparent)",
            }}
            aria-hidden="true"
          />

          <div className="flex flex-col gap-10 md:gap-12">
            {experiences.map((entry, index) => (
              <div key={index} className="relative">
                {/* Desktop center dot */}
                <div className="absolute left-1/2 top-6 -translate-x-1/2 hidden md:flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-gradient-to-br from-[#60a5fa] to-[#818cf8] z-10 relative" />
                  <div className="absolute w-8 h-8 rounded-full border border-[#60a5fa]/30 animate-ping opacity-40" />
                </div>
                <TimelineCard
                  entry={entry}
                  index={index}
                  isLeft={index % 2 === 0}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
