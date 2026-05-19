"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import {
  Home,
  Building2,
  Sprout,
  Car,
  Cpu,
  Hammer,
  ArrowRight,
} from "lucide-react";

const solutions = [
  {
    icon: Home,
    subBrand: "Jambi Solar Home",
    title: "Panel Surya untuk Rumah",
    description: "Hemat tagihan PLN hingga 90%, listrik tetap nyala 24 jam saat padam. Investasi sekali, gratis 25+ tahun. Cocok untuk rumah, villa, guest house.",
    href: "/solar-home",
    color: "bg-solar",
  },
  {
    icon: Building2,
    subBrand: "Jambi Solar Commercial",
    title: "Panel Surya Bisnis & Industri",
    description: "Efisiensi operasional maksimal dengan ROI 5-7 tahun. Solusi untuk kantor, gudang, restoran, hotel, cold storage, dan pabrik.",
    href: "/solar-commercial",
    color: "bg-blue-600",
  },
  {
    icon: Sprout,
    subBrand: "Jambi Solar Agro",
    title: "PJUTS & Solar Pump untuk Kebun",
    description: "Lampu jalan mandiri tanpa kabel PLN, pompa irigasi gratis dari matahari. Solusi utama perkebunan sawit, karet, pertanian.",
    href: "/pjuts",
    color: "bg-emerald-600",
  },
  {
    icon: Car,
    subBrand: "Jambi Solar EV",
    title: "PLTS + EV Charging Terintegrasi",
    description: "Isi daya kendaraan listrik dari matahari — hemat hingga jutaan per tahun. Cocok untuk rumah tangga dan area parkir komersial.",
    href: "/ev-charging",
    color: "bg-amber-600",
  },
  {
    icon: Cpu,
    subBrand: "Jambi Solar IoT",
    title: "Monitoring & Solar CCTV",
    description: "Monitoring real-time performa PLTS + CCTV keamanan 24/7 tanpa kabel PLN. Kontrol penuh dari smartphone Anda.",
    href: "/smart-iot",
    color: "bg-violet-600",
  },
  {
    icon: Hammer,
    subBrand: "Jambi Solar Infrastructure",
    title: "Tender, Pengadaan & Proyek Besar",
    description: "Pengadaan energi terbarukan untuk pemerintah, BUMN, dan korporasi. EPC profesional dengan legalitas lengkap.",
    href: "/tender-procurement",
    color: "bg-slate-700",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function SolutionCards() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="solusi" className="py-20 md:py-28" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold text-solar bg-solar/10 rounded-full">
            Solusi Lengkap
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy dark:text-white mb-6">
            Semua Kebutuhan Energi{" "}
            <span className="gradient-text">dalam Satu Mitra</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Dari rumah tangga hingga infrastruktur besar — kami menyediakan solusi
            energi surya Off-Grid &amp; Hybrid yang komprehensif. Dipercaya untuk rumah, kebun, bisnis, dan proyek infrastruktur di Sumatera &amp; Jawa.
            Paket mulai dari <strong className="text-solar">Rp 6 jutaan</strong>.
          </p>
        </motion.div>

        {/* Solution Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {solutions.map((sol) => (
            <motion.div key={sol.subBrand} variants={cardVariants}>
              <Link
                href={sol.href}
                className="group block p-6 rounded-2xl border border-border bg-card hover:border-solar/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full"
              >
                <div className={`w-12 h-12 rounded-xl ${sol.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <sol.icon className="w-6 h-6 text-white" />
                </div>

                <h3 className="text-base font-bold text-navy dark:text-white mb-1">
                  {sol.subBrand}
                </h3>
                <p className="text-sm font-semibold text-solar mb-3">
                  {sol.title}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {sol.description}
                </p>

                <span className="inline-flex items-center gap-1 text-sm font-semibold text-solar group-hover:gap-2 transition-all duration-300">
                  Selengkapnya
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
