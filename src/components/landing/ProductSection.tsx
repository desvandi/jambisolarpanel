"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Home, Building2, Factory, Zap, MessageCircle, Battery, BatteryCharging } from "lucide-react";

function waLink(pkg: string) {
  return `https://wa.me/6281328190707?text=Halo%20PT.%20Jaya%20Mandiri%20Smart%20Energy,%20saya%20tertarik%20dengan%20paket%20${encodeURIComponent(pkg)}`;
}

const categories = [
  {
    icon: Home,
    title: "Silver Package — Rumah Tangga",
    tagline: "Hybrid Off-Grid System 1 Phase — Cocok untuk kebutuhan rumah tangga",
    products: [
      {
        name: "Silver 2 kWp (Tanpa Baterai)",
        desc: "4 panel PV 630Wp + Inverter DEYE 3.600W. Cocok untuk rumah kecil: lampu, TV, kipas angin.",
        savings: "Rp 1jt - 2jt/bulan",
        price: "Rp 51.350.000",
        popular: false,
        battery: false,
      },
      {
        name: "Silver 3 kWp (Tanpa Baterai)",
        desc: "5 panel PV 630Wp + Inverter DEYE 3.600W. Ideal untuk rumah menengah, AC 1 unit, kulkas.",
        savings: "Rp 1.5jt - 2.5jt/bulan",
        price: "Rp 58.890.000",
        popular: false,
        battery: false,
      },
      {
        name: "Silver 5 kWp (Tanpa Baterai)",
        desc: "9 panel PV 630Wp + Inverter DEYE 6.000W. Rumah keluarga besar, AC 2 unit, water heater.",
        savings: "Rp 2.5jt - 4jt/bulan",
        price: "Rp 85.800.000",
        popular: true,
        battery: false,
      },
      {
        name: "Silver 5 kWp (Baterai 5kWh)",
        desc: "9 panel PV 630Wp + DEYE 6.000W + LiFePO4 5.000Wh. Full backup, listrik 24 jam saat padam.",
        savings: "Rp 2.5jt - 4jt/bulan",
        price: "Rp 110.500.000",
        popular: false,
        battery: true,
      },
    ],
  },
  {
    icon: Building2,
    title: "Gold Package — Bisnis & UMKM",
    tagline: "Hybrid Off-Grid System 1 Phase — Solusi bisnis skala menengah hingga besar",
    products: [
      {
        name: "Gold 7 kWp (Tanpa Baterai)",
        desc: "12 panel PV 630Wp + DEYE SUN 6.000W. Toko, kantor kecil, workshop, cold storage mini.",
        savings: "Rp 4jt - 7jt/bulan",
        price: "Rp 117.000.000",
        popular: false,
        battery: false,
      },
      {
        name: "Gold 10 kWp (Tanpa Baterai)",
        desc: "16 panel PV 630Wp + GROWATT SPE 10.000ES. Gudang, restoran, hotel kecil, minimarket.",
        savings: "Rp 6jt - 10jt/bulan",
        price: "Rp 152.100.000",
        popular: true,
        battery: false,
      },
      {
        name: "Gold 10 kWp (Baterai 10kWh)",
        desc: "16 panel PV 630Wp + GROWATT SPE 10.000ES + LiFePO4 10.000Wh. Full backup bisnis 24 jam.",
        savings: "Rp 6jt - 10jt/bulan",
        price: "Rp 194.740.000",
        popular: false,
        battery: true,
      },
    ],
  },
  {
    icon: Factory,
    title: "Platinum Package — Industri",
    tagline: "Hybrid Off-Grid System 3 Phase — Solusi skala besar untuk efisiensi maksimal",
    products: [
      {
        name: "Platinum 12 kWp (Baterai 10kWh)",
        desc: "20 panel PV 630Wp + DEYE SUN 10.000W + LiFePO4 10.000Wh. Pabrik menengah, processing plant.",
        savings: "Rp 8jt - 14jt/bulan",
        price: "Rp 252.850.000",
        popular: false,
        battery: true,
      },
      {
        name: "Platinum 18 kWp (Baterai 15kWh)",
        desc: "30 panel PV 630Wp + DEYE SUN 15.000W + LiFePO4 15.000Wh. Pabrik besar, agro-industri.",
        savings: "Rp 12jt - 22jt/bulan",
        price: "Rp 341.900.000",
        popular: true,
        battery: true,
      },
      {
        name: "Platinum 20 kWp (Baterai 20kWh)",
        desc: "33 panel PV 630Wp + DEYE SUN 20.000W + LiFePO4 20.000Wh. Mega proyek, industrial complex.",
        savings: "Rp 14jt - 25jt/bulan",
        price: "Rp 421.460.000",
        popular: false,
        battery: true,
      },
    ],
  },
];

