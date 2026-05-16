"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Calculator, TrendingDown, MessageCircle } from "lucide-react";

const WA_LINK =
  "https://wa.me/6281328190707?text=Halo%20PT.%20Jaya%20Mandiri%20Smart%20Energy,%20saya%20tertarik%20konsultasi%20panel%20surya";

const billPresets = [
  { label: "Rp 500rb", value: 500000 },
  { label: "Rp 1jt", value: 1000000 },
  { label: "Rp 2jt", value: 2000000 },
  { label: "Rp 3jt", value: 3000000 },
  { label: "Rp 5jt", value: 5000000 },
  { label: "Rp 10jt", value: 10000000 },
];

function formatRp(num: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
}

export function SavingsCalculator() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [bill, setBill] = useState(2000000);

  const monthlySavings = bill * 0.75;
  const yearlySavings = monthlySavings * 12;
  const fiveYearSavings = yearlySavings * 5;
  const twentyFiveYearSavings = yearlySavings * 25;
  const co2Saved = (bill * 12 * 0.75 * 0.0008) / 1000; // tonnes CO2

  return (
    <section
      id="kalkulator"
      className="py-20 md:py-28 solar-gradient relative overflow-hidden"
      ref={ref}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 right-10 w-64 h-64 bg-solar/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-gold/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 text-sm font-semibold text-white bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <Calculator className="w-4 h-4" />
            Kalkulator Penghematan
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6">
            Hitung Potensi{" "}
            <span className="text-gold-light">Penghematan</span> Anda
          </h2>
          <p className="text-lg text-white/70 leading-relaxed">
            Masukkan tagihan listrik bulanan Anda dan lihat berapa besar hemat yang
            bisa Anda dapatkan dengan panel surya.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="glass rounded-3xl p-6 sm:p-10">
            {/* Input */}
            <div className="text-center mb-8">
              <p className="text-sm font-medium text-navy/60 dark:text-white/60 mb-4">
                Pilih tagihan listrik bulanan Anda:
              </p>
              <div className="flex flex-wrap justify-center gap-3 mb-6">
                {billPresets.map((preset) => (
                  <button
                    key={preset.value}
                    onClick={() => setBill(preset.value)}
                    className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                      bill === preset.value
                        ? "bg-solar text-white shadow-lg shadow-solar/30"
                        : "bg-white dark:bg-navy text-navy dark:text-white border border-border hover:border-solar/50"
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
              <div className="text-4xl sm:text-5xl font-extrabold text-solar">
                {formatRp(bill)}
                <span className="text-lg font-medium text-muted-foreground">/bulan</span>
              </div>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="text-center p-4 rounded-2xl bg-solar/5 border border-solar/10">
                <TrendingDown className="w-6 h-6 text-solar mx-auto mb-2" />
                <p className="text-xs text-muted-foreground mb-1">Hemat / Bulan</p>
                <p className="text-xl sm:text-2xl font-bold text-solar">
                  {formatRp(monthlySavings)}
                </p>
              </div>
              <div className="text-center p-4 rounded-2xl bg-solar/5 border border-solar/10">
                <TrendingDown className="w-6 h-6 text-solar mx-auto mb-2" />
                <p className="text-xs text-muted-foreground mb-1">Hemat / Tahun</p>
                <p className="text-xl sm:text-2xl font-bold text-solar">
                  {formatRp(yearlySavings)}
                </p>
              </div>
              <div className="text-center p-4 rounded-2xl bg-gold/5 border border-gold/20">
                <p className="text-xs text-muted-foreground mb-1">
                  Total 5 Tahun
                </p>
                <p className="text-xl sm:text-2xl font-bold text-gold">
                  {formatRp(fiveYearSavings)}
                </p>
              </div>
              <div className="text-center p-4 rounded-2xl bg-gold/5 border border-gold/20">
                <p className="text-xs text-muted-foreground mb-1">
                  Total 25 Tahun
                </p>
                <p className="text-xl sm:text-2xl font-bold text-gold">
                  {formatRp(twentyFiveYearSavings)}
                </p>
              </div>
            </div>

            {/* Environmental impact */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border border-emerald-200 dark:border-emerald-800/30 mb-8">
              <p className="text-center text-sm text-emerald-700 dark:text-emerald-300">
                Selain hemat uang, Anda juga mengurangi{" "}
                <span className="font-bold">
                  {co2Saved.toFixed(1)} ton CO2 per tahun
                </span>{" "}
                dan berkontribusi pada lingkungan yang lebih bersih.
              </p>
            </div>

            {/* CTA */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Ingin tahu estimasi penghematan yang lebih akurat untuk lokasi
                Anda?
              </p>
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-solar hover:bg-solar-dark text-white font-bold rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-solar/30 hover:scale-105"
              >
                <MessageCircle className="w-5 h-5" />
                Konsultasi Gratis Sekarang
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
