"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import {
  Check,
  MessageCircle,
  Zap,
  Battery,
  TrendingUp,
  TrendingDown,
  Wrench,
  Calendar,
  LayoutGrid,
  Home as HomeIcon,
  Building2,
  Factory,
  ShieldCheck,
  Users,
  ArrowRight,
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
  type RentalPackage,
} from "@/lib/rentalPackages";

/** Peta nama icon string -> komponen Lucide. */
const iconMap: Record<string, LucideIcon> = {
  LayoutGrid,
  Home: HomeIcon,
  Building2,
  Factory,
};

/**
 * Format harga beli ke format ringkas "Rp 45jt" untuk badge.
 */
function formatBuyPriceShort(value: number): string {
  if (value >= 1_000_000) {
    const jt = value / 1_000_000;
    const str = jt % 1 === 0 ? jt.toFixed(0) : jt.toFixed(1);
    return `Rp ${str}jt`;
  }
  return formatRentalRp(value);
}

/**
 * Section "Daftar Paket" — menampilkan semua paket sewa PLTS yang aktif
 * dalam grid kartu, dengan filter kategori (Semua / Rumah / Bisnis / Industri).
 *
 * Setiap kartu menampilkan (benefit-oriented):
 *   - Badge "Tanpa investasi Rp X jt" (buyPrice)
 *   - Nama paket + targetUser (siapa pengguna ideal)
 *   - canPower: daftar peralatan yang bisa dinyalakan
 *   - Simulasi beli vs sewa (cashflow comparison)
 *   - Harga sewa bulanan (utama) + harga tahunan (alternatif)
 *   - Biaya Survey & Instalasi Awal (cicil 2 bulan)
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

                {/* Badge: Tanpa investasi */}
                <div className="mb-3">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${
                      pkg.popular
                        ? "bg-white/20 text-white border border-white/30"
                        : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                    }`}
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Tanpa investasi {formatBuyPriceShort(pkg.buyPrice)}
                  </span>
                </div>

                {/* Header */}
                <div className="flex items-center justify-between mb-2">
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
                  </div>
                </div>

                {/* Target user */}
                <div
                  className={`flex items-center gap-1.5 mb-3 text-xs ${
                    pkg.popular ? "text-white/85" : "text-muted-foreground"
                  }`}
                >
                  <Users className={`w-3.5 h-3.5 ${pkg.popular ? "text-gold-light" : "text-solar"}`} />
                  <span className="font-semibold">{pkg.targetUser}</span>
                </div>

                {/* Description */}
                <p
                  className={`text-xs mb-4 leading-relaxed ${
                    pkg.popular ? "text-white/85" : "text-muted-foreground"
                  }`}
                >
                  {pkg.description}
                </p>

                {/* Simulasi Beli vs Sewa */}
                <div
                  className={`p-3 rounded-xl mb-4 ${
                    pkg.popular
                      ? "bg-white/10 border border-white/15"
                      : "bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/15 dark:to-teal-900/15 border border-emerald-200 dark:border-emerald-800/30"
                  }`}
                >
                  <p
                    className={`text-[10px] font-bold uppercase tracking-wide mb-2 ${
                      pkg.popular ? "text-gold-light" : "text-emerald-700 dark:text-emerald-400"
                    }`}
                  >
                    Simulasi: Beli vs Sewa
                  </p>
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className={pkg.popular ? "text-white/70" : "text-muted-foreground"}>
                        Jika beli (sekali bayar)
                      </span>
                      <span className={`font-bold line-through ${pkg.popular ? "text-white/60" : "text-red-500/70 dark:text-red-400"}`}>
                        {formatRentalRp(pkg.buyPrice)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className={pkg.popular ? "text-white/70" : "text-muted-foreground"}>
                        Jika sewa (cicilan bulanan)
                      </span>
                      <span className={`font-bold ${pkg.popular ? "text-white" : "text-solar"}`}>
                        {formatRentalRpShort(pkg.monthlyPrice)}/bln
                      </span>
                    </div>
                    <div
                      className={`pt-1.5 mt-1.5 border-t ${
                        pkg.popular ? "border-white/15" : "border-emerald-200 dark:border-emerald-800/30"
                      }`}
                    >
                      <p
                        className={`text-[11px] leading-relaxed font-medium ${
                          pkg.popular ? "text-white/90" : "text-emerald-700 dark:text-emerald-300"
                        }`}
                      >
                        💡 Anda tetap punya{" "}
                        <strong className={pkg.popular ? "text-gold-light" : "text-emerald-700 dark:text-emerald-400"}>
                          {formatBuyPriceShort(pkg.buyPrice)}
                        </strong>{" "}
                        untuk usaha atau kebutuhan lain.
                      </p>
                    </div>
                  </div>
                </div>

                {/* canPower: peralatan yang bisa dinyalakan */}
                <div className="mb-4">
                  <p
                    className={`text-[10px] font-bold uppercase tracking-wide mb-2 ${
                      pkg.popular ? "text-white/70" : "text-muted-foreground"
                    }`}
                  >
                    Bisa Menyalakan:
                  </p>
                  <ul className="grid grid-cols-1 gap-1">
                    {pkg.canPower.slice(0, 5).map((item, idx) => (
                      <li
                        key={idx}
                        className={`flex items-start gap-1.5 text-[11px] ${
                          pkg.popular ? "text-white/85" : "text-muted-foreground"
                        }`}
                      >
                        <Check
                          className={`w-3 h-3 mt-0.5 flex-shrink-0 ${
                            pkg.popular ? "text-gold-light" : "text-solar"
                          }`}
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                    {pkg.canPower.length > 5 && (
                      <li
                        className={`text-[11px] italic ${
                          pkg.popular ? "text-white/60" : "text-muted-foreground"
                        }`}
                      >
                        + {pkg.canPower.length - 5} peralatan lainnya
                      </li>
                    )}
                  </ul>
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

                {/* Biaya Survey & Instalasi Awal */}
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
                      Survey & Instalasi Awal:{" "}
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
                        Dibayar sekali di awal • Cicil {installment.months} bln @{" "}
                        {formatRentalRpShort(installment.installmentPerMonth)}/bln
                      </p>
                    )}
                  </div>
                </div>

                {/* CTA */}
                <a
                  href={buildWhatsAppUrl(waMsg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm transition-all duration-300 mt-auto ${
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
