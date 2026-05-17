"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Home, Building2, Factory, Zap, MessageCircle, Battery, BatteryCharging, Info, ChevronDown, ChevronUp, Car, Monitor, Sparkles, Tag, Clock } from "lucide-react";
import {
  type CalculatedPackage,
  calculatePackages,
  calculatePackageWithBattery,
  hasCustomPricing,
  formatRp,
  calculateROI,
} from "@/lib/pricing";

type AddOnState = { carport: boolean; monitoring: string; batteryKwh: number };

const DISCOUNT_PCT = 5; // Diskon 5% bulan ini

function originalPriceFrom(price: number): number {
  // Reverse-calculate: price = original * (1 - DISCOUNT_PCT/100) rounded to 100K
  const original = Math.round(price / (1 - DISCOUNT_PCT / 100) / 100_000) * 100_000;
  return original;
}

function waLink(pkg: CalculatedPackage, addOns?: AddOnState, batteryPrice?: number) {
  let text = `Halo PT. Jaya Mandiri Smart Energy, saya tertarik dengan paket ${encodeURIComponent(pkg.name)} (${encodeURIComponent(pkg.priceFormatted)})`;
  if (addOns) {
    const parts: string[] = [];
    if (addOns.batteryKwh > 0 && batteryPrice) {
      parts.push(`+ Baterai ${addOns.batteryKwh}kWh ${formatRp(batteryPrice)}`);
    }
    if (addOns.carport) parts.push(`+ Carport ${formatRp(pkg.carportAddonPrice)}`);
    if (addOns.monitoring === "basic") parts.push(`+ Monitoring Basic ${formatRp(pkg.monitoringBasicPrice)}`);
    if (addOns.monitoring === "standard") parts.push(`+ Monitoring Standard ${formatRp(pkg.monitoringStandardPrice)}`);
    if (addOns.monitoring === "industrial") parts.push(`+ Monitoring Industrial ${formatRp(pkg.monitoringIndustrialPrice)}`);
    if (parts.length) text += `. Add-on: ${encodeURIComponent(parts.join(", "))}`;
  }
  return `https://wa.me/6281328190707?text=${text}`;
}

const categoryMeta = [
  {
    icon: Home,
    title: "Silver Package — Rumah Tangga",
    tagline: "Hybrid System 1 Fase — Cocok untuk kebutuhan rumah tangga di Jambi & sekitarnya",
    tiers: ["silver"],
    showAddOns: true,
  },
  {
    icon: Building2,
    title: "Gold Package — Bisnis & UMKM",
    tagline: "Hybrid System 1 Fase — Solusi bisnis skala menengah hingga besar",
    tiers: ["gold"],
    showAddOns: true,
  },
  {
    icon: Factory,
    title: "Platinum Package — Industri",
    tagline: "Hybrid System 1/3 Fase — Solusi skala besar untuk efisiensi maksimal",
    tiers: ["platinum"],
    showAddOns: true,
  },
];

