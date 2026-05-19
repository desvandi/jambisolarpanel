"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ServicePageLayout } from "@/components/landing/ServicePageLayout";
import { evPackages, evAssumptions, getEVRoiData } from "@/lib/pricing-ev";
import { formatRp } from "@/lib/pricing";
import { MessageCircle, Car, Battery, Leaf, Zap, Shield, CheckCircle, ArrowRight } from "lucide-react";

const benefits = [
  { icon: Leaf, title: "100% Energi Surya", desc: "Isi daya kendaraan listrik Anda dari matahari — gratis dan ramah lingkungan" },
  { icon: Zap, title: "Hemat Jutaan per Tahun", desc: "2x charging harian dari PLTS bisa hemat hingga Rp 5-7 juta per tahun vs tarif PLN" },
  { icon: Car, title: "XCMG AC 7.2kW", desc: "Charger AC 7.2kW (1-fase) kompatibel dengan semua kendaraan listrik di Indonesia" },
  { icon: Battery, title: "Energi Surplus untuk Rumah", desc: "Energi surplus dari PLTS otomatis menutupi kebutuhan listrik rumah tangga lainnya" },
  { icon: Shield, title: "Garansi Resmi", desc: "Panel 25 tahun, inverter 5 tahun, charger 2 tahun, instalasi termasuk" },
  { icon: CheckCircle, title: "Plug & Play", desc: "Instalasi charger standalone yang mudah, atau terintegrasi dengan PLTS rumah Anda" },
];

