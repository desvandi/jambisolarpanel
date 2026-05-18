"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { FloatingButtons } from "@/components/landing/FloatingButtons";
import { ConsultationForm } from "@/components/landing/ConsultationForm";
import { Home, ChevronRight } from "lucide-react";
import { ReactNode } from "react";

interface ServicePageLayoutProps {
  subBrand: string;
  title: string;
  tagline: string;
  description: string;
  waText?: string;
  children: ReactNode;
  breadcrumbs?: { label: string; href?: string }[];
}

export function ServicePageLayout({
  subBrand,
  title,
  tagline,
  description,
  waText,
  children,
  breadcrumbs = [],
}: ServicePageLayoutProps) {
  const defaultWaText = waText || `Halo PT. Jaya Mandiri Smart Energy, saya tertarik dengan layanan ${subBrand}. Mohon informasi lebih lanjut.`;

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />

      <main className="flex-1">
        {/* Hero Header */}
        <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy/95 to-navy/90" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-solar/10 via-transparent to-transparent" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumbs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-2 text-sm text-white/60 mb-6"
            >
              <Link href="/" className="hover:text-solar-light transition-colors flex items-center gap-1">
                <Home className="w-3.5 h-3.5" />
                Home
              </Link>
              {breadcrumbs.map((bc, i) => (
                <span key={i} className="flex items-center gap-2">
                  <ChevronRight className="w-3 h-3" />
                  {bc.href ? (
                    <Link href={bc.href} className="hover:text-solar-light transition-colors">
                      {bc.label}
                    </Link>
                  ) : (
                    <span className="text-white/80">{bc.label}</span>
                  )}
                </span>
              ))}
              <ChevronRight className="w-3 h-3" />
              <span className="text-solar-light">{subBrand}</span>
            </motion.div>

            {/* Sub-brand Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 rounded-full bg-solar/20 border border-solar/30 text-solar-light text-sm font-semibold"
            >
              <span className="w-2 h-2 rounded-full bg-solar-light animate-pulse" />
              {subBrand}
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 max-w-4xl"
            >
              {title}
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-lg sm:text-xl text-solar-light font-semibold mb-4"
            >
              {tagline}
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg text-white/70 max-w-3xl leading-relaxed mb-8"
            >
              {description}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a
                href={`https://wa.me/6281328190707?text=${encodeURIComponent(defaultWaText)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-solar hover:bg-solar-dark text-white font-bold rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-solar/30 hover:scale-105"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Konsultasi Gratis via WhatsApp
              </a>
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-full border border-white/20 transition-all duration-300"
              >
                Kembali ke Home
              </Link>
            </motion.div>
          </div>

          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
        </section>

        {/* Content */}
        {children}

        {/* Consultation CTA Section */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ConsultationForm />
          </div>
        </section>
      </main>

      <Footer />
      <FloatingButtons />
    </div>
  );
}
