"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import {
  Shield,
  Award,
  Users,
  Wrench,
  Clock,
  MapPin,
  FileCheck,
  HardHat,
  Star,
  BadgeCheck,
  Building2,
} from "lucide-react";

const trustItems = [
  {
    icon: FileCheck,
    title: "Legalitas PT Resmi",
    desc: "Terdaftar sebagai badan usaha resmi PT. Jaya Mandiri Smart Energy dengan NIB, SK Kemenkumham, dan izin usaha lengkap yang transparan dan dapat diverifikasi.",
  },
  {
    icon: Users,
    title: "Tim Teknisi Bersertifikat",
    desc: "Didukung oleh insinyur dan teknisi berpengalaman yang telah menangani 500+ proyek instalasi PLTS di seluruh Sumatera dan Jawa Bagian Barat.",
  },
  {
    icon: HardHat,
    title: "Owner Supervised",
    desc: "Setiap proyek diawasi langsung oleh pemilik perusahaan untuk memastikan kualitas terbaik tanpa kompromi. Tidak disubkontrakkan sembarangan.",
  },
  {
    icon: Award,
    title: "Portofolio Terbukti",
    desc: "Ratusan proyek berhasil diselesaikan untuk rumah tangga, perkebunan sawit, bisnis UMKM, institusi pemerintah, dan korporasi besar.",
  },
  {
    icon: Shield,
    title: "Garansi Komprehensif",
    desc: "Garansi panel surya 25 tahun performa, inverter Powmr 5 tahun, baterai LiFePO4 5 tahun, dan garansi instalasi profesional oleh tim kami.",
  },
  {
    icon: Wrench,
    title: "Desain Custom oleh Insinyur",
    desc: "Setiap sistem dirancang secara custom oleh insinyur berlisensi berdasarkan survei lokasi, kebutuhan beban, dan kondisi iradiasi matahari spesifik area Anda.",
  },
  {
    icon: Clock,
    title: "Respon 15 Menit via WhatsApp",
    desc: "Tim support kami merespons dalam 15 menit pada jam kerja. Dukungan purna jual yang responsif selama masa garansi dan setelahnya.",
  },
  {
    icon: MapPin,
    title: "Coverage Sumatera & Jawa Barat",
    desc: "Melayani instalasi di seluruh Sumatera (Jambi, Riau, Palembang, Padang, Lampung) dan Jawa Bagian Barat (Jakarta, Bandung). Tim teknisi siap ke lokasi Anda.",
  },
];

const certifications = [
  "PT Resmi (NIB)",
  "SK Kemenkumham",
  "Sertifikat Standar",
  "SIUP Teregistrasi",
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
            <span className="gradient-text">Mitra Energi Mandiri</span>{" "}
            Terpercaya di Indonesia
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Jambi Solar Panel by PT. Jaya Mandiri Smart Energy bukan sekadar
            vendor panel surya. Kami adalah mitra energi Anda yang menyediakan
            solusi lengkap — dari desain, instalasi, hingga maintenance — dengan
            standar kualitas tertinggi dan legalitas resmi.
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

        {/* Certifications & Legal Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-solar/5 to-gold/5 border border-solar/10"
        >
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl font-bold text-navy dark:text-white mb-2">
                Legalitas &amp; Sertifikasi Terjamin
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Kami memegang legalitas lengkap sebagai badan usaha resmi.
                Setiap proyek dilengkapi dengan dokumentasi resmi, perhitungan
                teknis, dan garansi tertulis yang sah secara hukum. Siap untuk
                tender pemerintah, BUMN, dan korporasi.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {certifications.map((cert) => (
                <span
                  key={cert}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-white dark:bg-navy rounded-lg border border-border text-sm font-semibold text-navy dark:text-white shadow-sm"
                >
                  <BadgeCheck className="w-4 h-4 text-solar" />
                  {cert}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Social Proof Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { icon: Star, label: "Rating Pelanggan", value: "4.9/5", detail: "dari 127+ ulasan" },
            { icon: Building2, label: "Proyek Selesai", value: "500+", detail: "rumah, bisnis, kebun, infra" },
            { icon: MapPin, label: "Region Terlayani", value: "2+", detail: "Sumatera & Jawa Barat" },
            { icon: Shield, label: "Garansi Panel", value: "25 Thn", detail: "performa garansi resmi" },
          ].map((stat) => (
            <div key={stat.label} className="text-center p-4 rounded-xl bg-card border border-border">
              <stat.icon className="w-5 h-5 text-solar mx-auto mb-2" />
              <p className="text-2xl font-extrabold text-navy dark:text-white">{stat.value}</p>
              <p className="text-xs font-semibold text-muted-foreground">{stat.label}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">{stat.detail}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
