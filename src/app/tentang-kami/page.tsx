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
  BadgeCheck,
  PenTool,
  Gauge,
  MessagesSquare,
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

const teamCompetencies = [
  {
    icon: PenTool,
    title: "Desain Sistem oleh Insinyur",
    desc: "Survei lokasi, audit beban listrik, dan perhitungan kapasitas panel–inverter–baterai dikerjakan sebagai satu sistem terpadu, bukan paket template.",
  },
  {
    icon: Wrench,
    title: "Instalasi & Commissioning",
    desc: "Pemasangan oleh teknisi berpengalaman dengan testing menyeluruh sebelum serah terima — sistem terbukti berproduksi sesuai desain.",
  },
  {
    icon: Gauge,
    title: "Monitoring & Maintenance",
    desc: "Dukungan purna jual selama masa garansi, opsi smart monitoring, dan layanan maintenance berkala untuk menjaga performa.",
  },
  {
    icon: MessagesSquare,
    title: "Edukasi & Konsultasi",
    desc: "Klien dibekali pemahaman lewat pelatihan penggunaan, panduan perawatan, serta Knowledge Center, kalkulator, dan kamus istilah di situs ini.",
  },
];

const ownerSupervisedPoints = [
  {
    title: "Kendali Mutu Langsung",
    desc: "Keputusan teknis final diambil oleh pihak yang sama yang menanggung garansi tertulis — bukan oleh subkontraktor yang tidak berkepentingan jangka panjang.",
  },
  {
    title: "Satu Pintu Tanggung Jawab",
    desc: "Ada kebutuhan purna jual? Anda berbicara langsung dengan perusahaan yang memasang sistem Anda — tanpa perantara.",
  },
  {
    title: "Tenaga Terlatih",
    desc: "Seluruh pemasangan dikerjakan teknisi berpengalaman di bawah supervisi langsung owner, dengan dokumentasi commissioning.",
  },
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

      {/* Tim & Kompetensi — E-E-A-T deep-dive */}
      <section id="tim-kompetensi" className="py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="section-badge">Tim &amp; Kompetensi</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy dark:text-white mt-3">
              Dibalik Setiap Sistem: Tim yang Bertanggung Jawab
            </h2>
          </div>

          {/* Owner spotlight */}
          <div className="owner-card p-6 sm:p-8 rounded-3xl mb-10">
            <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-6 md:gap-8 items-center">
              <div className="relative aspect-square md:aspect-[4/5] rounded-2xl overflow-hidden border-2 border-solar/30 mx-auto w-full max-w-[240px]">
                <Image
                  src="/team-owner.jpg"
                  alt="Owner PT. Jaya Mandiri Smart Energy mengawasi pemasangan panel surya di lokasi proyek"
                  fill
                  sizes="(max-width: 768px) 240px, 240px"
                  className="object-cover"
                />
              </div>
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-solar/10 border border-solar/25 text-xs font-bold text-solar mb-4">
                  <BadgeCheck className="w-3.5 h-3.5" />
                  Owner Supervised
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-navy dark:text-white mb-3">
                  Pendiri &amp; Pemilik — PT. Jaya Mandiri Smart Energy
                </h3>
                <div className="space-y-3 text-sm text-foreground/90 leading-relaxed">
                  <p>
                    Perusahaan ini berdiri sebagai badan usaha resmi — PT dengan
                    NIB, SK Kemenkumham, dan izin usaha lengkap — dan setiap
                    proyeknya diawasi langsung oleh pemiliknya. Kami tidak
                    membeli proyek lalu mengalihkannya ke pihak lain.
                  </p>
                  <p>
                    Bagi Anda, itu berarti satu hal praktis: orang yang menandatangani
                    garansi tertulis Anda adalah orang yang sama yang memastikan
                    sistem dipasang benar sejak hari pertama.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 mt-5">
                  {[
                    "Legalitas PT lengkap",
                    "Supervisi langsung ke lokasi",
                    "Garansi tertulis resmi",
                  ].map((chip) => (
                    <span
                      key={chip}
                      className="px-3 py-1.5 rounded-full bg-card border border-border text-xs font-semibold text-foreground/80"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
                <p className="mt-5 flex items-start gap-2.5 text-xs text-muted-foreground leading-relaxed p-4 rounded-xl bg-muted/50 border border-border">
                  <FileCheck className="w-4 h-4 text-solar flex-shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-foreground/90">Verifikasi legalitas:</strong>{" "}
                    dokumen asli (NIB, SK Kemenkumham, dan izin usaha) dapat Anda periksa
                    langsung saat kunjungan ke kantor kami di Muaro Jambi atau diminta
                    sebagai kelengkapan dokumen proses tender/pengadaan.
                  </span>
                </p>
                <a
                  href="https://wa.me/6281328190707?text=Halo%20PT.%20Jaya%20Mandiri%20Smart%20Energy%2C%20saya%20ingin%20bicara%20dengan%20tim%20tentang%20proyek%20PLTS%20saya"
                  className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-solar hover:bg-solar-dark text-white font-semibold text-sm rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-solar/30"
                >
                  Bicara Langsung dengan Tim Kami
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Mengapa Owner Supervised */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {ownerSupervisedPoints.map((p, i) => (
              <div key={p.title} className="relative p-6 rounded-2xl bg-card border border-border hover:border-solar/30 hover-lift transition-all duration-300">
                <span className="absolute -top-3 left-5 w-7 h-7 rounded-full bg-solar text-white text-xs font-extrabold flex items-center justify-center shadow-md shadow-solar/40">
                  {i + 1}
                </span>
                <h4 className="font-bold text-navy dark:text-white mb-2 pt-1">
                  {p.title}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Kompetensi tim */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamCompetencies.map((c) => (
              <div
                key={c.title}
                className="p-6 rounded-2xl bg-card border border-border hover:border-solar/30 hover-lift transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-solar/10 flex items-center justify-center mb-4 group-hover:bg-solar group-hover:text-white transition-colors">
                  <c.icon className="w-6 h-6 text-solar group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-base font-bold text-navy dark:text-white mb-2">
                  {c.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {c.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Link silang ke knowledge center */}
          <p className="mt-8 text-center text-sm text-muted-foreground">
            Ingin menilai sendiri cara kami bekerja?{" "}
            <Link href="/artikel" className="link-underline font-semibold text-solar">
              Baca Knowledge Center kami
            </Link>{" "}
            — 13+ panduan teknis yang kami tulis sendiri, atau{" "}
            <Link href="/proyek" className="link-underline font-semibold text-solar">
              lihat proyek yang telah dikerjakan
            </Link>
            .
          </p>
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
