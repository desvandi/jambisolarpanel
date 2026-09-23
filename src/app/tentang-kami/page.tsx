import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  MapPin,
  Clock,
  Phone,
  Shield,
  FileCheck,
  Wrench,
  Sun,
  Battery,
  Zap,
  Award,
  HardHat,
} from "lucide-react";
import { SitePageLayout } from "@/components/site/SitePageLayout";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  buildMetadata,
  breadcrumbJsonLd,
  localBusinessJsonLd,
  BUSINESS_NAP,
  SERVICE_AREAS,
} from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  path: "/tentang-kami",
  title: "Tentang Kami — PT Jaya Mandiri Smart Energy | Jambi Solar Panel",
  description:
    "PT. Jaya Mandiri Smart Energy (Jambi Solar Panel) — penyedia jasa instalasi panel surya & PLTS berbasis di Muaro Jambi. Kenali perusahaan, proses kerja, garansi, dan cara menghubungi kami.",
  ogImageAlt: "PT. Jaya Mandiri Smart Energy — Jambi Solar Panel",
});

const values = [
  {
    icon: FileCheck,
    title: "Legalitas Resmi",
    desc: "Badan usaha PT dengan NIB, SK Kemenkumham, dan izin usaha lengkap. Siap untuk tender pemerintah, BUMN, dan korporasi.",
  },
  {
    icon: HardHat,
    title: "Owner Supervised",
    desc: "Setiap proyek diawasi langsung oleh pemilik perusahaan. Tidak disubkontrakkan sembarangan.",
  },
  {
    icon: Wrench,
    title: "Desain oleh Insinyur",
    desc: "Sistem dirancang custom berdasarkan survei lokasi, kebutuhan beban, dan kondisi iradiasi spesifik area Anda.",
  },
  {
    icon: Shield,
    title: "Garansi Tertulis",
    desc: "Garansi performa panel 25 tahun, inverter 5–10 tahun, baterai 5–10 tahun, dan garansi instalasi 2 tahun — terdokumentasi resmi.",
  },
];

const workProcess = [
  {
    step: "1",
    title: "Survei & Konsultasi",
    desc: "Tim mengunjungi lokasi Anda (area tertentu gratis), mengaudit beban listrik, dan menilai kondisi atap/lokasi.",
  },
  {
    step: "2",
    title: "Desain Sistem",
    desc: "Insinyur merancang konfigurasi panel, inverter, dan kapasitas baterai sesuai profil beban dan anggaran.",
  },
  {
    step: "3",
    title: "Penawaran & Perjanjian",
    desc: "Penawaran resmi dengan rincian komponen, garansi tertulis, dan jadwal pengerjaan.",
  },
  {
    step: "4",
    title: "Pengadaan & Instalasi",
    desc: "Peralatan dikirim dan dipasang oleh teknisi berpengalaman. Rumah tangga umumnya 1–3 hari kerja.",
  },
  {
    step: "5",
    title: "Testing & Commissioning",
    desc: "Sistem diuji menyeluruh, diserahkan dengan dokumentasi, dan dilatihkan cara penggunaannya.",
  },
  {
    step: "6",
    title: "Garansi & Maintenance",
    desc: "Dukungan purna jual selama masa garansi dan layanan maintenance berkala.",
  },
];

const equipment = [
  {
    icon: Sun,
    name: "Panel Surya Monokristalin",
    desc: "Panel monocrystalline 650Wp dengan garansi performa 25 tahun.",
  },
  {
    icon: Zap,
    name: "Inverter Hybrid 1 & 3 Fase",
    desc: "Inverter hybrid 1 fase (3,6–10 kW) dan 3 fase (10–20 kW) dengan garansi 5–10 tahun.",
  },
  {
    icon: Battery,
    name: "Baterai LiFePO4 48V",
    desc: "Baterai lithium iron phosphate 100Ah (4,8 kWh per unit) — aman, awet, dan tahan ribuan siklus.",
  },
];

const services = [
  { label: "Panel Surya Rumah", href: "/solar-home" },
  { label: "PLTS Bisnis & Industri", href: "/solar-commercial" },
  { label: "Sewa PLTS Bayar Bulanan", href: "/sewa-plts" },
  { label: "PJUTS (Lampu Jalan Surya)", href: "/pjuts" },
  { label: "Solar Water Pump", href: "/solar-pump" },
  { label: "EV Charging + PLTS", href: "/ev-charging" },
  { label: "Smart IoT & Solar CCTV", href: "/smart-iot" },
  { label: "Maintenance PLTS", href: "/maintenance" },
  { label: "Tender & Procurement", href: "/tender-procurement" },
];

