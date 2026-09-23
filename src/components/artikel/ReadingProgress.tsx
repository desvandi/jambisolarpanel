"use client";

import { useEffect, useState } from "react";

/**
 * Progress bar membaca — strip tipis di bawah navbar yang
 * menunjukkan sejauh mana artikel sudah dibaca.
 */
export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.querySelector("article");
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight * 0.6;
      const read = Math.min(
        Math.max(-rect.top + window.innerHeight * 0.4, 0),
        Math.max(total, 1)
      );
      setProgress(Math.round((read / Math.max(total, 1)) * 100));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed top-16 md:top-20 left-0 right-0 z-40 h-0.5 bg-transparent pointer-events-none"
    >
      <div
        className="reading-progress h-full"
        style={{ transform: `scaleX(${progress / 100})` }}
      />
    </div>
  );
}