export default function EVChargingPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <ServicePageLayout
      subBrand="Jambi Solar EV"
      title="EV Charging Terintegrasi PLTS"
      tagline="Isi daya kendaraan listrik Anda dengan energi surya — hemat & mandiri."
      description="Solusi EV Charging terintegrasi dengan PLTS. Charger XCMG AC 7.2kW yang kompatibel dengan semua kendaraan listrik di Indonesia. Pilih charger standalone atau paket terintegrasi dengan PLTS untuk penghematan maksimal."
      breadcrumbs={[{ label: "Solusi", href: "/" }, { label: "EV Charging" }]}
      waText="Halo PT. Jaya Mandiri Smart Energy, saya tertarik dengan EV Charging terintegrasi PLTS. Mohon informasi lebih lanjut."
    >
      {/* Cost Comparison */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass rounded-2xl p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy dark:text-white mb-2 text-center">
              Perbandingan Biaya Charging
            </h2>
            <p className="text-sm text-muted-foreground text-center mb-6">
              Asumsi: EV 7.2 kWh, charge 2x/hari, tarif PLN Rp 1.500/kWh
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* PLN Charging */}
              <div className="p-5 rounded-xl bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/30">
                <div className="flex items-center gap-2 mb-4">
                  <Zap className="w-5 h-5 text-red-500" />
                  <h3 className="font-bold text-red-600 dark:text-red-400">Charging dari PLN</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tarif listrik</span>
                    <span className="font-semibold text-navy dark:text-white">{formatRp(evAssumptions.plnTariffPerKwh)}/kWh</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Charge per hari</span>
                    <span className="font-semibold text-navy dark:text-white">2x ({evAssumptions.dailyChargingKwh} kWh)</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Pemakaian per bulan</span>
                    <span className="font-semibold text-navy dark:text-white">{evAssumptions.monthlyChargingKwh} kWh</span>
                  </div>
                  <div className="pt-3 border-t border-red-200 dark:border-red-800/30">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Biaya per bulan</span>
                      <span className="text-xl font-extrabold text-red-600 dark:text-red-400">
                        {formatRp(evAssumptions.monthlyPlnCost)}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Biaya per tahun</span>
                    <span className="text-lg font-bold text-red-600 dark:text-red-400">
                      {formatRp(evAssumptions.annualPlnCost)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Solar Charging */}
              <div className="p-5 rounded-xl bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-200 dark:border-emerald-800/30">
                <div className="flex items-center gap-2 mb-4">
                  <SunIcon className="w-5 h-5 text-emerald-500" />
                  <h3 className="font-bold text-emerald-600 dark:text-emerald-400">Charging dari PLTS</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Energi surya</span>
                    <span className="font-semibold text-navy dark:text-white">Gratis dari matahari</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Solar offset</span>
                    <span className="font-semibold text-navy dark:text-white">~{evAssumptions.solarOffsetPct}% siang hari</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Biaya operasional</span>
                    <span className="font-semibold text-navy dark:text-white">Rp 0</span>
                  </div>
                  <div className="pt-3 border-t border-emerald-200 dark:border-emerald-800/30">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Biaya per bulan</span>
                      <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">
                        Rp 0 (dari surya)
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Biaya per tahun</span>
                    <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                      Rp 0 (dari surya)
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 p-5 rounded-xl bg-solar/5 border border-solar/10">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Penghematan Per Bulan</p>
                  <p className="text-2xl font-extrabold text-solar">
                    {formatRp(evAssumptions.monthlySolarSavings)}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">({evAssumptions.solarOffsetPct}% offset dari PLN)</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Penghematan Per Tahun</p>
                  <p className="text-2xl font-extrabold text-solar">
                    {formatRp(evAssumptions.annualSolarSavings)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Total Biaya PLN/Tahun</p>
                  <p className="text-2xl font-extrabold text-red-500">
                    {formatRp(evAssumptions.annualPlnCost)}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">tanpa PLTS</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy dark:text-white mb-4">Keunggulan EV Solar JMSE</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" ref={ref}>
            {benefits.map((b, i) => (
              <motion.div key={b.title} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: i * 0.08 }} className="p-5 rounded-xl border border-border bg-card hover:border-solar/30 transition-all hover:shadow-md">
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center mb-3">
                  <b.icon className="w-5 h-5 text-amber-600" />
                </div>
                <h3 className="font-bold text-navy dark:text-white mb-1">{b.title}</h3>
                <p className="text-sm text-muted-foreground">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold text-amber-600 bg-amber-600/10 rounded-full">Paket EV Charging</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy dark:text-white mb-4">Pilih Paket EV Charging Anda</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {evPackages.map((pkg, i) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className={`relative p-6 rounded-2xl border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                  pkg.solarKwp === 5.2
                    ? "bg-gradient-to-br from-amber-500 to-amber-600 text-white border-amber-500 shadow-lg shadow-amber-500/20"
                    : "bg-card border-border hover:border-amber-500/30"
                }`}
              >
                {pkg.solarKwp === 5.2 && <span className="absolute -top-3 left-6 px-3 py-1 bg-gold text-navy text-xs font-bold rounded-full shadow-md">BEST VALUE</span>}

                <h4 className={`text-lg font-bold mb-2 ${pkg.solarKwp === 5.2 ? "text-white" : "text-navy dark:text-white"}`}>{pkg.name}</h4>
                <p className={`text-sm mb-4 leading-relaxed ${pkg.solarKwp === 5.2 ? "text-white/80" : "text-muted-foreground"}`}>{pkg.desc}</p>

                {pkg.solarKwp > 0 && (
                  <div className="space-y-2 mb-4">
                    {[
                      { label: "Panel Surya", value: pkg.panel },
                      { label: "Inverter", value: pkg.inverter },
                      { label: "Charger", value: pkg.charger },
                      { label: "Hemat/Bulan", value: pkg.monthlySavings },
                      { label: "ROI", value: `~${pkg.roiYears} tahun` },
                    ].map(spec => (
                      <div key={spec.label} className={`flex items-center justify-between text-xs ${pkg.solarKwp === 5.2 ? "text-white/70" : "text-muted-foreground"}`}>
                        <span>{spec.label}</span>
                        <span className={`font-medium ${pkg.solarKwp === 5.2 ? "text-white" : "text-navy dark:text-white"}`}>{spec.value}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="space-y-1.5 mb-5">
                  {pkg.features.map(f => (
                    <div key={f} className={`flex items-start gap-2 text-xs ${pkg.solarKwp === 5.2 ? "text-white/70" : "text-muted-foreground"}`}>
                      <CheckCircle className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${pkg.solarKwp === 5.2 ? "text-gold-light" : "text-amber-500"}`} />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>

                <p className={`text-2xl font-extrabold mb-4 ${pkg.solarKwp === 5.2 ? "text-white" : "text-navy dark:text-white"}`}>{formatRp(pkg.price)}</p>

                <a
                  href={`https://wa.me/6281328190707?text=${encodeURIComponent(`Halo PT. Jaya Mandiri Smart Energy, saya tertarik paket ${pkg.name} (${formatRp(pkg.price)})`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${pkg.solarKwp === 5.2 ? "bg-white text-amber-600 hover:bg-white/90" : "bg-amber-600 text-white hover:bg-amber-700"}`}
                >
                  <MessageCircle className="w-4 h-4" />
                  Tanya Paket Ini
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </ServicePageLayout>
  );
}

function SunIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );
}
