"use client";

import { useEffect, useState } from "react";
import { ListTree, ChevronDown } from "lucide-react";
import type { TocHeading } from "@/lib/anchor";

/**
 * Daftar Isi artikel dengan scrollspy.
 * variant="mobile"  → panel collapsible di atas konten (< xl)
 * variant="desktop" → sticky di samping konten (xl+)
 * Scrollspy via IntersectionObserver — aktif hanya setelah mount
 * agar SSR tetap bersih (no hydration mismatch).
 */
export function ArticleToc({
  headings,
  variant = "desktop",
}: {
  headings: TocHeading[];
  variant?: "mobile" | "desktop";
}) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pilih entry teratas yang sedang melintasi viewport
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: [0, 1] }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 2) return null;

  const list = (
    <ol className="space-y-1.5">
      {headings.map(({ id, text }) => (
        <li key={id}>
          <a
            href={`#${id}`}
            data-active={activeId === id}
            className="toc-item block text-sm text-muted-foreground hover:text-foreground pl-3 leading-snug py-0.5"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById(id)
                ?.scrollIntoView({ behavior: "smooth", block: "start" });
              setOpen(false);
            }}
          >
            {text}
          </a>
        </li>
      ))}
    </ol>
  );

  return (
    <nav aria-label="Daftar isi artikel">
      {variant === "desktop" ? (
        /* Desktop sticky */
        <div className="hidden xl:block sticky top-24 p-5 rounded-2xl bg-card border border-border">
          <p className="flex items-center gap-2 text-sm font-bold text-navy dark:text-white mb-4 pb-3 border-b border-border">
            <ListTree className="w-4 h-4 text-solar" />
            Daftar Isi
          </p>
          {list}
        </div>
      ) : (
        /* Mobile collapsible */
        <div className="xl:hidden rounded-2xl bg-card border border-border mb-8 overflow-hidden">
          <button
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="w-full flex items-center justify-between gap-2 p-4 text-sm font-bold text-navy dark:text-white"
          >
            <span className="flex items-center gap-2">
              <ListTree className="w-4 h-4 text-solar" />
              Daftar Isi ({headings.length} bagian)
            </span>
            <ChevronDown
              className={`w-4 h-4 text-muted-foreground transition-transform duration-300 ${
                open ? "rotate-180" : ""
              }`}
            />
          </button>
          <div
            className={`grid transition-all duration-300 ease-out ${
              open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              <div className="px-4 pb-4 pt-1 border-t border-border">{list}</div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
