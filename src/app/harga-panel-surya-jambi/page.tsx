import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  XCircle,
  Calculator,
  Info,
  Battery,
  Sun,
  Building2,
  Home,
  Factory,
} from "lucide-react";
import { SitePageLayout } from "@/components/site/SitePageLayout";
import { JsonLd } from "@/components/seo/JsonLd";
import { PrintPricelistButton } from "@/components/harga/PrintPricelistButton";
import { buildMetadata, breadcrumbJsonLd, SITE_URL, serviceJsonLd } from "@/lib/seo";
import {
  calculatePackages,
  defaultComponentPrices,
  defaultInverterPrices,
  defaultSettings,
  inverterDisplayNames,
} from "@/lib/pricing";

export const metadata: Metadata = buildMetadata({
  path: "/harga-panel-surya-jambi",
  title: "Harga Panel Surya Jambi 2026 — Paket PLTS 1.3–20.8 kWp | JMSE",
  description:
    "Daftar harga paket panel surya (PLTS) di Jambi mulai paket rumah 1.3 kWp hingga industri 20.8 kWp. Harga mencakup panel, inverter hybrid, instalasi, survei, commissioning & PPN. Konsultasi gratis.",
  ogImageAlt: "Harga paket panel surya dan PLTS di Jambi — Jambi Solar Panel",
});

const packages = calculatePackages(
  defaultComponentPrices,
  defaultInverterPrices,
  defaultSettings
);

const segments = [
  {
    tier: "silver" as const,
    label: "PLTS Rumah Tangga",
    desc: "Untuk kebutuhan rumah: lampu, TV, kulkas, kipas, hingga AC 1 unit. Inverter hybrid 1 fase.",
    icon: Home,
  },
  {
    tier: "gold" as const,
    label: "PLTS Bisnis",
    desc: "Untuk kantor, toko, workshop, dan gudang kecil dengan konsumsi listrik lebih besar.",
    icon: Building2,
  },
  {
    tier: "platinum" as const,
    label: "PLTS Industri",
    desc: "Untuk pabrik dan fasilitas besar. Inverter hybrid 3 fase dengan kapasitas tinggi.",
    icon: Factory,
  },
];

/** Harga add-on baterai per unit (4.8 kWh) — diambil dari paket terkecil. */
const batteryUnit = packages[0]?.batteryOptions[0];
const batteryUnitPrice = batteryUnit?.priceFormatted ?? "";
const batteryUnitKwh = batteryUnit?.kwh ?? 4.8;

const includedItems = [
  `Panel surya monokristalin ${defaultComponentPrices.panelWattage}Wp per unit`,
  "Inverter hybrid (1-fase / 3-fase sesuai paket)",
  "Mounting atap (bracket, baut, struktur)",
  "Kabel & konektor (BOS: MC4, kabel DC/AC)",
  "Proteksi sistem: SPD, grounding, MCB DC & breaker AC",
  "Jasa instalasi panel & inverter oleh teknisi",
  "Survei lokasi & desain sistem oleh insinyur",
  "Testing & commissioning sistem",
  "Biaya logistik pengiriman",
  `PPN ${defaultSettings.ppnPct}%`,
];

const excludedItems = [
  {
    label: `Baterai LiFePO4 ${batteryUnitKwh} kWh per unit (opsional)`,
    price: batteryUnitPrice ? `mulai ${batteryUnitPrice}/unit` : "sesuai kebutuhan",
    note: "Direkomendasikan untuk sistem off-grid & backup saat PLN padam. Jumlah unit disesuaikan kebutuhan (kelipatan 4,8 kWh).",
  },
  {
    label: "Kanopi carport panel surya (opsional)",
    price: "per kWp, sesuai desain",
    note: "Untuk instalasi di halaman/tanah dengan struktur kanopi.",
  },
  {
    label: "Smart monitoring (opsional)",
    price: "Basic / Standard / Industrial",
    note: "Monitoring produksi real-time. Lihat layanan Smart IoT untuk detail.",
  },
];

