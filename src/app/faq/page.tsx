import type { Metadata } from "next";
import Link from "next/link";
import { MessageCircle, BookOpen, Calculator, HelpCircle } from "lucide-react";
import { SitePageLayout } from "@/components/site/SitePageLayout";
import { FaqCategoryPanels } from "@/components/faq/FaqCategoryPanels";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import { faqCategories, allFaqItems } from "@/lib/faq";

export const metadata: Metadata = buildMetadata({
  path: "/faq",
  title: "FAQ Panel Surya & PLTS — Pertanyaan yang Sering Diajukan | JMSE",
  description:
    "Jawaban lengkap seputar panel surya & PLTS di Jambi: biaya pasang, ROI, hybrid vs off-grid, baterai, garansi, area layanan, dan skema Sewa PLTS. Ditulis tim teknis Jambi Solar Panel.",
  ogImageAlt: "FAQ panel surya dan PLTS — Jambi Solar Panel",
});

/**
 * Halaman FAQ terkategorisasi.
 * FAQPage JSON-LD dibangun dari allFaqItems — sumber yang sama
 * dengan seluruh accordion yang terlihat di halaman ini.
 * (Homepage mempertahankan FAQPage JSON-LD miliknya sendiri
 * karena konten FAQ juga tampil di sana.)
 */
export default function FaqPage() {
  return (
    <SitePageLayout
      title={
        <>
          Pertanyaan yang{" "}
          <span className="gradient-text">Sering Diajukan</span>
        </>
      }
      description={`Kumpulan jawaban seputar biaya, teknis sistem, proses layanan, dan skema sewa PLTS — ${allFaqItems.length} pertanyaan yang paling sering kami terima.`}
      breadcrumbs={[{ label: "FAQ" }]}
    >
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "FAQ", path: "/faq" },
        ])}
      />
      <JsonLd data={faqJsonLd(allFaqItems)} />

      <section className="py-14 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FaqCategoryPanels categories={faqCategories} />

          {/* CTA bawah */}
          <div className="mt-16 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-solar/10 via-card to-gold/10 border border-solar/20">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 justify-between">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-solar/15 border border-solar/25 flex items-center justify-center shrink-0">
                  <HelpCircle className="w-5 h-5 text-solar" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-navy dark:text-white">
                    Tidak menemukan jawaban Anda?
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-1 max-w-md">
                    Tanyakan langsung ke tim teknis kami — survei dan konsultasi
                    gratis, tanpa kewajiban memesan.
                  </p>
                </div>
              </div>
              <a
                href="https://wa.me/6281328190707?text=Halo%20PT.%20Jaya%20Mandiri%20Smart%20Energy%2C%20saya%20mempunyai%20pertanyaan%20tentang%20PLTS%20yang%20belum%20terjawab%20di%20halaman%20FAQ"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-solar hover:bg-solar-dark text-white font-bold text-sm rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-solar/30 hover:-translate-y-0.5 flex-shrink-0"
              >
                <MessageCircle className="w-5 h-5" />
                Tanya via WhatsApp
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6 pt-6 border-t border-solar/15">
              <Link
                href="/artikel"
                className="group flex items-center gap-3 p-4 rounded-xl bg-card/70 border border-border hover:border-solar/30 transition-all duration-200"
              >
                <BookOpen className="w-5 h-5 text-solar shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-navy dark:text-white group-hover:text-solar transition-colors">
                    Baca Artikel &amp; Panduan
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    13 artikel teknis &amp; panduan biaya PLTS
                  </p>
                </div>
              </Link>
              <Link
                href="/harga-panel-surya-jambi"
                className="group flex items-center gap-3 p-4 rounded-xl bg-card/70 border border-border hover:border-solar/30 transition-all duration-200"
              >
                <Calculator className="w-5 h-5 text-solar shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-navy dark:text-white group-hover:text-solar transition-colors">
                    Lihat Harga Paket PLTS
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Daftar harga 1,3–20,8 kWp, transparan &amp; siap cetak
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SitePageLayout>
  );
}
