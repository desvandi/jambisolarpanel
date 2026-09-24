"use client";

import {
  Shield,
  Award,
  Users,
  Wrench,
  Clock,
  MapPin,
  FileCheck,
  HardHat,
  BadgeCheck,
} from "lucide-react";
import Link from "next/link";

const trustItems = [
  {
    icon: FileCheck,
    title: "Legalitas PT Resmi",
    desc: "Terdaftar sebagai badan usaha resmi PT. Jaya Mandiri Smart Energy dengan NIB, SK Kemenkumham, dan izin usaha lengkap — dokumen asli dapat diperiksa saat kunjungan kantor atau proses tender.",
  },
  {
    icon: Users,
    title: "Tim Teknisi Berpengalaman",
    desc: "Didukung oleh insinyur dan teknisi yang menangani instalasi PLTS untuk rumah, kebun, dan bisnis di Sumatera dan Jawa Bagian Barat.",
  },
  {
    icon: HardHat,
    title: "Owner Supervised",
    desc: "Setiap proyek diawasi langsung oleh pemilik perusahaan untuk memastikan kualitas terbaik tanpa kompromi. Tidak disubkontrakkan sembarangan.",
  },
  {
    icon: Award,
    title: "Portofolio Terbukti",
    desc: (
      <>
        Menangani proyek untuk rumah tangga, perkebunan sawit, bisnis UMKM,
        hingga korporasi. Lihat{" "}
        <Link
          href="/proyek"
          className="text-solar font-semibold hover:underline underline-offset-2"
        >
          halaman Proyek &amp; Studi Kasus
        </Link>
        .
      </>
    ),
  },
  {
    icon: Shield,
    title: "Garansi Komprehensif",
    desc: "Garansi panel surya 25 tahun performa, inverter 5 tahun, baterai LiFePO4 5 tahun, dan garansi instalasi profesional oleh tim kami.",
  },
  {
    icon: Wrench,
    title: "Desain Custom oleh Insinyur",
    desc: "Setiap sistem dirancang secara custom oleh tim insinyur berpengalaman berdasarkan survei lokasi, kebutuhan beban, dan kondisi iradiasi matahari spesifik area Anda.",
  },
  {
    icon: Clock,
    title: "Respon Cepat via WhatsApp",
    desc: "Tim support kami siap merespons via WhatsApp pada jam kerja. Dukungan purna jual yang responsif selama masa garansi dan setelahnya.",
  },
  {
    icon: MapPin,
    title: "Coverage Sumatera & Jawa Barat",
    desc: "Melayani instalasi di delapan wilayah resmi: Jambi, Riau, Sumatera Selatan, Sumatera Barat, Lampung, Kep. Bangka Belitung, Jakarta, dan Jawa Barat. Tim teknisi siap ke lokasi Anda.",
  },
];

const certifications = [
  "PT Resmi (NIB)",
  "SK Kemenkumham",
  "Legalitas Dapat Diperiksa",
  "Garansi Tertulis",
];

export function TrustSection() {
  return (
    <section id="keunggulan" className="py-20 md:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold text-solar bg-solar/10 rounded-full">
            Mengapa Memilih Kami?
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy dark:text-white mb-6">
            Mitra <span className="gradient-text">Energi Mandiri</span> di Jambi
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Jambi Solar Panel by PT. Jaya Mandiri Smart Energy bukan sekadar
            vendor panel surya. Kami adalah mitra energi Anda yang menyediakan
            solusi lengkap — dari desain, instalasi, hingga maintenance — dengan
            standar kualitas tertinggi dan legalitas resmi.
          </p>
        </div>

        {/* Trust Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustItems.map((item) => (
            <div
              key={item.title}
              className="group relative p-6 rounded-2xl bg-card border border-border hover:border-solar/30 hover:shadow-xl hover:shadow-solar/5 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-solar/10 flex items-center justify-center mb-4 group-hover:bg-solar group-hover:text-white transition-colors duration-300">
                <item.icon className="w-6 h-6 text-solar group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-lg font-bold text-navy dark:text-white mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Certifications & Legal Badges */}
        <div className="mt-16 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-solar/5 to-gold/5 border border-solar/10">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl font-bold text-navy dark:text-white mb-2">
                Legalitas &amp; Sertifikasi Terjamin
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Kami memegang legalitas lengkap sebagai badan usaha resmi.
                Setiap proyek dilengkapi dengan dokumentasi resmi, perhitungan
                teknis, dan garansi tertulis yang sah secara hukum. Siap untuk
                tender pemerintah, BUMN, dan korporasi.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {certifications.map((cert) => (
                <span
                  key={cert}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-white dark:bg-navy rounded-lg border border-border text-sm font-semibold text-navy dark:text-white shadow-sm"
                >
                  <BadgeCheck className="w-4 h-4 text-solar" />
                  {cert}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Facts — hanya klaim yang dapat diverifikasi */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: "25 Thn", label: "Garansi Performa Panel" },
            { value: "1.3–20.8 kWp", label: "Rentang Paket PLTS" },
            { value: "2 Wilayah", label: "Sumatera & Jawa Barat" },
            { value: "Gratis", label: "Survei & Konsultasi" },
          ].map((stat) => (
            <div key={stat.label} className="text-center p-4 rounded-xl bg-card border border-border">
              <p className="text-2xl font-extrabold text-navy dark:text-white">{stat.value}</p>
              <p className="text-xs font-semibold text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
