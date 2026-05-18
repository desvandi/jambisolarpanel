"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useCallback } from "react";
import {
  Calculator,
  TrendingDown,
  MessageCircle,
  Zap,
  Clock,
  TrendingUp,
  Sun,
  Info,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useEffect } from "react";
import {
  calculatePackages,
  calculateROI,
  recommendPackage,
  formatRp,
  PLN_TARIFF_DEFAULT,
  SELF_CONSUMPTION_DEFAULT,
  PLN_INCREASE_RATE_DEFAULT,
} from "@/lib/pricing";

const WA_LINK =
  "https://wa.me/6281328190707?text=Halo%20PT.%20Jaya%20Mandiri%20Smart%20Energy,%20saya%20sudah%20menghitung%20estimasi%20penghematan%20di%20kalkulator%20website%20anda%20dan%20tertarik%20untuk%20konsultasi%20lebih%20lanjut";

const billPresets = [
  { label: "Rp 500rb", value: 500000 },
  { label: "Rp 1jt", value: 1000000 },
  { label: "Rp 2jt", value: 2000000 },
  { label: "Rp 3jt", value: 3000000 },
  { label: "Rp 5jt", value: 5000000 },
  { label: "Rp 10jt", value: 10000000 },
];

function formatRpShort(num: number): string {
  if (num >= 1_000_000) return `Rp ${(num / 1_000_000).toFixed(num % 1_000_000 === 0 ? 0 : 1)}jt`;
  return `Rp ${Math.round(num / 1000)}rb`;
}

interface AnalysisResult {
  recommended: ReturnType<typeof calculatePackages>[0];
  monthlyKwh: number;
  productionKwh: number;
  coverage: number;
  roi: ReturnType<typeof calculateROI>;
  co2PerYear: number;
  needsCustom: boolean;
}

