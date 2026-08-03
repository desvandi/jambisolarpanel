"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Calculator,
  Zap,
  Wallet,
  TrendingUp,
  MessageCircle,
  Sun,
  Info,
  ChevronDown,
  ChevronUp,
  Calendar,
} from "lucide-react";
import {
  rentalCalculatorConfig,
  recommendRentalPackage,
  estimateMonthlyProduction,
  formatRentalRp,
  formatRentalRpShort,
  buildWhatsAppUrl,
  getInstallationFee,
  getInstallationInstallment,
} from "@/lib/rentalPackages";

/**
 * Section "Kalkulator" — simulator sederhana yang merekomendasikan
 * paket sewa berdasarkan pemakaian listrik & budget bulanan.
 */
export function SewaPltsCalculator() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [usage, setUsage] = useState<number>(400); // kWh/bulan
  const [budget, setBudget] = useState<number>(1720000); // Rp/bulan (paket Home)
  const [showAssumptions, setShowAssumptions] = useState(false);

  const recommendation = recommendRentalPackage(usage, budget);
  const pkg = recommendation?.package;
  const monthlyProduction = pkg ? estimateMonthlyProduction(pkg.kWp) : 0;
  const coverage = usage > 0 ? Math.min(Math.round((monthlyProduction / usage) * 100), 100) : 0;
  const plnCostBefore = usage * rentalCalculatorConfig.plnTariffPerKwh;
  const plnCostAfter = Math.max(usage - monthlyProduction, 0) * rentalCalculatorConfig.plnTariffPerKwh;
  const monthlyNetSaving = plnCostBefore - plnCostAfter - (pkg?.monthlyPrice ?? 0);

  // One-off installation fee (paid once at start of contract, can be installment)
  const installationFee = pkg ? getInstallationFee(pkg.kWp) : 0;
  const installment = pkg ? getInstallationInstallment(pkg.kWp) : null;
  // Months needed for cumulative net savings to recover installation fee
  const installationPaybackMonths =
    monthlyNetSaving > 0 ? Math.ceil(installationFee / monthlyNetSaving) : null;
  // Annual savings if user pays yearly instead of monthly
  const annualSavings = pkg ? pkg.monthlyPrice * 12 - pkg.annualPrice : 0;

  const waMsg =
    `Halo Jambi Solar Panel.\n\n` +
    `Saya sudah coba kalkulator Sewa PLTS di website:\n` +
    `- Pemakaian: ${usage} kWh/bulan\n` +
    `- Budget: ${formatRentalRp(budget)}/bulan\n` +
    `- Rekomendasi: ${pkg?.name ?? "-"} (${pkg ? formatRentalRp(pkg.monthlyPrice) : "-"} /bulan)\n` +
    `- Bayar tahunan: ${pkg ? formatRentalRp(pkg.annualPrice) : "-"} (hemat ${pkg ? formatRentalRpShort(annualSavings) : "-"})\n` +
    `- Biaya instalasi: ${pkg ? formatRentalRp(installationFee) : "-"} (cicil 2 bln)\n\n` +
    `Mohon konsultasi lebih lanjut. Terima kasih.`;

  return (
    <section
      id="kalkulator-sewa"
      className="py-20 md:py-28 solar-gradient relative overflow-hidden"
      ref={ref}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 right-10 w-64 h-64 bg-solar/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-gold/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 text-sm font-semibold text-white bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <Calculator className="w-4 h-4" />
            Kalkulator Sewa PLTS
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-5">
            Hitung Paket yang{" "}
            <span className="text-gold-light">Cocok</span> untuk Anda
          </h2>
          <p className="text-lg text-white/70 leading-relaxed">
            Masukkan pemakaian listrik bulanan dan budget Anda — kami
            merekomendasikan paket sewa yang paling sesuai.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="glass rounded-3xl p-6 sm:p-10">
            {/* Step 1: Usage input */}
            <div className="text-center mb-8">
              <p className="text-sm font-medium text-navy/60 dark:text-white/60 mb-4 flex items-center justify-center gap-2">
                <Zap className="w-4 h-4 text-solar" />
                Pemakaian listrik bulanan Anda:
              </p>
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {rentalCalculatorConfig.usagePresets.map((preset) => (
                  <button
                    key={preset.value}
                    onClick={() => setUsage(preset.value)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                      usage === preset.value
                        ? "bg-solar text-white shadow-lg shadow-solar/30"
                        : "bg-white dark:bg-navy text-navy dark:text-white border border-border hover:border-solar/50"
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold text-solar">
                {usage.toLocaleString("id-ID")}
                <span className="text-base font-medium text-muted-foreground ml-1">
                  kWh/bulan
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                ≈ {formatRentalRp(plnCostBefore)} tagihan PLN/bulan
              </p>
            </div>

            {/* Step 2: Budget input */}
            <div className="text-center mb-8">
              <p className="text-sm font-medium text-navy/60 dark:text-white/60 mb-4 flex items-center justify-center gap-2">
                <Wallet className="w-4 h-4 text-solar" />
                Budget bulanan untuk sewa PLTS:
              </p>
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {rentalCalculatorConfig.budgetPresets.map((preset) => (
                  <button
                    key={preset.value}
                    onClick={() => setBudget(preset.value)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                      budget === preset.value
                        ? "bg-solar text-white shadow-lg shadow-solar/30"
                        : "bg-white dark:bg-navy text-navy dark:text-white border border-border hover:border-solar/50"
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold text-solar">
                {formatRentalRp(budget)}
                <span className="text-base font-medium text-muted-foreground ml-1">
                  /bulan
                </span>
              </div>
            </div>

            {/* Step 3: Recommendation result */}
            {pkg && (
              <div className="p-5 rounded-2xl bg-gradient-to-br from-solar/5 to-gold/5 border border-solar/15 mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <Sun className="w-5 h-5 text-solar" />
                  <h3 className="font-bold text-navy dark:text-white text-base">
                    Rekomendasi Paket untuk Anda
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  {/* Recommended package */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-solar/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Calculator className="w-4 h-4 text-solar" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Paket Rekomendasi</p>
                      <p className="font-bold text-solar text-base">{pkg.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {pkg.kWp} kWp + {pkg.storageKwh} kWh baterai
                      </p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Wallet className="w-4 h-4 text-gold" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Biaya Sewa</p>
                      <p className="font-bold text-navy dark:text-white">
                        {formatRentalRp(pkg.monthlyPrice)}/bulan
                      </p>
                      <p className="text-xs text-muted-foreground">Sudah termasuk PPN</p>
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
                        {monthlyProduction.toLocaleString("id-ID")} kWh/bulan
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Offset ~{coverage}% pemakaian Anda
                      </p>
                    </div>
                  </div>

                  {/* Net saving */}
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        monthlyNetSaving >= 0
                          ? "bg-solar/10"
                          : "bg-amber-500/10"
                      }`}
                    >
                      <TrendingUp
                        className={`w-4 h-4 ${
                          monthlyNetSaving >= 0
                            ? "text-solar"
                            : "text-amber-600 dark:text-amber-400"
                        }`}
                      />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Estimasi Net Saving</p>
                      <p
                        className={`font-bold ${
                          monthlyNetSaving >= 0
                            ? "text-solar"
                            : "text-amber-600 dark:text-amber-400"
                        }`}
                      >
                        {monthlyNetSaving >= 0 ? "+" : ""}
                        {formatRentalRpShort(monthlyNetSaving)}/bulan
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Setelah dikurangi biaya sewa
                      </p>
                    </div>
                  </div>
                </div>

                {/* Reason */}
                <div className="p-3 rounded-xl bg-muted/50 border border-border mb-3">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    <strong className="text-navy dark:text-white">Analisis:</strong>{" "}
                    {recommendation?.reason}
                  </p>
                </div>

                {/* Installation fee notice */}
                <div className="p-3 rounded-xl bg-gradient-to-r from-gold/5 to-solar/5 border border-gold/20">
                  <div className="flex items-start gap-2">
                    <Wallet className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-navy dark:text-white">
                        Biaya instalasi:{" "}
                        <span className="text-gold">{formatRentalRp(installationFee)}</span>
                      </p>
                      <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">
                        Dibayar di awal kontrak, sudah termasuk bongkar saat kontrak selesai.
                        {installment && (
                          <>
                            {" "}
                            Bisa dicicil{" "}
                            <strong className="text-gold">
                              {installment.months} bulan
                            </strong>{" "}
                            @{" "}
                            <strong className="text-gold">
                              {formatRentalRpShort(installment.installmentPerMonth)}/bulan
                            </strong>{" "}
                            (digabung dengan sewa bulanan di 2 bulan pertama).
                          </>
                        )}
                        {installationPaybackMonths !== null && monthlyNetSaving > 0 && (
                          <>
                            {" "}
                            Dengan net saving{" "}
                            <strong className="text-solar">
                              {formatRentalRpShort(monthlyNetSaving)}/bulan
                            </strong>
                            , biaya instalasi kembali dalam{" "}
                            <strong className="text-solar">
                              ~{installationPaybackMonths} bulan
                            </strong>
                            .
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Annual payment option */}
                {annualSavings > 0 && (
                  <div className="mt-2 p-3 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border border-emerald-200 dark:border-emerald-800/30">
                    <div className="flex items-start gap-2">
                      <Calendar className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-xs font-semibold text-navy dark:text-white">
                          Opsi bayar tahunan:{" "}
                          <span className="text-emerald-600 dark:text-emerald-400">
                            {formatRentalRp(pkg.annualPrice)}
                          </span>
                        </p>
                        <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">
                          Lebih hemat{" "}
                          <strong className="text-emerald-600 dark:text-emerald-400">
                            {formatRentalRpShort(annualSavings)}/tahun
                          </strong>{" "}
                          dibanding bayar bulanan 12×. Cocok untuk mengunci biaya
                          operasional setahun ke depan.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Savings breakdown */}
            {pkg && (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 rounded-2xl bg-solar/5 border border-solar/10">
                  <p className="text-xs text-muted-foreground mb-1">Tagihan PLN Sebelum</p>
                  <p className="text-lg sm:text-xl font-bold text-red-500/80 dark:text-red-400">
                    {formatRentalRpShort(plnCostBefore)}
                  </p>
                </div>
                <div className="text-center p-4 rounded-2xl bg-solar/5 border border-solar/10">
                  <p className="text-xs text-muted-foreground mb-1">Tagihan PLN Setelah</p>
                  <p className="text-lg sm:text-xl font-bold text-solar">
                    {formatRentalRpShort(plnCostAfter)}
                  </p>
                </div>
                <div className="col-span-2 lg:col-span-1 text-center p-4 rounded-2xl bg-gold/5 border border-gold/20">
                  <p className="text-xs text-muted-foreground mb-1">Total Outflow/Bulan</p>
                  <p className="text-lg sm:text-xl font-bold text-gold">
                    {formatRentalRpShort(plnCostAfter + pkg.monthlyPrice)}
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    PLN sisa + sewa
                  </p>
                </div>
              </div>
            )}

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
                  <strong>Tarif PLN:</strong> Rp{" "}
                  {rentalCalculatorConfig.plnTariffPerKwh.toLocaleString("id-ID")}/kWh
                  (tarif R-1 1300VA ke atas, non-subsidi).
                </p>
                <p>
                  <strong>Produksi surya:</strong> kWp × PSH (3,75 jam) ×
                  efisiensi (80%) × 30 hari. PSH Jambi = 3,75 jam/hari.
                </p>
                <p>
                  <strong>Coverage:</strong> persentase pemakaian bulanan Anda
                  yang dapat dipasok oleh produksi surya. Sistem hybrid
                  memungkinkan seluruh energi surya dimanfaatkan.
                </p>
                <p>
                  <strong>Net saving:</strong> penghematan tagihan PLN dikurangi
                  biaya sewa. Pada bulan-bulan dengan produksi tinggi, net
                  saving positif. Pada bulan mendung, tetap ada penghematan
                  karena baterai menyimpan energi siang untuk malam.
                </p>
                <p>
                  <strong>Biaya instalasi:</strong> dibayar sekali di awal
                  kontrak, besaran sesuai kapasitas paket (lihat daftar paket).
                  Sudah mencakup survei, desain, instalasi lengkap,
                  commissioning, dan pembongkaran equipment saat kontrak
                  berakhir. Dapat dicicil maksimal 2 bulan — selama 2 bulan
                  pertama, tagihan = sewa bulanan + (biaya instalasi ÷ 2).
                </p>
                <p>
                  <strong>Bayar tahunan:</strong> opsi pembayaran di muka untuk
                  12 bulan, dengan total lebih hemat dibanding 12× harga
                  bulanan. Selisih hemat ditampilkan otomatis di atas.
                </p>
                <p>
                  <strong>Payback instalasi:</strong> estimasi jumlah bulan
                  sampai akumulasi net saving bulanan menyamai biaya instalasi
                  awal. Setelah titik ini, semua penghematan adalah keuntungan
                  bersih bagi Anda.
                </p>
                <p>
                  <strong>Catatan:</strong> Angka bersifat estimasi. Konsultasi
                  & survei gratis diperlukan untuk perhitungan akurat sesuai
                  kondisi atap, arah hadap, dan pola konsumsi aktual.
                </p>
              </motion.div>
            )}

            {/* CTA */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Mau rekomendasi yang lebih akurat? Konsultasi dengan tim kami —
                gratis!
              </p>
              <a
                href={buildWhatsAppUrl(waMsg)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-solar hover:bg-solar-dark text-white font-bold rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-solar/30 hover:scale-105"
              >
                <MessageCircle className="w-5 h-5" />
                Konsultasi Paket {pkg?.name ?? "Saya"}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