export function ProductSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
            Kami menyediakan berbagai paket instalasi PLTS Hybrid Off-Grid yang
            dirancang khusus untuk setiap segmen. Tersedia opsi tanpa baterai
            (hemat investasi) maupun dengan baterai LiFePO4 (full backup 24 jam).
            Semua paket termasuk survei, desain, instalasi, dan garansi resmi.
          </p>
        </motion.div>

        {/* Categories */}
        {categories.map((cat, catIdx) => (
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
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {cat.products.map((product) => (
                <div
                  key={product.name}
                  className={`relative p-6 rounded-2xl border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                    product.popular
                      ? "bg-gradient-to-br from-solar to-solar-dark text-white border-solar shadow-lg shadow-solar/20"
                      : "bg-card border-border hover:border-solar/30"
                  }`}
                >
                  {product.popular && (
                    <span className="absolute -top-3 left-6 px-3 py-1 bg-gold text-navy text-xs font-bold rounded-full shadow-md">
                      PALING POPULER
                    </span>
                  )}

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
                    className={`text-sm mb-4 leading-relaxed ${
                      product.popular
                        ? "text-white/80"
                        : "text-muted-foreground"
                    }`}
                  >
                    {product.desc}
                  </p>

                  {product.battery && (
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium mb-3 ${
                      product.popular
                        ? "bg-white/10 text-gold-light"
                        : "bg-gold/10 text-gold"
                    }`}>
                      <Battery className="w-3.5 h-3.5" />
                      Termasuk Baterai LiFePO4
                    </span>
                  )}

                  <div
                    className={`p-3 rounded-xl mb-4 ${
                      product.popular
                        ? "bg-white/10"
                        : "bg-solar/5 border border-solar/10"
                    }`}
                  >
                    <p
                      className={`text-xs font-medium mb-1 ${
                        product.popular ? "text-white/60" : "text-muted-foreground"
                      }`}
                    >
                      Estimasi Penghematan
                    </p>
                    <p
                      className={`text-lg font-bold ${
                        product.popular ? "text-gold-light" : "text-solar"
                      }`}
                    >
                      {product.savings}
                    </p>
                  </div>

                  <p
                    className={`text-lg font-extrabold mb-4 ${
                      product.popular ? "text-white" : "text-navy dark:text-white"
                    }`}
                  >
                    {product.price}
                  </p>

                  <a
                    href={waLink(product.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      if (typeof window !== "undefined" && (window as Record<string, unknown>).fbq) {
                        (window as Record<string, (...args: unknown[]) => void>).fbq!('track', 'Lead');
                      }
                    }}
                    className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                      product.popular
                        ? "bg-white text-solar hover:bg-white/90 hover:shadow-lg"
                        : "bg-solar text-white hover:bg-solar-dark"
                    }`}
                  >
                    <MessageCircle className="w-4 h-4" />
                    Tanya Paket Ini via WhatsApp
                  </a>
                </div>
              ))}
            </div>
          </motion.div>
        ))}

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
