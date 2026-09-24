import Link from "next/link";
import { BookMarked, ArrowRight } from "lucide-react";
import { glossaryTerms } from "@/lib/glossary";

/**
 * "Istilah Penting Layanan Ini" — chips menuju Kamus Istilah PLTS.
 *
 * Melengkapi hub-and-spoke internal linking: artikel sudah auto-link
 * (Round 6); komponen ini menambahkan arah layanan → kamus.
 * Dipakai di ServicePageLayout (termIds) dan halaman sewa-plts.
 *
 * SEO-safe: dirender server-side di HTML awal (client components
 * di-prerender Next.js), semua link <Link> crawlable.
 */
export function ServiceTermChips({ ids }: { ids: string[] }) {
  const terms = ids
    .map((id) => glossaryTerms.find((t) => t.id === id))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));

  if (terms.length === 0) return null;

  return (
    <section className="py-10 md:py-12 border-t border-border bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="flex items-center gap-2 text-xs font-bold text-solar uppercase tracking-wider mb-2">
              <BookMarked className="w-3.5 h-3.5" />
              Istilah Penting Layanan Ini
            </p>
            <div className="flex flex-wrap gap-2">
              {terms.map((t) => (
                <Link
                  key={t.id}
                  href={`/istilah-plts#${t.id}`}
                  className="term-chip"
                  title={`Lihat definisi: ${t.term}`}
                >
                  {t.term}
                </Link>
              ))}
            </div>
          </div>
          <Link
            href="/istilah-plts"
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-solar hover:underline underline-offset-2 flex-shrink-0"
          >
            Buka Kamus Istilah
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
