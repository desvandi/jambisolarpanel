"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Home, ChevronRight, Sun, Battery, Zap, Shield } from "lucide-react";
import {
  rentalHero,
  buildWhatsAppUrl,
  getCheapestRentalPackage,
  formatRentalRp,
} from "@/lib/rentalPackages";

/**
 * Hero section untuk halaman Sewa PLTS.
 * Menampilkan headline, sub-headline, dua CTA, dan stats ringkas.
 *
 * Mengikuti pola visual ServicePageLayout (gradient navy + solar)
 * namun dipisahkan sebagai komponen sendiri agar dapat menampilkan
 * ilustrasi rumah + panel surya di sisi kanan.
 */
export function SewaPltsHero() {
  const cheapest = getCheapestRentalPackage();

  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy/95 to-navy/90" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-solar/15 via-transparent to-transparent" />

      {/* Floating decoration */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-solar/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 right-20 w-64 h-64 bg-gold/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-2 text-sm text-white/60 mb-6"
        >
          <Link
            href="/"
            className="hover:text-solar-light transition-colors flex items-center gap-1"
          >
            <Home className="w-3.5 h-3.5" />
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-solar-light">{rentalHero.badge}</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left: Text content */}
          <div className="lg:col-span-7">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 mb-5 rounded-full bg-solar/20 border border-solar/30 text-solar-light text-sm font-semibold"
            >
              <span className="w-2 h-2 rounded-full bg-solar-light animate-pulse" />
              {rentalHero.badge}
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white mb-5 leading-tight"
            >
              {rentalHero.title.split(".")[0]}.
              <br />
              <span className="gradient-text">
                {rentalHero.title.split(".").slice(1).join(".").trim()}
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-lg sm:text-xl text-white/75 max-w-2xl leading-relaxed mb-4"
            >
              {rentalHero.subtitle}
            </motion.p>

            {cheapest && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="text-base text-gold-light font-semibold mb-8"
              >
                Paket {cheapest.name}: {cheapest.kWp} kWp + baterai{" "}
                {cheapest.storageKwh} kWh — {formatRentalRp(cheapest.monthlyPrice)}
                /bulan
              </motion.p>
            )}

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="flex flex-col sm:flex-row gap-4 mb-10"
            >
              <a
                href="#kalkulator-sewa"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("kalkulator-sewa")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-solar hover:bg-solar-dark text-white font-bold rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-solar/30 hover:scale-105"
              >
                <Zap className="w-5 h-5" />
                {rentalHero.primaryCta}
              </a>
              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-full border border-white/20 transition-all duration-300"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                {rentalHero.secondaryCta}
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl"
            >
              {rentalHero.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm"
                >
                  <p className="text-lg sm:text-xl font-bold text-solar-light">
                    {stat.value}
                    <span className="text-xs font-medium text-white/60 ml-1">
                      {stat.suffix}
                    </span>
                  </p>
                  <p className="text-[10px] sm:text-xs text-white/50 mt-0.5">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Illustration — House with solar panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-5 flex justify-center"
          >
            <HouseWithSolarIllustration />
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}

/**
 * Ilustrasi rumah dengan panel surya — SVG murni, ringan, animasi ringan.
 * Tidak menggunakan external image agar loading cepat & responsif.
 */
function HouseWithSolarIllustration() {
  return (
    <div className="relative w-full max-w-md">
      <svg
        viewBox="0 0 400 400"
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Sun */}
        <g className="animate-float">
          <circle cx="320" cy="80" r="32" fill="#f59e0b" opacity="0.9" />
          <circle cx="320" cy="80" r="42" fill="#f59e0b" opacity="0.2" />
          {/* Sun rays */}
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i * 45 * Math.PI) / 180;
            const x1 = 320 + Math.cos(angle) * 50;
            const y1 = 80 + Math.sin(angle) * 50;
            const x2 = 320 + Math.cos(angle) * 65;
            const y2 = 80 + Math.sin(angle) * 65;
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#f59e0b"
                strokeWidth="3"
                strokeLinecap="round"
                opacity="0.7"
              />
            );
          })}
        </g>

        {/* Ground */}
        <rect x="0" y="320" width="400" height="80" fill="#15803d" opacity="0.3" />
        <rect x="0" y="320" width="400" height="6" fill="#16a34a" opacity="0.5" />

        {/* House body */}
        <rect
          x="100"
          y="200"
          width="200"
          height="120"
          fill="#1e293b"
          stroke="#22c55e"
          strokeWidth="2"
        />

        {/* Roof */}
        <polygon
          points="80,200 200,120 320,200"
          fill="#0f172a"
          stroke="#22c55e"
          strokeWidth="2"
        />

        {/* Solar panels on roof (left side) */}
        <g>
          <polygon
            points="100,195 195,135 215,150 120,210"
            fill="#16a34a"
            stroke="#22c55e"
            strokeWidth="1.5"
            opacity="0.95"
          />
          {/* Panel grid lines */}
          <line x1="125" y1="180" x2="220" y2="120" stroke="#0f172a" strokeWidth="1" opacity="0.5" />
          <line x1="140" y1="195" x2="235" y2="135" stroke="#0f172a" strokeWidth="1" opacity="0.5" />
          <line x1="155" y1="210" x2="250" y2="150" stroke="#0f172a" strokeWidth="1" opacity="0.5" />
          <line x1="115" y1="172" x2="135" y2="187" stroke="#0f172a" strokeWidth="1" opacity="0.5" />
          <line x1="165" y1="142" x2="185" y2="157" stroke="#0f172a" strokeWidth="1" opacity="0.5" />
          <line x1="205" y1="117" x2="225" y2="132" stroke="#0f172a" strokeWidth="1" opacity="0.5" />
        </g>

        {/* Solar panels on roof (right side) */}
        <g>
          <polygon
            points="205,135 300,195 280,210 185,150"
            fill="#16a34a"
            stroke="#22c55e"
            strokeWidth="1.5"
            opacity="0.95"
          />
          <line x1="215" y1="142" x2="310" y2="202" stroke="#0f172a" strokeWidth="1" opacity="0.5" />
          <line x1="200" y1="157" x2="295" y2="217" stroke="#0f172a" strokeWidth="1" opacity="0.5" />
          <line x1="185" y1="172" x2="280" y2="232" stroke="#0f172a" strokeWidth="1" opacity="0.5" />
        </g>

        {/* Door */}
        <rect x="180" y="260" width="40" height="60" fill="#0f172a" stroke="#22c55e" strokeWidth="1.5" />
        <circle cx="212" cy="290" r="2" fill="#f59e0b" />

        {/* Windows */}
        <rect x="120" y="230" width="40" height="35" fill="#22c55e" opacity="0.3" stroke="#22c55e" strokeWidth="1.5" />
        <line x1="140" y1="230" x2="140" y2="265" stroke="#22c55e" strokeWidth="1" />
        <line x1="120" y1="247" x2="160" y2="247" stroke="#22c55e" strokeWidth="1" />

        <rect x="240" y="230" width="40" height="35" fill="#22c55e" opacity="0.3" stroke="#22c55e" strokeWidth="1.5" />
        <line x1="260" y1="230" x2="260" y2="265" stroke="#22c55e" strokeWidth="1" />
        <line x1="240" y1="247" x2="280" y2="247" stroke="#22c55e" strokeWidth="1" />

        {/* Battery box (next to house) */}
        <rect x="320" y="270" width="50" height="50" fill="#0f172a" stroke="#22c55e" strokeWidth="1.5" rx="6" />
        <rect x="328" y="278" width="34" height="20" fill="#16a34a" opacity="0.3" rx="2" />
        <text x="345" y="312" textAnchor="middle" fontSize="9" fill="#22c55e" fontWeight="bold">
          LiFePO₄
        </text>

        {/* Energy flow animation — sun to panel */}
        <g opacity="0.6">
          <line x1="290" y1="110" x2="220" y2="155" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 4">
            <animate attributeName="stroke-dashoffset" from="0" to="-16" dur="1.5s" repeatCount="indefinite" />
          </line>
        </g>

        {/* Energy flow — panel to battery */}
        <g opacity="0.6">
          <line x1="280" y1="200" x2="335" y2="270" stroke="#22c55e" strokeWidth="2" strokeDasharray="4 4">
            <animate attributeName="stroke-dashoffset" from="0" to="-16" dur="1.5s" repeatCount="indefinite" />
          </line>
        </g>

        {/* Energy flow — battery to house */}
        <g opacity="0.6">
          <line x1="320" y1="295" x2="300" y2="295" stroke="#22c55e" strokeWidth="2" strokeDasharray="4 4">
            <animate attributeName="stroke-dashoffset" from="0" to="-16" dur="1.5s" repeatCount="indefinite" />
          </line>
        </g>
      </svg>

      {/* Floating labels */}
      <div className="absolute top-4 right-0 flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-solar/20 backdrop-blur-sm border border-solar/30 text-[10px] font-semibold text-solar-light">
        <Sun className="w-3 h-3" /> Energi Matahari
      </div>
      <div className="absolute bottom-12 right-0 flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-gold/20 backdrop-blur-sm border border-gold/30 text-[10px] font-semibold text-gold-light">
        <Battery className="w-3 h-3" /> Penyimpanan
      </div>
      <div className="absolute bottom-32 left-0 flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-solar/20 backdrop-blur-sm border border-solar/30 text-[10px] font-semibold text-solar-light">
        <Shield className="w-3 h-3" /> Backup 24 Jam
      </div>
      <div className="absolute top-32 left-0 flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-solar/20 backdrop-blur-sm border border-solar/30 text-[10px] font-semibold text-solar-light">
        <Zap className="w-3 h-3" /> Listrik Surya
      </div>
    </div>
  );
}
