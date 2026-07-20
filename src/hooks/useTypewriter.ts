import { useEffect, useState } from "react";

interface UseTypewriterOptions {
  words: string[];
  typeSpeed?: number;   // ms per character while typing
  deleteSpeed?: number; // ms per character while deleting
  pauseMs?: number;     // pause at full word before deleting
}

export function useTypewriter({
  words,
  typeSpeed = 80,
  deleteSpeed = 45,
  pauseMs = 1600,
}: UseTypewriterOptions): string {
  const [displayText, setDisplayText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!words.length) return;

    const currentWord = words[wordIndex % words.length];

    if (isPaused) {
      const pause = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseMs);
      return () => clearTimeout(pause);
    }

    if (!isDeleting) {
      // Typing forward
      if (charIndex < currentWord.length) {
        const timeout = setTimeout(() => {
          setDisplayText(currentWord.slice(0, charIndex + 1));
          setCharIndex((c) => c + 1);
        }, typeSpeed);
        return () => clearTimeout(timeout);
      } else {
        // Word fully typed — pause before deleting
        setIsPaused(true);
      }
    } else {
      // Deleting backward
      if (charIndex > 0) {
        const timeout = setTimeout(() => {
          setDisplayText(currentWord.slice(0, charIndex - 1));
          setCharIndex((c) => c - 1);
        }, deleteSpeed);
        return () => clearTimeout(timeout);
      } else {
        // Fully deleted — advance to next word
        setIsDeleting(false);
        setWordIndex((w) => (w + 1) % words.length);
      }
    }
  }, [charIndex, isDeleting, isPaused, wordIndex, words, typeSpeed, deleteSpeed, pauseMs]);

  return displayText;
}
