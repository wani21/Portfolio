import { useCallback, useEffect, useState } from "react";
import Particles, { ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

export default function NetworkBackground() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [initError, setInitError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  const particlesLoaded = useCallback(async () => {
    // Particles loaded callback — no action needed
  }, []);

  // Fallback: static radial gradient if particles fail or user prefers reduced motion
  if (initError || prefersReducedMotion) {
    return (
      <div
        className="fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at 20% 50%, rgba(56,189,248,0.05) 0%, transparent 50%), " +
            "radial-gradient(ellipse at 80% 20%, rgba(129,140,248,0.05) 0%, transparent 50%), " +
            "#0a0a0f",
        }}
        aria-hidden="true"
      />
    );
  }

  const particleCount = isMobile ? 35 : 75;

  const particleOptions = {
    background: { color: { value: "transparent" } },
    fullScreen: false,
    fpsLimit: 60,
    pauseOnBlur: true,
    pauseOnOutsideViewport: true,
    particles: {
      number: {
        value: particleCount,
        density: { enable: true, width: 900 },
      },
      color: { value: "#38bdf8" },
      opacity: {
        value: { min: 0.08, max: 0.35 },
        animation: { enable: true, speed: 0.7, sync: false },
      },
      size: { value: { min: 1, max: 2.5 } },
      links: {
        enable: true,
        distance: 130,
        color: "#38bdf8",
        opacity: 0.12,
        width: 1,
      },
      move: {
        enable: true,
        speed: isMobile ? 0.4 : 0.7,
        direction: "none" as const,
        random: true,
        straight: false,
        outModes: { default: "bounce" as const },
      },
    },
    interactivity: {
      events: {
        onHover: { enable: !isMobile, mode: "grab" as const },
        onClick: { enable: false },
      },
      modes: {
        grab: { distance: 150, links: { opacity: 0.35 } },
      },
    },
    detectRetina: true,
  };

  return (
    <>
      {/* Dark base behind particles */}
      <div className="fixed inset-0 -z-10 bg-[#0a0a0f]" aria-hidden="true" />
      <ParticlesProvider
        init={async (engine) => {
          try {
            await loadSlim(engine);
          } catch {
            setInitError(true);
          }
        }}
      >
        <Particles
          id="tsparticles"
          particlesLoaded={particlesLoaded}
          options={particleOptions}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: -1,
            pointerEvents: "none",
            width: "100%",
            height: "100%",
          }}
        />
      </ParticlesProvider>
    </>
  );
}
