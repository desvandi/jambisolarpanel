import type { Metadata } from "next";
import Link from "next/link";
import { Clock, Calendar, CheckCircle, BookMarked } from "lucide-react";
import { notFound } from "next/navigation";
import { SitePageLayout } from "@/components/site/SitePageLayout";
import { ArticleBlocks } from "@/components/artikel/ArticleBlocks";
import { ArticleToc } from "@/components/artikel/ArticleToc";
import { ArticleShare } from "@/components/artikel/ArticleShare";
import { ReadingProgress } from "@/components/artikel/ReadingProgress";
import { ArticleAuthorBox } from "@/components/artikel/ArticleAuthorBox";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildTocHeadings } from "@/lib/anchor";
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
import { ArrowLeft, ArrowRight, LayoutGrid } from "lucide-react";

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
  const tocHeadings = buildTocHeadings(
    article.blocks
      .filter((b): b is Extract<typeof b, { type: "h2" }> => b.type === "h2")
      .map((b) => b.text)
  );

  // Navigasi prev/next — urutan katalog artikel
  const currentIndex = articles.findIndex((a) => a.slug === article.slug);
  const prevArticle = currentIndex > 0 ? articles[currentIndex - 1] : null;
  const nextArticle =
    currentIndex >= 0 && currentIndex < articles.length - 1
      ? articles[currentIndex + 1]
      : null;

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

      <ReadingProgress />

      <article className="py-12 md:py-16">
        {/* Mobile ToC (collapsible) — di atas konten */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ArticleToc headings={tocHeadings} variant="mobile" />
        </div>

        {/* Grid: konten + ToC sticky (xl+) */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 xl:grid xl:grid-cols-[minmax(0,1fr)_260px] xl:gap-10">
          {/* Konten */}
          <div className="max-w-3xl mx-auto xl:mx-0">
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

            {/* Share */}
            <div className="mt-10 pt-6 border-t border-border">
              <ArticleShare title={article.title} />
            </div>

            {/* Link ke kamus istilah — internal linking */}
            <Link
              href="/istilah-plts"
              className="group mt-6 flex items-center justify-between gap-4 p-4 rounded-xl bg-muted/40 hover:bg-solar/10 border border-border hover:border-solar/30 transition-all"
            >
              <span className="flex items-center gap-3 text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                <BookMarked className="w-4 h-4 text-solar flex-shrink-0" />
                Ada istilah yang belum dikenal? Buka Kamus Istilah PLTS
              </span>
              <span className="text-solar font-semibold text-sm group-hover:translate-x-1 transition-transform flex-shrink-0">
                &rarr;
              </span>
            </Link>

            {/* Author box — E-E-A-T */}
            <ArticleAuthorBox />

            {/* Navigasi prev/next artikel */}
            {(prevArticle || nextArticle) && (
              <nav
                aria-label="Navigasi artikel"
                className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                {prevArticle ? (
                  <Link
                    href={`/artikel/${prevArticle.slug}`}
                    rel="prev"
                    className="prevnext-card group p-5 rounded-2xl bg-card border border-border text-left"
                  >
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground mb-2">
                      <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                      Artikel Sebelumnya
                    </span>
                    <span className="block font-bold text-navy dark:text-white leading-snug group-hover:text-solar transition-colors">
                      {prevArticle.title}
                    </span>
                    <span className="block text-xs text-muted-foreground mt-1.5">
                      {prevArticle.readingMinutes} menit baca
                    </span>
                  </Link>
                ) : (
                  <span className="hidden sm:block" aria-hidden="true" />
                )}
                {nextArticle ? (
                  <Link
                    href={`/artikel/${nextArticle.slug}`}
                    rel="next"
                    className="prevnext-card group p-5 rounded-2xl bg-card border border-border text-left sm:text-right"
                  >
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground mb-2 sm:justify-end">
                      Artikel Selanjutnya
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <span className="block font-bold text-navy dark:text-white leading-snug group-hover:text-solar transition-colors">
                      {nextArticle.title}
                    </span>
                    <span className="block text-xs text-muted-foreground mt-1.5">
                      {nextArticle.readingMinutes} menit baca
                    </span>
                  </Link>
                ) : null}
              </nav>
            )}

            {/* Kembali ke indeks */}
            <Link
              href="/artikel"
              className="group mt-4 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-solar transition-colors"
            >
              <LayoutGrid className="w-4 h-4" />
              Lihat semua artikel
            </Link>
          </div>

          {/* Desktop sticky ToC */}
          <aside className="hidden xl:block">
            <ArticleToc headings={tocHeadings} />
          </aside>
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
                  className="group p-6 rounded-2xl bg-card border border-border hover:border-solar/30 hover:shadow-lg hover:shadow-solar/5 hover-lift transition-all duration-300"
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
