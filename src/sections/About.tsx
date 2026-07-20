import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useCountUpWithRef } from "../hooks/useCountUp";
import { personalInfo, stats } from "../data/portfolio";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

interface StatCardProps {
  value: number;
  suffix?: string;
  decimals?: number;
  label: string;
  index: number;
}

function StatCard({ value, suffix, decimals, label, index }: StatCardProps) {
  const { value: display, ref } = useCountUpWithRef({
    target: value,
    suffix,
    decimals,
    duration: 1800,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="card p-5 text-center hover:scale-105 transition-transform duration-300"
    >
      <span
        ref={ref}
        className="block font-heading font-extrabold gradient-text"
        style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)" }}
        aria-label={`${display} ${label}`}
      >
        {display}
      </span>
      <span className="text-[#94a3b8] text-sm mt-1 block">{label}</span>
    </motion.div>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      id="about"
      className="relative py-24 bg-[#0d0d14]"
      ref={sectionRef}
      aria-label="About section"
    >
      {/* Section background accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-5"
          style={{
            background: "radial-gradient(circle, #818cf8, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
      </div>

      <div className="section-wrapper relative z-10">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="text-center mb-16"
        >
          <p className="section-eyebrow mb-3">Get to Know</p>
          <h2 className="section-heading" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            About Me
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80">
              {/* Glow ring */}
              <div
                className="absolute inset-0 rounded-full opacity-40 animate-pulse-glow"
                style={{
                  background:
                    "linear-gradient(135deg, #60a5fa, #818cf8)",
                  padding: "3px",
                  borderRadius: "50%",
                }}
              />
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  boxShadow: "0 0 60px rgba(56,189,248,0.35)",
                }}
              />
              <img
                src="/profile.jpeg"
                alt={`${personalInfo.firstName} ${personalInfo.lastName} — profile photo`}
                className="relative z-10 w-full h-full rounded-full object-cover border-4 border-[#111118]"
                loading="lazy"
              />
            </div>
          </motion.div>

          {/* Bio text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="flex flex-col gap-5"
          >
            {personalInfo.bio.map((para, i) => (
              <p key={i} className="text-[#94a3b8] text-base leading-relaxed">
                {para}
              </p>
            ))}

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="gradient-btn text-white font-semibold px-6 py-2.5 rounded-full inline-block self-start text-sm mt-2"
              id="about-contact-btn"
            >
              Let's Talk
            </a>
          </motion.div>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16">
          {stats.map((stat, index) => (
            <StatCard
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              decimals={stat.decimals}
              label={stat.label}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
