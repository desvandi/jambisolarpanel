import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Zap, Layers, MapPinned } from "lucide-react";
import { SitePageLayout } from "@/components/site/SitePageLayout";
import { JsonLd } from "@/components/seo/JsonLd";
import { CountUp } from "@/components/ui/CountUp";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { caseStudies, formatKwp } from "@/content/caseStudies";
import {
  ProjectExplorer,
  type ProjectCardData,
} from "@/components/proyek/ProjectExplorer";

export const metadata: Metadata = buildMetadata({
  path: "/proyek",
  title: "Proyek & Studi Kasus PLTS Jambi | Jambi Solar Panel",
  description:
    "Portofolio proyek instalasi PLTS oleh PT. Jaya Mandiri Smart Energy: villa Jambi 5,2 kWp hybrid, kebun sawit Riau 10,4 kWp off-grid, gudang Palembang 50 kWp hybrid, dan lainnya.",
  ogImageAlt: "Portofolio proyek instalasi panel surya — Jambi Solar Panel",
});

/** Proyek lainnya — dirangkum dari testimoni pelanggan yang ada di situs. */
// CATATAN KONSISTENSI (audit 2026-09-25): entri "Kantor Desa, Lampung 5 kWp"
// adalah proyek BERBEDA dari studi kasus villa (testimoni Bapak Agus, bukan
// Bapak Hendra) — kapasitas 5 kWp dipertahankan apa adanya. Kapasitas studi
// kasus villa/sawit (5,2 / 10,4 kWp) mengikuti src/content/caseStudies.ts.
const otherProjects = [
  {
    title: "Toko",
    lokasi: "Palembang",
    sistem: "3 kWp Hybrid",
    hasil: "Rp 3,5 jt → Rp 1 jt/bulan",
  },
  {
    title: "Workshop",
    lokasi: "Padang",
    sistem: "20 kWp Hybrid",
    hasil: "Rp 18 jt → Rp 6 jt/bulan",
  },
  {
    title: "Cold Storage",
    lokasi: "Bangka",
    sistem: "50 kWp Hybrid",
    hasil: "Rp 50 jt → Rp 20 jt/bulan",
  },
  {
    title: "Kantor Desa",
    lokasi: "Lampung",
    sistem: "5 kWp Hybrid",
    hasil: "Rp 4 jt → Rp 1 jt/bulan",
  },
];

/** Gabungan studi kasus + proyek lain → data kartu untuk ProjectExplorer. */
function buildProjectCards(): ProjectCardData[] {
  const caseStudyCards: ProjectCardData[] = caseStudies.map((cs) => {
    const penghematan =
      cs.hasil.find((h) => /penghematan/i.test(h.label))?.value ??
      cs.hasil[0]?.value ??
      "";
    return {
      key: cs.slug,
      segment: cs.segment.toLowerCase() as ProjectCardData["segment"],
      isCaseStudy: true,
      title: cs.title,
      lokasi: cs.lokasi,
      kapasitasLabel: `${formatKwp(cs.kapasitasKwp)} ${cs.jenisSistem}`,
      sistemLabel: `${formatKwp(cs.kapasitasKwp)} ${cs.jenisSistem}`,
      summary: cs.summary,
      hasilLabel: penghematan,
      image: cs.image,
      imageAlt: cs.imageAlt,
      href: `/studi-kasus/${cs.slug}`,
    };
  });

  const otherCards: ProjectCardData[] = otherProjects.map((p) => ({
    key: `${p.title}-${p.lokasi}`,
    segment: "commercial",
    isCaseStudy: false,
    title: p.title,
    lokasi: p.lokasi,
    kapasitasLabel: p.sistem,
    sistemLabel: p.sistem,
    hasilLabel: p.hasil,
  }));

  return [...caseStudyCards, ...otherCards];
}

