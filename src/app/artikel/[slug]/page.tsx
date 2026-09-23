import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, Calendar, CheckCircle } from "lucide-react";
import { notFound } from "next/navigation";
import { SitePageLayout } from "@/components/site/SitePageLayout";
import { ArticleBlocks } from "@/components/artikel/ArticleBlocks";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  buildMetadata,
  breadcrumbJsonLd,
  articleJsonLd,
} from "@/lib/seo";
import {
  articles,
  getArticleBySlug,
  getRelatedArticles,
  formatDateId,
} from "@/content/articles";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) {
    return buildMetadata({
      path: `/artikel/${slug}`,
      title: "Artikel tidak ditemukan | Jambi Solar Panel",
      description: "Artikel yang Anda cari tidak ditemukan.",
      noIndex: true,
    });
  }
  return buildMetadata({
    path: `/artikel/${article.slug}`,
    title: `${article.title} | Jambi Solar Panel`,
    description: article.description,
    ogType: "article",
    ogImageAlt: article.title,
  });
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const related = getRelatedArticles(article);

  return (
    <SitePageLayout
      title={article.title}
      breadcrumbs={[
        { label: "Artikel", href: "/artikel" },
      ]}
    >
      <JsonLd
        data={articleJsonLd({
          title: article.title,
          description: article.description,
          path: `/artikel/${article.slug}`,
          datePublished: article.date,
          dateModified: article.updated,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Artikel", path: "/artikel" },
          { name: article.title, path: `/artikel/${article.slug}` },
        ])}
      />

      <article className="py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 mb-8 text-sm text-muted-foreground">
            <span className="px-2.5 py-0.5 rounded-full bg-solar/10 text-solar text-xs font-semibold">
              {article.category}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {formatDateId(article.date)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {article.readingMinutes} menit baca
            </span>
          </div>

          {/* Key takeaways */}
          <div className="p-5 sm:p-6 rounded-2xl bg-solar/5 border border-solar/20 mb-10">
            <p className="font-bold text-navy dark:text-white mb-3">
              Poin Penting
            </p>
            <ul className="space-y-2">
              {article.keyTakeaways.map((point, i) => (
                <li key={i} className="flex gap-2.5 text-sm text-foreground/90 leading-relaxed">
                  <CheckCircle className="w-4 h-4 text-solar flex-shrink-0 mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Konten */}
          <ArticleBlocks blocks={article.blocks} />

          {/* Penulis & CTA */}
          <div className="mt-12 p-6 rounded-2xl bg-card border border-border flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
            <div>
              <p className="font-bold text-navy dark:text-white">
                Ditulis oleh Tim Teknis Jambi Solar Panel
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                PT. Jaya Mandiri Smart Energy — penyedia jasa instalasi PLTS di
                Jambi, Sumatera &amp; Jawa Bagian Barat.{" "}
                <Link href="/tentang-kami" className="text-solar hover:underline underline-offset-2">
                  Tentang kami
                </Link>
              </p>
            </div>
            <a
              href="https://wa.me/6281328190707?text=Halo%20PT.%20Jaya%20Mandiri%20Smart%20Energy%2C%20saya%20baru%20saja%20membaca%20artikel%20di%20website%20anda%20dan%20ingin%20konsultasi%20tentang%20PLTS"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-solar hover:bg-solar-dark text-white font-semibold text-sm rounded-full transition-colors flex-shrink-0"
            >
              Konsultasi Gratis
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </article>

      {/* Artikel terkait */}
      {related.length > 0 ? (
        <section className="pb-16 md:pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl sm:text-2xl font-bold text-navy dark:text-white mb-6">
              Artikel Terkait
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/artikel/${rel.slug}`}
                  className="group p-6 rounded-2xl bg-card border border-border hover:border-solar/30 hover:shadow-lg transition-all duration-300"
                >
                  <span className="px-2.5 py-0.5 rounded-full bg-solar/10 text-solar text-xs font-semibold mb-3 inline-block">
                    {rel.category}
                  </span>
                  <h3 className="font-bold text-navy dark:text-white leading-snug mb-2 group-hover:text-solar transition-colors">
                    {rel.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {rel.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </SitePageLayout>
  );
}
