"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check, X, Minus, ShoppingBag, Repeat } from "lucide-react";
import { rentalComparison, buildWhatsAppUrl } from "@/lib/rentalPackages";

/**
 * Section "Perbandingan" — tabel modern yang membandingkan
 * Beli PLTS vs Sewa PLTS pada berbagai aspek.
 */
export function SewaPltsComparison() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14 max-w-3xl mx-auto"
        >
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold text-solar bg-solar/10 rounded-full">
            Beli vs Sewa
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy dark:text-white mb-5">
            Beli atau Sewa?{" "}
            <span className="gradient-text">Bandingkan Dulu</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Tidak semua orang siap mengeluarkan puluhan juta rupiah di depan.
            Lihat bagaimana skema sewa bisa menjadi pintu masuk cerdas untuk
            menikmati energi surya.
          </p>
        </motion.div>

        {/* Comparison cards (mobile-friendly: stacked, then table-like on desktop) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm"
        >
          {/* Header row */}
          <div className="grid grid-cols-3 gap-0 bg-navy dark:bg-navy-light text-white">
            <div className="p-4 sm:p-5">
              <p className="text-xs uppercase tracking-wider text-white/60 font-semibold">
                Aspek
              </p>
            </div>
            <div className="p-4 sm:p-5 border-l border-white/10">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-white/70" />
                <p className="text-sm font-bold">Beli PLTS</p>
              </div>
            </div>
            <div className="p-4 sm:p-5 border-l border-white/10 bg-solar/20">
              <div className="flex items-center gap-2">
                <Repeat className="w-4 h-4 text-solar-light" />
                <p className="text-sm font-bold text-solar-light">Sewa PLTS</p>
              </div>
            </div>
          </div>

          {/* Body rows */}
          {rentalComparison.map((row, i) => (
            <div
              key={row.aspect}
              className={`grid grid-cols-3 gap-0 ${
                i !== rentalComparison.length - 1 ? "border-b border-border" : ""
              } hover:bg-muted/30 transition-colors`}
            >
              {/* Aspect */}
              <div className="p-4 sm:p-5">
                <p className="text-sm font-semibold text-navy dark:text-white">
                  {row.aspect}
                </p>
              </div>

              {/* Buy */}
              <div className="p-4 sm:p-5 border-l border-border">
                <div className="flex items-start gap-2">
                  {row.winner === "buy" ? (
                    <Check className="w-4 h-4 text-solar flex-shrink-0 mt-0.5" />
                  ) : row.winner === "rent" ? (
                    <X className="w-4 h-4 text-red-500/70 flex-shrink-0 mt-0.5" />
                  ) : (
                    <Minus className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                  )}
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {row.buy}
                  </p>
                </div>
              </div>

              {/* Rent */}
              <div
                className={`p-4 sm:p-5 border-l border-border ${
                  row.winner === "rent" ? "bg-solar/5" : ""
                }`}
              >
                <div className="flex items-start gap-2">
                  {row.winner === "rent" ? (
                    <Check className="w-4 h-4 text-solar flex-shrink-0 mt-0.5" />
                  ) : row.winner === "buy" ? (
                    <X className="w-4 h-4 text-red-500/70 flex-shrink-0 mt-0.5" />
                  ) : (
                    <Minus className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                  )}
                  <p
                    className={`text-sm leading-relaxed ${
                      row.winner === "rent"
                        ? "text-navy dark:text-white font-semibold"
                        : "text-muted-foreground"
                    }`}
                  >
                    {row.rent}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Summary insight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-solar/5 via-solar/10 to-gold/10 border border-solar/20"
        >
          <h3 className="text-xl font-bold text-navy dark:text-white mb-3 text-center">
            Mengapa Menyewa Lebih Menguntungkan daripada Menunggu?
          </h3>
          <p className="text-base text-muted-foreground leading-relaxed text-center max-w-3xl mx-auto">
            Banyak calon pelanggan menunda beralih ke surya karena menunggu
            dana cukup. Padahal, setiap bulan menunggu, Anda tetap membayar
            tagihan PLN penuh — uang yang sebenarnya bisa dialokasikan ke biaya
            sewa dan langsung menikmati penghematan. Dengan Sewa PLTS, Anda
            mulai berhemat <strong className="text-solar">hari ini</strong>,
            bukan tahun depan. Dan jika nanti ingin memiliki sistem, sebagian
            biaya sewa dapat dikonversi (skema rent-to-own).
          </p>
          <div className="mt-6 text-center">
            <a
              href={buildWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-solar hover:bg-solar-dark text-white font-bold rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-solar/30 hover:scale-105"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Konsultasi Gratis — Pilih Skema Terbaik
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
