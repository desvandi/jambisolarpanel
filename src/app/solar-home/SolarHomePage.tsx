"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ServicePageLayout } from "@/components/landing/ServicePageLayout";
import {
  calculatePackages,
  hasCustomPricing,
  formatRp,
  calculateROI,
} from "@/lib/pricing";
import { MessageCircle, Battery, Zap, Shield, Clock, Wrench } from "lucide-react";

const benefits = [
  { icon: Zap, title: "Hemat Tagihan PLN", desc: "Potensi penghematan 50-90% dari tagihan listrik bulanan Anda" },
  { icon: Battery, title: "Backup saat PLN Padam", desc: "Dengan opsi baterai LiFePO4, rumah tetap menyala 24 jam" },
  { icon: Shield, title: "Garansi Resmi", desc: "Panel surya 25 tahun performa, inverter 5 tahun, baterai sesuai paket" },
  { icon: Clock, title: "ROI 8-9 Tahun", desc: "Balik modal dalam 8-9 tahun dengan kenaikan tarif PLN 6%/tahun" },
  { icon: Wrench, title: "Gratis Instalasi", desc: "Survei, desain, instalasi, dan commissioning sudah termasuk dalam harga" },
];

export default function SolarHomePage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [packages, setPackages] = useState(() =>
    calculatePackages().filter((p) => p.tier === "silver")
  );

  useEffect(() => {
    const handler = () => {
      setPackages(calculatePackages().filter((p) => p.tier === "silver"));
    };
    window.addEventListener("storage", handler);
    window.addEventListener("jmse-pricing-updated", handler);
    return () => {
      window.removeEventListener("storage", handler);
      window.removeEventListener("jmse-pricing-updated", handler);
    };
  }, []);

  return (
    <ServicePageLayout
      subBrand="Jambi Solar Home"
      title="PLTS Rumah Tangga — Energi Mandiri untuk Keluarga Anda"
      tagline="Hemat tagihan listrik, backup saat PLN padam, investasi jangka panjang."
      description="Sistem Pembangkit Listrik Tenaga Surya (PLTS) hybrid untuk rumah tangga dengan kapasitas 1 kWp hingga 5 kWp + baterai. Cocok untuk kebutuhan rumah tangga kecil hingga keluarga besar dengan AC, kulkas, dan peralatan modern lainnya."
      breadcrumbs={[{ label: "Solusi", href: "/" }, { label: "Home Solar" }]}
    >
      {/* Benefits Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy dark:text-white mb-4">
              Mengapa PLTS Rumah Tangga?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Investasi cerdas untuk keluarga — hemat jangka panjang, ramah lingkungan, dan kemandirian energi.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" ref={ref}>
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="p-5 rounded-xl border border-border bg-card hover:border-solar/30 transition-all hover:shadow-md"
              >
                <div className="w-10 h-10 rounded-lg bg-solar/10 flex items-center justify-center mb-3">
                  <b.icon className="w-5 h-5 text-solar" />
                </div>
                <h3 className="font-bold text-navy dark:text-white mb-1">{b.title}</h3>
                <p className="text-sm text-muted-foreground">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem → Solution */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-navy dark:text-white mb-8 text-center">
            Masalah Listrik Rumah Tangga? Kami Punya Solusinya
          </h2>
          <div className="space-y-6">
            {[
              {
                problem: "Tagihan PLN terus naik setiap tahun",
                solution: "PLTS Hybrid menghasilkan listrik gratis dari matahari. Hemat 50-90% tagihan bulanan, dan penghematan terus bertambah seiring kenaikan tarif PLN.",
                icon: "💸",
              },
              {
                problem: "Listrik sering padam mengganggu aktivitas",
                solution: "Dengan baterai LiFePO4 sebagai add-on, rumah Anda tetap menyala 24 jam bahkan saat PLN padam. Inverter Powmr Hybrid otomatis switch ke baterai.",
                icon: "🔌",
              },
              {
                problem: "Inverter PLN berisik & boros listrik",
                solution: "Inverter Powmr Hybrid bekerja tanpa suara dan mengkonversi DC→AC dengan efisiensi >95%. Tidak ada bahan bakar, tidak ada emisi.",
                icon: "🔋",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="p-5 rounded-xl border border-border bg-card"
              >
                <div className="flex items-start gap-3 mb-2">
                  <span className="text-xl flex-shrink-0">{item.icon}</span>
                  <div>
                    <p className="font-bold text-red-600 dark:text-red-400 mb-1">{item.problem}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.solution}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <a
              href="https://wa.me/6281328190707?text=Halo%20PT.%20Jaya%20Mandiri%20Smart%20Energy,%20saya%20ingin%20konsultasi%20PLTS%20untuk%20rumah%20tangga"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-solar hover:bg-solar-dark text-white font-bold rounded-full transition-all duration-300"
            >
              <MessageCircle className="w-4 h-4" />
              Konsultasi Gratis Sekarang
            </a>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 md:py-20 bg-muted/30" ref={ref}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold text-solar bg-solar/10 rounded-full">
              Paket Silver — Rumah Tangga
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy dark:text-white mb-4">
              Pilih Paket PLTS untuk Rumah Anda
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Semua harga sudah termasuk PPN 11%, instalasi, survei, desain, dan garansi resmi. Dihitung berdasarkan PSH Jambi 3,75 jam.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((pkg) => {
              const dailyKwh = pkg.kWp * 3.75 * 0.8;
              const roi = calculateROI(pkg.price, dailyKwh);
              return (
                <div
                  key={pkg.name}
                  className={`relative p-6 rounded-2xl border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                    pkg.popular
                      ? "bg-gradient-to-br from-solar to-solar-dark text-white border-solar shadow-lg shadow-solar/20"
                      : "bg-card border-border hover:border-solar/30"
                  }`}
                >
                  {pkg.popular && (
                    <span className="absolute -top-3 left-6 px-3 py-1 bg-gold text-navy text-xs font-bold rounded-full shadow-md">
                      PALING POPULER
                    </span>
                  )}

                  <div className="flex items-center gap-2 mb-3">
                    <Zap className={`w-5 h-5 ${pkg.popular ? "text-gold-light" : "text-solar"}`} />
                    <h4 className={`text-base font-bold ${pkg.popular ? "text-white" : "text-navy dark:text-white"}`}>
                      {pkg.name}
                    </h4>
                  </div>

                  <p className={`text-sm mb-3 leading-relaxed ${pkg.popular ? "text-white/80" : "text-muted-foreground"}`}>
                    {pkg.desc}
                  </p>

                  <p className={`text-xs font-medium mb-3 px-2.5 py-1.5 rounded-lg inline-block ${pkg.popular ? "bg-white/10 text-white/70" : "bg-muted text-muted-foreground"}`}>
                    {pkg.specs}
                  </p>

                  {pkg.batteryMaxKwh > 0 && (
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium mb-3 ml-2 ${pkg.popular ? "bg-white/10 text-gold-light" : "bg-gold/10 text-gold"}`}>
                      <Battery className="w-3.5 h-3.5" />
                      LiFePO4 {pkg.batteryMaxKwh} kWh
                    </span>
                  )}

                  <div className={`p-3 rounded-xl mb-4 ${pkg.popular ? "bg-white/10" : "bg-solar/5 border border-solar/10"}`}>
                    <p className={`text-xs ${pkg.popular ? "text-white/60" : "text-muted-foreground"}`}>Produksi harian</p>
                    <p className={`text-lg font-bold ${pkg.popular ? "text-gold-light" : "text-solar"}`}>
                      {pkg.dailyProduction}
                    </p>
                    <p className={`text-xs mt-1 ${pkg.popular ? "text-white/50" : "text-muted-foreground"}`}>
                      Hemat: {pkg.savingsRange}
                    </p>
                    <div className={`flex items-center justify-between mt-2 pt-2 border-t ${pkg.popular ? "border-white/10" : "border-solar/10"}`}>
                      <span className={`text-xs ${pkg.popular ? "text-white/60" : "text-muted-foreground"}`}>
                        ROI ~{roi.roiYearsWithIncrease} thn
                      </span>
                      <span className={`text-xs font-semibold ${pkg.popular ? "text-gold-light" : "text-gold"}`}>
                        Return 25thn {roi.returnMultiplier}x
                      </span>
                    </div>
                  </div>

                  <p className={`text-lg font-extrabold mb-1 ${pkg.popular ? "text-white" : "text-navy dark:text-white"}`}>
                    {pkg.priceFormatted}
                  </p>
                  <p className={`text-xs mb-4 ${pkg.popular ? "text-white/50" : "text-muted-foreground"}`}>
                    PPN 11% + instalasi + garansi termasuk
                  </p>

                  <a
                    href={`https://wa.me/6281328190707?text=${encodeURIComponent(`Halo PT. Jaya Mandiri Smart Energy, saya tertarik paket ${pkg.name} (${pkg.priceFormatted}) untuk rumah tangga`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                      pkg.popular
                        ? "bg-white text-solar hover:bg-white/90"
                        : "bg-solar text-white hover:bg-solar-dark"
                    }`}
                  >
                    <MessageCircle className="w-4 h-4" />
                    Tanya Paket Ini
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </ServicePageLayout>
  );
}
