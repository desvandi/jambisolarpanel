"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ServicePageLayout } from "@/components/landing/ServicePageLayout";
import {
  calculatePackages,
  formatRp,
  calculateROI,
} from "@/lib/pricing";
import { MessageCircle, Battery, Zap, Shield, TrendingUp, Car, Monitor, BarChart3 } from "lucide-react";

const benefits = [
  { icon: TrendingUp, title: "ROI Lebih Cepat", desc: "Bisnis & industri ROI 5-7 tahun — jauh lebih cepat dari rumah tangga" },
  { icon: Zap, title: "Efisiensi Operasional", desc: "Kurangi biaya energi tetap per bulan, tingkatkan profit margin" },
  { icon: Car, title: "Carport Solar", desc: "Tambahkan kanopi carport solar sebagai nilai tambah properti bisnis Anda" },
  { icon: Monitor, title: "Smart Monitoring", desc: "Pantau performa sistem secara real-time via dashboard & mobile app" },
  { icon: Shield, title: "Garansi Resmi", desc: "Panel 25 tahun, inverter 5 tahun, instalasi & commissioning termasuk" },
  { icon: BarChart3, title: "Laporan Performa", desc: "Monitoring standard & industrial menyediakan laporan bulanan otomatis" },
];

export default function SolarCommercialPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [packages, setPackages] = useState(() =>
    calculatePackages().filter((p) => p.tier === "gold" || p.tier === "platinum")
  );

  useEffect(() => {
    const handler = () => {
      setPackages(calculatePackages().filter((p) => p.tier === "gold" || p.tier === "platinum"));
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
      subBrand="JMSE Commercial Solar"
      title="PLTS Bisnis & Industri — Efisiensi Energi untuk Profit Maksimal"
      tagline="ROI 5-7 tahun dengan penghematan operasional signifikan."
      description="Sistem PLTS skala besar untuk kantor, gudang, pabrik, hotel, dan fasilitas bisnis lainnya. Kapasitas 6.5 kWp hingga 20 kWp + baterai dengan opsi smart monitoring dan carport solar."
      breadcrumbs={[{ label: "Solusi", href: "/" }, { label: "Commercial Solar" }]}
    >
      {/* Benefits */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy dark:text-white mb-4">
              Keunggulan PLTS Komersial
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Investasi energi surya untuk bisnis bukan hanya penghematan — ini adalah strategi operasional jangka panjang.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" ref={ref}>
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.08 }}
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

      {/* ROI Calculator */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass rounded-2xl p-6 sm:p-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy dark:text-white mb-4">Simulasi ROI Bisnis</h2>
            <p className="text-muted-foreground mb-6">Contoh: Paket Gold 10 kWp — Rp {formatRp(calculatePackages().find(p => p.name === "Gold 10 kWp")?.price || 0)}</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {(() => {
                const pkg = calculatePackages().find(p => p.name === "Gold 10 kWp");
                if (!pkg) return null;
                const dailyKwh = pkg.kWp * 3.75 * 0.8;
                const roi = calculateROI(pkg.price, dailyKwh);
                return [
                  { label: "Produksi Harian", value: `${dailyKwh.toFixed(1)} kWh` },
                  { label: "Hemat/Bulan", value: pkg.savingsRange },
                  { label: "ROI", value: `~${roi.roiYearsWithIncrease} tahun` },
                  { label: "Return 25thn", value: `${roi.returnMultiplier}x` },
                ].map(item => (
                  <div key={item.label} className="p-3 rounded-xl bg-solar/5 border border-solar/10">
                    <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                    <p className="text-lg font-bold text-solar">{item.value}</p>
                  </div>
                ));
              })()}
            </div>
            <a
              href="https://wa.me/6281328190707?text=Halo%20PT.%20Jaya%20Mandiri%20Smart%20Energy,%20saya%20ingin%20simulasi%20ROI%20PLTS%20untuk%20bisnis%20saya"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-solar hover:bg-solar-dark text-white font-bold rounded-full transition-all duration-300 hover:shadow-lg"
            >
              <MessageCircle className="w-4 h-4" />
              Simulasi Custom via WhatsApp
            </a>
          </motion.div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold text-solar bg-solar/10 rounded-full">
              Paket Gold & Platinum
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy dark:text-white mb-4">
              Pilih Paket PLTS untuk Bisnis Anda
            </h2>
          </motion.div>

          {/* Gold Packages */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                <Zap className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-navy dark:text-white">Gold — Bisnis & UMKM (1 Fase)</h3>
                <p className="text-sm text-muted-foreground">Hybrid System untuk kantor, toko, gudang, restoran</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {packages.filter(p => p.tier === "gold").map(pkg => {
                const dailyKwh = pkg.kWp * 3.75 * 0.8;
                const roi = calculateROI(pkg.price, dailyKwh);
                return (
                  <div key={pkg.name} className={`relative p-6 rounded-2xl border transition-all hover:shadow-xl hover:-translate-y-1 ${pkg.popular ? "bg-gradient-to-br from-amber-500 to-amber-600 text-white border-amber-500 shadow-lg shadow-amber-500/20" : "bg-card border-border hover:border-amber-500/30"}`}>
                    {pkg.popular && <span className="absolute -top-3 left-6 px-3 py-1 bg-gold text-navy text-xs font-bold rounded-full shadow-md">RECOMMENDED</span>}
                    <h4 className={`text-base font-bold mb-2 ${pkg.popular ? "text-white" : "text-navy dark:text-white"}`}>{pkg.name}</h4>
                    <p className={`text-sm mb-3 ${pkg.popular ? "text-white/80" : "text-muted-foreground"}`}>{pkg.desc}</p>
                    <p className={`text-xs font-medium mb-3 px-2.5 py-1.5 rounded-lg inline-block ${pkg.popular ? "bg-white/10 text-white/70" : "bg-muted text-muted-foreground"}`}>{pkg.specs}</p>
                    {pkg.batteryKwh > 0 && <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium mb-3 ml-2 ${pkg.popular ? "bg-white/10 text-gold-light" : "bg-gold/10 text-gold"}`}><Battery className="w-3.5 h-3.5" />LiFePO4 {pkg.batteryKwh} kWh</span>}
                    <div className={`p-3 rounded-xl mb-4 ${pkg.popular ? "bg-white/10" : "bg-solar/5 border border-solar/10"}`}>
                      <p className={`text-xs ${pkg.popular ? "text-white/60" : "text-muted-foreground"}`}>Produksi: {pkg.dailyProduction}</p>
                      <p className={`text-sm font-bold ${pkg.popular ? "text-gold-light" : "text-solar"}`}>Hemat: {pkg.savingsRange}</p>
                      <div className={`flex items-center justify-between mt-2 pt-2 border-t ${pkg.popular ? "border-white/10" : "border-solar/10"}`}>
                        <span className={`text-xs ${pkg.popular ? "text-white/60" : "text-muted-foreground"}`}>ROI ~{roi.roiYearsWithIncrease} thn</span>
                        <span className={`text-xs font-semibold ${pkg.popular ? "text-gold-light" : "text-gold"}`}>Return 25thn {roi.returnMultiplier}x</span>
                      </div>
                    </div>
                    <p className={`text-lg font-extrabold mb-1 ${pkg.popular ? "text-white" : "text-navy dark:text-white"}`}>{pkg.priceFormatted}</p>
                    {pkg.carportAddonPrice > 0 && <p className={`text-xs mb-1 ${pkg.popular ? "text-white/50" : "text-muted-foreground"}`}>+ Carport: {formatRp(pkg.carportAddonPrice)}</p>}
                    {pkg.monitoringStandardPrice > 0 && <p className={`text-xs mb-3 ${pkg.popular ? "text-white/50" : "text-muted-foreground"}`}>+ Monitoring Standard: {formatRp(pkg.monitoringStandardPrice)}</p>}
                    <a href={`https://wa.me/6281328190707?text=${encodeURIComponent(`Halo PT. Jaya Mandiri Smart Energy, saya tertarik paket ${pkg.name} (${pkg.priceFormatted}) untuk bisnis`)}`} target="_blank" rel="noopener noreferrer" className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm transition-all ${pkg.popular ? "bg-white text-amber-600 hover:bg-white/90" : "bg-solar text-white hover:bg-solar-dark"}`}>
                      <MessageCircle className="w-4 h-4" /> Tanya Paket Ini
                    </a>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Platinum Packages */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-slate-500/10 flex items-center justify-center">
                <Zap className="w-5 h-5 text-slate-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-navy dark:text-white">Platinum — Industri (3 Fase)</h3>
                <p className="text-sm text-muted-foreground">Hybrid 3-Fase untuk pabrik, warehouse, hotel</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {packages.filter(p => p.tier === "platinum").map(pkg => {
                const dailyKwh = pkg.kWp * 3.75 * 0.8;
                const roi = calculateROI(pkg.price, dailyKwh);
                return (
                  <div key={pkg.name} className={`relative p-6 rounded-2xl border transition-all hover:shadow-xl hover:-translate-y-1 ${pkg.popular ? "bg-gradient-to-br from-slate-600 to-slate-700 text-white border-slate-600 shadow-lg shadow-slate-600/20" : "bg-card border-border hover:border-slate-500/30"}`}>
                    {pkg.popular && <span className="absolute -top-3 left-6 px-3 py-1 bg-gold text-navy text-xs font-bold rounded-full shadow-md">RECOMMENDED</span>}
                    <h4 className={`text-base font-bold mb-2 ${pkg.popular ? "text-white" : "text-navy dark:text-white"}`}>{pkg.name}</h4>
                    <p className={`text-sm mb-3 ${pkg.popular ? "text-white/80" : "text-muted-foreground"}`}>{pkg.desc}</p>
                    <p className={`text-xs font-medium mb-3 px-2.5 py-1.5 rounded-lg inline-block ${pkg.popular ? "bg-white/10 text-white/70" : "bg-muted text-muted-foreground"}`}>{pkg.specs}</p>
                    {pkg.batteryKwh > 0 && <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium mb-3 ml-2 ${pkg.popular ? "bg-white/10 text-gold-light" : "bg-gold/10 text-gold"}`}><Battery className="w-3.5 h-3.5" />LiFePO4 {pkg.batteryKwh} kWh</span>}
                    <div className={`p-3 rounded-xl mb-4 ${pkg.popular ? "bg-white/10" : "bg-solar/5 border border-solar/10"}`}>
                      <p className={`text-xs ${pkg.popular ? "text-white/60" : "text-muted-foreground"}`}>Produksi: {pkg.dailyProduction}</p>
                      <p className={`text-sm font-bold ${pkg.popular ? "text-gold-light" : "text-solar"}`}>Hemat: {pkg.savingsRange}</p>
                      <div className={`flex items-center justify-between mt-2 pt-2 border-t ${pkg.popular ? "border-white/10" : "border-solar/10"}`}>
                        <span className={`text-xs ${pkg.popular ? "text-white/60" : "text-muted-foreground"}`}>ROI ~{roi.roiYearsWithIncrease} thn</span>
                        <span className={`text-xs font-semibold ${pkg.popular ? "text-gold-light" : "text-gold"}`}>Return 25thn {roi.returnMultiplier}x</span>
                      </div>
                    </div>
                    <p className={`text-lg font-extrabold mb-1 ${pkg.popular ? "text-white" : "text-navy dark:text-white"}`}>{pkg.priceFormatted}</p>
                    {pkg.carportAddonPrice > 0 && <p className={`text-xs mb-1 ${pkg.popular ? "text-white/50" : "text-muted-foreground"}`}>+ Carport: {formatRp(pkg.carportAddonPrice)}</p>}
                    {pkg.monitoringIndustrialPrice > 0 && <p className={`text-xs mb-3 ${pkg.popular ? "text-white/50" : "text-muted-foreground"}`}>+ Monitoring Industrial: {formatRp(pkg.monitoringIndustrialPrice)}</p>}
                    <a href={`https://wa.me/6281328190707?text=${encodeURIComponent(`Halo PT. Jaya Mandiri Smart Energy, saya tertarik paket ${pkg.name} (${pkg.priceFormatted}) untuk industri`)}`} target="_blank" rel="noopener noreferrer" className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm transition-all ${pkg.popular ? "bg-white text-slate-700 hover:bg-white/90" : "bg-solar text-white hover:bg-solar-dark"}`}>
                      <MessageCircle className="w-4 h-4" /> Tanya Paket Ini
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </ServicePageLayout>
  );
}