export function SavingsCalculator() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [bill, setBill] = useState(2000000);
  const [showAssumptions, setShowAssumptions] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);

  // Compute analysis client-side only (after mount) to avoid hydration mismatch
  // caused by calculatePackages() reading localStorage on client but not on SSR
  const computeAnalysis = useCallback((billValue: number): AnalysisResult | null => {
    const allPkgs = calculatePackages();
    const rec = recommendPackage(billValue, allPkgs);
    if (!rec) return null;

    const monthlyKwh = billValue / PLN_TARIFF_DEFAULT;
    const productionKwh = rec.kWp * 3.75 * 0.80 * 30; // PSH × efficiency × 30 days
    const coverage = Math.round((productionKwh / monthlyKwh) * 100);

    const roi = calculateROI(rec.price, rec.kWp * 3.75 * 0.80);

    // CO2 saved (Indonesia grid: ~0.8 kg CO2/kWh)
    const co2PerYear = (roi.annualSavingsBase / PLN_TARIFF_DEFAULT) * 0.8 / 1000;

    // Check if largest package still < 50% coverage
    const largestPkg = allPkgs[allPkgs.length - 1];
    const largestProduction = largestPkg
      ? largestPkg.kWp * 3.75 * 0.80 * 30
      : 0;
    const needsCustom = largestProduction < monthlyKwh * 0.5;

    return {
      recommended: rec,
      monthlyKwh: Math.round(monthlyKwh),
      productionKwh: Math.round(productionKwh),
      coverage,
      roi,
      co2PerYear,
      needsCustom,
    };
  }, []);

  useEffect(() => {
    setAnalysis(computeAnalysis(bill));
  }, [bill, computeAnalysis]);

  // Also recompute when pricing settings change
  useEffect(() => {
    const handler = () => setAnalysis(computeAnalysis(bill));
    window.addEventListener("jmse-pricing-updated", handler);
    return () => window.removeEventListener("jmse-pricing-updated", handler);
  }, [bill, computeAnalysis]);

  if (!analysis) return null;

  const { recommended: rec, monthlyKwh, productionKwh, coverage, roi, co2PerYear, needsCustom } = analysis;

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
            Masukkan tagihan listrik bulanan Anda — kami akan menganalisis
            kebutuhan dan merekomendasikan paket yang paling sesuai.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="glass rounded-3xl p-6 sm:p-10">
            {/* Step 1: Bill Input */}
            <div className="text-center mb-8">
              <p className="text-sm font-medium text-navy/60 dark:text-white/60 mb-4">
                Tagihan listrik bulanan Anda:
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

            {/* Step 2: Analysis */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-solar/5 to-gold/5 border border-solar/15 mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Sun className="w-5 h-5 text-solar" />
                <h3 className="font-bold text-navy dark:text-white text-base">
                  Analisis Kebutuhan Anda
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Consumption */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-navy/5 dark:bg-white/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Zap className="w-4 h-4 text-navy dark:text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Estimasi Pemakaian</p>
                    <p className="font-bold text-navy dark:text-white">
                      ~{monthlyKwh.toLocaleString("id-ID")} kWh/bulan
                    </p>
                  </div>
                </div>

                {/* Recommended Package */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-solar/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Calculator className="w-4 h-4 text-solar" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Rekomendasi Paket</p>
                    <p className="font-bold text-solar">{rec.name}</p>
                  </div>
                </div>

                {/* Production */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Produksi Sistem</p>
                    <p className="font-bold text-navy dark:text-white">
                      {productionKwh.toLocaleString("id-ID")} kWh/bulan
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Offset ~{Math.min(coverage, 100)}% tagihan Anda
                    </p>
                  </div>
                </div>

                {/* System Price */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Clock className="w-4 h-4 text-gold" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Investasi</p>
                    <p className="font-bold text-navy dark:text-white">{rec.priceFormatted}</p>
                    <p className="text-xs text-muted-foreground">
                      Sudah termasuk PPN 11%
                    </p>
                  </div>
                </div>
              </div>

              {needsCustom && (
                <div className="mt-4 p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/30">
                  <p className="text-xs text-blue-700 dark:text-blue-300 leading-relaxed">
                    <strong>Custom Solution:</strong> Kebutuhan Anda melebihi kapasitas
                    paket standar terbesar. Tim kami dapat merancang sistem custom
                    hingga 500+ kWp. Hubungi kami untuk proposal khusus.
                  </p>
                </div>
              )}
            </div>

            {/* Step 3: Results */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-4 rounded-2xl bg-solar/5 border border-solar/10">
                <TrendingDown className="w-6 h-6 text-solar mx-auto mb-2" />
                <p className="text-xs text-muted-foreground mb-1">Hemat / Bulan</p>
                <p className="text-xl sm:text-2xl font-bold text-solar">
                  {formatRpShort(roi.monthlySavingsBase)}
                </p>
              </div>
              <div className="text-center p-4 rounded-2xl bg-solar/5 border border-solar/10">
                <TrendingDown className="w-6 h-6 text-solar mx-auto mb-2" />
                <p className="text-xs text-muted-foreground mb-1">Hemat / Tahun</p>
                <p className="text-xl sm:text-2xl font-bold text-solar">
                  {formatRpShort(roi.annualSavingsBase)}
                </p>
              </div>
              <div className="text-center p-4 rounded-2xl bg-gold/5 border border-gold/20">
                <Clock className="w-6 h-6 text-gold mx-auto mb-2" />
                <p className="text-xs text-muted-foreground mb-1">
                  Estimasi ROI
                </p>
                <p className="text-xl sm:text-2xl font-bold text-gold">
                  ~{roi.roiYearsWithIncrease} thn
                </p>
                <p className="text-[10px] text-muted-foreground">
                  (+{Math.round(PLN_INCREASE_RATE_DEFAULT * 100)}%/thn tarif)
                </p>
              </div>
              <div className="text-center p-4 rounded-2xl bg-gold/5 border border-gold/20">
                <TrendingUp className="w-6 h-6 text-gold mx-auto mb-2" />
                <p className="text-xs text-muted-foreground mb-1">
                  Return 25 Tahun
                </p>
                <p className="text-xl sm:text-2xl font-bold text-gold">
                  {roi.returnMultiplier}x
                </p>
                <p className="text-[10px] text-muted-foreground">
                  Net: {formatRpShort(roi.return25Year)}
                </p>
              </div>
            </div>

            {/* Key insight box */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border border-emerald-200 dark:border-emerald-800/30 mb-6">
              <p className="text-center text-sm text-emerald-700 dark:text-emerald-300 leading-relaxed">
                Investasi <strong>{rec.priceFormatted}</strong> hari ini menghasilkan
                total penghematan <strong>{formatRp(roi.return25Year + rec.price)}</strong> dalam 25 tahun
                — keuntungan bersih <strong>{formatRp(roi.return25Year)}</strong> (ROI{" "}
                <strong>{roi.returnMultiplier}x lipat</strong>). Ini setara{" "}
                deposito yang memberikan return{" "}
                {Math.round(((roi.returnMultiplier - 1) / 25) * 100)}% per tahun secara konsisten,
                jauh di atas inflasi dan tanpa risiko pasar.
              </p>
            </div>

            {/* Environmental impact */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-green-50 to-lime-50 dark:from-green-900/20 dark:to-lime-900/20 border border-green-200 dark:border-green-800/30 mb-6">
              <p className="text-center text-sm text-green-700 dark:text-green-300">
                Selain hemat uang, Anda juga mengurangi emisi{" "}
                <span className="font-bold">
                  {co2PerYear.toFixed(1)} ton CO2 per tahun
                </span>{" "}
                dan berkontribusi pada lingkungan yang lebih bersih.
              </p>
            </div>

            {/* Assumptions */}
            <button
              onClick={() => setShowAssumptions(!showAssumptions)}
              className="flex items-center gap-2 mx-auto text-xs text-muted-foreground hover:text-navy dark:hover:text-white transition-colors mb-6"
            >
              <Info className="w-3.5 h-3.5" />
              Lihat asumsi perhitungan
              {showAssumptions ? (
                <ChevronUp className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
            </button>
            {showAssumptions && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mb-6 p-4 rounded-xl bg-muted/50 border border-border text-xs text-muted-foreground space-y-2 leading-relaxed"
              >
                <p>
                  <strong>Tarif PLN:</strong> Rp {PLN_TARIFF_DEFAULT.toLocaleString("id-ID")}/kWh
                  (tarif R-1 1300VA ke atas, non-subsidi). Bisnis & industri mungkin memiliki
                  tarif berbeda.
                </p>
                <p>
                  <strong>Self-consumption:</strong> {Math.round(SELF_CONSUMPTION_DEFAULT * 100)}%
                  — persentase produksi solar yang langsung digunakan oleh bangunan.
                  Sisa {100 - Math.round(SELF_CONSUMPTION_DEFAULT * 100)}% terbuang karena
                  produksi puncak terjadi saat siang hari ketika beban rumah tangga relatif rendah.
                </p>
                <p>
                  <strong>PSH Jambi:</strong> 3,75 jam/hari (rata-rata iradiasi matahari).
                  Efisiensi sistem: 80% (losses dari kabel, suhu, konversi inverter).
                </p>
                <p>
                  <strong>Kenaikan tarif PLN:</strong> {Math.round(PLN_INCREASE_RATE_DEFAULT * 100)}%
                  per tahun (berdasarkan rata-rata historis 2017-2024). Faktual bisa bervariasi.
                </p>
                <p>
                  <strong>ROI</strong> dihitung berdasarkan akumulasi penghematan tahunan
                  (termasuk kenaikan tarif) vs harga investasi paket.
                  Angka bersifat estimasi dan dapat berbeda tergantung pola konsumsi aktual.
                </p>
              </motion.div>
            )}

            {/* CTA */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Ingin perhitungan yang lebih akurat untuk lokasi spesifik Anda?
                Konsultasi dengan tim kami — gratis!
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
