"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Home, Building2, Factory, Zap, MessageCircle, Battery, BatteryCharging, Info, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

function waLink(pkg: string) {
  return `https://wa.me/6281328190707?text=Halo%20PT.%20Jaya%20Mandiri%20Smart%20Energy,%20saya%20tertarik%20dengan%20paket%20${encodeURIComponent(pkg)}`;
}

/* ============================================================
   PERHITUNGAN TEKNIS & HARGA — DISUSUN UNTUK KONDISI JAMBI
   ============================================================
   Parameter:
   - PSH Jambi           : 3,5 – 4 jam (avg 3,75 jam)
   - Efisiensi sistem     : 0,80
   - Produksi per kWp    : 3,75 × 0,80 = 3,0 kWh/hari
   - Tarif PLN R-1       : ~Rp 1.500/kWh (avg block tarif)

   Rasio Baterai terhadap PV:
   - Baterai = 26-33% produksi harian PV → cukup untuk kebutuhan malam
   - 5 kWp → 5 kWh  (produksi 17 kWh/hari, baterai 29%)
   - 10 kWp → 10 kWh (produksi 30 kWh/hari, baterai 33%)
   - 12 kWp → 10 kWh (produksi 38 kWh/hari, baterai 26%)
   - 18 kWp → 15 kWh (produksi 57 kWh/hari, baterai 26%)
   - 20 kWp → 20 kWh (produksi 62 kWh/hari, baterai 32%)

   Komponen HPP per panel:
   - Panel 630Wp          : Rp  2.500.000
   - Mounting aluminium    : Rp    400.000
   - BOS (kabel, MC4, CB)  : Rp    500.000
   - Tenaga kerja          : Rp    600.000
                          ─────────────────
   Subtotal per panel      : Rp  4.000.000

   Penyesuaian baterai     : + Rp 2.000.000 (BOS + labor integrasi)

   Margin                  : 35% dari HPP
   PPN                     : 11% dari subtotal (HPP + margin)
   PPh                     : Dipotong oleh pembeli (bukan menambah harga)

   Contoh Silver 5 kWp (tanpa baterai):
   - 9 panel × Rp 4.000.000  = Rp 36.000.000
   - Inverter DEYE 6kW       = Rp 12.000.000
   - HPP                      = Rp 48.000.000
   - Margin 35%               = Rp 16.800.000
   - Subtotal                 = Rp 64.800.000
   - PPN 11%                  = Rp  7.128.000
   - Harga final              = Rp 72.000.000
   ============================================================ */

