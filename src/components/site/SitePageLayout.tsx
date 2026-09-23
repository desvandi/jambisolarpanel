import Link from "next/link";
import { Home, ChevronRight } from "lucide-react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import type { ReactNode } from "react";

interface SitePageLayoutProps {
  /** Judul halaman (H1). */
  title: ReactNode;
  /** Deskripsi singkat di bawah judul. */
  description?: ReactNode;
  /** Breadcrumb: [{label, href?}] — item terakhir otomatis adalah title. */
  breadcrumbs: { label: string; href?: string }[];
  children: ReactNode;
}

/**
 * Layout halaman konten (Artikel, Tentang Kami, Proyek, Harga).
 * Server component, sticky footer, navbar fixed dengan padding atas.
 */
export function SitePageLayout({
  title,
  description,
  breadcrumbs,
  children,
}: SitePageLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />

      <main id="main-content" className="flex-1">
        {/* Header */}
        <section className="relative pt-32 pb-14 md:pt-40 md:pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy/95 to-navy/90" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-solar/10 via-transparent to-transparent" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumbs */}
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-2 text-sm text-white/60 mb-6"
            >
              <Link href="/" className="hover:text-solar-light transition-colors flex items-center gap-1">
                <Home className="w-3.5 h-3.5" />
                <span className="sr-only">Home</span>
              </Link>
              {breadcrumbs.map((bc, i) => (
                <span key={i} className="flex items-center gap-2">
                  <ChevronRight className="w-3 h-3" />
                  {bc.href ? (
                    <Link href={bc.href} className="hover:text-solar-light transition-colors">
                      {bc.label}
                    </Link>
                  ) : (
                    <span className="text-white/80">{bc.label}</span>
                  )}
                </span>
              ))}
            </nav>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4 max-w-4xl">
              {title}
            </h1>
            {description ? (
              <p className="text-base sm:text-lg text-white/70 leading-relaxed max-w-3xl">
                {description}
              </p>
            ) : null}
          </div>
        </section>

        {children}
      </main>

      <Footer />
    </div>
  );
}
