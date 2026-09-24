"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Zap, Battery, TrendingUp, Wallet, Calendar, Wrench, Check } from "lucide-react";
import {
  getActiveRentalPackages,
  formatRentalRp,
  formatRentalRpShort,
  estimateMonthlyProduction,
  getInstallationFee,
  type PackageCategory,
  type RentalPackage,
} from "@/lib/rentalPackages";

/**
 * Section "Tabel Komparasi" — tabel ringkasan semua paket (1-10 kWp)
 * untuk perbandingan cepat sebelum user melihat kartu detail.
 *
 * Tabel responsif:
 *   - Desktop: tabel penuh dengan semua kolom
 *   - Mobile: card-stack dengan info penting
 */
export function SewaPltsComparisonTable({
  onSelectPackage,
}: {
  onSelectPackage?: (pkg: RentalPackage) => void;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const packages = getActiveRentalPackages();

  /** Warna badge per kategori. */
  const categoryBadge = (cat: PackageCategory) => {
    switch (cat) {
      case "rumah":
        return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300";
      case "bisnis":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300";
      case "industri":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300";
    }
  };

  const categoryLabel = (cat: PackageCategory) => {
    switch (cat) {
      case "rumah":
        return "Rumah";
      case "bisnis":
        return "Bisnis";
      case "industri":
        return "Industri";
    }
  };

  return (
    <section className="py-12 md:py-16" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="text-center mb-10 max-w-3xl mx-auto"
        >
          <span className="inline-block px-4 py-1.5 mb-3 text-sm font-semibold text-solar bg-solar/10 rounded-full">
            Ringkasan Semua Paket
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy dark:text-white mb-3">
            Bandingkan{" "}
            <span className="gradient-text">10 Paket Sewa</span> Sekilas
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed">
            Tabel komparatif untuk perbandingan cepat. Scroll horizontal pada
            mobile untuk melihat semua kolom. Klik baris untuk detail paket di
            bawah.
          </p>
        </motion.div>

        {/* Desktop table (md and up) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="hidden md:block rounded-2xl border border-border bg-card overflow-hidden shadow-sm"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-navy dark:bg-navy-light text-white">
                  <th className="p-3 text-left font-semibold sticky left-0 bg-navy dark:bg-navy-light z-10">
                    Paket
                  </th>
                  <th className="p-3 text-center font-semibold">
                    <Zap className="w-3.5 h-3.5 inline mr-1" />
                    kWp
                  </th>
                  <th className="p-3 text-center font-semibold">
                    <Battery className="w-3.5 h-3.5 inline mr-1" />
                    Storage
                  </th>
                  <th className="p-3 text-center font-semibold">
                    <TrendingUp className="w-3.5 h-3.5 inline mr-1" />
                    Produksi/bln
                  </th>
                  <th className="p-3 text-right font-semibold">
                    <Wallet className="w-3.5 h-3.5 inline mr-1" />
                    Sewa/bulan
                  </th>
                  <th className="p-3 text-right font-semibold">
                    <Calendar className="w-3.5 h-3.5 inline mr-1" />
                    Sewa/tahun
                  </th>
                  <th className="p-3 text-right font-semibold">
                    <Wrench className="w-3.5 h-3.5 inline mr-1" />
                    Instalasi
                  </th>
                  <th className="p-3 text-center font-semibold">Kategori</th>
                </tr>
              </thead>
              <tbody>
                {packages.map((pkg, i) => {
                  const production = estimateMonthlyProduction(pkg.kWp);
                  const installation = getInstallationFee(pkg.kWp);
                  return (
                    <motion.tr
                      key={pkg.id}
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : {}}
                      transition={{ duration: 0.3, delay: 0.1 + i * 0.03 }}
                      onClick={() => onSelectPackage?.(pkg)}
                      className={`border-t border-border cursor-pointer transition-colors hover:bg-solar/5 ${
                        pkg.popular ? "bg-solar/5" : ""
                      }`}
                    >
                      <td className="p-3 sticky left-0 bg-inherit z-10">
                        <div className="flex items-center gap-2">
                          {pkg.popular && (
                            <span className="text-[10px] font-bold text-gold">⭐</span>
                          )}
                          <span className="font-bold text-navy dark:text-white">
                            {pkg.name}
                          </span>
                        </div>
                        <p className="text-[10px] text-muted-foreground mt-0.5">
                          {pkg.estimatedMonthlyKwh} kWh/bln
                        </p>
                      </td>
                      <td className="p-3 text-center font-semibold text-solar">
                        {pkg.kWp}
                      </td>
                      <td className="p-3 text-center text-muted-foreground">
                        {pkg.storageKwh} kWh
                      </td>
                      <td className="p-3 text-center text-muted-foreground">
                        {production.toLocaleString("id-ID")} kWh
                      </td>
                      <td className="p-3 text-right font-bold text-navy dark:text-white">
                        {formatRentalRpShort(pkg.monthlyPrice)}
                      </td>
                      <td className="p-3 text-right text-muted-foreground">
                        {formatRentalRpShort(pkg.annualPrice)}
                      </td>
                      <td className="p-3 text-right text-muted-foreground">
                        {formatRentalRpShort(installation)}
                      </td>
                      <td className="p-3 text-center">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold ${categoryBadge(
                            pkg.category
                          )}`}
                        >
                          {categoryLabel(pkg.category)}
                        </span>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Mobile card-stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="md:hidden space-y-3"
        >
          {packages.map((pkg, i) => {
            const production = estimateMonthlyProduction(pkg.kWp);
            const installation = getInstallationFee(pkg.kWp);
            return (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.3, delay: 0.1 + i * 0.03 }}
                onClick={() => onSelectPackage?.(pkg)}
                className={`p-4 rounded-xl border transition-colors cursor-pointer ${
                  pkg.popular
                    ? "border-solar/40 bg-solar/5"
                    : "border-border bg-card"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {pkg.popular && (
                      <span className="text-[10px] font-bold text-gold">⭐</span>
                    )}
                    <span className="font-bold text-navy dark:text-white">
                      {pkg.name}
                    </span>
                    <span className="text-xs text-solar font-semibold">
                      {pkg.kWp} kWp
                    </span>
                  </div>
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold ${categoryBadge(
                      pkg.category
                    )}`}
                  >
                    {categoryLabel(pkg.category)}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <p className="text-muted-foreground">Storage</p>
                    <p className="font-semibold text-navy dark:text-white">
                      {pkg.storageKwh} kWh
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Produksi/bln</p>
                    <p className="font-semibold text-navy dark:text-white">
                      {production.toLocaleString("id-ID")} kWh
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Sewa/bulan</p>
                    <p className="font-bold text-solar">
                      {formatRentalRpShort(pkg.monthlyPrice)}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Sewa/tahun</p>
                    <p className="font-semibold text-gold">
                      {formatRentalRpShort(pkg.annualPrice)}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-muted-foreground">Instalasi (cicil 2 bln)</p>
                    <p className="font-semibold text-navy dark:text-white">
                      {formatRentalRp(installation)}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Legend / hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="text-center text-xs text-muted-foreground mt-4"
        >
          <Check className="w-3 h-3 inline mr-1 text-solar" />
          Harga sudah termasuk PPN. Biaya instalasi bisa dicicil maksimal 2
          bulan. ⭐ = paket paling populer.
        </motion.p>
      </div>
    </section>
  );
}
