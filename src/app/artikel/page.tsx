import type { Metadata } from "next";
import Link from "next/link";
import { BookMarked, ArrowRight } from "lucide-react";
import { SitePageLayout } from "@/components/site/SitePageLayout";
import { ArticleExplorer } from "@/components/artikel/ArticleExplorer";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { articles, formatDateId } from "@/content/articles";
import { glossaryTerms } from "@/lib/glossary";

export const metadata: Metadata = buildMetadata({
  path: "/artikel",
  title: "Artikel & Panduan Panel Surya Jambi | Jambi Solar Panel",
  description:
    "Panduan lengkap seputar panel surya & PLTS: harga, biaya pasang, cara hitung kapasitas, baterai, perawatan, dan potensi energi surya di Jambi. Ditulis oleh engineer PLTS.",
  ogImageAlt: "Artikel & panduan panel surya — Jambi Solar Panel",
});

export default function ArtikelIndexPage() {
  // Data kartu di-passing ke client explorer — semua link tetap ada di HTML awal
  const explorerArticles = articles.map((a) => ({
    slug: a.slug,
    title: a.title,
    description: a.description,
    category: a.category,
    date: a.date,
    dateLabel: formatDateId(a.date),
    readingMinutes: a.readingMinutes,
  }));

  return (
    <SitePageLayout
      title={
        <>
          Artikel &amp; Panduan{" "}
          <span className="gradient-text">Panel Surya</span>
        </>
      }
      description="Panduan praktis seputar PLTS (pembangkit listrik tenaga surya) — dari biaya pasang, cara menghitung kapasitas, hingga perawatan — ditulis berdasarkan pengalaman teknis tim Jambi Solar Panel."
      breadcrumbs={[{ label: "Artikel" }]}
    >
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Artikel", path: "/artikel" },
        ])}
      />

      <section className="py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ArticleExplorer articles={explorerArticles} />

          {/* Kamus istilah — cross-link hub internal */}
          <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-solar/10 via-card to-gold/5 border border-solar/20 card-glow">
            <p className="eyebrow-label mb-2">Glosarium</p>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-navy dark:text-white mb-1">
                  Baru mengenal istilah PLTS?
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {glossaryTerms.length} istilah panel surya &amp; PLTS dijelaskan
                  sederhana — dari kWp dan PSH hingga DoD baterai — dengan angka riil
                  wilayah Jambi.
                </p>
              </div>
              <Link
                href="/istilah-plts"
                className="btn-shine inline-flex items-center gap-2 px-6 py-3 rounded-full bg-solar text-white font-semibold text-sm hover:shadow-lg hover:shadow-solar/25 transition-all whitespace-nowrap flex-shrink-0"
              >
                <BookMarked className="w-4 h-4" />
                Buka Kamus Istilah
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SitePageLayout>
  );
}
