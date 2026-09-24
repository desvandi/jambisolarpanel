"use client";

import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  /** Nilai akhir yang ditampilkan. */
  value: number;
  /** Suffix tampilan, mis. " kWp" atau " segmen". */
  suffix?: string;
  /** Jumlah desimal (mengikuti format id-ID: koma). */
  decimals?: number;
  /** Durasi animasi (ms). */
  duration?: number;
  className?: string;
}

/**
 * Angka yang menghitung naik saat pertama kali masuk viewport.
 * - IntersectionObserver sekali jalan (once) — hemat & deterministik.
 * - prefers-reduced-motion: tanpa animasi, langsung nilai akhir.
 * - SSR aman: sebelum animasi berjalan, nilai akhir yang dirender
 *   (state `animated` hanya diisi dari callback requestAnimationFrame).
 */
export function CountUp({
  value,
  suffix = "",
  decimals = 0,
  duration = 1200,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  // `null` = belum beranimasi → tampilkan nilai akhir apa adanya.
  const [animated, setAnimated] = useState<number | null>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return; // langsung nilai akhir (animated tetap null)

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting || started.current) return;
        started.current = true;
        observer.disconnect();

        const t0 = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - t0) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
          setAnimated(value * eased);
          if (p < 1) requestAnimationFrame(tick);
          else setAnimated(value);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration]);

  const shown = animated ?? value;

  return (
    <span ref={ref} className={className}>
      {shown.toLocaleString("id-ID", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}
