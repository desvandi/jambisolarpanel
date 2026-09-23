"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, BookMarked, Check, Link2, Search, X } from "lucide-react";
import type { GlossaryCategory, GlossaryTerm } from "@/lib/glossary";
import { groupByFirstLetter } from "@/lib/glossary";

const CATEGORY_STYLES: Record<GlossaryCategory, string> = {
  "Konsep Dasar": "bg-solar/10 text-solar border border-solar/20",
  "Komponen PLTS":
    "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20",
  "Biaya & Investasi": "bg-gold/10 text-gold-light dark:text-gold border border-gold/20",
  "Produk & Layanan": "bg-foreground/5 text-foreground/80 border border-foreground/10",
};

const CATEGORY_ORDER: (GlossaryCategory | "Semua")[] = [
  "Semua",
  "Konsep Dasar",
  "Komponen PLTS",
  "Biaya & Investasi",
  "Produk & Layanan",
];

/**
 * Pencarian + filter kategori + navigasi huruf untuk Kamus Istilah PLTS.
 * Client-side filtering — seluruh kartu istilah tetap ter-render
 * di HTML awal (SEO-friendly), filter hanya menyembunyikan.
 */
export function GlossaryExplorer({ terms }: { terms: GlossaryTerm[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<GlossaryCategory | "Semua">("Semua");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  /** Salin URL istilah (dengan anchor) untuk dibagikan. */
  const copyTermLink = async (id: string) => {
    try {
      const url = `${window.location.origin}/istilah-plts#${id}`;
      await navigator.clipboard.writeText(url);
      setCopiedId(id);
      window.setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // Clipboard API tidak tersedia — tidak fatal, cukup abaikan
    }
  };

  const counts = useMemo(() => {
    const seen = new Map<GlossaryCategory, number>();
    terms.forEach((t) => seen.set(t.category, (seen.get(t.category) ?? 0) + 1));
    return seen;
  }, [terms]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return terms.filter((t) => {
      const matchCategory = category === "Semua" || t.category === category;
      const matchQuery =
        q === "" ||
        t.term.toLowerCase().includes(q) ||
        t.definition.toLowerCase().includes(q);
      return matchCategory && matchQuery;
    });
  }, [terms, query, category]);

  const groups = useMemo(() => groupByFirstLetter(filtered), [filtered]);
  const availableLetters = new Set(groups.map((g) => g.letter));

  return (
    <div>
      {/* Search + filter toolbar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-card border border-border shadow-sm mb-8 space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari istilah — contoh: kWp, baterai, ROI…"
            aria-label="Cari istilah"
            className="w-full pl-11 pr-11 py-3 rounded-xl bg-background border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-solar/50 focus:border-solar transition-all"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              aria-label="Hapus pencarian"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Category chips */}
        <div className="flex flex-wrap items-center gap-2">
          {CATEGORY_ORDER.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              data-selected={category === cat}
              className="wizard-option px-4 py-1.5 rounded-full border border-border bg-background text-xs font-semibold text-muted-foreground data-[selected=true]:border-solar data-[selected=true]:text-solar"
            >
              {cat}
              {cat === "Semua" ? (
                <span className="ml-1.5 opacity-70">({terms.length})</span>
              ) : (
                <span className="ml-1.5 opacity-70">({counts.get(cat) ?? 0})</span>
              )}
            </button>
          ))}
        </div>

        {/* Result count */}
        <p className="text-xs text-muted-foreground flex items-center gap-1.5">
          <BookMarked className="w-3.5 h-3.5 text-solar" />
          Menampilkan <strong className="text-foreground">{filtered.length}</strong> dari{" "}
          {terms.length} istilah
        </p>
      </div>

      {/* Alphabet jump nav */}
      <nav
        aria-label="Navigasi huruf"
        className="flex flex-wrap gap-1 mb-8 p-2 rounded-xl bg-muted/40 border border-border"
      >
        {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => {
          const available = availableLetters.has(letter);
          return (
            <a
              key={letter}
              href={`#huruf-${letter}`}
              aria-disabled={!available}
              onClick={(e) => {
                if (!available) {
                  e.preventDefault();
                  return;
                }
                e.preventDefault();
                document
                  .getElementById(`huruf-${letter}`)
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className={`w-7 h-7 flex items-center justify-center rounded-md text-xs font-bold transition-all ${
                available
                  ? "text-foreground/80 hover:bg-solar hover:text-white hover:scale-110"
                  : "text-muted-foreground/30 cursor-not-allowed"
              }`}
            >
              {letter}
            </a>
          );
        })}
      </nav>

      {/* Letter groups */}
      {groups.length > 0 ? (
        <div className="space-y-10">
          {groups.map((group) => (
            <section
              key={group.letter}
              id={`huruf-${group.letter}`}
              className="scroll-mt-32 md:scroll-mt-36"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="term-letter-badge">{group.letter}</span>
                <span className="h-px flex-1 bg-gradient-to-r from-border via-border/40 to-transparent" />
                <span className="text-xs text-muted-foreground">
                  {group.terms.length} istilah
                </span>
              </div>
              <dl className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {group.terms.map((t) => (
                  <div
                    key={t.id}
                    id={t.id}
                    className="term-card group scroll-mt-32 md:scroll-mt-36"
                  >
                    <dt className="flex items-center justify-between gap-3 mb-2">
                      <h3 className="text-base font-bold text-navy dark:text-white group-hover:text-solar transition-colors">
                        {t.term}
                      </h3>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => copyTermLink(t.id)}
                          aria-label={`Salin tautan istilah ${t.term}`}
                          title="Salin tautan istilah ini"
                          className="w-7 h-7 flex items-center justify-center rounded-lg text-muted-foreground/60 hover:text-solar hover:bg-solar/10 transition-all"
                        >
                          {copiedId === t.id ? (
                            <Check className="w-3.5 h-3.5 text-solar" />
                          ) : (
                            <Link2 className="w-3.5 h-3.5" />
                          )}
                        </button>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-semibold whitespace-nowrap ${
                            CATEGORY_STYLES[t.category] ??
                            "bg-solar/10 text-solar border border-solar/20"
                          }`}
                        >
                          {t.category}
                        </span>
                      </div>
                    </dt>
                    <dd>
                      <p className="text-sm text-foreground/90 leading-relaxed mb-3">
                        {t.definition}
                      </p>
                      {t.related.length > 0 && (
                        <div className="flex flex-wrap gap-x-4 gap-y-1.5 pt-2 border-t border-border/60">
                          {t.related.map((link) => (
                            <Link
                              key={link.href + link.label}
                              href={link.href}
                              className="glossary-related-link"
                            >
                              <ArrowUpRight className="w-3 h-3" />
                              {link.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-4 rounded-2xl border border-dashed border-border">
          <Search className="w-10 h-10 text-muted-foreground/40 mx-auto mb-4" />
          <p className="font-semibold text-navy dark:text-white mb-1">
            Istilah tidak ditemukan
          </p>
          <p className="text-sm text-muted-foreground mb-6">
            Coba kata kunci lain atau pilih kategori &quot;Semua&quot;.
          </p>
          <button
            onClick={() => {
              setQuery("");
              setCategory("Semua");
            }}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-solar/10 hover:bg-solar/20 text-solar font-semibold text-sm rounded-full transition-colors"
          >
            <X className="w-4 h-4" />
            Reset pencarian
          </button>
        </div>
      )}
    </div>
  );
}
