"use client";

import {
  SearchCheck,
  DraftingCompass,
  CalendarCheck,
  Wrench,
  ClipboardCheck,
  MonitorSmartphone,
} from "lucide-react";
import { installationSteps } from "@/lib/process";
import { howToJsonLd } from "@/lib/seo";

const iconMap = {
  search: SearchCheck,
  drafting: DraftingCompass,
  calendar: CalendarCheck,
  wrench: Wrench,
  check: ClipboardCheck,
  monitor: MonitorSmartphone,
} as const;

/**
 * Timeline proses instalasi — dirender di semua halaman layanan
 * (via ServicePageLayout). Client component TAPI tetap di-prerender
 * server-side, sehingga HowTo JSON-LD hadir di HTML awal (SEO-safe).
 */
export function ProcessTimeline() {
  return (
    <section
      id="proses-instalasi"
      aria-labelledby="proses-instalasi-heading"
      className="py-16 md:py-24 bg-muted/30 border-y border-border/60"
    >
      {/* HowTo structured data — prerendered dalam HTML awal */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            howToJsonLd(
              installationSteps.map((s) => ({ name: s.name, text: s.text }))
            )
          ),
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="section-badge">Alur Kerja</span>
          <h2
            id="proses-instalasi-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy dark:text-white mb-4"
          >
            Proses Instalasi yang <span className="gradient-text">Jelas & Terukur</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Dari survei gratis hingga monitoring jangka panjang — setiap tahap
            Anda ketahui sejak awal, tanpa proses yang mengambang.
          </p>
        </div>

        {/* Timeline */}
        <ol className="relative max-w-3xl mx-auto">
          {/* Garis vertikal penghubung */}
          <span
            aria-hidden="true"
            className="absolute left-6 sm:left-1/2 top-2 bottom-2 w-px sm:-translate-x-1/2 bg-gradient-to-b from-solar/50 via-solar/25 to-transparent"
          />

          {installationSteps.map((step, i) => {
            const Icon = iconMap[step.icon];
            const isEven = i % 2 === 0;
            return (
              <li
                key={step.name}
                className={`relative flex items-start gap-4 sm:gap-0 sm:items-center mb-8 last:mb-0 ${
                  isEven ? "sm:flex-row" : "sm:flex-row-reverse"
                }`}
              >
                {/* Nomor + ikon */}
                <div className="relative z-10 flex-shrink-0 sm:absolute sm:left-1/2 sm:-translate-x-1/2">
                  <div className="timeline-dot w-12 h-12 rounded-full bg-solar text-white flex items-center justify-center shadow-lg shadow-solar/30 ring-4 ring-background">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-navy dark:bg-white text-white dark:text-navy text-xs font-bold flex items-center justify-center border-2 border-background">
                    {i + 1}
                  </span>
                </div>

                {/* Kartu langkah */}
                <div
                  className={`flex-1 sm:w-1/2 ${
                    isEven ? "sm:pr-16 sm:text-right" : "sm:pl-16"
                  } stagger-item`}
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  <div className="rounded-2xl border border-border bg-card p-5 hover-lift">
                    <div
                      className={`flex items-center gap-2 mb-2 ${
                        isEven ? "sm:justify-end" : ""
                      }`}
                    >
                      <h3 className="font-bold text-navy dark:text-white text-base leading-snug">
                        {step.name}
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {step.short}
                    </p>
                    <div
                      className={`mt-3 flex items-center gap-1.5 ${
                        isEven ? "sm:justify-end" : ""
                      }`}
                    >
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-solar/10 text-solar text-xs font-semibold">
                        {step.duration}
                      </span>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
