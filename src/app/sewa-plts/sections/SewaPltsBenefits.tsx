"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Wallet,
  TrendingDown,
  Leaf,
  Wrench,
  ShieldCheck,
  ArrowUpCircle,
  type LucideIcon,
} from "lucide-react";
import { rentalBenefits } from "@/lib/rentalPackages";

/** Peta nama icon string -> komponen Lucide. */
const iconMap: Record<string, LucideIcon> = {
  Wallet,
  TrendingDown,
  Leaf,
  Wrench,
  ShieldCheck,
  ArrowUpCircle,
};

/**
 * Section "Keunggulan" — menampilkan 6 benefit utama program Sewa PLTS
 * dalam grid kartu dengan icon modern.
 */
export function SewaPltsBenefits() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14 max-w-3xl mx-auto"
        >
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold text-solar bg-solar/10 rounded-full">
            Mengapa Sewa PLTS?
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy dark:text-white mb-5">
            Investasi Besar Bukan Lagi{" "}
            <span className="gradient-text">Penghalang</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Solar as a Service menghadirkan semua manfaat energi matahari tanpa
            beban modal di awal. Cukup bayar biaya bulanan, biarkan kami yang
            urus instalasi, perawatan, dan dukungan teknis.
          </p>
        </motion.div>

        {/* Grid benefits */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          ref={ref}
        >
          {rentalBenefits.map((b, i) => {
            const Icon = iconMap[b.icon] ?? Wallet;
            return (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="group p-6 rounded-2xl border border-border bg-card hover:border-solar/40 transition-all hover:shadow-xl hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-solar/15 to-solar/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-solar" />
                </div>
                <h3 className="text-lg font-bold text-navy dark:text-white mb-2">
                  {b.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {b.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-solar/5 via-solar/10 to-gold/10 border border-solar/20 max-w-4xl mx-auto"
        >
          <p className="text-center text-base sm:text-lg text-navy dark:text-white leading-relaxed">
            <strong className="text-solar">Lebih Hemat. Lebih Mandiri. Lebih Ramah Lingkungan.</strong>
            <br />
            <span className="text-muted-foreground">
              Bayar bulanan, nikmati listrik tenaga surya hari ini juga — tanpa
              menunggu bertahun-tahun mengumpulkan dana investasi.
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
