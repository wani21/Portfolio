import type { ComponentType } from "react";
import { motion } from "framer-motion";
import { FiExternalLink, FiCloud, FiAward, FiCpu } from "react-icons/fi";
import {
  SiGooglecloud,
  SiDocker,
  SiGithub,
  SiPython,
  SiJavascript,
  SiCisco,
} from "react-icons/si";
import { certifications } from "../data/portfolio";

type IconComp = ComponentType<{ size?: number; className?: string }>;

const CERT_ICON_MAP: Record<string, IconComp> = {
  // Available icons
  SiGooglecloud,
  SiDocker,
  SiGithub,
  SiPython,
  SiJavascript,
  SiCisco,
  // Fallbacks
  SiJava: SiJavascript,           // Java → JS logo as nearest
  SiAmazonwebservices: FiCloud as IconComp,
  SiOpenai: FiCpu as IconComp,
};

function CertCard({
  cert,
  index,
}: {
  cert: (typeof certifications)[0];
  index: number;
}) {
  const IconComp = cert.badgeIcon ? CERT_ICON_MAP[cert.badgeIcon] : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.08, duration: 0.6 }}
      className="card p-5 flex items-start gap-4 group"
    >
      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#60a5fa]/10 to-[#818cf8]/10 border border-[#60a5fa]/20 flex items-center justify-center flex-shrink-0">
        {IconComp ? (
          <IconComp size={20} className="text-[#60a5fa]" />
        ) : (
          <FiAward size={20} className="text-[#60a5fa]" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-heading font-bold text-white text-sm leading-snug mb-1 group-hover:text-[#60a5fa] transition-colors duration-300">
          {cert.name}
        </h3>
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <span className="text-[#94a3b8] text-xs">{cert.issuer}</span>
          <span className="text-[#94a3b8] text-xs bg-white/[0.04] px-2 py-0.5 rounded-full">
            {cert.date}
          </span>
        </div>
        {cert.credentialUrl && (
          <a
            href={cert.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[#38bdf8] text-xs font-medium mt-2 hover:text-white transition-colors duration-200"
            aria-label={`View ${cert.name} credential`}
          >
            View Credential <FiExternalLink size={11} />
          </a>
        )}
      </div>
    </motion.div>
  );
}

export default function Certifications() {
  return (
    <section
      id="certifications"
      className="relative py-24 bg-[#0d0d14]"
      aria-label="Certifications section"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-0 w-80 h-80 opacity-5"
        style={{
          background: "radial-gradient(circle, #a78bfa, transparent 70%)",
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
          <p className="section-eyebrow mb-3">Credentials</p>
          <h2 className="section-heading" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            Certifications
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {certifications.map((cert, index) => (
            <CertCard key={cert.name} cert={cert} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
