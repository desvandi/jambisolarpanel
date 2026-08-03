"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import {
  Check,
  MessageCircle,
  Zap,
  Battery,
  TrendingUp,
  Wrench,
  Calendar,
  LayoutGrid,
  Home as HomeIcon,
  Building2,
  Factory,
  type LucideIcon,
} from "lucide-react";
import {
  getActiveRentalPackages,
  buildWhatsAppUrl,
  formatRentalRp,
  formatRentalRpShort,
  estimateMonthlyProduction,
  getInstallationFee,
  getInstallationTier,
  getInstallationInstallment,
  packageCategories,
  type PackageCategory,
} from "@/lib/rentalPackages";

/** Peta nama icon string -> komponen Lucide. */
const iconMap: Record<string, LucideIcon> = {
  LayoutGrid,
  Home: HomeIcon,
  Building2,
  Factory,
};

/**
 * Section "Daftar Paket" — menampilkan semua paket sewa PLTS yang aktif
 * dalam grid kartu, dengan filter kategori (Semua / Rumah / Bisnis / Industri).
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
  const [activeCategory, setActiveCategory] = useState<PackageCategory | "all">("all");

  const allPackages = getActiveRentalPackages();
  const packages =
    activeCategory === "all"
      ? allPackages
      : allPackages.filter((p) => p.category === activeCategory);

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
            Gunakan filter di bawah untuk memilih kategori yang sesuai.
          </p>
        </motion.div>

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10"
        >
          {packageCategories.map((cat) => {
            const Icon = iconMap[cat.icon] ?? LayoutGrid;
            const isActive = activeCategory === cat.id;
            const count =
              cat.id === "all"
                ? allPackages.length
                : allPackages.filter((p) => p.category === cat.id).length;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`group flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 border ${
                  isActive
                    ? "bg-solar text-white border-solar shadow-lg shadow-solar/30"
                    : "bg-card text-navy dark:text-white border-border hover:border-solar/40 hover:bg-solar/5"
                }`}
                title={cat.description}
              >
                <Icon className="w-4 h-4" />
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* Active category description */}
        <motion.p
          key={activeCategory}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="text-center text-xs text-muted-foreground mb-8"
        >
          {packageCategories.find((c) => c.id === activeCategory)?.description}
          {" • "}
          Menampilkan <strong className="text-navy dark:text-white">{packages.length}</strong> paket
        </motion.p>

        {/* Grid packages */}
        <AnimatePresence mode="popLayout">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {packages.map((pkg, i) => {
            const monthlyProduction = estimateMonthlyProduction(pkg.kWp);
            const installationFee = getInstallationFee(pkg.kWp);
            const installationTier = getInstallationTier(pkg.kWp);
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
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        pkg.popular
                          ? "bg-white/15 text-white/90"
                          : categoryBadge(pkg.category)
                      }`}
                    >
                      {categoryLabel(pkg.category)}
                    </span>
                    <span
                      className={`text-xs font-bold px-2 py-1 rounded-md ${
                        pkg.popular ? "bg-white/15 text-white" : "bg-solar/10 text-solar"
                      }`}
                    >
                      {pkg.kWp} kWp
                    </span>
                  </div>
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

                {/* Installation fee — once-off, tiered, cicilan 2 bulan */}
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
                      Instalasi + bongkar akhir:{" "}
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
                        Tier {installationTier.label} • Cicil {installment.months} bln @{" "}
                        {formatRentalRpShort(installment.installmentPerMonth)}/bln
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
        </motion.div>
        </AnimatePresence>

        {/* Empty state (just in case) */}
        {packages.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p className="text-sm">
              Tidak ada paket di kategori ini. Coba kategori lain.
            </p>
          </div>
        )}

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
            ditentukan per tier: 1-3 kWp = Rp 2jt, 4-7 kWp = Rp 5jt, 8-10 kWp = Rp 8jt.
            Dibayar sekali di awal kontrak, dapat dicicil maksimal 2 bulan, dan
            sudah mencakup pembongkaran equipment saat kontrak berakhir.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
