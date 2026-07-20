import { useEffect, useRef } from "react";

export function useScrollProgress(): number {
  const scrollProgress = useRef(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress.current = docHeight > 0 ? scrollTop / docHeight : 0;
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return scrollProgress.current;
}
