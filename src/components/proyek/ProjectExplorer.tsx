"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  MapPin,
  Zap,
  TrendingDown,
  LayoutGrid,
} from "lucide-react";

/**
 * Filter segmen untuk halaman /proyek.
 * Semua kartu dirender di HTML awal (server-rendered) agar
 * internal linking tetap ter-crawl — filter hanya menyembunyikan.
 */

export type ProjectSegment = "residential" | "agriculture" | "commercial";

export interface ProjectCardData {
  key: string;
  segment: ProjectSegment;
  /** true = studi kasus lengkap (punya halaman detail) */
  isCaseStudy: boolean;
  title: string;
  lokasi: string;
  kapasitasLabel: string;
  sistemLabel: string;
  summary?: string;
  hasilLabel: string;
  image?: string;
  imageAlt?: string;
  href?: string;
}

const SEGMENT_LABELS: Record<ProjectSegment, string> = {
  residential: "Rumah & Villa",
  agriculture: "Perkebunan",
  commercial: "Bisnis & Industri",
};

const segmentFilterOptions: { value: ProjectSegment | "all"; label: string }[] = [
  { value: "all", label: "Semua Proyek" },
  { value: "residential", label: "Rumah & Villa" },
  { value: "agriculture", label: "Perkebunan" },
  { value: "commercial", label: "Bisnis & Industri" },
];

export function ProjectExplorer({ projects }: { projects: ProjectCardData[] }) {
  const [active, setActive] = useState<ProjectSegment | "all">("all");

  const visible = useMemo(
    () =>
      active === "all"
        ? projects
        : projects.filter((p) => p.segment === active),
    [active, projects]
  );

  return (
    <div>
      {/* Filter chips */}
      <div
        role="group"
        aria-label="Filter proyek berdasarkan segmen"
        className="flex flex-wrap items-center gap-2 mb-4"
      >
        {segmentFilterOptions.map((opt) => {
          const count =
            opt.value === "all"
              ? projects.length
              : projects.filter((p) => p.segment === opt.value).length;
          const isActive = active === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActive(opt.value)}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solar focus-visible:ring-offset-2 ${
                isActive
                  ? "bg-solar text-white shadow-lg shadow-solar/30"
                  : "bg-card border border-border text-muted-foreground hover:border-solar/50 hover:text-foreground"
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              {opt.label}
              <span
                className={`text-xs font-bold px-1.5 py-0.5 rounded-full ${
                  isActive ? "bg-white/20" : "bg-muted"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Result count */}
      <p aria-live="polite" className="text-sm text-muted-foreground mb-6">
        Menampilkan{" "}
        <strong className="text-foreground">{visible.length}</strong> dari{" "}
        {projects.length} proyek
        {active !== "all" && (
          <>
            {" "}
            di segmen{" "}
            <strong className="text-solar">
              {SEGMENT_LABELS[active as ProjectSegment]}
            </strong>
          </>
        )}
      </p>

      {/* Grid — kartu selalu dirender penuh, disembunyikan via CSS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p) => {
          const shown = active === "all" || p.segment === active;
          return (
            <article
              key={p.key}
              data-segment={p.segment}
              className={`flex flex-col rounded-2xl overflow-hidden border border-border bg-card card-glow ${
                shown ? "flex" : "hidden"
              }`}
            >
              {p.isCaseStudy && p.href ? (
                // Kartu studi kasus — link ke halaman detail
                <Link
                  href={p.href}
                  className="group flex flex-col flex-1"
                >
                  <div className="relative aspect-[4/3]">
                    {p.image && (
                      <Image
                        src={p.image}
                        alt={p.imageAlt || p.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />
                    <span className="absolute top-3 left-3 px-3 py-1 bg-solar text-white text-xs font-semibold rounded-full">
                      {SEGMENT_LABELS[p.segment]}
                    </span>
                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="text-white font-bold text-lg leading-snug">
                        {p.title}
                      </h3>
                      <p className="text-white/70 text-sm flex items-center gap-1 mt-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {p.lokasi}
                      </p>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-solar/5 rounded-md text-xs font-medium text-solar">
                        <Zap className="w-3 h-3" />
                        {p.kapasitasLabel}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                      {p.summary}
                    </p>
                    <p className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-solar">
                      <TrendingDown className="w-4 h-4" />
                      {p.hasilLabel}
                    </p>
                    <span className="inline-flex items-center gap-1.5 mt-3 text-sm font-semibold text-solar group-hover:gap-2.5 transition-all">
                      Baca studi kasus lengkap{" "}
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              ) : (
                // Kartu proyek ringkas — dirangkum dari testimoni
                <div className="p-6 flex flex-col flex-1 hover-lift">
                  <span className="self-start px-3 py-1 bg-navy/5 dark:bg-white/10 text-navy dark:text-white text-xs font-semibold rounded-full mb-4">
                    {SEGMENT_LABELS[p.segment]}
                  </span>
                  <h3 className="font-bold text-navy dark:text-white text-base leading-snug mb-1">
                    {p.title}
                  </h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-1 mb-4">
                    <MapPin className="w-3.5 h-3.5" />
                    {p.lokasi}
                  </p>
                  <div className="mt-auto space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Sistem</span>
                      <span className="font-semibold text-navy dark:text-white">
                        {p.sistemLabel}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Hasil</span>
                      <span className="font-semibold text-solar flex items-center gap-1">
                        <TrendingDown className="w-3.5 h-3.5" />
                        {p.hasilLabel}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>

      {/* Empty state (seharusnya tidak terjadi — semua segmen berisi) */}
      {visible.length === 0 && (
        <div className="text-center py-16 rounded-2xl border border-dashed border-border">
          <p className="text-muted-foreground">
            Belum ada proyek di segmen ini.
          </p>
        </div>
      )}
    </div>
  );
}
