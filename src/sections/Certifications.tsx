import { useState } from "react";
import type { ComponentType } from "react";
import { motion } from "framer-motion";
import { FiAward, FiCloud, FiCpu, FiArrowRight } from "react-icons/fi";
import {
  SiGooglecloud,
  SiDocker,
  SiGithub,
  SiPython,
  SiJavascript,
  SiCisco,
} from "react-icons/si";
import { certifications } from "../data/portfolio";
import type { Certification } from "../data/portfolio";
import CertDetailModal from "../components/CertDetailModal";

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

// Map tailwind gradient strings to actual CSS
const gradientMap: Record<string, string> = {
  "from-orange-500 to-red-500": "linear-gradient(135deg, #f97316, #ef4444)",
  "from-blue-500 to-cyan-400": "linear-gradient(135deg, #3b82f6, #22d3ee)",
  "from-amber-400 to-orange-500": "linear-gradient(135deg, #fbbf24, #f97316)",
  "from-blue-400 to-yellow-400": "linear-gradient(135deg, #60a5fa, #facc15)",
};

// ── Cert card ────────────────────────────────────────────────────────────────
function CertCard({
  cert,
  index,
  onClick,
}: {
  cert: Certification;
  index: number;
  onClick: () => void;
}) {
  const IconComp = cert.badgeIcon ? CERT_ICON_MAP[cert.badgeIcon] : null;
  const gradient = gradientMap[cert.color] ?? "linear-gradient(135deg,#60a5fa,#818cf8)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.55, ease: "easeOut" }}
    >
      <motion.div
        whileHover={{ scale: 1.025, y: -4 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        onClick={onClick}
        tabIndex={0}
        role="button"
        aria-label={`View details for ${cert.name}`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") onClick();
        }}
        className="group relative flex items-start gap-4 p-5 rounded-2xl cursor-pointer overflow-hidden h-full"
        style={{
          background: "linear-gradient(135deg, #111118 0%, #0d0d14 100%)",
          border: "1px solid rgba(255,255,255,0.07)",
          transition: "border-color 0.3s ease, box-shadow 0.3s ease",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.borderColor = "rgba(255,255,255,0.15)";
          el.style.boxShadow = "0 12px 40px rgba(0,0,0,0.35)";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.borderColor = "rgba(255,255,255,0.07)";
          el.style.boxShadow = "none";
        }}
      >
        {/* Shimmer on hover */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background:
              "linear-gradient(105deg,transparent 30%,rgba(255,255,255,0.035) 50%,transparent 70%)",
            animation: "shimmer 1.8s ease-in-out infinite",
          }}
        />

        {/* Coloured left stripe */}
        <div
          className="absolute left-0 top-4 bottom-4 w-0.5 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: gradient }}
        />

        {/* Icon badge */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md"
          style={{ background: gradient }}
        >
          {IconComp ? (
            <IconComp size={22} className="text-white" />
          ) : (
            <FiAward size={22} className="text-white" />
          )}
        </div>

        {/* Text content */}
        <div className="flex-1 min-w-0">
          <h3 className="font-heading font-bold text-white text-sm leading-snug mb-1 group-hover:text-[#60a5fa] transition-colors duration-300">
            {cert.name}
          </h3>
          <div className="flex items-center justify-between gap-2 flex-wrap mb-2">
            <span className="text-[#94a3b8] text-xs">{cert.issuer}</span>
            <span className="text-[#94a3b8] text-xs bg-white/[0.04] px-2 py-0.5 rounded-full">
              {cert.date}
            </span>
          </div>

          {/* Short skills preview */}
          <div className="flex flex-wrap gap-1">
            {cert.skills.slice(0, 3).map((skill) => (
              <span
                key={skill}
                className="text-[10px] font-medium px-2 py-0.5 rounded-full border border-white/10 text-[#94a3b8]"
              >
                {skill}
              </span>
            ))}
            {cert.skills.length > 3 && (
              <span className="text-[10px] text-[#94a3b8]">
                +{cert.skills.length - 3} more
              </span>
            )}
          </div>

          {/* "View Details" link row */}
          <motion.div
            className="flex items-center gap-1 mt-2 text-[11px] font-semibold text-[#60a5fa] opacity-0 group-hover:opacity-100"
            transition={{ duration: 0.2 }}
          >
            <span>View Details</span>
            <FiArrowRight size={11} />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Main section ─────────────────────────────────────────────────────────────
export default function Certifications() {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  return (
    <>
      {/* Shimmer keyframe */}
      <style>{`
        @keyframes shimmer {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>

      <section
        id="certifications"
        className="relative py-24 bg-[#0d0d14]/75 backdrop-blur-sm"
        aria-label="Certifications section"
      >
        {/* Ambient glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 right-0 w-80 h-80 opacity-5"
          style={{
            background: "radial-gradient(circle, #a78bfa, transparent 70%)",
            filter: "blur(50px)",
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
            <p className="section-eyebrow mb-3">Credentials</p>
            <h2
              className="section-heading"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              Certifications
            </h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="text-[#94a3b8] mt-4 text-sm max-w-lg mx-auto"
            >
              Click any certificate to see what was covered and verify the credential.
            </motion.p>
          </motion.div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certifications.map((cert, index) => (
              <CertCard
                key={cert.name}
                cert={cert}
                index={index}
                onClick={() => setSelectedCert(cert)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Detail modal */}
      <CertDetailModal
        cert={selectedCert}
        onClose={() => setSelectedCert(null)}
      />
    </>
  );
}
