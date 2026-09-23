import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, BookOpen } from "lucide-react";
import { SitePageLayout } from "@/components/site/SitePageLayout";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { articles, formatDateId } from "@/content/articles";
import type { ArticleCategory } from "@/content/articles";

export const metadata: Metadata = buildMetadata({
  path: "/artikel",
  title: "Artikel & Panduan Panel Surya Jambi | Jambi Solar Panel",
  description:
    "Panduan lengkap seputar panel surya & PLTS: harga, biaya pasang, cara hitung kapasitas, baterai, perawatan, dan potensi energi surya di Jambi. Ditulis oleh engineer PLTS.",
  ogImageAlt: "Artikel & panduan panel surya — Jambi Solar Panel",
});

const categoryOrder: ArticleCategory[] = [
  "Biaya & Harga",
  "Panduan Teknis",
  "Energi Surya Jambi",
  "Kebun & Perkebunan",
];

export default function ArtikelIndexPage() {
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          {categoryOrder.map((category) => {
            const items = articles.filter((a) => a.category === category);
            if (items.length === 0) return null;
            return (
              <div key={category}>
                <div className="flex items-center gap-3 mb-6">
                  <BookOpen className="w-5 h-5 text-solar" />
                  <h2 className="text-xl sm:text-2xl font-bold text-navy dark:text-white">
                    {category}
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-solar/10 text-solar text-xs font-semibold">
                    {items.length} artikel
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {items.map((article) => (
                    <Link
                      key={article.slug}
                      href={`/artikel/${article.slug}`}
                      className="group flex flex-col p-6 rounded-2xl bg-card border border-border hover:border-solar/30 hover:shadow-xl hover:shadow-solar/5 transition-all duration-300"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-2.5 py-0.5 rounded-full bg-solar/10 text-solar text-xs font-semibold">
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
                        <span>{formatDateId(article.date)}</span>
                        <span className="inline-flex items-center gap-1 font-semibold text-solar group-hover:gap-2 transition-all">
                          Baca <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </SitePageLayout>
  );
}
