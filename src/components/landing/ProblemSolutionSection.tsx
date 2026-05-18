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
} from "lucide-react";

const painPoints = [
  {
    icon: ZapOff,
    problem: "Listrik Sering Padam",
    desc: "Pemadaman listrik mengganggu aktivitas keluarga dan bisnis Anda setiap hari.",
    solution:
      "Sistem PLTS kami dilengkapi baterai penyimpanan yang memastikan listrik tetap menyala 24 jam, bahkan saat PLN padam.",
  },
  {
    icon: Receipt,
    problem: "Token Listrik Semakin Mahal",
    desc: "Tagihan listrik PLN terus meningkat setiap bulan tanpa ada tanda-tanda turun.",
    solution:
      "Dengan panel surya, Anda menghasilkan listrik sendiri secara gratis dari matahari. Hemat hingga 90% tagihan listrik setiap bulannya.",
  },
  {
    icon: MapPinOff,
    problem: "Lokasi Kebun Tanpa PLN",
    desc: "Area perkebunan dan pedesaan belum terjangkau listrik PLN, menghambat produktivitas.",
    solution:
      "Sistem Off-Grid kami dirancang khusus untuk area terpencil tanpa PLN. Cocok untuk pompa air, CCTV, PJU, dan pondok kebun.",
  },
  {
    icon: Settings,
    problem: "Mesin Diesel Boros & Ribet",
    desc: "Genset memerlukan bahan bakar terus-menerus, bising, dan perawatan rutin yang mahal.",
    solution:
      "Panel surya bekerja secara otomatis tanpa bahan bakar, tanpa suara, dan hampir tanpa perawatan. Investasi sekali, manfaat puluhan tahun.",
  },
  {
    icon: Droplets,
    problem: "Pompa Air Listrik Mahal",
    desc: "Biaya operasional pompa air menggunakan listrik PLN atau genset sangat tinggi.",
    solution:
      "Solar water pump system kami mampu menggerakkan pompa air langsung dari energi matahari dengan biaya operasional mendekati nol.",
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
            Masalah Listrik Anda,{" "}
            <span className="gradient-text">Solusi Cerdas dari Kami</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            PT. Jaya Mandiri Smart Energy menyediakan sistem energi mandiri yang
            dirancang sesuai kebutuhan real Anda. Bukan sekadar menjual panel,
            kami memberikan solusi total.
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
              <div className="flex flex-col md:flex-row gap-6">
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
                <div className="hidden md:flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-solar/10 flex items-center justify-center">
                    <ArrowRight className="w-5 h-5 text-solar" />
                  </div>
                </div>

                {/* Solution */}
                <div className="flex-1 pl-0 md:pl-4 border-l-0 md:border-l-2 border-solar/20">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-solar/10 flex items-center justify-center shrink-0">
                      <CheckCircle className="w-6 h-6 text-solar" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-solar mb-1 uppercase tracking-wide">
                        Solusi JMSE
                      </p>
                      <p className="text-muted-foreground leading-relaxed">
                        {item.solution}
                      </p>
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
