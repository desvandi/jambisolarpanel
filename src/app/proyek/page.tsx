import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin, Zap, TrendingDown } from "lucide-react";
import { SitePageLayout } from "@/components/site/SitePageLayout";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { caseStudies } from "@/content/caseStudies";

export const metadata: Metadata = buildMetadata({
  path: "/proyek",
  title: "Proyek & Studi Kasus PLTS Jambi | Jambi Solar Panel",
  description:
    "Portofolio proyek instalasi PLTS oleh PT. Jaya Mandiri Smart Energy: villa Jambi 5 kWp hybrid, kebun sawit Riau 10 kWp off-grid, gudang Palembang 50 kWp hybrid, dan lainnya.",
  ogImageAlt: "Portofolio proyek instalasi panel surya — Jambi Solar Panel",
});

/** Proyek lainnya — dirangkum dari testimoni pelanggan yang ada di situs. */
const otherProjects = [
  {
    lokasi: "Toko, Palembang",
    sistem: "3 kWp Hybrid",
    hasil: "Rp 3,5 jt → Rp 1 jt/bulan",
  },
  {
    lokasi: "Workshop, Padang",
    sistem: "20 kWp Hybrid",
    hasil: "Rp 18 jt → Rp 6 jt/bulan",
  },
  {
    lokasi: "Cold Storage, Bangka",
    sistem: "50 kWp Hybrid",
    hasil: "Rp 50 jt → Rp 20 jt/bulan",
  },
  {
    lokasi: "Kantor Desa, Lampung",
    sistem: "5 kWp Hybrid",
    hasil: "Rp 4 jt → Rp 1 jt/bulan",
  },
];

export default function ProyekPage() {
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

      {/* Studi kasus utama */}
      <section className="py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-navy dark:text-white mb-8">
            Studi Kasus Terpilih
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {caseStudies.map((cs) => (
              <Link
                key={cs.slug}
                href={`/studi-kasus/${cs.slug}`}
                className="group flex flex-col rounded-2xl overflow-hidden border border-border bg-card hover:border-solar/30 hover:shadow-xl transition-all duration-300"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={cs.image}
                    alt={cs.imageAlt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 px-3 py-1 bg-solar text-white text-xs font-semibold rounded-full">
                    {cs.segment}
                  </span>
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="text-white font-bold text-lg leading-snug">
                      {cs.title}
                    </h3>
                    <p className="text-white/70 text-sm flex items-center gap-1 mt-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {cs.lokasi}
                    </p>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-solar/5 rounded-md text-xs font-medium text-solar">
                      <Zap className="w-3 h-3" />
                      {cs.kapasitasKwp} kWp {cs.jenisSistem}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                    {cs.summary}
                  </p>
                  <span className="inline-flex items-center gap-1.5 mt-4 text-sm font-semibold text-solar group-hover:gap-2.5 transition-all">
                    Baca studi kasus lengkap <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Proyek lainnya */}
          <h2 className="text-2xl sm:text-3xl font-extrabold text-navy dark:text-white mb-6">
            Proyek Lainnya
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-8 max-w-3xl">
            Selain studi kasus di atas, tim Jambi Solar Panel juga menangani
            instalasi PLTS untuk pelanggan berikut — data dirangkum dari
            testimoni pelanggan.
          </p>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-navy text-white text-left">
                  <th className="px-4 py-3 font-semibold">Lokasi &amp; Jenis</th>
                  <th className="px-4 py-3 font-semibold">Sistem</th>
                  <th className="px-4 py-3 font-semibold">Hasil</th>
                </tr>
              </thead>
              <tbody>
                {otherProjects.map((p) => (
                  <tr key={p.lokasi} className="border-t border-border odd:bg-muted/40">
                    <td className="px-4 py-3 font-medium text-navy dark:text-white">
                      {p.lokasi}
                    </td>
                    <td className="px-4 py-3 text-foreground/90">{p.sistem}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1.5 font-semibold text-solar">
                        <TrendingDown className="w-3.5 h-3.5" />
                        {p.hasil}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* CTA */}
          <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-solar/10 to-gold/10 border border-solar/20 text-center">
            <h2 className="text-xl sm:text-2xl font-bold text-navy dark:text-white mb-3">
              Ingin proyek PLTS untuk properti atau bisnis Anda?
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6 max-w-2xl mx-auto">
              Tim kami melakukan survei lokasi dan merancang sistem sesuai
              kebutuhan beban Anda — untuk rumah,{" "}
              <Link href="/solar-commercial" className="text-solar font-semibold hover:underline underline-offset-2">
                bisnis &amp; industri
              </Link>
              ,{" "}
              <Link href="/solar-pump" className="text-solar font-semibold hover:underline underline-offset-2">
                kebun &amp; perkebunan
              </Link>
              , hingga{" "}
              <Link href="/tender-procurement" className="text-solar font-semibold hover:underline underline-offset-2">
                proyek pengadaan
              </Link>
              . Lihat juga{" "}
              <Link href="/harga-panel-surya-jambi" className="text-solar font-semibold hover:underline underline-offset-2">
                harga paket PLTS
              </Link>{" "}
              atau{" "}
              <Link href="/sewa-plts" className="text-solar font-semibold hover:underline underline-offset-2">
                program sewa PLTS
              </Link>
              .
            </p>
            <a
              href="https://wa.me/6281328190707?text=Halo%20PT.%20Jaya%20Mandiri%20Smart%20Energy%2C%20saya%20ingin%20konsultasi%20proyek%20PLTS%20setelah%20melihat%20halaman%20proyek%20anda"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-solar hover:bg-solar-dark text-white font-bold rounded-full transition-colors"
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
