"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  ZapOff,
  Receipt,
  MapPinOff,
  Settings,
  Droplets,
  ArrowRight,
  CheckCircle,
  MessageCircle,
} from "lucide-react";

const painPoints = [
  {
    icon: ZapOff,
    problem: "Listrik Sering Padam",
    desc: "Pemadaman PLN mengganggu aktivitas keluarga dan bisnis Anda setiap hari. Produktivitas menurun, peralatan rusak, dan kenyamanan terganggu tanpa solusi yang memadai.",
    solution:
      "Sistem PLTS Hybrid kami menyimpan energi surplus di baterai LiFePO4 — saat PLN padam, listrik tetap menyala otomatis tanpa jeda. Rumah dan bisnis Anda aman 24/7.",
    cta: "Konsultasi Backup Listrik",
    ctaWa: "Halo PT. Jaya Mandiri Smart Energy, saya ingin konsultasi solusi backup listrik saat PLN padam",
  },
  {
    icon: Receipt,
    problem: "Tagihan Listrik Semakin Mahal",
    desc: "Tarif PLN naik rata-rata 6% setiap tahun. Tagihan bulanan yang semakin membengkak menggerus keuntungan bisnis dan pengeluaran rumah tangga Anda.",
    solution:
      "Panel surya menghasilkan listrik gratis dari matahari. Dengan sistem hybrid, Anda bisa menghemat 50-90% tagihan PLN setiap bulannya. ROI tercapai dalam 5-8 tahun, lalu listrik gratis selama 25+ tahun.",
    cta: "Hitung Penghematan Saya",
    ctaWa: "Halo PT. Jaya Mandiri Smart Energy, saya ingin menghitung potensi penghematan tagihan listrik dengan panel surya",
  },
  {
    icon: MapPinOff,
    problem: "Lokasi Kebun & Desa Tanpa PLN",
    desc: "Area perkebunan sawit, karet, dan pedesaan belum terjangkau listrik PLN. CCTV mati di malam hari, pondok kebun gelap, dan produktivitas terhambat tanpa pasokan energi.",
    solution:
      "Sistem Off-Grid kami dirancang khusus untuk area terpencil — PJUTS untuk penerangan jalan, Solar Pump untuk irigasi, dan Solar CCTV untuk keamanan. 100% mandiri tanpa PLN.",
    cta: "Konsultasi Solusi Kebun",
    ctaWa: "Halo PT. Jaya Mandiri Smart Energy, saya ingin konsultasi solusi energi surya untuk area kebun/perkebunan tanpa PLN",
  },
  {
    icon: Settings,
    problem: "Genset Boros BBM & Ribet",
    desc: "Genset diesel memerlukan bahan bakar terus-menerus, menghasilkan polusi, berisik, dan butuh perawatan rutin. Biaya operasional membengkak tanpa henti setiap bulan.",
    solution:
      "Panel surya bekerja otomatis tanpa bahan bakar, tanpa suara, dan hampir tanpa perawatan. Investasi sekali, manfaat puluhan tahun. Cocok menggantikan genset di kebun, pondok, dan site proyek.",
    cta: "Bandingkan Genset vs Solar",
    ctaWa: "Halo PT. Jaya Mandiri Smart Energy, saya ingin membandingkan biaya genset vs panel surya untuk lokasi saya",
  },
  {
    icon: Droplets,
    problem: "Pompa Air Listrik Mahal",
    desc: "Biaya operasional pompa air menggunakan listrik PLN atau genset sangat tinggi — bisa Rp 2-8 juta per bulan. Untuk irigasi kebun sawit skala besar, ini beban yang tidak efisien.",
    solution:
      "Solar water pump menggerakkan pompa submersible langsung dari energi matahari — biaya operasional Rp 0. Balik modal dalam 2-4 tahun, lalu air gratis selama 20+ tahun.",
    cta: "Hitung Kebutuhan Pompa Saya",
    ctaWa: "Halo PT. Jaya Mandiri Smart Energy, saya ingin konsultasi solar water pump untuk irigasi kebun saya",
  },
];

export function ProblemSolutionSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="masalah" className="py-20 md:py-28 bg-background" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold text-red-600 bg-red-50 dark:bg-red-900/20 rounded-full">
            Masalah yang Kami Selesaikan
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy dark:text-white mb-6">
            Masalah Energi Anda,{" "}
            <span className="gradient-text">Solusi Nyata dari Kami</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Jambi Solar Panel by PT. Jaya Mandiri Smart Energy menyediakan
            sistem energi mandiri Off-Grid &amp; Hybrid yang dirancang sesuai
            kebutuhan real Anda. Bukan sekadar menjual panel — kami memberikan
            solusi total.
          </p>
        </motion.div>

        {/* Problem-Solution Cards */}
        <div className="space-y-6">
          {painPoints.map((item, i) => (
            <motion.div
              key={item.problem}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative p-6 md:p-8 rounded-2xl border border-border bg-card hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-red-400 to-solar" />
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Problem */}
                <div className="flex-1">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center shrink-0">
                      <item.icon className="w-6 h-6 text-red-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-navy dark:text-white mb-1">
                        {item.problem}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Arrow */}
                <div className="hidden lg:flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-solar/10 flex items-center justify-center">
                    <ArrowRight className="w-5 h-5 text-solar" />
                  </div>
                </div>

                {/* Solution */}
                <div className="flex-1 pl-0 lg:pl-4 border-l-0 lg:border-l-2 border-solar/20">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-solar/10 flex items-center justify-center shrink-0">
                      <CheckCircle className="w-6 h-6 text-solar" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-solar mb-1 uppercase tracking-wide">
                        Solusi JMSE
                      </p>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        {item.solution}
                      </p>
                      {/* Segment CTA */}
                      <a
                        href={`https://wa.me/6281328190707?text=${encodeURIComponent(item.ctaWa)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-solar hover:bg-solar-dark text-white text-sm font-semibold rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-solar/30 hover:scale-105"
                      >
                        <MessageCircle className="w-4 h-4" />
                        {item.cta}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
