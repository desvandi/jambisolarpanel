import type { Metadata } from "next";
import Link from "next/link";
import { MessageCircle, Calculator, BookOpen, BookMarked } from "lucide-react";
import { SitePageLayout } from "@/components/site/SitePageLayout";
import { GlossaryExplorer } from "@/components/glossary/GlossaryExplorer";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata, breadcrumbJsonLd, glossaryJsonLd } from "@/lib/seo";
import { glossaryTerms, GLOSSARY_CATEGORIES } from "@/lib/glossary";

export const metadata: Metadata = buildMetadata({
  path: "/istilah-plts",
  title: "Kamus Istilah PLTS & Panel Surya | Jambi Solar Panel",
  description:
    "Glosarium istilah panel surya & PLTS dalam Bahasa Indonesia: kWp, kWh, PSH, inverter hybrid, baterai LiFePO4, DoD, ROI, PJUTS, solar pump — dengan penjelasan sederhana dan link panduan terkait.",
  ogImageAlt: "Kamus istilah PLTS dan panel surya — Jambi Solar Panel",
});

/**
 * Kamus Istilah PLTS — pusat internal-linking untuk long-tail query
 * "apa itu kWp", "PSH artinya", "DoD baterai", dll.
 * DefinedTermSet JSON-LD dibangun dari glossaryTerms — sumber yang sama
 * dengan seluruh kartu istilah yang terlihat di halaman ini.
 */
export default function IstilahPltsPage() {
  return (
    <SitePageLayout
      title={
        <>
          Kamus Istilah{" "}
          <span className="gradient-text">PLTS &amp; Panel Surya</span>
        </>
      }
      description={`Glosarium berbahasa Indonesia untuk istilah panel surya dan PLTS — ${glossaryTerms.length} istilah dalam ${GLOSSARY_CATEGORIES.length} kategori, dengan penjelasan sederhana, angka riil wilayah Jambi, dan link ke panduan terkait.`}
      breadcrumbs={[{ label: "Kamus Istilah" }]}
    >
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Kamus Istilah PLTS", path: "/istilah-plts" },
        ])}
      />
      <JsonLd data={glossaryJsonLd(glossaryTerms)} />

      <section className="py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <GlossaryExplorer terms={glossaryTerms} />

          {/* CTA bawah */}
          <div className="mt-16 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-solar/10 via-card to-gold/10 border border-solar/20">
            <p className="font-bold text-navy dark:text-white mb-2">
              Masih ada istilah yang belum jelas?
            </p>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              Tanyakan langsung ke tim teknis kami — konsultasi dan survei gratis,
              tanpa jargon. Atau pelajari lebih dalam lewat panduan lengkap kami.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://wa.me/6281328190707?text=Halo%20Jambi%20Solar%20Panel%2C%20saya%20ingin%20bertanya%20soal%20istilah%20PLTS"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-shine inline-flex items-center gap-2 px-6 py-3 rounded-full bg-solar text-white font-semibold text-sm hover:shadow-lg hover:shadow-solar/25 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                Tanya via WhatsApp
              </a>
              <Link
                href="/kalkulator-plts"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-card border border-border hover:border-solar/40 text-foreground font-semibold text-sm transition-all hover-lift"
              >
                <Calculator className="w-4 h-4 text-solar" />
                Coba Kalkulator PLTS
              </Link>
              <Link
                href="/artikel"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-card border border-border hover:border-solar/40 text-foreground font-semibold text-sm transition-all hover-lift"
              >
                <BookOpen className="w-4 h-4 text-solar" />
                Baca Panduan Lengkap
              </Link>
            </div>
          </div>

          {/* Catatan E-E-A-T */}
          <p className="mt-6 text-xs text-muted-foreground flex items-center gap-2">
            <BookMarked className="w-3.5 h-3.5 text-solar flex-shrink-0" />
            Definisi disusun oleh Tim Teknis Jambi Solar Panel berdasarkan
            parameter desain internal kami untuk wilayah Jambi — PSH 3,75 jam,
            efisiensi sistem 80%, dan spesifikasi paket yang tercantum di
            halaman harga.
          </p>
        </div>
      </section>
    </SitePageLayout>
  );
}
