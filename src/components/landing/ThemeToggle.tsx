"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-full bg-white/10 dark:bg-white/10 flex items-center justify-center">
        <Sun className="h-4 w-4 text-gold-light" />
      </div>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative w-9 h-9 rounded-full bg-white/10 dark:bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all duration-300"
      aria-label={isDark ? "Beralih ke mode terang" : "Beralih ke mode gelap"}
    >
      <Sun className="h-4 w-4 text-gold-light rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 text-gold-light rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </button>
  );
}