const categories = [
  {
    icon: Home,
    title: "Silver Package — Rumah Tangga",
    tagline: "Hybrid System 1 Fase — Cocok untuk kebutuhan rumah tangga di Jambi & sekitarnya",
    products: [
      {
        name: "Silver 2 kWp (Tanpa Baterai)",
        desc: "4 panel PV 630Wp + Inverter Hybrid DEYE 3.600W. Cocok untuk rumah kecil: lampu, TV, kipas angin, charger. Produksi ~7,6 kWh/hari (PSH Jambi 3,75h).",
        specs: "4× Panel 630Wp | DEYE 3.6kW Hybrid",
        dailyProduction: "~7,6 kWh/hari",
        savings: "Rp 500rb - 700rb/bulan",
        price: "Rp 36.000.000",
        popular: false,
        battery: false,
      },
      {
        name: "Silver 3 kWp (Tanpa Baterai)",
        desc: "5 panel PV 630Wp + Inverter Hybrid DEYE 3.600W. Ideal untuk rumah menengah dengan AC 1 unit dan kulkas. Produksi ~9,5 kWh/hari.",
        specs: "5× Panel 630Wp | DEYE 3.6kW Hybrid",
        dailyProduction: "~9,5 kWh/hari",
        savings: "Rp 650rb - 900rb/bulan",
        price: "Rp 42.000.000",
        popular: false,
        battery: false,
      },
      {
        name: "Silver 5 kWp (Tanpa Baterai)",
        desc: "9 panel PV 630Wp + Inverter Hybrid DEYE 6.000W. Rumah keluarga besar, AC 2 unit, water heater. Produksi ~17 kWh/hari.",
        specs: "9× Panel 630Wp | DEYE 6kW Hybrid",
        dailyProduction: "~17 kWh/hari",
        savings: "Rp 1,1jt - 1,5jt/bulan",
        price: "Rp 72.000.000",
        popular: true,
        battery: false,
      },
      {
        name: "Silver 5 kWp (Baterai 5 kWh)",
        desc: "9 panel PV 630Wp + DEYE 6.000W + LiFePO4 5 kWh. Full backup saat PLN padam. Baterai menutupi kebutuhan malam hari (lampu, HP, kipas) hingga 8-10 jam.",
        specs: "9× Panel 630Wp | DEYE 6kW | LiFePO4 5kWh",
        dailyProduction: "~17 kWh/hari",
        savings: "Rp 1,1jt - 1,5jt/bulan",
        price: "Rp 97.000.000",
        popular: false,
        battery: true,
        batteryNote: "Rasio baterai 29% dari produksi harian — optimal untuk backup malam",
      },
    ],
  },
  {
    icon: Building2,
    title: "Gold Package — Bisnis & UMKM",
    tagline: "Hybrid System 1 Fase — Solusi bisnis skala menengah hingga besar",
    products: [
      {
        name: "Gold 7 kWp (Tanpa Baterai)",
        desc: "12 panel PV 630Wp + DEYE 6.000W Hybrid. Toko, kantor kecil, workshop, cold storage mini. Produksi ~22,7 kWh/hari.",
        specs: "12× Panel 630Wp | DEYE 6kW Hybrid",
        dailyProduction: "~22,7 kWh/hari",
        savings: "Rp 1,5jt - 2jt/bulan",
        price: "Rp 90.000.000",
        popular: false,
        battery: false,
      },
      {
        name: "Gold 10 kWp (Tanpa Baterai)",
        desc: "16 panel PV 630Wp + GROWATT SPF 10.000ES Hybrid. Gudang, restoran, hotel kecil, minimarket. Produksi ~30,2 kWh/hari.",
        specs: "16× Panel 630Wp | GROWATT 10kW Hybrid",
        dailyProduction: "~30,2 kWh/hari",
        savings: "Rp 2jt - 2,8jt/bulan",
        price: "Rp 121.000.000",
        popular: true,
        battery: false,
      },
      {
        name: "Gold 10 kWp (Baterai 10 kWh)",
        desc: "16 panel PV 630Wp + GROWATT 10.000ES + LiFePO4 10 kWh. Full backup bisnis 24 jam. Baterai menutupi operasional malam hari (lampu, CCTV, kulkas, POS).",
        specs: "16× Panel 630Wp | GROWATT 10kW | LiFePO4 10kWh",
        dailyProduction: "~30,2 kWh/hari",
        savings: "Rp 2jt - 2,8jt/bulan",
        price: "Rp 163.000.000",
        popular: false,
        battery: true,
        batteryNote: "Rasio baterai 33% dari produksi harian — cukup untuk backup operasional malam",
      },
    ],
  },
  {
    icon: Factory,
    title: "Platinum Package — Industri",
    tagline: "Hybrid System 3 Fase — Solusi skala besar untuk efisiensi maksimal",
    products: [
      {
        name: "Platinum 12 kWp (Baterai 10 kWh)",
        desc: "20 panel PV 630Wp + DEYE 10.000W 3-Fase + LiFePO4 10 kWh. Pabrik menengah, processing plant. Produksi ~37,8 kWh/hari.",
        specs: "20× Panel 630Wp | DEYE 10kW 3P | LiFePO4 10kWh",
        dailyProduction: "~37,8 kWh/hari",
        savings: "Rp 2,5jt - 3,5jt/bulan",
        price: "Rp 195.000.000",
        popular: false,
        battery: true,
        batteryNote: "Rasio baterai 26% dari produksi harian — optimal untuk beban penting malam",
      },
      {
        name: "Platinum 18 kWp (Baterai 15 kWh)",
        desc: "30 panel PV 630Wp + DEYE 15.000W 3-Fase + LiFePO4 15 kWh. Pabrik besar, agro-industri, rumah makan besar. Produksi ~56,7 kWh/hari.",
        specs: "30× Panel 630Wp | DEYE 15kW 3P | LiFePO4 15kWh",
        dailyProduction: "~56,7 kWh/hari",
        savings: "Rp 3,8jt - 5jt/bulan",
        price: "Rp 282.000.000",
        popular: true,
        battery: true,
        batteryNote: "Rasio baterai 26% dari produksi harian — menutupi beban esensial malam",
      },
      {
        name: "Platinum 20 kWp (Baterai 20 kWh)",
        desc: "33 panel PV 630Wp + DEYE 20.000W 3-Fase + LiFePO4 20 kWh. Mega proyek, industrial complex, hotel. Produksi ~62,4 kWh/hari.",
        specs: "33× Panel 630Wp | DEYE 20kW 3P | LiFePO4 20kWh",
        dailyProduction: "~62,4 kWh/hari",
        savings: "Rp 4,1jt - 5,5jt/bulan",
        price: "Rp 325.000.000",
        popular: false,
        battery: true,
        batteryNote: "Rasio baterai 32% dari produksi harian — full backup untuk operasional kritis",
      },
    ],
  },
];

