"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Calculator,
  Zap,
  Wallet,
  TrendingUp,
  TrendingDown,
  MessageCircle,
  Sun,
  Info,
  ChevronDown,
  ChevronUp,
  Calendar,
  Check,
  AlertTriangle,
  ShieldCheck,
} from "lucide-react";
import {
  rentalCalculatorConfig,
  recommendRentalPackage,
  computeAllPackageSavings,
  estimateMonthlyProduction,
  formatRentalRp,
  formatRentalRpShort,
  buildWhatsAppUrl,
  getInstallationFee,
  getInstallationInstallment,
  type PackageSavingsResult,
} from "@/lib/rentalPackages";

/**
 * Section "Kalkulator" — simulator yang merekomendasikan paket sewa
 * berdasarkan pemakaian listrik & KEMAMPUAN FINANSIAL (budget) user.
 *
 * Output:
 *   1. Rekomendasi paket yang terjangkau sesuai budget + net saving terbaik
 *   2. Tabel komparasi pengurangan tagihan untuk SEMUA paket
 */
export function SewaPltsCalculator() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [usage, setUsage] = useState<number>(400); // kWh/bulan
  const [budget, setBudget] = useState<number>(1550000); // Rp/bulan (paket Home)
  const [showAssumptions, setShowAssumptions] = useState(false);
  const [showAllPackages, setShowAllPackages] = useState(false);

  const recommendation = recommendRentalPackage(usage, budget);
  const pkg = recommendation?.package;
  const recSavings = recommendation?.savings ?? null;

  // Hitung savings untuk semua paket (untuk tabel komparasi)
  const allSavings = computeAllPackageSavings(usage, budget);

  // Nilai-nilai dari rekomendasi utama
  const plnCostBefore = usage * rentalCalculatorConfig.plnTariffPerKwh;
  const installationFee = pkg ? getInstallationFee(pkg.kWp) : 0;
  const installment = pkg ? getInstallationInstallment(pkg.kWp) : null;
  const annualSavings = pkg ? pkg.monthlyPrice * 12 - pkg.annualPrice : 0;

  // Tampilkan hanya top 5 di default, sisanya bisa di-expand
  const visibleSavings = showAllPackages ? allSavings : allSavings.slice(0, 5);
  const hiddenCount = allSavings.length - visibleSavings.length;

  const waMsg =
    `Halo Jambi Solar Panel.\n\n` +
    `Saya sudah coba kalkulator Sewa PLTS di website:\n` +
    `- Pemakaian: ${usage} kWh/bulan (tagihan PLN ≈ ${formatRentalRp(plnCostBefore)}/bulan)\n` +
    `- Budget sewa: ${formatRentalRp(budget)}/bulan\n\n` +
    `Rekomendasi: ${pkg?.name ?? "-"} (${pkg ? formatRentalRp(pkg.monthlyPrice) : "-"}/bulan)\n` +
    (recSavings
      ? `- Coverage: ${recSavings.coveragePercent}%\n` +
        `- Pengurangan tagihan PLN: ${formatRentalRp(recSavings.plnSaving)}/bulan\n` +
        `- Backup baterai: ${recSavings.pkg.storageKwh} kWh (tetap nyala saat PLN padam)\n`
      : "") +
    `- Biaya Survey & Instalasi: ${formatRentalRp(installationFee)} (cicil 2 bln)\n\n` +
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
              <div className="flex flex-wrap justify-center gap-2 mb-3">
                {rentalCalculatorConfig.usagePresets.map((preset) => (
                  <button
                    key={preset.value}
                    onClick={() => setUsage(preset.value)}
                    className={`px-3 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                      usage === preset.value
                        ? "bg-solar text-white shadow-lg shadow-solar/30"
                        : "bg-white dark:bg-navy text-navy dark:text-white border border-border hover:border-solar/50"
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
              {/* Manual input for usage */}
              <div className="flex items-center justify-center gap-2 mb-4">
                <label className="text-xs text-muted-foreground">Atau ketik manual:</label>
                <input
                  type="number"
                  min={rentalCalculatorConfig.usageMin}
                  max={rentalCalculatorConfig.usageMax}
                  value={usage}
                  onChange={(e) => {
                    const v = parseInt(e.target.value, 10);
                    if (!isNaN(v)) {
                      setUsage(Math.max(rentalCalculatorConfig.usageMin, Math.min(rentalCalculatorConfig.usageMax, v)));
                    }
                  }}
                  className="w-28 px-3 py-1.5 text-sm text-center font-semibold rounded-lg border border-border bg-white dark:bg-navy text-navy dark:text-white focus:outline-none focus:border-solar focus:ring-2 focus:ring-solar/20"
                />
                <span className="text-xs text-muted-foreground">kWh</span>
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
              <div className="flex flex-wrap justify-center gap-2 mb-3">
                {rentalCalculatorConfig.budgetPresets.map((preset) => (
                  <button
                    key={preset.value}
                    onClick={() => setBudget(preset.value)}
                    className={`px-3 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                      budget === preset.value
                        ? "bg-solar text-white shadow-lg shadow-solar/30"
                        : "bg-white dark:bg-navy text-navy dark:text-white border border-border hover:border-solar/50"
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
              {/* Manual input for budget */}
              <div className="flex items-center justify-center gap-2 mb-4">
                <label className="text-xs text-muted-foreground">Atau ketik manual:</label>
                <input
                  type="number"
                  min={rentalCalculatorConfig.budgetMin}
                  max={rentalCalculatorConfig.budgetMax}
                  step={50000}
                  value={budget}
                  onChange={(e) => {
                    const v = parseInt(e.target.value, 10);
                    if (!isNaN(v)) {
                      setBudget(Math.max(rentalCalculatorConfig.budgetMin, Math.min(rentalCalculatorConfig.budgetMax, v)));
                    }
                  }}
                  className="w-32 px-3 py-1.5 text-sm text-center font-semibold rounded-lg border border-border bg-white dark:bg-navy text-navy dark:text-white focus:outline-none focus:border-solar focus:ring-2 focus:ring-solar/20"
                />
                <span className="text-xs text-muted-foreground">Rp</span>
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold text-solar">
                {formatRentalRp(budget)}
                <span className="text-base font-medium text-muted-foreground ml-1">
                  /bulan
                </span>
              </div>
            </div>

            {/* Step 3: Recommendation result */}
            {pkg && recSavings && (
              <div className="p-5 rounded-2xl bg-gradient-to-br from-solar/5 to-gold/5 border border-solar/15 mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <Sun className="w-5 h-5 text-solar" />
                  <h3 className="font-bold text-navy dark:text-white text-base">
                    Rekomendasi Paket Sesuai Budget Anda
                  </h3>
                </div>

                {/* Headline: tagihan PLN awal */}
                <div className="mb-4 p-3 rounded-xl bg-navy/5 dark:bg-white/5 border border-border">
                  <p className="text-xs text-muted-foreground text-center">
                    Tagihan PLN Anda saat ini (estimasi)
                  </p>
                  <p className="text-2xl font-extrabold text-navy dark:text-white text-center">
                    {formatRentalRp(plnCostBefore)}
                    <span className="text-sm font-medium text-muted-foreground ml-1">/bulan</span>
                  </p>
                  <p className="text-[11px] text-muted-foreground text-center mt-1">
                    Berdasarkan {usage.toLocaleString("id-ID")} kWh × Rp{" "}
                    {rentalCalculatorConfig.plnTariffPerKwh.toLocaleString("id-ID")}/kWh
                  </p>
                </div>

                {/* Recommended package card */}
                <div
                  className={`p-4 rounded-xl mb-4 border-2 ${
                    recSavings.netSaving >= 0
                      ? "bg-solar/5 border-solar/30"
                      : "bg-amber-50 dark:bg-amber-900/10 border-amber-300 dark:border-amber-700"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 rounded-lg bg-solar flex items-center justify-center flex-shrink-0">
                        <Calculator className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">
                          Paket Rekomendasi
                        </p>
                        <p className="text-lg font-bold text-solar">{pkg.name}</p>
                        <p className="text-[11px] text-muted-foreground">
                          {pkg.kWp} kWp + {pkg.storageKwh} kWh baterai
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[11px] text-muted-foreground">Sewa</p>
                      <p className="text-base font-bold text-navy dark:text-white">
                        {formatRentalRpShort(pkg.monthlyPrice)}
                      </p>
                      <p className="text-[10px] text-muted-foreground">/bulan</p>
                    </div>
                  </div>

                  {/* Affordability badge */}
                  <div className="flex items-center gap-2 mb-3">
                    {recSavings.affordable ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                        <Check className="w-3 h-3" />
                        Terjangkau untuk budget Anda
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
                        <AlertTriangle className="w-3 h-3" />
                        Di atas budget (gap {formatRentalRpShort(pkg.monthlyPrice - budget)})
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                      Coverage {recSavings.coveragePercent}%
                    </span>
                  </div>

                  {/* Value box: Backup PLN padam — menonjolkan nilai tambah */}
                  <div className="mt-1 p-3 rounded-lg bg-gradient-to-r from-solar/10 to-emerald-500/10 border border-solar/20 flex items-start gap-2.5">
                    <ShieldCheck className="w-5 h-5 text-solar flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-xs font-bold text-navy dark:text-white">
                        Tetap Nyala Walau PLN Mati 🔌
                      </p>
                      <p className="text-[11px] text-muted-foreground leading-relaxed mt-0.5">
                        Bukan sekadar hemat tagihan — rumah Anda tetap menyala
                        otomatis saat PLN padam. Sistem ini juga{" "}
                        <strong className="text-solar">mengurangi tagihan PLN hingga {recSavings.coveragePercent}%</strong>{" "}
                        dengan kapasitas produksi {recSavings.monthlyProduction.toLocaleString("id-ID")} kWh/bulan.
                        Nilai backup ini tidak didapat dari PLN biasa.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Reason / analisis */}
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
                          dibanding bayar bulanan 12×.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 4: Comparison table — semua paket */}
            {allSavings.length > 0 && (
              <div className="p-5 rounded-2xl bg-card border border-border mb-6">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingDown className="w-5 h-5 text-solar" />
                  <h3 className="font-bold text-navy dark:text-white text-base">
                    Estimasi Pengurangan Tagihan — Semua Paket
                  </h3>
                </div>
                <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                  Bandingkan dampak setiap paket terhadap tagihan PLN Anda
                  ({formatRentalRp(plnCostBefore)}/bulan). Semua paket sudah
                  termasuk <strong className="text-solar">backup otomatis saat PLN padam</strong> —
                  nilai yang tidak didapat dari PLN biasa.
                </p>

                {/* Table header (desktop) */}
                <div className="hidden md:grid grid-cols-12 gap-2 px-3 py-2 text-[11px] font-semibold text-muted-foreground uppercase tracking-wide bg-muted/50 rounded-lg">
                  <div className="col-span-3">Paket</div>
                  <div className="col-span-2 text-right">Sewa/bln</div>
                  <div className="col-span-2 text-right">PLN turun</div>
                  <div className="col-span-2 text-right">Sisa PLN</div>
                  <div className="col-span-2 text-right">Backup</div>
                  <div className="col-span-1 text-right">Coverage</div>
                </div>

                {/* Table rows */}
                <div className="space-y-1.5 mt-2">
                  {visibleSavings.map((s) => {
                    const isRecommended = pkg && s.pkg.id === pkg.id;
                    return (
                      <div
                        key={s.pkg.id}
                        className={`grid grid-cols-12 gap-2 px-3 py-2.5 rounded-lg text-xs items-center transition-colors ${
                          isRecommended
                            ? "bg-solar/10 border border-solar/30 ring-1 ring-solar/20"
                            : s.affordable
                            ? "bg-emerald-50/50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/20"
                            : "bg-muted/30 border border-border"
                        }`}
                      >
                        {/* Paket name + badges */}
                        <div className="col-span-12 md:col-span-3">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            {isRecommended && (
                              <span className="text-[9px] font-bold text-white bg-solar px-1.5 py-0.5 rounded">
                                REKOMENDASI
                              </span>
                            )}
                            <span className="font-bold text-navy dark:text-white">
                              {s.pkg.name}
                            </span>
                            <span className="text-[10px] text-muted-foreground">
                              {s.pkg.kWp} kWp
                            </span>
                          </div>
                          <div className="flex items-center gap-1 mt-0.5">
                            {!isRecommended && s.affordable && (
                              <span className="inline-flex items-center gap-0.5 text-[9px] text-emerald-600 dark:text-emerald-400">
                                <Check className="w-2.5 h-2.5" />
                                terjangkau
                              </span>
                            )}
                            {!s.affordable && (
                              <span className="inline-flex items-center gap-0.5 text-[9px] text-amber-600 dark:text-amber-400">
                                <AlertTriangle className="w-2.5 h-2.5" />
                                di atas budget
                              </span>
                            )}
                            <span className="text-[9px] text-muted-foreground">
                              cover {s.coveragePercent}%
                            </span>
                          </div>
                        </div>

                        {/* Sewa */}
                        <div className="col-span-3 md:col-span-2 text-right">
                          <p className="text-[10px] text-muted-foreground md:hidden">Sewa</p>
                          <p className="font-semibold text-navy dark:text-white">
                            {formatRentalRpShort(s.pkg.monthlyPrice)}
                          </p>
                        </div>

                        {/* PLN turun */}
                        <div className="col-span-3 md:col-span-2 text-right">
                          <p className="text-[10px] text-muted-foreground md:hidden">PLN turun</p>
                          <p className="font-semibold text-solar">
                            −{formatRentalRpShort(s.plnSaving)}
                          </p>
                        </div>

                        {/* Sisa PLN */}
                        <div className="col-span-3 md:col-span-2 text-right">
                          <p className="text-[10px] text-muted-foreground md:hidden">Sisa PLN</p>
                          <p className="font-semibold text-muted-foreground">
                            {formatRentalRpShort(s.plnRemaining)}
                          </p>
                        </div>

                        {/* Backup (durasi baterai saat PLN padam) */}
                        <div className="col-span-3 md:col-span-2 text-right">
                          <p className="text-[10px] text-muted-foreground md:hidden">Backup</p>
                          <p className="font-semibold text-emerald-600 dark:text-emerald-400">
                            {s.pkg.storageKwh} kWh
                          </p>
                          <p className="text-[9px] text-muted-foreground">baterai LiFePO4</p>
                        </div>

                        {/* Coverage */}
                        <div className="col-span-12 md:col-span-1 text-right">
                          <p
                            className={`font-bold ${
                              s.coveragePercent >= 70
                                ? "text-solar"
                                : s.coveragePercent >= 40
                                ? "text-amber-600 dark:text-amber-400"
                                : "text-muted-foreground"
                            }`}
                          >
                            {s.coveragePercent}%
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Expand button */}
                {hiddenCount > 0 && (
                  <button
                    onClick={() => setShowAllPackages(!showAllPackages)}
                    className="w-full mt-3 py-2 text-xs font-semibold text-solar hover:bg-solar/5 rounded-lg transition-colors flex items-center justify-center gap-1"
                  >
                    {showAllPackages ? (
                      <>
                        <ChevronUp className="w-3.5 h-3.5" />
                        Tampilkan lebih sedikit
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-3.5 h-3.5" />
                        Tampilkan {hiddenCount} paket lainnya
                      </>
                    )}
                  </button>
                )}

                {/* Legend */}
                <div className="mt-3 flex flex-wrap gap-3 text-[10px] text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <span className="w-2 h-2 rounded bg-solar" /> Rekomendasi
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <span className="w-2 h-2 rounded bg-emerald-400" /> Terjangkau (≤ budget {formatRentalRpShort(budget)}/bln)
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <span className="w-2 h-2 rounded bg-amber-400" /> Di atas budget
                  </span>
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
                  <strong>Pengurangan tagihan PLN:</strong> jumlah Rupiah yang
                  dihemat dari tagihan PLN berkat produksi surya yang menutupi
                  sebagian pemakaian. Semakin besar paket, semakin besar
                  pengurangannya.
                </p>
                <p>
                  <strong>Backup baterai:</strong> semua paket dilengkapi baterai
                  LiFePO4 yang membuat rumah tetap menyala otomatis saat PLN
                  padam — nilai yang tidak didapat dari PLN biasa. Kapasitas
                  baterai menentukan berapa lama rumah bisa bertahan saat
                  pemadaman.
                </p>
                <p>
                  <strong>Biaya Survey & Instalasi Awal:</strong> dibayar sekali
                  di awal kontrak, besaran sesuai tier kapasitas paket (1-3 kWp
                  = Rp 2jt, 4-7 kWp = Rp 5jt, 8-10 kWp = Rp 8jt). Sudah
                  mencakup survei, desain, instalasi lengkap, commissioning,
                  dan pembongkaran equipment saat kontrak berakhir. Dapat
                  dicicil maksimal 2 bulan — selama 2 bulan pertama, tagihan =
                  sewa bulanan + (biaya instalasi ÷ 2).
                </p>
                <p>
                  <strong>Bayar tahunan:</strong> opsi pembayaran di muka untuk
                  12 bulan, dengan total lebih hemat dibanding 12× harga
                  bulanan. Selisih hemat ditampilkan otomatis di atas.
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