export default function HargaPanelSuryaPage() {
  return (
    <SitePageLayout
      title={
        <>
          Harga Panel Surya &amp; <span className="gradient-text">Paket PLTS</span> Jambi
        </>
      }
      description="Daftar harga paket PLTS dari PT. Jaya Mandiri Smart Energy — transparan, sudah termasuk peralatan, instalasi, dan PPN. Harga bersifat “mulai dari” dan dapat disesuaikan setelah survei lokasi."
      breadcrumbs={[{ label: "Harga Panel Surya" }]}
    >
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Harga Panel Surya Jambi", path: "/harga-panel-surya-jambi" },
        ])}
      />
      <JsonLd
        data={serviceJsonLd({
          name: "Jasa Pasang Panel Surya & Paket PLTS Jambi",
          description:
            "Paket PLTS 1.3–20.8 kWp untuk rumah, bisnis, dan industri di Jambi. Harga termasuk panel, inverter hybrid, instalasi, survei, commissioning, dan PPN.",
          path: "/harga-panel-surya-jambi",
          serviceType: "Instalasi PLTS Off-Grid & Hybrid",
        })}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "OfferCatalog",
          name: "Paket PLTS Jambi Solar Panel",
          url: `${SITE_URL}/harga-panel-surya-jambi`,
          itemListElement: packages.map((p) => ({
            "@type": "Offer",
            name: p.name,
            description: p.desc,
            price: p.price,
            priceCurrency: "IDR",
            availability: "https://schema.org/InStock",
            url: `${SITE_URL}/harga-panel-surya-jambi`,
          })),
        }}
      />

      {/* Header khusus cetak — hanya tampil saat print */}
      <div className="print-only px-4 pt-6 pb-2 border-b-2 border-navy">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-lg font-extrabold text-navy">Jambi Solar Panel</p>
            <p className="text-xs">PT. Jaya Mandiri Smart Energy</p>
          </div>
          <div className="text-right text-xs">
            <p className="font-semibold">Daftar Harga Paket PLTS</p>
            <p>Periode: September 2026</p>
            <p>WhatsApp: +62 813-2819-0707</p>
            <p>jambisolarpanel.vercel.app</p>
          </div>
        </div>
      </div>

      {/* Disclaimer + tombol cetak */}
      <div className="border-b border-border bg-muted/30 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-start gap-3">
          <p className="flex-1 flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed">
            <Info className="w-4 h-4 text-solar flex-shrink-0 mt-0.5" />
            <span>
              Semua harga di bawah adalah harga <strong>“mulai dari”</strong> per paket
              (konfigurasi standar, tanpa baterai) dan dapat berubah setelah survei
              lokasi — kondisi atap, jarak, dan kebutuhan beban memengaruhi harga
              final. Terakhir diperbarui: September 2026.
            </span>
          </p>
          <PrintPricelistButton />
        </div>
      </div>

      <section className="py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Tabel harga per segmen */}
          {segments.map((segment) => {
            const items = packages.filter((p) => p.tier === segment.tier);
            return (
              <div key={segment.tier}>
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-solar/10 flex items-center justify-center flex-shrink-0">
                    <segment.icon className="w-6 h-6 text-solar" />
                  </div>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-navy dark:text-white">
                      {segment.label}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mt-1">
                      {segment.desc}
                    </p>
                  </div>
                </div>
                <div className="overflow-x-auto rounded-xl border border-border table-hover-rows">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-navy text-white text-left">
                        <th className="px-4 py-3 font-semibold">Paket</th>
                        <th className="px-4 py-3 font-semibold">Inverter</th>
                        <th className="px-4 py-3 font-semibold">Est. Produksi</th>
                        <th className="px-4 py-3 font-semibold">Est. Hemat/Bulan*</th>
                        <th className="px-4 py-3 font-semibold text-right">Harga Mulai Dari</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((p) => (
                        <tr key={p.name} className="border-t border-border odd:bg-muted/40">
                          <td className="px-4 py-4">
                            <p className="font-bold text-navy dark:text-white">{p.name}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">{p.specs}</p>
                          </td>
                          <td className="px-4 py-4 text-foreground/90 whitespace-nowrap">
                            {inverterDisplayNames[p.inverterKey]}
                          </td>
                          <td className="px-4 py-4 text-foreground/90 whitespace-nowrap">
                            {p.dailyProduction}
                          </td>
                          <td className="px-4 py-4 text-solar font-semibold whitespace-nowrap">
                            {p.savingsRange}
                          </td>
                          <td className="px-4 py-4 text-right font-extrabold text-navy dark:text-white whitespace-nowrap">
                            {p.priceFormatted}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}

          <p className="text-xs text-muted-foreground leading-relaxed">
            *Estimasi penghematan per bulan dihitung dari produksi harian sistem
            (parameter desain internal: PSH Jambi 3,75 jam × efisiensi 80%)
            dikalikan 30 hari, asumsi pemanfaatan energi 80% (profil campuran +
            baterai), dan rentang tarif listrik PLN Rp1.352–1.444,70/kWh
            (golongan R-1). Penghematan aktual = min(produksi surya, pemakaian
            Anda) × pemanfaatan × tarif. Gunakan{" "}
            <Link href="/#kalkulator" className="text-solar font-semibold hover:underline underline-offset-2">
              kalkulator penghematan kami
            </Link>{" "}
            untuk simulasi detail, atau baca panduan{" "}
            <Link
              href="/artikel/berapa-produksi-1-kwp-panel-surya"
              className="text-solar font-semibold hover:underline underline-offset-2"
            >
              berapa produksi 1 kWp panel surya
            </Link>
            .
          </p>

          {/* Yang termasuk */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="p-6 sm:p-8 rounded-2xl bg-card border border-border">
              <h2 className="text-xl sm:text-2xl font-bold text-navy dark:text-white mb-2 flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-solar" />
                Yang Termasuk dalam Harga
              </h2>
              <p className="text-sm text-muted-foreground mb-6">
                Semua paket sudah termasuk item berikut — tidak ada biaya tersembunyi:
              </p>
              <ul className="space-y-3">
                {includedItems.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-foreground/90 leading-relaxed">
                    <CheckCircle className="w-4 h-4 text-solar flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 sm:p-8 rounded-2xl bg-card border border-border">
              <h2 className="text-xl sm:text-2xl font-bold text-navy dark:text-white mb-2 flex items-center gap-2">
                <XCircle className="w-6 h-6 text-gold" />
                Add-On Opsional (Tidak Termasuk)
              </h2>
              <p className="text-sm text-muted-foreground mb-6">
                Ditambahkan sesuai kebutuhan setelah survei:
              </p>
              <ul className="space-y-4">
                {excludedItems.map((item) => (
                  <li key={item.label} className="text-sm leading-relaxed">
                    <p className="font-semibold text-navy dark:text-white flex items-start gap-2">
                      <Battery className="w-4 h-4 text-solar flex-shrink-0 mt-0.5" />
                      {item.label}
                    </p>
                    <p className="text-solar font-semibold ml-6">{item.price}</p>
                    <p className="text-muted-foreground ml-6 mt-0.5">{item.note}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm text-muted-foreground">
                Detail monitoring:{" "}
                <Link href="/smart-iot" className="text-solar font-semibold hover:underline underline-offset-2">
                  layanan Smart IoT &amp; Solar CCTV
                </Link>
                .
              </p>
            </div>
          </div>

          {/* Info tambahan */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-solar/5 border border-solar/20">
              <h3 className="font-bold text-navy dark:text-white mb-2 flex items-center gap-2">
                <Sun className="w-5 h-5 text-solar" />
                Kenapa harga bisa berbeda antar lokasi?
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Kondisi atap, arah hadap, jarak lokasi dari Jambi, kebutuhan
                proteksi tambahan, dan profil beban menentukan konfigurasi final
                sistem. Itulah mengapa kami selalu melakukan survei sebelum
                memberikan penawaran final. Baca{" "}
                <Link
                  href="/artikel/harga-panel-surya-jambi-faktor-biaya"
                  className="text-solar font-semibold hover:underline underline-offset-2"
                >
                  faktor-faktor yang mempengaruhi harga panel surya di Jambi
                </Link>
                .
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-solar/5 border border-solar/20">
              <h3 className="font-bold text-navy dark:text-white mb-2 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-solar" />
                Tidak siap beli? Sewa saja.
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Tersedia program{" "}
                <Link href="/sewa-plts" className="text-solar font-semibold hover:underline underline-offset-2">
                  Sewa PLTS bayar bulanan
                </Link>{" "}
                mulai Rp 875.000/bulan tanpa investasi awal — sudah termasuk
                instalasi, baterai, dan maintenance. Untuk rumah, lihat{" "}
                <Link href="/solar-home" className="text-solar font-semibold hover:underline underline-offset-2">
                  paket panel surya rumah
                </Link>
                .
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-solar/10 to-gold/10 border border-solar/20 text-center">
            <h2 className="text-xl sm:text-2xl font-bold text-navy dark:text-white mb-3">
              Dapatkan Penawaran Resmi untuk Lokasi Anda
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6 max-w-2xl mx-auto">
              Hubungi tim kami untuk survei dan penawaran harga final sesuai
              kebutuhan listrik Anda. Konsultasi dan survei area tertentu gratis.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/6281328190707?text=Halo%20PT.%20Jaya%20Mandiri%20Smart%20Energy%2C%20saya%20ingin%20meminta%20penawaran%20harga%20paket%20PLTS%20untuk%20lokasi%20saya"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-solar hover:bg-solar-dark text-white font-bold rounded-full transition-colors"
              >
                Minta Penawaran via WhatsApp
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                href="/#kalkulator"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-solar/40 text-solar font-bold rounded-full hover:bg-solar hover:text-white transition-colors"
              >
                <Calculator className="w-4 h-4" />
                Coba Kalkulator Hemat
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SitePageLayout>
  );
}
