"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Sun, Zap, Shield, TrendingUp } from "lucide-react";
import {
  buildWhatsAppUrl,
  getCheapestRentalPackage,
  formatRentalRp,
} from "@/lib/rentalPackages";

/**
 * Section "Final CTA" — penutup yang kuat untuk mendorong
 * conversion ke WhatsApp. Mengulang nilai jual utama Solar as a Service.
 */
export function SewaPltsFinalCta() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const cheapest = getCheapestRentalPackage();

  return (
    <section className="py-16 md:py-24 relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy/95 to-solar-dark" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-solar/20 via-transparent to-transparent" />

      {/* Floating sun */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-gold/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 left-10 w-48 h-48 bg-solar/20 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-solar/20 border border-solar/30 text-solar-light text-sm font-semibold">
            <Sun className="w-4 h-4" />
            Gunakan Energi Matahari Mulai Hari Ini
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white mb-6 leading-tight">
            PLTS Tidak Lagi Harus{" "}
            <span className="text-gold-light">Mahal.</span>
            <br />
            Bayar Bulanan.{" "}
            <span className="gradient-text">Nikmati Listrik Tenaga Surya.</span>
          </h2>

          <p className="text-lg sm:text-xl text-white/75 max-w-3xl mx-auto leading-relaxed mb-8">
            Investasi besar bukan lagi penghalang. Dengan Solar as a Service,
            Anda langsung menikmati manfaat energi surya tanpa perlu
            mengeluarkan puluhan juta rupiah di depan.
          </p>

          {/* Value chips */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {[
              { icon: Shield, text: "Backup otomatis saat PLN padam" },
              { icon: Zap, text: "Tagihan listrik turun hingga 90%" },
              { icon: Sun, text: "Tanpa investasi awal" },
              { icon: TrendingUp, text: "Maintenance termasuk" },
              { icon: Shield, text: "Bisa upgrade kapasitas" },
            ].map((chip) => (
              <span
                key={chip.text}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white/90 bg-white/10 backdrop-blur-sm rounded-full border border-white/15"
              >
                <chip.icon className="w-4 h-4 text-solar-light" />
                {chip.text}
              </span>
            ))}
          </div>

          {/* Price reminder */}
          {cheapest && (
            <p className="text-base text-gold-light font-semibold mb-6">
              Mulai dari {formatRentalRp(cheapest.monthlyPrice)}/bulan — Paket{" "}
              {cheapest.name} ({cheapest.kWp} kWp + {cheapest.storageKwh} kWh)
            </p>
          )}

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={buildWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-solar hover:bg-solar-dark text-white font-bold rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-solar/40 hover:scale-105 animate-whatsapp-pulse"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Konsultasi Gratis Sekarang
            </a>
            <a
              href="#paket"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("paket")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-full border border-white/20 transition-all duration-300"
            >
              Lihat Paket Lainnya
            </a>
          </div>

          {/* Trust indicator */}
          <p className="text-xs text-white/50 mt-8">
            Konsultasi 100% gratis — tanpa kewajiban. Tim kami akan membantu
            memilih paket yang paling sesuai dengan kebutuhan dan budget Anda.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
