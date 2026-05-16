"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Home, Building2, Factory, Zap, MessageCircle } from "lucide-react";

const WA_LINK =
  "https://wa.me/6281328190707?text=Halo%20PT.%20Jaya%20Mandiri%20Smart%20Energy,%20saya%20tertarik%20konsultasi%20panel%20surya";

const categories = [
  {
    icon: Home,
    title: "Paket Rumah Tangga",
    tagline: "Solusi hemat untuk keluarga Indonesia",
    products: [
      {
        name: "Starter 1 kWp",
        desc: "Cocok untuk rumah kecil, lampu, TV, kipas angin",
        savings: "Rp 500rb - 1jt/bulan",
        price: "Mulai Rp 15 Juta",
        popular: false,
      },
      {
        name: "Standard 2 kWp",
        desc: "Ideal untuk rumah menengah, AC 1 unit, kulkas",
        savings: "Rp 1jt - 2jt/bulan",
        price: "Mulai Rp 28 Juta",
        popular: false,
      },
      {
        name: "Premium 3 kWp",
        desc: "Rumah keluarga besar, AC 2 unit, water heater",
        savings: "Rp 2jt - 3.5jt/bulan",
        price: "Mulai Rp 42 Juta",
        popular: true,
      },
      {
        name: "Elite 5 kWp",
        desc: "Rumah mewah, full AC, kolam renang, charging EV",
        savings: "Rp 3.5jt - 5jt/bulan",
        price: "Mulai Rp 65 Juta",
        popular: false,
      },
    ],
  },
  {
    icon: Building2,
    title: "Paket Bisnis & UMKM",
    tagline: "Tingkatkan profit dengan efisiensi energi",
    products: [
      {
        name: "Bisnis 10 kWp",
        desc: "Toko, kantor kecil, workshop, cold storage mini",
        savings: "Rp 5jt - 8jt/bulan",
        price: "Mulai Rp 120 Juta",
        popular: false,
      },
      {
        name: "Bisnis 20 kWp",
        desc: "Gudang, restoran, hotel kecil, minimarket",
        savings: "Rp 10jt - 15jt/bulan",
        price: "Mulai Rp 220 Juta",
        popular: true,
      },
      {
        name: "Bisnis 50 kWp",
        desc: "Pabrik kecil, ruko cluster, pergudangan",
        savings: "Rp 25jt - 40jt/bulan",
        price: "Mulai Rp 500 Juta",
        popular: false,
      },
    ],
  },
  {
    icon: Factory,
    title: "Paket Industri",
    tagline: "Solusi skala besar untuk efisiensi maksimal",
    products: [
      {
        name: "Industri 100 kWp",
        desc: "Pabrik menengah, warehouse besar, processing plant",
        savings: "Rp 50jt - 80jt/bulan",
        price: "Hubungi Kami",
        popular: false,
      },
      {
        name: "Industri 250 kWp",
        desc: "Pabrik besar, mining site, agro-industri",
        savings: "Rp 125jt - 200jt/bulan",
        price: "Hubungi Kami",
        popular: true,
      },
      {
        name: "Custom 500+ kWp",
        desc: "Mega proyek, industrial complex, utility scale",
        savings: "Rp 250jt+/bulan",
        price: "Hubungi Kami",
        popular: false,
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
            Kami menyediakan berbagai paket instalasi PLTS yang dirancang khusus
            untuk setiap segmen. Semua paket termasuk survei, desain, instalasi,
            dan garansi resmi.
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
            <div className="flex items-center gap-3 mb-8">
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {cat.products.map((product, i) => (
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
                      className={`text-lg font-bold ${
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
                    className={`text-sm font-semibold mb-4 ${
                      product.popular ? "text-white" : "text-navy dark:text-white"
                    }`}
                  >
                    {product.price}
                  </p>

                  <a
                    href={WA_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                      product.popular
                        ? "bg-white text-solar hover:bg-white/90 hover:shadow-lg"
                        : "bg-solar text-white hover:bg-solar-dark"
                    }`}
                  >
                    <MessageCircle className="w-4 h-4" />
                    Konsultasi via WhatsApp
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
            Butuh paket custom yang tidak tercantum? Kami siap merancang solusi
            sesuai kebutuhan spesifik Anda.
          </p>
          <a
            href={WA_LINK}
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
