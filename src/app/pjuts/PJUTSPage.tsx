"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ServicePageLayout } from "@/components/landing/ServicePageLayout";
import { pjutsPackages } from "@/lib/pricing-pjuts";
import { formatRp } from "@/lib/pricing";
import { MessageCircle, Sun, Shield, Clock, MapPin, Wrench, CheckCircle } from "lucide-react";

const benefits = [
  { icon: MapPin, title: "Tanpa Kabel PLN", desc: "Berdiri mandiri di mana saja — jalan desa, perkebunan, area terpencil" },
  { icon: Sun, title: "Auto On/Off", desc: "Sensor cahaya otomatis, menyala saat gelap dan mati saat pagi" },
  { icon: Shield, title: "Garansi 3 Tahun", desc: "Panel LONGi + baterai BYD LiFePO4 berkualitas tinggi" },
  { icon: Clock, title: "Gratis Instalasi", desc: "Pemasangan tiang all-in-one oleh tim teknisi berpengalaman" },
  { icon: Wrench, title: "Perawatan Mudah", desc: "Sistem all-in-one minim perawatan, panel self-cleaning" },
  { icon: CheckCircle, title: "Tahan Cuaca", desc: "Rating IP65/IP66, tahan hujan deras dan panas terik" },
];

export default function PJUTSPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <ServicePageLayout
      subBrand="Jambi Solar Agro — PJUTS"
      title="Penerangan Jalan Umum Tenaga Surya (PJUTS)"
      tagline="Cahaya untuk jalan desa, perkebunan, kawasan industri — tanpa kabel PLN."
      description="Solusi penerangan jalan mandiri tanpa koneksi PLN. Menggunakan panel surya LONGi, baterai LiFePO4 BYD, dan LED SMD berkualitas tinggi dalam tiang all-in-one. Cocok untuk jalan desa, akses perkebunan sawit, kawasan industri, dan area publik."
      breadcrumbs={[{ label: "Solusi", href: "/" }, { label: "PJUTS" }]}
      waText="Halo PT. Jaya Mandiri Smart Energy, saya tertarik dengan paket PJUTS. Mohon informasi lebih lanjut mengenai harga dan spesifikasi."
    >
      {/* Benefits */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy dark:text-white mb-4">
              Keunggulan PJUTS JMSE
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Sistem all-in-one yang dirancang untuk ketahanan dan kemudahan instalasi di segala medan.
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
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-3">
                  <b.icon className="w-5 h-5 text-emerald-600" />
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
            Masalah Penerangan Area Anda? Ini Solusinya
          </h2>
          <div className="space-y-6">
            {[
              {
                problem: "Jalan akses perkebunan gelap di malam hari",
                solution: "PJUTS all-in-one menyala otomatis saat gelap. Tanpa kabel PLN, berdiri mandiri di mana saja. Cahaya terang & merata untuk keamanan area.",
                icon: "🌙",
              },
              {
                problem: "Biaya tarik kabel PLN ke lokasi terpencil sangat mahal",
                solution: "PJUTS tidak membutuhkan koneksi PLN sama sekali. Biaya sekali pasang, listrik gratis selama 25+ tahun dari matahari.",
                icon: "🔌",
              },
              {
                problem: "Genset untuk PJU boros BBM & perawatan rutin",
                solution: "Solar panel + baterai LiFePO4 BYD bekerja tanpa bahan bakar. System all-in-one minim perawatan, cukup bersih panel 2x setahun.",
                icon: "⛽",
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
              href="https://wa.me/6281328190707?text=Halo%20PT.%20Jaya%20Mandiri%20Smart%20Energy,%20saya%20ingin%20konsultasi%20paket%20PJUTS"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-full transition-all duration-300"
            >
              <MessageCircle className="w-4 h-4" />
              Konsultasi PJUTS via WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold text-emerald-600 bg-emerald-600/10 rounded-full">
              Harga Paket PJUTS
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy dark:text-white mb-4">
              Pilih Paket PJUTS Sesuai Kebutuhan
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Semua paket sudah termasuk panel surya, baterai, lampu LED, tiang all-in-one, dan gratis instalasi.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pjutsPackages.map((pkg, i) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className={`relative p-6 rounded-2xl border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                  pkg.wattage === 60
                    ? "bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border-emerald-500 shadow-lg shadow-emerald-500/20"
                    : "bg-card border-border hover:border-emerald-500/30"
                }`}
              >
                {pkg.wattage === 60 && (
                  <span className="absolute -top-3 left-6 px-3 py-1 bg-gold text-navy text-xs font-bold rounded-full shadow-md">
                    BEST SELLER
                  </span>
                )}

                <h4 className={`text-lg font-bold mb-2 ${pkg.wattage === 60 ? "text-white" : "text-navy dark:text-white"}`}>
                  {pkg.name}
                </h4>

                <p className={`text-sm mb-4 leading-relaxed ${pkg.wattage === 60 ? "text-white/80" : "text-muted-foreground"}`}>
                  {pkg.desc}
                </p>

                {/* Specs */}
                <div className={`space-y-2 mb-4 ${pkg.wattage === 60 ? "" : ""}`}>
                  {[
                    { label: "Panel", value: pkg.panel },
                    { label: "Baterai", value: pkg.battery },
                    { label: "Lampu", value: pkg.lamp },
                    { label: "Tiang", value: pkg.pole },
                  ].map(spec => (
                    <div key={spec.label} className={`flex items-center justify-between text-xs ${pkg.wattage === 60 ? "text-white/70" : "text-muted-foreground"}`}>
                      <span>{spec.label}</span>
                      <span className={`font-medium ${pkg.wattage === 60 ? "text-white" : "text-navy dark:text-white"}`}>{spec.value}</span>
                    </div>
                  ))}
                </div>

                {/* Features */}
                <div className={`space-y-1.5 mb-5`}>
                  {pkg.features.map(f => (
                    <div key={f} className={`flex items-start gap-2 text-xs ${pkg.wattage === 60 ? "text-white/70" : "text-muted-foreground"}`}>
                      <CheckCircle className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${pkg.wattage === 60 ? "text-gold-light" : "text-emerald-500"}`} />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>

                <p className={`text-2xl font-extrabold mb-4 ${pkg.wattage === 60 ? "text-white" : "text-navy dark:text-white"}`}>
                  {formatRp(pkg.price)}
                </p>

                <a
                  href={`https://wa.me/6281328190707?text=${encodeURIComponent(`Halo PT. Jaya Mandiri Smart Energy, saya tertarik paket ${pkg.name} (${formatRp(pkg.price)}) untuk PJUTS`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                    pkg.wattage === 60
                      ? "bg-white text-emerald-600 hover:bg-white/90"
                      : "bg-emerald-600 text-white hover:bg-emerald-700"
                  }`}
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
