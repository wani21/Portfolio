import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

interface AtomProps {
  x: string;
  y: string;
  size: number;
  orbitSpeeds: [number, number, number];
  hue: "blue" | "purple" | "teal";
  delay: number;
}

const HUE_MAP = {
  blue:   { nucleus: "#60a5fa", ring: "rgba(96,165,250,0.35)", electron: "#38bdf8" },
  purple: { nucleus: "#818cf8", ring: "rgba(129,140,248,0.35)", electron: "#a78bfa" },
  teal:   { nucleus: "#34d399", ring: "rgba(52,211,153,0.35)",  electron: "#6ee7b7" },
};

function Atom({ x, y, size, orbitSpeeds, hue, delay }: AtomProps) {
  const c = HUE_MAP[hue];
  const nucleusR = size * 0.5;
  const orbits = [
    { rx: size * 1.1, ry: size * 0.42, tilt: "rotateX(72deg) rotateY(-15deg)", speed: orbitSpeeds[0] },
    { rx: size * 1.1, ry: size * 0.42, tilt: "rotateX(72deg) rotateY(55deg)",  speed: orbitSpeeds[1] },
    { rx: size * 1.1, ry: size * 0.42, tilt: "rotateX(72deg) rotateY(125deg)", speed: orbitSpeeds[2] },
  ];

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: x, top: y, transform: "translate(-50%, -50%)" }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.8, delay, ease: "easeOut" }}
    >
      {/* Float the whole atom gently */}
      <motion.div
        animate={{
          y: [0, -18, 0, 12, 0],
          x: [0, 10, -8, 4, 0],
        }}
        transition={{
          duration: 14 + delay * 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ position: "relative", width: size * 3, height: size * 3 }}
      >
        {/* Nucleus glow */}
        <div
          className="absolute rounded-full"
          style={{
            width: nucleusR * 5,
            height: nucleusR * 5,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: `radial-gradient(circle, white 0%, ${c.nucleus} 35%, transparent 75%)`,
            filter: "blur(2px)",
            opacity: 0.9,
          }}
        />
        {/* Hard nucleus core */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: nucleusR * 2,
            height: nucleusR * 2,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "white",
            boxShadow: `0 0 ${nucleusR * 3}px ${c.nucleus}`,
          }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* 3 Orbital rings with spinning electrons */}
        {orbits.map((orbit, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              width: orbit.rx * 2,
              height: orbit.ry * 2,
              top: "50%",
              left: "50%",
              transform: `translate(-50%, -50%) ${orbit.tilt}`,
              perspective: "400px",
            }}
          >
            {/* Ring ellipse */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                border: `1.5px solid ${c.ring}`,
              }}
            />

            {/* Spinning electron */}
            <motion.div
              className="absolute"
              style={{
                width: "100%",
                height: "100%",
                top: 0,
                left: 0,
              }}
              animate={{ rotate: 360 }}
              transition={{
                duration: orbit.speed,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {/* Electron glow */}
              <div
                className="absolute rounded-full"
                style={{
                  width: nucleusR * 3.5,
                  height: nucleusR * 3.5,
                  top: "50%",
                  left: "100%",
                  transform: "translate(-50%, -50%)",
                  background: `radial-gradient(circle, white 0%, ${c.electron} 40%, transparent 75%)`,
                  filter: "blur(1px)",
                }}
              />
              {/* Electron core */}
              <div
                className="absolute rounded-full"
                style={{
                  width: nucleusR * 1.4,
                  height: nucleusR * 1.4,
                  top: "50%",
                  left: "100%",
                  transform: "translate(-50%, -50%)",
                  background: "white",
                  boxShadow: `0 0 ${nucleusR * 2}px ${c.electron}`,
                }}
              />
            </motion.div>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}

// Energy bond line between two absolute positions
function Bond({ x1, y1, x2, y2, delay }: { x1: string; y1: string; x2: string; y2: string; delay: number }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: x1,
        top: y1,
        transformOrigin: "0 0",
        zIndex: 0,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0.25, 0.12, 0.2, 0] }}
      transition={{ duration: 8, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* SVG line between atoms */}
      <svg
        className="overflow-visible absolute"
        style={{ left: 0, top: 0 }}
        width="1"
        height="1"
      >
        <defs>
          <linearGradient id={`bond-${delay}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#818cf8" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
}

// Main config — atom positions as percentages
const ATOMS: AtomProps[] = [
  { x: "8%",  y: "15%", size: 28, orbitSpeeds: [3.2, 4.1, 5.5], hue: "blue",   delay: 0 },
  { x: "88%", y: "10%", size: 22, orbitSpeeds: [4.0, 3.2, 6.0], hue: "purple", delay: 0.4 },
  { x: "92%", y: "55%", size: 30, orbitSpeeds: [3.8, 5.2, 4.3], hue: "blue",   delay: 0.8 },
  { x: "75%", y: "88%", size: 20, orbitSpeeds: [5.1, 3.6, 4.8], hue: "teal",   delay: 1.2 },
  { x: "12%", y: "75%", size: 25, orbitSpeeds: [4.5, 3.9, 5.7], hue: "purple", delay: 0.6 },
  { x: "45%", y: "5%",  size: 18, orbitSpeeds: [3.0, 4.8, 6.2], hue: "teal",   delay: 1.0 },
  { x: "50%", y: "92%", size: 24, orbitSpeeds: [4.2, 3.4, 5.0], hue: "blue",   delay: 1.4 },
  { x: "25%", y: "45%", size: 16, orbitSpeeds: [5.5, 4.0, 3.8], hue: "purple", delay: 0.3 },
];

export default function AtomBackground() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {/* Dark base */}
      <div className="absolute inset-0 bg-[#0a0a0f]" />

      {/* Ambient glow blobs */}
      <div
        className="absolute rounded-full"
        style={{
          width: "50vw",
          height: "50vw",
          top: "-10%",
          left: "-10%",
          background: "radial-gradient(circle, rgba(56,189,248,0.06) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          width: "40vw",
          height: "40vw",
          bottom: "-5%",
          right: "-5%",
          background: "radial-gradient(circle, rgba(129,140,248,0.07) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      {/* Atoms */}
      {!prefersReducedMotion && ATOMS.map((atom, i) => (
        <Atom key={i} {...atom} />
      ))}
    </div>
  );
}
