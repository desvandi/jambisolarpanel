"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Clock, Search, BookOpen, X } from "lucide-react";
import type { ArticleCategory } from "@/content/articles/types";

export interface ExplorerArticle {
  slug: string;
  title: string;
  description: string;
  category: ArticleCategory;
  date: string;
  dateLabel: string;
  readingMinutes: number;
}

const CATEGORY_STYLES: Record<ArticleCategory, string> = {
  "Biaya & Harga": "bg-gold/10 text-gold-light dark:text-gold border border-gold/20",
  "Panduan Teknis": "bg-solar/10 text-solar border border-solar/20",
  "Energi Surya Jambi": "bg-foreground/5 text-foreground/80 border border-foreground/10",
  "Kebun & Perkebunan": "bg-solar/10 text-solar-dark dark:text-solar-light border border-solar/20",
};

/**
 * Pencarian + filter kategori untuk index artikel.
 * Client-side filtering — seluruh kartu artikel tetap
 * ter-render di HTML awal (SEO-friendly), filter hanya menyembunyikan.
 */
export function ArticleExplorer({ articles }: { articles: ExplorerArticle[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ArticleCategory | "Semua">("Semua");

  const categories = useMemo(() => {
    const seen = new Map<ArticleCategory, number>();
    articles.forEach((a) => seen.set(a.category, (seen.get(a.category) ?? 0) + 1));
    return [...seen.entries()];
  }, [articles]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return articles.filter((a) => {
      const matchCategory = category === "Semua" || a.category === category;
      const matchQuery =
        q === "" ||
        a.title.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q);
      return matchCategory && matchQuery;
    });
  }, [articles, query, category]);

  return (
    <div>
      {/* Search + filter toolbar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-card border border-border shadow-sm mb-10 space-y-4">
        {/* Search input */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari artikel — contoh: harga, baterai, solar pump…"
            aria-label="Cari artikel"
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
          <button
            onClick={() => setCategory("Semua")}
            data-selected={category === "Semua"}
            className="wizard-option px-4 py-1.5 rounded-full border border-border bg-background text-xs font-semibold text-muted-foreground data-[selected=true]:border-solar data-[selected=true]:text-solar"
          >
            Semua ({articles.length})
          </button>
          {categories.map(([cat, count]) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              data-selected={category === cat}
              className="wizard-option px-4 py-1.5 rounded-full border border-border bg-background text-xs font-semibold text-muted-foreground data-[selected=true]:border-solar data-[selected=true]:text-solar"
            >
              {cat} ({count})
            </button>
          ))}
        </div>

        {/* Result count */}
        <p className="text-xs text-muted-foreground flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5 text-solar" />
          Menampilkan <strong className="text-foreground">{filtered.length}</strong> dari{" "}
          {articles.length} artikel
        </p>
      </div>

      {/* Results */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((article) => (
            <Link
              key={article.slug}
              href={`/artikel/${article.slug}`}
              className="group flex flex-col p-6 rounded-2xl bg-card border border-border hover:border-solar/30 hover:shadow-xl hover:shadow-solar/5 hover-lift transition-all duration-300"
            >
              <div className="flex items-center gap-2 mb-3">
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                    CATEGORY_STYLES[article.category] ??
                    "bg-solar/10 text-solar border border-solar/20"
                  }`}
                >
                  {article.category}
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  {article.readingMinutes} menit
                </span>
              </div>
              <h3 className="text-lg font-bold text-navy dark:text-white leading-snug mb-3 group-hover:text-solar transition-colors">
                {article.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                {article.description}
              </p>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{article.dateLabel}</span>
                <span className="inline-flex items-center gap-1 font-semibold text-solar group-hover:gap-2 transition-all">
                  Baca <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-4 rounded-2xl border border-dashed border-border">
          <Search className="w-10 h-10 text-muted-foreground/40 mx-auto mb-4" />
          <p className="font-semibold text-navy dark:text-white mb-1">
            Tidak ada artikel yang cocok
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
