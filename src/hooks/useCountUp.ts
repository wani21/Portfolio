import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface UseCountUpOptions {
  target: number;
  suffix?: string;
  decimals?: number;
  duration?: number; // ms
}

export function useCountUp({
  target,
  suffix = "",
  decimals = 0,
  duration = 1800,
}: UseCountUpOptions): string {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const hasStarted = useRef(false);

  useEffect(() => {
    if (!isInView || hasStarted.current) return;
    hasStarted.current = true;

    const startTime = performance.now();
    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(parseFloat((eased * target).toFixed(decimals)));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, target, duration, decimals]);

  const display = decimals > 0 ? count.toFixed(decimals) : Math.round(count).toString();
  return `${display}${suffix}`;
}

// Hook returns both the formatted string and the ref to attach to the element
export function useCountUpWithRef(options: UseCountUpOptions) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);
  const hasStarted = useRef(false);
  const { target, suffix = "", decimals = 0, duration = 1800 } = options;

  useEffect(() => {
    if (!isInView || hasStarted.current) return;
    hasStarted.current = true;

    const startTime = performance.now();
    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(parseFloat((eased * target).toFixed(decimals)));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, target, duration, decimals]);

  const display = decimals > 0 ? count.toFixed(decimals) : Math.round(count).toString();
  return { value: `${display}${suffix}`, ref };
}