/* Harga sudah termasuk: Peralatan, Instalasi, Survei & Desain, Garansi
   Harga sudah termasuk PPN 11%
   PPh dipotong oleh pihak pembeli (bukan menambah harga jual) */

export function ProductSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [showCalc, setShowCalc] = useState(false);

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
            (PSH 3,5–4 jam) dan rasio baterai yang optimal terhadap produksi panel
            surya. Tersedia opsi tanpa baterai (hemat investasi) maupun dengan
            baterai LiFePO4 (full backup 24 jam). Harga sudah termasuk PPN 11%,
            instalasi, survei, desain, dan garansi resmi.
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
                <strong>Parameter Jambi:</strong> PSH (Peak Sun Hours) rata-rata 3,5–4 jam/hari.
                Produksi harian = Kapasitas kWp × PSH × Efisiensi 80%.
              </p>
              <p>
                <strong>Rasio Baterai:</strong> Kapasitas baterai = 26–33% dari produksi harian PV.
                Cukup untuk kebutuhan malam hari (backup esensial 8–10 jam), tanpa over-sizing.
              </p>
              <p>
                <strong>Biaya per panel (630Wp):</strong> Panel Rp 2,5jt + Mounting Rp 400rb + BOS
                Rp 500rb + Tenaga Kerja Rp 600rb = Rp 4jt/panel.
              </p>
              <p>
                <strong>Margin:</strong> 35% dari HPP (Harga Pokok Produksi).
                <strong> PPN 11%</strong> sudah termasuk dalam harga tertera.
                <strong> PPh</strong> dipotong oleh pihak pembeli (wajib pajak), bukan menambah harga jual.
              </p>
            </motion.div>
          )}
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
                    className={`text-sm mb-3 leading-relaxed ${
                      product.popular
                        ? "text-white/80"
                        : "text-muted-foreground"
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

                  {product.battery && (
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium mb-3 ml-2 ${
                      product.popular
                        ? "bg-white/10 text-gold-light"
                        : "bg-gold/10 text-gold"
                    }`}>
                      <Battery className="w-3.5 h-3.5" />
                      LiFePO4 Backup
                    </span>
                  )}

                  {/* Battery sizing note */}
                  {product.batteryNote && (
                    <p className={`text-xs mt-2 mb-3 leading-relaxed ${product.popular ? "text-white/60" : "text-muted-foreground"}`}>
                      {product.batteryNote}
                    </p>
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
                      Estimasi Penghematan Bulanan
                    </p>
                    <p
                      className={`text-lg font-bold ${
                        product.popular ? "text-gold-light" : "text-solar"
                      }`}
                    >
                      {product.savings}
                    </p>
                    <p
                      className={`text-xs mt-1 ${
                        product.popular ? "text-white/50" : "text-muted-foreground"
                      }`}
                    >
                      Produksi: {product.dailyProduction}
                    </p>
                  </div>

                  <p
                    className={`text-lg font-extrabold mb-1 ${
                      product.popular ? "text-white" : "text-navy dark:text-white"
                    }`}
                  >
                    {product.price}
                  </p>
                  <p
                    className={`text-xs mb-4 ${
                      product.popular ? "text-white/50" : "text-muted-foreground"
                    }`}
                  >
                    Sudah termasuk PPN 11%, instalasi & garansi
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