export default function TentangKamiPage() {
  return (
    <SitePageLayout
      title={
        <>
          Tentang <span className="gradient-text">Jambi Solar Panel</span> — PT. Jaya Mandiri Smart Energy
        </>
      }
      description="Jambi Solar Panel adalah brand PT. Jaya Mandiri Smart Energy — Smart Energy Solution Provider yang menyediakan jasa pasang panel surya dan PLTS untuk rumah, bisnis, kebun, dan infrastruktur."
      breadcrumbs={[{ label: "Tentang Kami" }]}
    >
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Tentang Kami", path: "/tentang-kami" },
        ])}
      />
      {/* LocalBusiness schema dengan NAP lengkap — konsisten dengan footer & GBP */}
      <JsonLd data={localBusinessJsonLd()} />

      {/* Profil singkat */}
      <section className="py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy dark:text-white mb-6">
              Smart Energy Solution Provider dari Muaro Jambi
            </h2>
            <div className="space-y-4 text-foreground/90 leading-relaxed">
              <p>
                <strong>PT. Jaya Mandiri Smart Energy</strong> adalah perusahaan
                jasa instalasi panel surya dan sistem PLTS (pembangkit listrik
                tenaga surya) yang berbasis di Kabupaten Muaro Jambi, Provinsi
                Jambi. Melalui brand <strong>Jambi Solar Panel</strong>, kami
                membantu rumah tangga, bisnis, perkebunan, dan infrastruktur
                mendapatkan pasokan listrik yang lebih ekonomis dan mandiri.
              </p>
              <p>
                Kami menyediakan solusi energi secara menyeluruh — mulai dari
                survei, desain sistem, pengadaan peralatan, instalasi, hingga
                maintenance. Setiap sistem dirancang khusus oleh insinyur kami
                berdasarkan kondisi nyata lokasi Anda:{" "}
                <Link href="/artikel/potensi-energi-surya-jambi" className="text-solar font-semibold hover:underline underline-offset-2">
                  potensi energi surya di Jambi sangat baik sepanjang tahun
                </Link>
                , dan kami memanfaatkannya seoptimal mungkin.
              </p>
              <p>
                Artikel dan panduan di website ini — termasuk{" "}
                <Link href="/artikel" className="text-solar font-semibold hover:underline underline-offset-2">
                  Knowledge Center kami
                </Link>{" "}
                — ditulis oleh tim teknis berdasarkan praktik perancangan dan
                pemasangan PLTS yang kami kerjakan sendiri, agar Anda memahami
                sistem yang akan dipasang di properti Anda.
              </p>
            </div>
          </div>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-border">
            <Image
              src="/team-owner.jpg"
              alt="Owner PT. Jaya Mandiri Smart Energy mengawasi pemasangan panel surya di lokasi proyek"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Nilai & komitmen */}
      <section className="py-14 md:py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-navy dark:text-white mb-10 text-center">
            Komitmen Kami pada Setiap Proyek
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div
                key={v.title}
                className="p-6 rounded-2xl bg-card border border-border hover:border-solar/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-solar/10 flex items-center justify-center mb-4">
                  <v.icon className="w-6 h-6 text-solar" />
                </div>
                <h3 className="text-lg font-bold text-navy dark:text-white mb-2">
                  {v.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proses kerja */}
      <section className="py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-navy dark:text-white mb-10 text-center">
            Cara Kami Bekerja
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {workProcess.map((w) => (
              <div key={w.step} className="p-6 rounded-2xl bg-card border border-border">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-solar text-white font-extrabold mb-4">
                  {w.step}
                </span>
                <h3 className="text-lg font-bold text-navy dark:text-white mb-2">
                  {w.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Peralatan */}
      <section className="py-14 md:py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-3">
            <Award className="w-6 h-6 text-solar" />
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy dark:text-white">
              Peralatan yang Kami Gunakan
            </h2>
          </div>
          <p className="text-muted-foreground leading-relaxed mb-10 max-w-3xl">
            Kami merancang sistem dengan komponen yang spesifikasinya jelas dan
            garansinya terdokumentasi:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {equipment.map((e) => (
              <div key={e.name} className="p-6 rounded-2xl bg-card border border-border">
                <e.icon className="w-8 h-8 text-solar mb-4" />
                <h3 className="text-lg font-bold text-navy dark:text-white mb-2">
                  {e.name}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{e.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Layanan */}
      <section className="py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-navy dark:text-white mb-8 text-center">
            Layanan Kami
          </h2>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {services.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="px-5 py-3 rounded-full bg-card border border-border text-sm font-semibold text-navy dark:text-white hover:border-solar/40 hover:text-solar transition-colors"
              >
                {s.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Kontak */}
      <section id="kontak" className="py-14 md:py-20 bg-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-10 text-center">
            Hubungi Kami
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <MapPin className="w-6 h-6 text-solar-light mb-4" />
              <h3 className="font-bold mb-2">Alamat Kantor</h3>
              <p className="text-sm text-white/70 leading-relaxed">
                {BUSINESS_NAP.streetAddress}
                <br />
                {BUSINESS_NAP.addressLocality}, {BUSINESS_NAP.addressRegion}{" "}
                {BUSINESS_NAP.postalCode}
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <Phone className="w-6 h-6 text-solar-light mb-4" />
              <h3 className="font-bold mb-2">WhatsApp / Telepon</h3>
              <a
                href="https://wa.me/6281328190707?text=Halo%20PT.%20Jaya%20Mandiri%20Smart%20Energy%2C%20saya%20ingin%20menghubungi%20tim%20anda"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-solar-light hover:text-solar font-semibold"
              >
                {BUSINESS_NAP.telephoneDisplay}
              </a>
              <p className="text-xs text-white/40 mt-2">
                Konsultasi dan survei area tertentu gratis.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <Clock className="w-6 h-6 text-solar-light mb-4" />
              <h3 className="font-bold mb-2">Jam Operasional</h3>
              <p className="text-sm text-white/70 leading-relaxed">
                Senin – Sabtu
                <br />
                08.00 – 17.00 WIB
              </p>
            </div>
          </div>

          {/* Area layanan */}
          <div className="mt-10 text-center">
            <p className="text-xs text-white/40 uppercase tracking-wider font-semibold mb-4">
              Area Layanan
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {SERVICE_AREAS.map((area) => (
                <span
                  key={area}
                  className="px-4 py-1.5 text-sm text-white/70 bg-white/5 rounded-full border border-white/10"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-12 text-center">
            <a
              href="https://wa.me/6281328190707?text=Halo%20PT.%20Jaya%20Mandiri%20Smart%20Energy%2C%20saya%20ingin%20konsultasi%20solusi%20panel%20surya"
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
