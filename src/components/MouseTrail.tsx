import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

interface TrailPoint {
  x: number;
  y: number;
  alpha: number;
}

export default function MouseTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const isTouchOnly = useRef(
    typeof window !== "undefined" &&
      window.matchMedia("(hover: none)").matches
  );

  useEffect(() => {
    if (prefersReducedMotion || isTouchOnly.current) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const trail: TrailPoint[] = [];
    const TRAIL_LENGTH = 22;
    let mouseX = -999;
    let mouseY = -999;
    let rafId: number;

    const setSize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };

    setSize();

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const onResize = () => {
      setSize();
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("resize", onResize);

    const draw = () => {
      // Push current position
      trail.push({ x: mouseX, y: mouseY, alpha: 1 });
      if (trail.length > TRAIL_LENGTH) trail.shift();

      // Fade all trail points
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      trail.forEach((point, index) => {
        const progress = index / TRAIL_LENGTH;
        const radius = progress * 10 + 2;
        const alpha = progress * 0.6;

        const gradient = ctx.createRadialGradient(
          point.x,
          point.y,
          0,
          point.x,
          point.y,
          radius
        );
        gradient.addColorStop(0, `rgba(56, 189, 248, ${alpha})`);
        gradient.addColorStop(0.5, `rgba(96, 165, 250, ${alpha * 0.5})`);
        gradient.addColorStop(1, "rgba(56, 189, 248, 0)");

        ctx.beginPath();
        ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      // Bright center dot at current position
      if (mouseX > -900) {
        const dotGradient = ctx.createRadialGradient(
          mouseX,
          mouseY,
          0,
          mouseX,
          mouseY,
          6
        );
        dotGradient.addColorStop(0, "rgba(255, 255, 255, 0.9)");
        dotGradient.addColorStop(0.4, "rgba(56, 189, 248, 0.6)");
        dotGradient.addColorStop(1, "rgba(56, 189, 248, 0)");

        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 6, 0, Math.PI * 2);
        ctx.fillStyle = dotGradient;
        ctx.fill();
      }

      rafId = requestAnimationFrame(draw);
    };

    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion || isTouchOnly.current) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1,
        pointerEvents: "none",
        mixBlendMode: "screen",
      }}
      aria-hidden="true"
    />
  );
}
