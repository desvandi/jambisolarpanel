import type { Metadata } from "next";
import { SitePageLayout } from "@/components/site/SitePageLayout";
import { ArticleExplorer } from "@/components/artikel/ArticleExplorer";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { articles, formatDateId } from "@/content/articles";

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
        </div>
      </section>
    </SitePageLayout>
  );
}
