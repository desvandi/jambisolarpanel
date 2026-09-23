import type { Metadata } from "next";
import Link from "next/link";
import {
  Calculator,
  Sun,
  TrendingUp,
  ShieldCheck,
  ArrowRight,
  ListChecks,
  Percent,
  Receipt,
} from "lucide-react";
import { SitePageLayout } from "@/components/site/SitePageLayout";
import { SavingsCalculator } from "@/components/landing/SavingsCalculator";
import { KebutuhanCalculator } from "@/components/kalkulator/KebutuhanCalculator";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata, breadcrumbJsonLd, softwareAppJsonLd } from "@/lib/seo";
import { FAQ_PRODUKSI, FAQ_ROI } from "@/lib/faq";

export const metadata: Metadata = buildMetadata({
  path: "/kalkulator-plts",
  title: "Kalkulator Panel Surya Jambi | Estimasi Paket & Hemat Listrik",
  description:
    "Dua cara menghitung: dari tagihan listrik bulanan atau dari daftar perangkat (audit beban) — dapatkan estimasi paket PLTS, kebutuhan kWp, grafik balik modal, dan penghematan dengan parameter PSH Jambi 3,75 jam.",
  ogImageAlt: "Kalkulator estimasi penghematan panel surya — Jambi Solar Panel",
});

/** Parameter perhitungan — identik dengan asumsi kalkulator (data terverifikasi internal). */
const parameters = [
  {
    icon: Sun,
    label: "PSH Jambi",
    value: "3,75 jam/hari",
    note: "Rata-rata iradiasi matahari wilayah Jambi",
  },
  {
    icon: TrendingUp,
    label: "Produksi per kWp",
    value: "± 3 kWh/hari",
    note: "PSH 3,75 × efisiensi sistem 80%",
  },
  {
    icon: Receipt,
    label: "Tarif PLN acuan",
    value: "Rp 1.444,70/kWh",
    note: "Tarif R-1 TR 1300 VA ke atas (non-subsidi)",
  },
  {
    icon: Percent,
    label: "Kenaikan tarif",
    value: "6%/tahun",
    note: "Rata-rata historis kenaikan tarif listrik",
  },
];

const relatedLinks = [
  {
    href: "/harga-panel-surya-jambi",
    title: "Daftar Harga Paket PLTS",
    desc: "Rincian harga resmi semua paket rumah, bisnis, dan industri.",
  },
  {
    href: "/sewa-plts",
    title: "Sewa PLTS Bayar Bulanan",
    desc: "Alternatif tanpa investasi awal besar.",
  },
  {
    href: "/artikel",
    title: "Artikel & Panduan PLTS",
    desc: "Panduan teknis lengkap sebelum memasang panel surya.",
  },
  {
    href: "/proyek",
    title: "Proyek & Studi Kasus",
    desc: "Lihat hasil nyata instalasi PLTS pelanggan kami.",
  },
];

export default function KalkulatorPltsPage() {
  return (
    <SitePageLayout
      title={
        <>
          Kalkulator <span className="text-solar-light">Panel Surya</span> &amp; PLTS
        </>
      }
      description="Dua cara menghitung kebutuhan PLTS Anda: dari tagihan listrik bulanan atau dari daftar perangkat listrik (audit beban). Dapatkan estimasi paket, kebutuhan kWp, grafik balik modal, hingga ROI — dihitung dengan parameter iradiasi matahari wilayah Jambi."
      breadcrumbs={[{ label: "Kalkulator PLTS" }]}
    >
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Kalkulator PLTS", path: "/kalkulator-plts" },
        ])}
      />
      <JsonLd
        data={softwareAppJsonLd({
          name: "Kalkulator Panel Surya Jambi",
          description:
            "Kalkulator web gratis dengan dua metode: hitung dari tagihan listrik bulanan atau dari daftar perangkat listrik (audit beban). Dapatkan estimasi paket PLTS, kebutuhan kWp, grafik balik modal 25 tahun, dan ROI — dengan parameter iradiasi matahari (PSH) wilayah Jambi 3,75 jam/hari.",
          path: "/kalkulator-plts",
        })}
      />

      {/* Parameter perhitungan */}
      <section aria-labelledby="parameter-heading" className="py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <span className="section-badge">Transparan Sejak Awal</span>
            <h2
              id="parameter-heading"
              className="text-2xl sm:text-3xl font-extrabold text-navy dark:text-white mb-3"
            >
              Parameter Perhitungan Kalkulator
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Kalkulator ini bukan angka karangan — setiap parameter berasal
              dari data desain internal yang kami pakai untuk merancang sistem
              PLTS pelanggan.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {parameters.map((p) => (
              <div
                key={p.label}
                className="rounded-2xl border border-border bg-card p-5 hover-lift"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-9 h-9 rounded-xl bg-solar/10 flex items-center justify-center">
                    <p.icon className="w-5 h-5 text-solar" />
                  </div>
                  <p className="text-sm font-semibold text-muted-foreground">
                    {p.label}
                  </p>
                </div>
                <p className="text-xl font-extrabold text-navy dark:text-white mb-1">
                  {p.value}
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {p.note}
                </p>
              </div>
            ))}
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/50 border border-border text-sm text-muted-foreground leading-relaxed">
            <ListChecks className="w-5 h-5 text-solar flex-shrink-0 mt-0.5" />
            <p>
              Hasil kalkulator bersifat estimasi awal. Perhitungan final selalu
              dihitung ulang oleh tim insinyur kami berdasarkan audit beban dan
              kondisi atap saat{" "}
              <Link
                href="/faq#proses-layanan"
                className="text-solar font-semibold hover:underline underline-offset-2"
              >
                survei gratis
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Kalkulator — cara 1: dari tagihan */}
      <SavingsCalculator />

      {/* Kalkulator — cara 2: dari daftar perangkat */}
      <KebutuhanCalculator />

      {/* FAQ terkait (konten terlihat; FAQPage JSON-LD tetap di halaman /faq) */}
      <section aria-labelledby="faq-heading" className="py-14 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="section-badge">Pertanyaan Terkait</span>
            <h2
              id="faq-heading"
              className="text-2xl sm:text-3xl font-extrabold text-navy dark:text-white"
            >
              Sering Ditanyakan Seputar Perhitungan
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
            {[FAQ_PRODUKSI, FAQ_ROI].map((faq) => (
              <div
                key={faq.q}
                className="rounded-2xl border border-border bg-card p-6 hover-lift"
              >
                <h3 className="font-bold text-navy dark:text-white mb-2 flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-solar mt-1 flex-shrink-0" />
                  {faq.q}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/faq"
              className="inline-flex items-center gap-2 text-sm font-semibold text-solar hover:gap-3 transition-all"
            >
              Lihat semua pertanyaan di halaman FAQ
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Tautan terkait */}
      <section
        aria-labelledby="related-heading"
        className="py-14 md:py-20 bg-muted/30 border-t border-border/60"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            id="related-heading"
            className="text-2xl sm:text-3xl font-extrabold text-navy dark:text-white mb-8"
          >
            Lanjutkan Penjelajahan
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group rounded-2xl border border-border bg-card p-5 card-glow"
              >
                <div className="flex items-center justify-between mb-2">
                  <Calculator className="w-5 h-5 text-solar" />
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-solar group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="font-bold text-navy dark:text-white text-sm mb-1">
                  {link.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {link.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </SitePageLayout>
  );
}
