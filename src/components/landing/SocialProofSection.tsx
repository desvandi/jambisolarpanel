"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star, Quote, MapPin, CheckCircle, TrendingDown, Zap } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    name: "Bapak Hendra",
    location: "Villa, Jambi",
    role: "Pemilik Villa",
    text: "Sejak pasang panel surya dari Jambi Solar Panel, tagihan listrik villa saya turun drastis. Pemasangan rapi, tim profesional, dan respon cepat. Sangat recommended!",
    rating: 5,
    system: "5 kWp Hybrid",
    beforeBill: "Rp 4 juta/bulan",
    afterBill: "Rp 500 rb/bulan",
    savings: "Hemat Rp 3.5jt/bulan",
    image: null,
  },
  {
    name: "Ibu Ratna",
    location: "Toko, Palembang",
    role: "Pemilik Toko",
    text: "Awalnya ragu, tapi setelah 6 bulan berjalan, saya sangat puas. Listrik toko saya sekarang hampir gratis. Jambi Solar Panel benar-benar solusi yang saya cari.",
    rating: 5,
    system: "3 kWp Hybrid",
    beforeBill: "Rp 3.5 juta/bulan",
    afterBill: "Rp 1 jt/bulan",
    savings: "Hemat Rp 2.5jt/bulan",
    image: null,
  },
  {
    name: "Bapak Darmawan",
    location: "Kebun Sawit, Riau",
    role: "Pemilik Kebun Sawit",
    text: "Kebun saya jauh dari PLN, selama ini pakai genset yang boros. Dengan sistem off-grid dari Jambi Solar Panel, sekarang CCTV dan pompa air saya jalan 24 jam tanpa masalah.",
    rating: 5,
    system: "10 kWp Off-Grid",
    beforeBill: "Rp 12 jt/bulan (genset)",
    afterBill: "Rp 0 (listrik mandiri)",
    savings: "Hemat Rp 8jt/bulan",
    image: null,
  },
  {
    name: "Bapak Faisal",
    location: "Workshop, Padang",
    role: "Pemilik Workshop",
    text: "Mesin workshop saya butuh listrik stabil. Tim Jambi Solar Panel datang survei, desain custom, dan pasang dengan sangat profesional. Garansi juga diberikan lengkap. Top!",
    rating: 5,
    system: "20 kWp Hybrid",
    beforeBill: "Rp 18 juta/bulan",
    afterBill: "Rp 6 jt/bulan",
    savings: "Hemat Rp 12jt/bulan",
    image: null,
  },
  {
    name: "Hj. Siti Aminah",
    location: "Cold Storage, Bangka",
    role: "Pengusaha Cold Storage",
    text: "Cold storage saya butuh listrik non-stop. Panel surya Jambi Solar Panel sangat membantu mengurangi biaya operasional. Investasi terbaik yang pernah saya buat.",
    rating: 5,
    system: "50 kWp Hybrid",
    beforeBill: "Rp 50 juta/bulan",
    afterBill: "Rp 20 jt/bulan",
    savings: "Hemat Rp 30jt/bulan",
    image: null,
  },
  {
    name: "Bapak Agus",
    location: "Kantor Desa, Lampung",
    role: "Kepala Desa",
    text: "Kantor desa kami sekarang pakai panel surya dari Jambi Solar Panel. Warga juga tertarik. Tim mereka sangat sabar menjelaskan dan membantu proses instalasi.",
    rating: 5,
    system: "5 kWp Hybrid",
    beforeBill: "Rp 4 juta/bulan",
    afterBill: "Rp 1 jt/bulan",
    savings: "Hemat Rp 3jt/bulan",
    image: null,
  },
];

const portfolioItems = [
  {
    title: "Villa Premium Jambi",
    desc: "Instalasi 5 kWp Hybrid untuk villa eksklusif dengan pool dan garden lighting.",
    image: "/portfolio-residential.jpg",
    tag: "Residential",
    result: "Tagihan Rp 4jt → Rp 500rb",
  },
  {
    title: "Gudang Industri Palembang",
    desc: "Sistem 50 kWp Hybrid untuk pergudangan modern dengan efisiensi maksimal. Paket custom di luar katalog standar.",
    image: "/portfolio-industrial.jpg",
    tag: "Industrial (Custom)",
    result: "Hemat 60% biaya operasional",
  },
  {
    title: "Kebun Sawit Riau",
    desc: "Sistem Off-Grid 10 kWp untuk pompa air, CCTV, dan pondok kebun.",
    image: "/portfolio-plantation.jpg",
    tag: "Agriculture",
    result: "Listrik mandiri 24 jam",
  },
];

export function SocialProofSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="testimoni" className="py-20 md:py-28 bg-background" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 text-sm font-semibold text-solar bg-solar/10 rounded-full">
            <Star className="w-4 h-4 fill-current" />
            Testimoni &amp; Portofolio
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy dark:text-white mb-6">
            Dipercaya{" "}
            <span className="gradient-text">Ratusan Pelanggan</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Jangan hanya percaya kata kami. Dengarkan langsung pengalaman para
            pelanggan yang telah merasakan manfaat sistem panel surya dari PT.
            Jaya Mandiri Smart Energy.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="relative p-6 rounded-2xl bg-card border border-border hover:shadow-lg hover:border-solar/20 transition-all duration-300"
            >
              <Quote className="absolute top-4 right-4 w-8 h-8 text-solar/10" />

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, j) => (
                  <Star
                    key={j}
                    className="w-4 h-4 text-gold-light fill-current"
                  />
                ))}
              </div>

              {/* Before → After Savings Highlight */}
              <div className="flex items-center gap-3 mb-4 p-3 rounded-xl bg-gradient-to-r from-solar/5 to-gold/5 border border-solar/10">
                <TrendingDown className="w-5 h-5 text-solar flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground font-medium">Biaya Sebelum</p>
                  <p className="text-sm font-bold text-solar">
                    {t.beforeBill} <span className="text-muted-foreground">→</span> {t.afterBill}
                  </p>
                </div>
              </div>

              {/* Text */}
              <p className="text-sm text-foreground leading-relaxed mb-4">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div className="w-10 h-10 rounded-full bg-solar/10 flex items-center justify-center text-solar font-bold text-sm">
                  {t.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-navy dark:text-white">
                    {t.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {t.role} &bull;{" "}
                    <span className="inline-flex items-center gap-0.5">
                      <MapPin className="w-3 h-3" />
                      {t.location}
                    </span>
                  </p>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-3">
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-solar/5 rounded-md text-xs font-medium text-solar">
                  <Zap className="w-3 h-3" />
                  {t.system}
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-gold/5 rounded-md text-xs font-medium text-gold">
                  <CheckCircle className="w-3 h-3" />
                  {t.savings}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Portfolio Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold text-navy dark:text-white mb-8 text-center">
            Portofolio Proyek Terbaru
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {portfolioItems.map((item) => (
              <div
                key={item.title}
                className="group relative overflow-hidden rounded-2xl border border-border hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-[4/3] relative">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 px-3 py-1 bg-solar text-white text-xs font-semibold rounded-full">
                    {item.tag}
                  </span>
                  {/* Result badge */}
                  <span className="absolute top-3 right-3 px-3 py-1 bg-gold/90 text-navy text-xs font-bold rounded-full">
                    {item.result}
                  </span>
                  <div className="absolute bottom-3 left-3 right-3">
                    <h4 className="text-white font-bold text-lg">{item.title}</h4>
                    <p className="text-white/70 text-sm">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
