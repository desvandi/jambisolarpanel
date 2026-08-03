"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { FloatingButtons } from "@/components/landing/FloatingButtons";
import { ConsultationForm } from "@/components/landing/ConsultationForm";
import { SewaPltsHero } from "./sections/SewaPltsHero";
import { SewaPltsDualMode } from "./sections/SewaPltsDualMode";
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
 *   2. Dual Mode (backup + hemat) — sorotan dua manfaat utama
 *   3. Keunggulan
 *   4. Daftar Paket
 *   5. Perbandingan Beli vs Sewa
 *   6. Kalkulator
 *   7. FAQ
 *   8. CTA WhatsApp (Final)
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
          <SewaPltsDualMode />
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