export default function ProyekPage() {
  const projects = buildProjectCards();
  const totalKwp = caseStudies.reduce((sum, cs) => sum + cs.kapasitasKwp, 0);

  const stats = [
    { icon: Zap, value: totalKwp, suffix: " kWp", label: "Total kapasitas studi kasus terdokumentasi", decimals: 1 },
    { icon: Layers, value: 3, suffix: " segmen", label: "Rumah & villa, perkebunan, bisnis & industri", decimals: 0 },
    { icon: MapPinned, value: 6, suffix: " provinsi", label: "Keberadaan proyek: Jambi, Riau, Sumsel, Sumbar, Babel, Lampung", decimals: 0 },
  ];

  return (
    <SitePageLayout
      title={
        <>
          Proyek &amp; <span className="gradient-text">Studi Kasus</span> PLTS
        </>
      }
      description="Dokumentasi proyek instalasi panel surya yang dikerjakan PT. Jaya Mandiri Smart Energy — dari rumah tinggal dan villa, kebun sawit, hingga gudang industri. Setiap studi kasus memuat data sistem, kebutuhan awal, dan hasilnya."
      breadcrumbs={[{ label: "Proyek" }]}
    >
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Proyek & Studi Kasus", path: "/proyek" },
        ])}
      />

      <section className="py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Ringkasan angka — derivasi dari data yang ditampilkan di halaman ini */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            {stats.map((s) => (
              <div
                key={s.label}
                className="flex items-start gap-4 p-5 rounded-2xl border border-border bg-card hover-lift"
              >
                <div className="w-11 h-11 rounded-xl bg-solar/10 flex items-center justify-center flex-shrink-0">
                  <s.icon className="w-5 h-5 text-solar" />
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-navy dark:text-white">
                    <CountUp value={s.value} suffix={s.suffix} decimals={s.decimals} />
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">
                    {s.label}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-navy dark:text-white mb-2">
            Jelajahi Proyek Kami
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-8 max-w-3xl">
            Tiga studi kasus terdokumentasi lengkap dengan data sistem dan
            hasilnya, ditambah proyek lain yang dirangkum dari testimoni
            pelanggan. Filter berdasarkan segmen untuk melihat yang paling
            relevan dengan kebutuhan Anda.
          </p>

          <ProjectExplorer projects={projects} />
        </div>
      </section>

      {/* CTA */}
      <section className="pb-14 md:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-solar/10 to-gold/10 border border-solar/20 text-center">
            <h2 className="text-xl sm:text-2xl font-bold text-navy dark:text-white mb-3">
              Ingin proyek PLTS untuk properti atau bisnis Anda?
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6 max-w-2xl mx-auto">
              Tim kami melakukan survei lokasi dan merancang sistem sesuai
              kebutuhan beban Anda — untuk rumah,{" "}
              <Link
                href="/solar-commercial"
                className="text-solar font-semibold hover:underline underline-offset-2"
              >
                bisnis &amp; industri
              </Link>
              ,{" "}
              <Link
                href="/solar-pump"
                className="text-solar font-semibold hover:underline underline-offset-2"
              >
                kebun &amp; perkebunan
              </Link>
              , hingga{" "}
              <Link
                href="/tender-procurement"
                className="text-solar font-semibold hover:underline underline-offset-2"
              >
                proyek pengadaan
              </Link>
              . Hitung estimasi Anda dengan{" "}
              <Link
                href="/kalkulator-plts"
                className="text-solar font-semibold hover:underline underline-offset-2"
              >
                kalkulator PLTS
              </Link>{" "}
              kami, lihat{" "}
              <Link
                href="/harga-panel-surya-jambi"
                className="text-solar font-semibold hover:underline underline-offset-2"
              >
                harga paket PLTS
              </Link>{" "}
              atau{" "}
              <Link
                href="/sewa-plts"
                className="text-solar font-semibold hover:underline underline-offset-2"
              >
                program sewa PLTS
              </Link>
              .
            </p>
            <a
              href="https://wa.me/6281328190707?text=Halo%20PT.%20Jaya%20Mandiri%20Smart%20Energy%2C%20saya%20ingin%20konsultasi%20proyek%20PLTS%20setelah%20melihat%20halaman%20proyek%20anda"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-solar hover:bg-solar-dark text-white font-bold rounded-full transition-all duration-300 btn-shine"
            >
              Konsultasi Gratis via WhatsApp
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </SitePageLayout>
  );
}
