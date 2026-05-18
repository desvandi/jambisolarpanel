"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Shield,
  Award,
  Users,
  Wrench,
  Clock,
  MapPin,
  FileCheck,
  HardHat,
} from "lucide-react";

const trustItems = [
  {
    icon: FileCheck,
    title: "Legalitas Resmi PT",
    desc: "Terdaftar sebagai badan usaha resmi dengan izin usaha lengkap dan dokumen perusahaan yang transparan.",
  },
  {
    icon: Users,
    title: "Tim Teknisi Ahli Bersertifikat",
    desc: "Didukung oleh insinyur dan teknisi berpengalaman yang telah menangani ratusan proyek di seluruh Indonesia.",
  },
  {
    icon: HardHat,
    title: "Owner Supervised Projects",
    desc: "Setiap proyek diawasi langsung oleh pemilik perusahaan untuk memastikan kualitas terbaik tanpa kompromi.",
  },
  {
    icon: Award,
    title: "Portofolio Terbukti",
    desc: "Ratusan proyek berhasil diselesaikan untuk rumah tangga, bisnis, perkebunan, dan institusi pemerintah di seluruh Indonesia.",
  },
  {
    icon: Shield,
    title: "Garansi Komprehensif",
    desc: "Garansi panel surya 25 tahun performa, inverter 5-10 tahun, dan garansi instalasi oleh tim profesional kami.",
  },
  {
    icon: Wrench,
    title: "Desain Custom oleh Insinyur Berpengalaman",
    desc: "Setiap sistem dirancang secara custom oleh insinyur berlisensi berdasarkan kebutuhan spesifik lokasi Anda.",
  },
  {
    icon: Clock,
    title: "Fast Response & Support",
    desc: "Respon cepat dalam 15 menit via WhatsApp dan dukungan purna jual yang responsif selama masa garansi.",
  },
  {
    icon: MapPin,
    title: "Coverage Sumatera & Jawa Barat",
    desc: "Melayani instalasi di seluruh Sumatera dan Jawa Bagian Barat. Tim teknisi siap ke lokasi Anda untuk survei dan pemasangan.",
  },
];

export function TrustSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="keunggulan" className="py-20 md:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold text-solar bg-solar/10 rounded-full">
            Mengapa Memilih Kami?
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy dark:text-white mb-6">
            Dipercaya sebagai{" "}
            <span className="gradient-text">Ahli Energi Surya</span>{" "}
            Terpercaya di Indonesia
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            PT. Jaya Mandiri Smart Energy bukan sekadar vendor panel surya. Kami
            adalah mitra energi Anda yang menyediakan solusi lengkap dari desain,
            instalasi, hingga maintenance dengan standar kualitas tertinggi.
          </p>
        </motion.div>

        {/* Trust Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group relative p-6 rounded-2xl bg-card border border-border hover:border-solar/30 hover:shadow-xl hover:shadow-solar/5 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-solar/10 flex items-center justify-center mb-4 group-hover:bg-solar group-hover:text-white transition-colors duration-300">
                <item.icon className="w-6 h-6 text-solar group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-lg font-bold text-navy dark:text-white mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-solar/5 to-gold/5 border border-solar/10"
        >
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl font-bold text-navy dark:text-white mb-2">
                Sertifikasi & Legalitas Terjamin
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Kami memegang sertifikasi standar nasional dan internasional untuk
                instalasi sistem PLTS. Setiap proyek dilengkapi dengan dokumentasi
                resmi, perhitungan teknis, dan garansi tertulis yang sah secara
                hukum.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {["PT Perorangan", "NIB", "Sertifikat Standar", "SK Kemenkumham"].map(
                (cert) => (
                  <span
                    key={cert}
                    className="px-4 py-2 bg-white dark:bg-navy rounded-lg border border-border text-sm font-semibold text-navy dark:text-white shadow-sm"
                  >
                    {cert}
                  </span>
                )
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
