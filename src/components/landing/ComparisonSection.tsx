"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { BarChart3, Zap, Battery, Plug } from "lucide-react";

const WA_LINK =
  "https://wa.me/6281328190707?text=Halo%20PT.%20Jaya%20Mandiri%20Smart%20Energy,%20saya%20telah%20melihat%20perbandingan%20PLN%20vs%20Panel%20Surya%20di%20website%20anda%20dan%20ingin%20beralih%20ke%20panel%20surya";

const comparisons = [
  {
    category: "Biaya Bulanan",
    pln: { icon: Plug, text: "Naik terus setiap tahun", value: "Rp 2-5jt+", color: "text-red-500" },
    solar: { icon: Zap, text: "Hampir Rp 0 setelah ROI", value: "Rp 0*", color: "text-solar" },
  },
  {
    category: "Kenaikan Tarif",
    pln: { icon: Plug, text: "Rata-rata naik 5-10% per tahun", value: "5-10%/thn", color: "text-red-500" },
    solar: { icon: Zap, text: "Tidak terpengaruh tarif PLN", value: "0%", color: "text-solar" },
  },
  {
    category: "Keandalan",
    pln: { icon: Plug, text: "Risiko padam, terutama daerah tertentu", value: "80-90%", color: "text-red-500" },
    solar: { icon: Battery, text: "Energi tersimpan 24/7, hujan atau cerah", value: "99%+", color: "text-solar" },
  },
  {
    category: "Nilai Properti",
    pln: { icon: Plug, text: "Tidak ada peningkatan nilai", value: "0%", color: "text-red-500" },
    solar: { icon: Zap, text: "Naik 4-6% menurut studi properti", value: "+4-6%", color: "text-solar" },
  },
  {
    category: "Masa Pakai Sistem",
    pln: { icon: Plug, text: "Terikat berlangganan tanpa batas", value: "Selamanya bayar", color: "text-red-500" },
    solar: { icon: Battery, text: "25+ tahun masa pakai panel", value: "25+ tahun gratis", color: "text-solar" },
  },
  {
    category: "Dampak Lingkungan",
    pln: { icon: Plug, text: "Emisi karbon tinggi dari batu bara", value: "CO2 Tinggi", color: "text-red-500" },
    solar: { icon: Zap, text: "Energi bersih, bebas emisi", value: "100% Hijau", color: "text-solar" },
  },
];

export function ComparisonSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [showSolar, setShowSolar] = useState(true);

  return (
    <section className="py-16 md:py-20 bg-muted/30" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 text-sm font-semibold text-solar bg-solar/10 rounded-full">
            <BarChart3 className="w-4 h-4" />
            Perbandingan
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy dark:text-white mb-6">
            PLN vs{" "}
            <span className="gradient-text">Panel Surya</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Lihat perbandingan nyata antara menggunakan listrik PLN konvensional
            dengan beralih ke sistem panel surya. Angka tidak pernah berbohong.
          </p>
        </motion.div>

        {/* Toggle */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 rounded-full bg-card border border-border">
            <button
              onClick={() => setShowSolar(false)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                !showSolar
                  ? "bg-red-500 text-white shadow-lg"
                  : "text-muted-foreground hover:text-navy dark:hover:text-white"
              }`}
            >
              PLN Konvensional
            </button>
            <button
              onClick={() => setShowSolar(true)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                showSolar
                  ? "bg-solar text-white shadow-lg"
                  : "text-muted-foreground hover:text-navy dark:hover:text-white"
              }`}
            >
              Panel Surya Kami
            </button>
          </div>
        </div>

        {/* Comparison Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {comparisons.map((item, i) => {
            const data = showSolar ? item.solar : item.pln;
            return (
              <motion.div
                key={item.category}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className={`p-6 rounded-2xl border transition-all duration-500 ${
                  showSolar
                    ? "bg-card border-solar/20 hover:border-solar/40"
                    : "bg-card border-red-200 dark:border-red-800/30 hover:border-red-400"
                }`}
              >
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  {item.category}
                </p>
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      showSolar ? "bg-solar/10" : "bg-red-50 dark:bg-red-900/20"
                    }`}
                  >
                    <data.icon
                      className={`w-5 h-5 ${showSolar ? "text-solar" : "text-red-500"}`}
                    />
                  </div>
                  <p className={`text-xl font-bold ${data.color}`}>
                    {data.value}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {data.text}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-sm text-muted-foreground mb-2">
            *Setelah masa ROI tercapai (estimasi 5-8 tahun, tergantung kapasitas sistem)
          </p>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-solar hover:bg-solar-dark text-white font-bold rounded-full transition-all duration-300 hover:shadow-xl hover:scale-105"
          >
            Beralih ke Panel Surya Sekarang
          </a>
        </motion.div>
      </div>
    </section>
  );
}
