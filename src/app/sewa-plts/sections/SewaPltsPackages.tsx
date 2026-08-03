"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check, MessageCircle, Zap, Battery, TrendingUp } from "lucide-react";
import {
  getActiveRentalPackages,
  buildWhatsAppUrl,
  formatRentalRp,
  estimateMonthlyProduction,
} from "@/lib/rentalPackages";

/**
 * Section "Daftar Paket" — menampilkan semua paket sewa PLTS yang aktif
 * dalam grid kartu. Harga diambil dari rentalPackages.ts.
 */
export function SewaPltsPackages() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const packages = getActiveRentalPackages();

  return (
    <section className="py-16 md:py-24 bg-muted/30" id="paket" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14 max-w-3xl mx-auto"
        >
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold text-solar bg-solar/10 rounded-full">
            Pilihan Paket Sewa
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy dark:text-white mb-5">
            Paket Sewa PLTS untuk{" "}
            <span className="gradient-text">Setiap Kebutuhan</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Semua harga sudah termasuk PPN 11%, instalasi profesional, dan
            maintenance berkala selama masa kontrak. Pilih paket sesuai
            kebutuhan rumah atau bisnis Anda.
          </p>
        </motion.div>

        {/* Grid packages */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg, i) => {
            const monthlyProduction = estimateMonthlyProduction(pkg.kWp);
            const waMsg =
              pkg.waMessage ||
              `Halo Jambi Solar Panel.\n\n` +
                `Saya tertarik dengan paket Sewa PLTS ${pkg.name} (${pkg.kWp} kWp + ${pkg.storageKwh} kWh, ${formatRentalRp(
                  pkg.monthlyPrice
                )}/bulan).\n` +
                `Mohon informasi lebih lanjut dan jadwal survei.\n\nTerima kasih.`;

            return (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className={`relative p-6 rounded-2xl border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col ${
                  pkg.popular
                    ? "bg-gradient-to-br from-solar to-solar-dark text-white border-solar shadow-lg shadow-solar/20 lg:scale-105"
                    : "bg-card border-border hover:border-solar/30"
                }`}
              >
                {pkg.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gold text-navy text-xs font-bold rounded-full shadow-md whitespace-nowrap">
                    PALING POPULER
                  </span>
                )}

                {/* Header */}
                <div className="flex items-center gap-2 mb-3">
                  <Zap
                    className={`w-5 h-5 ${pkg.popular ? "text-gold-light" : "text-solar"}`}
                  />
                  <h3
                    className={`text-xl font-bold ${
                      pkg.popular ? "text-white" : "text-navy dark:text-white"
                    }`}
                  >
                    {pkg.name}
                  </h3>
                </div>

                {/* Description */}
                <p
                  className={`text-sm mb-4 leading-relaxed ${
                    pkg.popular ? "text-white/85" : "text-muted-foreground"
                  }`}
                >
                  {pkg.description}
                </p>

                {/* Specs badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold ${
                      pkg.popular ? "bg-white/15 text-white" : "bg-solar/10 text-solar"
                    }`}
                  >
                    <Zap className="w-3.5 h-3.5" />
                    {pkg.kWp} kWp
                  </span>
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold ${
                      pkg.popular ? "bg-white/15 text-white" : "bg-gold/10 text-gold"
                    }`}
                  >
                    <Battery className="w-3.5 h-3.5" />
                    {pkg.storageKwh} kWh
                  </span>
                </div>

                {/* Production estimate */}
                <div
                  className={`p-3 rounded-xl mb-4 ${
                    pkg.popular
                      ? "bg-white/10"
                      : "bg-solar/5 border border-solar/10"
                  }`}
                >
                  <p
                    className={`text-xs ${
                      pkg.popular ? "text-white/70" : "text-muted-foreground"
                    }`}
                  >
                    Produksi bulanan estimasi
                  </p>
                  <p
                    className={`text-lg font-bold flex items-center gap-1.5 ${
                      pkg.popular ? "text-gold-light" : "text-solar"
                    }`}
                  >
                    <TrendingUp className="w-4 h-4" />
                    {monthlyProduction.toLocaleString("id-ID")} kWh
                  </p>
                  <p
                    className={`text-xs mt-1 ${
                      pkg.popular ? "text-white/60" : "text-muted-foreground"
                    }`}
                  >
                    Cocok untuk {pkg.estimatedMonthlyKwh}
                  </p>
                  <div
                    className={`flex items-center justify-between mt-2 pt-2 border-t ${
                      pkg.popular ? "border-white/15" : "border-solar/10"
                    }`}
                  >
                    <span
                      className={`text-xs ${
                        pkg.popular ? "text-white/70" : "text-muted-foreground"
                      }`}
                    >
                      {pkg.savingsRange}
                    </span>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-4">
                  <p
                    className={`text-3xl font-extrabold ${
                      pkg.popular ? "text-white" : "text-navy dark:text-white"
                    }`}
                  >
                    {formatRentalRp(pkg.monthlyPrice)}
                  </p>
                  <p
                    className={`text-xs ${
                      pkg.popular ? "text-white/60" : "text-muted-foreground"
                    }`}
                  >
                    /bulan — sudah termasuk PPN & maintenance
                  </p>
                </div>

                {/* Features */}
                <ul
                  className={`space-y-2 mb-6 flex-1 ${
                    pkg.popular ? "text-white/90" : ""
                  }`}
                >
                  {pkg.features.map((f, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <Check
                        className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                          pkg.popular ? "text-gold-light" : "text-solar"
                        }`}
                      />
                      <span
                        className={
                          pkg.popular ? "text-white/90" : "text-muted-foreground"
                        }
                      >
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href={buildWhatsAppUrl(waMsg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                    pkg.popular
                      ? "bg-white text-solar hover:bg-white/90"
                      : "bg-solar text-white hover:bg-solar-dark"
                  }`}
                >
                  <MessageCircle className="w-4 h-4" />
                  {pkg.ctaLabel}
                </a>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="text-center text-xs text-muted-foreground mt-8 max-w-2xl mx-auto"
        >
          Harga dapat berubah sewaktu-waktu mengikuti kondisi pasar. Hubungi
          tim kami via WhatsApp untuk penawaran terbaru dan opsi pembayaran
          tahunan (tersedia diskon khusus).
        </motion.p>
      </div>
    </section>
  );
}
