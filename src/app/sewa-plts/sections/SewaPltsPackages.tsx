"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check, MessageCircle, Zap, Battery, TrendingUp, Wrench, Calendar } from "lucide-react";
import {
  getActiveRentalPackages,
  buildWhatsAppUrl,
  formatRentalRp,
  formatRentalRpShort,
  estimateMonthlyProduction,
  getInstallationFee,
  getInstallationInstallment,
} from "@/lib/rentalPackages";

/**
 * Section "Daftar Paket" — menampilkan semua paket sewa PLTS yang aktif
 * dalam grid kartu. Harga diambil dari rentalPackages.ts.
 *
 * Setiap kartu menampilkan:
 *   - Nama paket + kapasitas (kWp + kWh)
 *   - Estimasi produksi bulanan
 *   - Harga sewa bulanan (utama) + harga tahunan (alternatif)
 *   - Biaya instalasi (sekali bayar, bisa cicil 2 bulan)
 *   - Fitur paket
 *   - CTA WhatsApp
 */
export function SewaPltsPackages() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const packages = getActiveRentalPackages();

  return (
    <section className="py-16 md:py-24 bg-muted/30" id="paket" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14 max-w-3xl mx-auto"
        >
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold text-solar bg-solar/10 rounded-full">
            Pilihan Paket Sewa (1 – 10 kWp)
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy dark:text-white mb-5">
            Paket Sewa PLTS untuk{" "}
            <span className="gradient-text">Setiap Kebutuhan</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Semua harga sewa sudah termasuk PPN 11% dan maintenance berkala
            selama masa kontrak. Biaya instalasi dibayar sekali di awal (bisa
            dicicil 2 bulan) dan sudah mencakup bongkar saat kontrak selesai.
          </p>
        </motion.div>

        {/* Grid packages */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg, i) => {
            const monthlyProduction = estimateMonthlyProduction(pkg.kWp);
            const installationFee = getInstallationFee(pkg.kWp);
            const installment = getInstallationInstallment(pkg.kWp);
            const annualSavings = pkg.monthlyPrice * 12 - pkg.annualPrice;

            const waMsg =
              pkg.waMessage ||
              `Halo Jambi Solar Panel.\n\n` +
                `Saya tertarik dengan paket Sewa PLTS ${pkg.name} (${pkg.kWp} kWp + ${pkg.storageKwh} kWh).\n` +
                `- Sewa bulanan: ${formatRentalRp(pkg.monthlyPrice)}/bulan\n` +
                `- Sewa tahunan: ${formatRentalRp(pkg.annualPrice)}/tahun\n` +
                `- Biaya instalasi: ${formatRentalRp(installationFee)} (cicil 2 bln)\n\n` +
                `Mohon informasi lebih lanjut dan jadwal survei.\n\nTerima kasih.`;

            return (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className={`relative p-6 rounded-2xl border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col ${
                  pkg.popular
                    ? "bg-gradient-to-br from-solar to-solar-dark text-white border-solar shadow-lg shadow-solar/20 lg:scale-105"
                    : "bg-card border-border hover:border-solar/30"
                }`}
              >
                {pkg.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gold text-navy text-xs font-bold rounded-full shadow-md whitespace-nowrap">
                    PALING POPULER
                  </span>
                )}

                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Zap
                      className={`w-5 h-5 ${pkg.popular ? "text-gold-light" : "text-solar"}`}
                    />
                    <h3
                      className={`text-xl font-bold ${
                        pkg.popular ? "text-white" : "text-navy dark:text-white"
                      }`}
                    >
                      {pkg.name}
                    </h3>
                  </div>
                  <span
                    className={`text-xs font-bold px-2 py-1 rounded-md ${
                      pkg.popular ? "bg-white/15 text-white" : "bg-solar/10 text-solar"
                    }`}
                  >
                    {pkg.kWp} kWp
                  </span>
                </div>

                {/* Description */}
                <p
                  className={`text-xs mb-3 leading-relaxed ${
                    pkg.popular ? "text-white/85" : "text-muted-foreground"
                  }`}
                >
                  {pkg.description}
                </p>

                {/* Specs badges */}
                <div className="flex flex-wrap gap-2 mb-3">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold ${
                      pkg.popular ? "bg-white/15 text-white" : "bg-gold/10 text-gold"
                    }`}
                  >
                    <Battery className="w-3.5 h-3.5" />
                    {pkg.storageKwh} kWh
                  </span>
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold ${
                      pkg.popular ? "bg-white/15 text-white" : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                    }`}
                  >
                    <TrendingUp className="w-3.5 h-3.5" />
                    {monthlyProduction.toLocaleString("id-ID")} kWh/bln
                  </span>
                </div>

                {/* Price — bulanan (utama) */}
                <div
                  className={`p-3 rounded-xl mb-2 ${
                    pkg.popular
                      ? "bg-white/10"
                      : "bg-solar/5 border border-solar/10"
                  }`}
                >
                  <div className="flex items-baseline justify-between">
                    <span
                      className={`text-xs ${
                        pkg.popular ? "text-white/70" : "text-muted-foreground"
                      }`}
                    >
                      Sewa bulanan
                    </span>
                    {pkg.savingsRange && (
                      <span
                        className={`text-[10px] ${
                          pkg.popular ? "text-white/60" : "text-muted-foreground"
                        }`}
                      >
                        {pkg.savingsRange}
                      </span>
                    )}
                  </div>
                  <p
                    className={`text-2xl font-extrabold ${
                      pkg.popular ? "text-white" : "text-navy dark:text-white"
                    }`}
                  >
                    {formatRentalRp(pkg.monthlyPrice)}
                    <span
                      className={`text-xs font-medium ml-1 ${
                        pkg.popular ? "text-white/70" : "text-muted-foreground"
                      }`}
                    >
                      /bulan
                    </span>
                  </p>
                </div>

                {/* Price — tahunan */}
                <div
                  className={`px-3 py-2 rounded-lg mb-3 flex items-center justify-between ${
                    pkg.popular
                      ? "bg-white/5"
                      : "bg-muted/50 border border-border"
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <Calendar
                      className={`w-3.5 h-3.5 ${pkg.popular ? "text-gold-light" : "text-gold"}`}
                    />
                    <span
                      className={`text-xs ${
                        pkg.popular ? "text-white/80" : "text-muted-foreground"
                      }`}
                    >
                      Bayar tahunan
                    </span>
                  </div>
                  <div className="text-right">
                    <p
                      className={`text-sm font-bold ${
                        pkg.popular ? "text-gold-light" : "text-gold"
                      }`}
                    >
                      {formatRentalRpShort(pkg.annualPrice)}
                    </p>
                    {annualSavings > 0 && (
                      <p
                        className={`text-[10px] ${
                          pkg.popular ? "text-white/60" : "text-muted-foreground"
                        }`}
                      >
                        hemat {formatRentalRpShort(annualSavings)}/thn
                      </p>
                    )}
                  </div>
                </div>

                {/* Installation fee — once-off, cicilan 2 bulan */}
                <div
                  className={`p-3 rounded-xl mb-4 flex items-start gap-2 ${
                    pkg.popular
                      ? "bg-white/10 border border-white/10"
                      : "bg-muted/50 border border-border"
                  }`}
                >
                  <Wrench
                    className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                      pkg.popular ? "text-gold-light" : "text-solar"
                    }`}
                  />
                  <div className="flex-1">
                    <p
                      className={`text-xs font-semibold ${
                        pkg.popular ? "text-white/90" : "text-navy dark:text-white"
                      }`}
                    >
                      Instalasi:{" "}
                      <span className={pkg.popular ? "text-gold-light" : "text-solar"}>
                        {formatRentalRp(installationFee)}
                      </span>
                    </p>
                    {installment && (
                      <p
                        className={`text-[11px] mt-0.5 leading-relaxed ${
                          pkg.popular ? "text-white/60" : "text-muted-foreground"
                        }`}
                      >
                        Cicil {installment.months} bln @{" "}
                        {formatRentalRpShort(installment.installmentPerMonth)}/bln
                        {" • "}termasuk bongkar akhir kontrak
                      </p>
                    )}
                  </div>
                </div>

                {/* Features */}
                <ul
                  className={`space-y-1.5 mb-5 flex-1 ${
                    pkg.popular ? "text-white/90" : ""
                  }`}
                >
                  {pkg.features.slice(0, 6).map((f, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs">
                      <Check
                        className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${
                          pkg.popular ? "text-gold-light" : "text-solar"
                        }`}
                      />
                      <span
                        className={
                          pkg.popular ? "text-white/90" : "text-muted-foreground"
                        }
                      >
                        {f}
                      </span>
                    </li>
                  ))}
                  {pkg.features.length > 6 && (
                    <li
                      className={`text-xs italic ${
                        pkg.popular ? "text-white/60" : "text-muted-foreground"
                      }`}
                    >
                      + {pkg.features.length - 6} fitur lainnya
                    </li>
                  )}
                </ul>

                {/* CTA */}
                <a
                  href={buildWhatsAppUrl(waMsg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                    pkg.popular
                      ? "bg-white text-solar hover:bg-white/90"
                      : "bg-solar text-white hover:bg-solar-dark"
                  }`}
                >
                  <MessageCircle className="w-4 h-4" />
                  {pkg.ctaLabel}
                </a>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="mt-8 max-w-2xl mx-auto space-y-2 text-center"
        >
          <p className="text-xs text-muted-foreground">
            Harga sewa bulanan sudah dibulatkan ke atas ke puluhan ribu terdekat.
            Harga dapat berubah sewaktu-waktu mengikuti kondisi pasar — hubungi
            tim kami via WhatsApp untuk penawaran terbaru.
          </p>
          <p className="text-xs text-muted-foreground">
            <strong className="text-navy dark:text-white">Biaya instalasi</strong>{" "}
            dibayar sekali di awal kontrak, dapat dicicil maksimal 2 bulan, dan
            sudah mencakup pembongkaran equipment saat kontrak berakhir.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