export function ProductSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [showCalc, setShowCalc] = useState(false);
  const [packages, setPackages] = useState<CalculatedPackage[]>(() => calculatePackages());
  const [isCustom, setIsCustom] = useState(() => hasCustomPricing());
  const [addOns, setAddOns] = useState<Record<string, AddOnState>>({});

  // Listen for storage changes from kalibrasi page
  useEffect(() => {
    const handler = () => {
      setPackages(calculatePackages());
      setIsCustom(hasCustomPricing());
    };
    window.addEventListener("storage", handler);
    window.addEventListener("jmse-pricing-updated", handler);
    return () => {
      window.removeEventListener("storage", handler);
      window.removeEventListener("jmse-pricing-updated", handler);
    };
  }, []);

  const getPackagesByTier = (tier: string) =>
    packages.filter((p) => p.tier === tier);

  const toggleCarport = (pkgName: string) => {
    setAddOns((prev) => ({
      ...prev,
      [pkgName]: {
        carport: !(prev[pkgName]?.carport ?? false),
        monitoring: prev[pkgName]?.monitoring || "none",
        batteryKwh: prev[pkgName]?.batteryKwh ?? 0,
      },
    }));
  };

  const setMonitoring = (pkgName: string, level: string) => {
    setAddOns((prev) => ({
      ...prev,
      [pkgName]: {
        carport: prev[pkgName]?.carport ?? false,
        monitoring: level,
        batteryKwh: prev[pkgName]?.batteryKwh ?? 0,
      },
    }));
  };

  const setBatteryKwh = (pkgName: string, kwh: number) => {
    setAddOns((prev) => ({
      ...prev,
      [pkgName]: {
        carport: prev[pkgName]?.carport ?? false,
        monitoring: prev[pkgName]?.monitoring || "none",
        batteryKwh: kwh,
      },
    }));
  };

  const getAddOnTotal = (pkg: CalculatedPackage) => {
    const a = addOns[pkg.name];
    if (!a) return 0;
    let total = 0;
    if (a.carport) total += pkg.carportAddonPrice;
    if (a.monitoring === "basic") total += pkg.monitoringBasicPrice;
    if (a.monitoring === "standard") total += pkg.monitoringStandardPrice;
    if (a.monitoring === "industrial") total += pkg.monitoringIndustrialPrice;
    return total;
  };

  return (
    <section id="produk" className="py-20 md:py-28 bg-muted/30" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold text-solar bg-solar/10 rounded-full">
            Paket & Harga
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy dark:text-white mb-6">
            Pilih Paket{" "}
            <span className="gradient-text">Sesuai Kebutuhan</span> Anda
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Semua paket dihitung berdasarkan kondisi iradiasi matahari di Jambi
            (PSH 3,75 jam). Tersedia opsi tanpa baterai (hemat investasi) maupun
            dengan baterai LiFePO4 (full backup 24 jam). Harga sudah termasuk
            PPN 11%, instalasi, survei, desain, dan garansi resmi.
            <strong className="text-solar"> Diskon 5% berlaku untuk pemesanan bulan ini!</strong>
          </p>
        </motion.div>

        {/* PSH Info Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="max-w-3xl mx-auto mb-12 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/30"
        >
          <button
            onClick={() => setShowCalc(!showCalc)}
            className="flex items-center justify-between w-full text-left"
          >
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
              <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                Bagaimana cara kami menghitung harga? (Klik untuk detail)
              </span>
            </div>
            {showCalc ? (
              <ChevronUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            )}
          </button>
          {showCalc && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-3 text-xs text-blue-600 dark:text-blue-400 space-y-2 leading-relaxed"
            >
              <p>
                <strong>Parameter Jambi:</strong> PSH (Peak Sun Hours) rata-rata 3,75 jam/hari.
                Produksi harian = Kapasitas kWp x PSH x Efisiensi 80%.
              </p>
              <p>
                <strong>Baterai Opsional:</strong> Setiap paket tersedia dengan opsi baterai LiFePO4
                mulai dari 3 kWh. Pilih kapasitas sesuai kebutuhan backup malam hari.
              </p>
              <p>
                <strong>Biaya per paket:</strong> Panel + Mounting + BOS + Inverter + Baterai (opsional)
                + Proteksi (SPD & Grounding) + Jasa Instalasi + Survei & Desain + Commissioning + Logistik.
              </p>
              <p>
                <strong>Margin:</strong> 35% dari HPP (Harga Pokok Produksi).
                <strong> PPN 11%</strong> sudah termasuk dalam harga tertera.
                <strong> PPh</strong> dipotong oleh pihak pembeli (wajib pajak), bukan menambah harga jual.
              </p>
              <p>
                <strong>Add-on tersedia:</strong> Kanopi Carport (+harga per kWp) dan Smart Monitoring
                (Basic / Standard / Industrial) untuk semua paket.
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Categories */}
        {categoryMeta.map((cat, catIdx) => {
          const catProducts = cat.tiers.flatMap((t) => getPackagesByTier(t));
          if (catProducts.length === 0) return null;

          return (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: catIdx * 0.15 }}
              className="mb-16 last:mb-0"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-solar/10 flex items-center justify-center">
                  <cat.icon className="w-5 h-5 text-solar" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-navy dark:text-white">
                    {cat.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{cat.tagline}</p>
                </div>
              </div>

              {/* Battery Legend */}
              <div className="flex flex-wrap gap-4 mb-6">
                <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Zap className="w-3.5 h-3.5 text-solar" />
                  Tanpa Baterai — Hemat investasi awal, gunakan listrik PLN saat malam
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <BatteryCharging className="w-3.5 h-3.5 text-gold" />
                  Dengan Baterai LiFePO4 — Full backup 24 jam, listrik tetap menyala saat PLN padam
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400">
                  <Tag className="w-3.5 h-3.5" />
                  Diskon 5% untuk pemesanan bulan ini
                </span>
              </div>

              {/* Product Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {catProducts.map((product) => {
                  const addOnTotal = getAddOnTotal(product);
                  const currentAddOns = addOns[product.name];
                  const selectedBatteryKwh = currentAddOns?.batteryKwh ?? 0;
                  const batteryOptions = product.batteryOptions || [0];

                  // Calculate battery price dynamically (pure function, no hooks needed)
                  const batteryCalc = selectedBatteryKwh === 0
                    ? null
                    : calculatePackageWithBattery(product, selectedBatteryKwh);

                  // Battery price delta (battery price minus base price)
                  const batteryDelta = batteryCalc
                    ? batteryCalc.price - product.price
                    : 0;

                  // Total price with battery and other add-ons
                  const totalPrice = product.price + addOnTotal + (batteryCalc ? batteryDelta : 0);

                  return (
                    <div
                      key={product.name}
                      className={`relative p-6 rounded-2xl border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                        product.popular
                          ? "bg-gradient-to-br from-solar to-solar-dark text-white border-solar shadow-lg shadow-solar/20"
                          : "bg-card border-border hover:border-solar/30"
                      }`}
                    >
                      {/* Popular Badge */}
                      {product.popular && (
                        <span className="absolute -top-3 left-6 px-3 py-1 bg-gold text-navy text-xs font-bold rounded-full shadow-md">
                          PALING POPULER
                        </span>
                      )}

                      {/* Promo Badge */}
                      <span
                        className={`absolute -top-3 right-4 px-2.5 py-1 text-[10px] font-bold rounded-full shadow-sm flex items-center gap-1 ${
                          product.popular
                            ? "bg-white/20 text-white"
                            : "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                        }`}
                      >
                        <Tag className="w-2.5 h-2.5" />
                        DISKON 5%
                      </span>

                      <div className="flex items-center gap-2 mb-3">
                        <Zap
                          className={`w-5 h-5 ${
                            product.popular ? "text-gold-light" : "text-solar"
                          }`}
                        />
                        <h4
                          className={`text-base font-bold leading-tight ${
                            product.popular ? "text-white" : "text-navy dark:text-white"
                          }`}
                        >
                          {product.name}
                        </h4>
                      </div>

                      <p
                        className={`text-sm mb-3 leading-relaxed ${
                          product.popular ? "text-white/80" : "text-muted-foreground"
                        }`}
                      >
                        {product.desc}
                      </p>

                      {/* Specs line */}
                      <p
                        className={`text-xs font-medium mb-3 px-2.5 py-1.5 rounded-lg inline-block ${
                          product.popular
                            ? "bg-white/10 text-white/70"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {product.specs}
                      </p>

                      {/* ROI & Savings Info */}
                      {(() => {
                        const dailyKwh = product.kWp * 3.75 * 0.80;
                        // Use totalPrice (includes battery if selected) for ROI calculation
                        const roiData = calculateROI(totalPrice, dailyKwh);
                        return (
                          <div
                            className={`p-3 rounded-xl mb-4 ${
                              product.popular ? "bg-white/10" : "bg-solar/5 border border-solar/10"
                            }`}
                          >
                            <p
                              className={`text-xs font-medium mb-1 ${
                                product.popular ? "text-white/60" : "text-muted-foreground"
                              }`}
                            >
                              Estimasi Penghematan Bulanan
                            </p>
                            <p
                              className={`text-lg font-bold ${
                                product.popular ? "text-gold-light" : "text-solar"
                              }`}
                            >
                              {product.savingsRange}
                            </p>
                            <p
                              className={`text-xs mt-1 ${
                                product.popular ? "text-white/50" : "text-muted-foreground"
                              }`}
                            >
                              Produksi: {product.dailyProduction}
                            </p>
                            <div className={`flex items-center justify-between mt-2 pt-2 border-t ${
                              product.popular ? "border-white/10" : "border-solar/10"
                            }`}>
                              <span className={`text-xs ${
                                product.popular ? "text-white/60" : "text-muted-foreground"
                              }`}>
                                ROI ~{roiData.roiYearsWithIncrease} thn{selectedBatteryKwh > 0 ? " (+baterai)" : ""}*
                              </span>
                              <span className={`text-xs font-semibold ${
                                product.popular ? "text-gold-light" : "text-gold"
                              }`}>
                                Profit 25thn {roiData.returnMultiplier}x
                              </span>
                            </div>
                          </div>
                        );
                      })()}

                      {/* Price Display with Strikethrough */}
                      <div className="mb-3">
                        <div className="flex items-center gap-2">
                          <p
                            className={`text-xs line-through ${
                              product.popular ? "text-white/40" : "text-muted-foreground/60"
                            }`}
                          >
                            {formatRp(originalPriceFrom(product.price))}
                          </p>
                          <span
                            className={`px-1.5 py-0.5 text-[10px] font-bold rounded ${
                              product.popular ? "bg-gold/30 text-gold-light" : "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300"
                            }`}
                          >
                            -{DISCOUNT_PCT}%
                          </span>
                        </div>
                        <p
                          className={`text-xl font-extrabold ${
                            product.popular ? "text-white" : "text-navy dark:text-white"
                          }`}
                        >
                          {product.priceFormatted}
                        </p>
                        <p
                          className={`text-xs ${
                            product.popular ? "text-white/50" : "text-muted-foreground"
                          }`}
                        >
                          Harga promo • Sudah termasuk PPN 11%, instalasi & garansi
                        </p>
                      </div>

                      {/* Battery Price Display */}
                      {selectedBatteryKwh > 0 && batteryCalc && (
                        <div
                          className={`mb-3 p-2.5 rounded-lg border ${
                            product.popular
                              ? "bg-white/10 border-white/20"
                              : "bg-gold/5 border-gold/20"
                          }`}
                        >
                          <p className={`text-xs font-medium flex items-center gap-1.5 mb-1 ${
                            product.popular ? "text-white/60" : "text-muted-foreground"
                          }`}>
                            <BatteryCharging className="w-3.5 h-3.5" />
                            Dengan Baterai {selectedBatteryKwh} kWh
                          </p>
                          <div className="flex items-center gap-2">
                            <p className={`text-xs line-through ${
                              product.popular ? "text-white/30" : "text-muted-foreground/50"
                            }`}>
                              {formatRp(originalPriceFrom(batteryCalc.price))}
                            </p>
                            <span className={`px-1 py-0.5 text-[9px] font-bold rounded ${
                              product.popular ? "bg-gold/20 text-gold-light" : "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400"
                            }`}>
                              -{DISCOUNT_PCT}%
                            </span>
                          </div>
                          <p className={`text-base font-bold ${
                            product.popular ? "text-gold-light" : "text-gold"
                          }`}>
                            {batteryCalc.priceFormatted}
                          </p>
                          <p className={`text-[10px] ${
                            product.popular ? "text-white/40" : "text-muted-foreground"
                          }`}>
                            +{formatRp(batteryDelta)} dari paket dasar
                          </p>
                        </div>
                      )}

                      {/* Other add-on total display */}
                      {addOnTotal > 0 && (
                        <p
                          className={`text-xs mb-1 font-medium ${
                            product.popular ? "text-gold-light" : "text-solar"
                          }`}
                        >
                          + Add-on: {formatRp(addOnTotal)}
                          {selectedBatteryKwh > 0 && batteryCalc && (
                            <> + Baterai {selectedBatteryKwh}kWh: {formatRp(batteryDelta)}</>
                          )}
                          {" = "}{formatRp(totalPrice)}
                        </p>
                      )}

                      {/* Add-on section — available for ALL tiers */}
                      <div className={`mb-4 p-3 rounded-xl border ${
                        product.popular ? "bg-white/5 border-white/20" : "bg-muted/50 border-border"
                      }`}>
                        <p className={`text-xs font-semibold mb-2 flex items-center gap-1.5 ${
                          product.popular ? "text-white/70" : "text-muted-foreground"
                        }`}>
                          <Sparkles className="w-3.5 h-3.5" />
                          Optional Add-on
                        </p>

                        {/* Battery Selector — for ALL packages */}
                        {batteryOptions.length > 1 && (
                          <div className="mb-2">
                            <p className={`text-[10px] font-medium mb-1.5 ${
                              product.popular ? "text-white/50" : "text-muted-foreground"
                            }`}>
                              <Battery className="w-3 h-3 inline mr-1" />
                              Baterai LiFePO4 (Backup)
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                              {batteryOptions.map((kwh) => (
                                <button
                                  key={kwh}
                                  onClick={() => setBatteryKwh(product.name, kwh)}
                                  className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                                    selectedBatteryKwh === kwh
                                      ? product.popular
                                        ? "bg-gold text-navy shadow-sm"
                                        : "bg-solar text-white shadow-sm"
                                      : product.popular
                                        ? "bg-white/5 text-white/60 hover:bg-white/10"
                                        : "bg-card text-muted-foreground hover:bg-muted border border-border"
                                  }`}
                                >
                                  {kwh === 0 ? "Tanpa" : `${kwh} kWh`}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Carport toggle */}
                        {product.carportAddonPrice > 0 && (
                          <button
                            onClick={() => toggleCarport(product.name)}
                            className={`w-full flex items-center justify-between p-2 rounded-lg text-xs mb-1.5 transition-colors ${
                              currentAddOns?.carport
                                ? product.popular ? "bg-gold/20 text-gold-light" : "bg-solar/10 text-solar"
                                : product.popular ? "bg-white/5 text-white/50 hover:bg-white/10" : "bg-card hover:bg-muted"
                            }`}
                          >
                            <span className="flex items-center gap-1.5">
                              <Car className="w-3.5 h-3.5" />
                              Kanopi Carport ({product.kWp} kWp)
                            </span>
                            <span className="font-medium">+{formatRp(product.carportAddonPrice)}</span>
                          </button>
                        )}

                        {/* Smart Monitoring */}
                        {(product.monitoringBasicPrice > 0 || product.monitoringStandardPrice > 0 || product.monitoringIndustrialPrice > 0) && (
                          <div className="space-y-1">
                            {[
                              { level: "basic", label: "Basic", price: product.monitoringBasicPrice },
                              { level: "standard", label: "Standard", price: product.monitoringStandardPrice },
                              { level: "industrial", label: "Industrial", price: product.monitoringIndustrialPrice },
                            ].filter(m => m.price > 0).map(m => (
                              <button
                                key={m.level}
                                onClick={() => setMonitoring(product.name, currentAddOns?.monitoring === m.level ? "none" : m.level)}
                                className={`w-full flex items-center justify-between p-2 rounded-lg text-xs transition-colors ${
                                  currentAddOns?.monitoring === m.level
                                    ? product.popular ? "bg-gold/20 text-gold-light" : "bg-solar/10 text-solar"
                                    : product.popular ? "bg-white/5 text-white/50 hover:bg-white/10" : "bg-card hover:bg-muted"
                                }`}
                              >
                                <span className="flex items-center gap-1.5">
                                  <Monitor className="w-3.5 h-3.5" />
                                  Smart Monitoring {m.label}
                                </span>
                                <span className="font-medium">+{formatRp(m.price)}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      <a
                        href={waLink(product, currentAddOns, batteryDelta)}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => {
                          if (typeof window !== "undefined" && (window as unknown as Record<string, unknown>).fbq) {
                            (window as unknown as Record<string, (...args: unknown[]) => void>).fbq!("track", "Lead");
                          }
                        }}
                        className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                          product.popular
                            ? "bg-white text-solar hover:bg-white/90 hover:shadow-lg"
                            : "bg-solar text-white hover:bg-solar-dark"
                        }`}
                      >
                        <MessageCircle className="w-4 h-4" />
                        {selectedBatteryKwh > 0
                          ? `Tanya Paket + Baterai ${selectedBatteryKwh}kWh`
                          : "Tanya Paket Ini via WhatsApp"}
                      </a>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          );
        })}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-4">
            Butuh paket custom di luar daftar di atas? Kapasitas 1 kWp hingga
            500+ kWp. Kami siap merancang solusi sesuai kebutuhan spesifik Anda.
          </p>
          <a
            href="https://wa.me/6281328190707?text=Halo%20PT.%20Jaya%20Mandiri%20Smart%20Energy,%20saya%20ingin%20request%20custom%20proposal%20paket%20panel%20surya"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-navy dark:bg-white text-white dark:text-navy font-bold rounded-full hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            Request Custom Proposal
          </a>
        </motion.div>
      </div>
    </section>
  );
}
