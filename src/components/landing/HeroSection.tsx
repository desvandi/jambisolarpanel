"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { Home, Building2, Sprout, Zap, Car, Cpu } from "lucide-react";

const WA_HERO =
  "https://wa.me/6281328190707?text=Halo%20PT.%20Jaya%20Mandiri%20Smart%20Energy,%20saya%20tertarik%20konsultasi%20solusi%20energi%20mandiri%20dari%20website%20anda";

const features = [
  { icon: "📊", text: "Gratis Survei Area Tertentu" },
  { icon: "🛡️", text: "Garansi Sistem Resmi" },
  { icon: "⚙️", text: "Desain Custom Sesuai Kebutuhan" },
  { icon: "🇮🇩", text: "Sumatera & Jawa Bagian Barat" },
];

const funnelButtons = [
  { label: "Rumah Tangga", href: "/solar-home", icon: Home },
  { label: "Bisnis & Industri", href: "/solar-commercial", icon: Building2 },
  { label: "Kebun & Perkebunan", href: "/pjuts", icon: Sprout },
  { label: "Infrastruktur & PJUTS", href: "/tender-procurement", icon: Zap },
  { label: "EV Charging", href: "/ev-charging", icon: Car },
  { label: "Smart IoT & CCTV", href: "/smart-iot", icon: Cpu },
];

function AnimatedCounter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let current = 0;
    const step = end / 60;
    const timer = setInterval(() => {
      current += step;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 25);
    return () => clearInterval(timer);
  }, [started, end]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-solar.jpg"
          alt="Instalasi Panel Surya Profesional"
          fill
          className="object-cover"
          priority
          quality={85}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/80 to-navy/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />
      </div>

      {/* Animated particles */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-solar/30 rounded-full animate-float"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i * 0.5}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40">
        <div className="max-w-3xl">
          {/* Brand Trust Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full bg-solar/20 border border-solar/30 text-solar-light text-sm font-bold"
          >
            <span className="text-base">&#9728;&#65039;</span>
            <span>Jambi Solar Panel &mdash; by PT. Jaya Mandiri Smart Energy</span>
          </motion.div>

          {/* Trust badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm"
          >
            <span className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-4 h-4 text-gold-light fill-current"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </span>
            <span>Dipercaya Ratusan Pelanggan Rumah &amp; Bisnis</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6"
          >
            Solusi Panel Surya Jambi — Energi Mandiri{" "}
            <span className="gradient-text">Off-Grid &amp; Hybrid</span>{" "}
            untuk Rumah, Bisnis, Kebun, dan Infrastruktur
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-solar-light font-semibold mb-2 max-w-2xl"
          >
            PLTS &bull; PJUTS &bull; Solar Pump &bull; EV Charging &bull; Smart IoT
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22 }}
            className="text-sm text-white/50 mb-8 max-w-2xl"
          >
            Hemat listrik, tetap nyala saat PLN padam, cocok untuk rumah, kebun, bisnis &amp; infrastruktur. Dipercaya 500+ pelanggan di Sumatera &amp; Jawa. Paket mulai dari Rp 6 jutaan.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 mb-10"
          >
            <a
              href={WA_HERO}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-solar hover:bg-solar-dark text-white font-bold text-lg rounded-full transition-all duration-300 hover:shadow-2xl hover:shadow-solar/40 hover:scale-105 animate-whatsapp-pulse"
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Konsultasi Gratis via WhatsApp
            </a>
            <button
              onClick={() => {
                const el = document.querySelector("#solusi");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold text-lg rounded-full border border-white/20 transition-all duration-300 hover:scale-105"
            >
              Lihat Solusi Kami
            </button>
          </motion.div>

          {/* Funnel Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mb-10"
          >
            <p className="text-xs text-white/50 uppercase tracking-wider font-semibold mb-3">
              Pilih Kebutuhan Anda
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {funnelButtons.map((btn) => (
                <Link
                  key={btn.label}
                  href={btn.href}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 hover:border-solar/30 text-white text-sm font-medium transition-all duration-200 hover:scale-[1.02]"
                >
                  <btn.icon className="w-4 h-4 text-solar-light flex-shrink-0" />
                  <span>{btn.label}</span>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Savings Counter */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10"
          >
            {[
              { value: 5, suffix: "+", label: "Tahun Pengalaman" },
              { value: 25, suffix: " Thn", label: "Garansi Panel" },
              { value: 90, suffix: "%", label: "Potensi Hemat" },
              { value: 2, suffix: "+", label: "Region Terlayani" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="text-center p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
              >
                <p className="text-2xl sm:text-3xl font-extrabold text-solar-light">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-xs sm:text-sm text-white/60 mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3"
          >
            {features.map((f) => (
              <div
                key={f.text}
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 text-sm text-white/80"
              >
                <span className="text-lg">{f.icon}</span>
                <span className="font-medium">{f.text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
}
