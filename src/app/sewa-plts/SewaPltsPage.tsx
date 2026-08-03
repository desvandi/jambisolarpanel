"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { FloatingButtons } from "@/components/landing/FloatingButtons";
import { ConsultationForm } from "@/components/landing/ConsultationForm";
import { SewaPltsHero } from "./sections/SewaPltsHero";
import { SewaPltsBenefits } from "./sections/SewaPltsBenefits";
import { SewaPltsPackages } from "./sections/SewaPltsPackages";
import { SewaPltsComparison } from "./sections/SewaPltsComparison";
import { SewaPltsCalculator } from "./sections/SewaPltsCalculator";
import { SewaPltsFaq } from "./sections/SewaPltsFaq";
import { SewaPltsFinalCta } from "./sections/SewaPltsFinalCta";

/**
 * Halaman utama Sewa PLTS — Solar as a Service.
 *
 * Struktur:
 *   1. Hero
 *   2. Keunggulan
 *   3. Daftar Paket
 *   4. Perbandingan Beli vs Sewa
 *   5. Kalkulator
 *   6. FAQ
 *   7. CTA WhatsApp (Final)
 *
 * Seluruh konten (paket, harga, FAQ, CTA) diambil dari src/lib/rentalPackages.ts
 * sehingga owner cukup mengubah satu file untuk update harga.
 */
export default function SewaPltsPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />

      <main className="flex-1">
        <SewaPltsHero />

        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4 }}
        >
          <SewaPltsBenefits />
          <SewaPltsPackages />
          <SewaPltsComparison />
          <SewaPltsCalculator />
          <SewaPltsFaq />
          <SewaPltsFinalCta />
        </motion.div>

        {/* Consultation CTA Section — mengikuti pola service page lainnya */}
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
