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
import { SewaPltsComparisonTable } from "./sections/SewaPltsComparisonTable";
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
 *   4. Tabel Komparasi (ringkasan 10 paket)
 *   5. Daftar Paket (dengan filter kategori)
 *   6. Perbandingan Beli vs Sewa
 *   7. Kalkulator
 *   8. FAQ
 *   9. CTA WhatsApp (Final)
 *
 * Seluruh konten (paket, harga, FAQ, CTA) diambil dari src/lib/rentalPackages.ts
 * sehingga owner cukup mengubah satu file untuk update harga.
 */
export default function SewaPltsPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  /** Scroll ke section paket & aktifkan filter sesuai paket yang dipilih di tabel. */
  const handleSelectPackage = () => {
    const el = document.getElementById("paket");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

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
          <SewaPltsComparisonTable onSelectPackage={handleSelectPackage} />
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
