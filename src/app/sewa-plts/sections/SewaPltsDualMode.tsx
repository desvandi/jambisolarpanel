"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Zap, ShieldCheck, ArrowRight } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/rentalPackages";

/**
 * Section "Dual Mode" — menonjolkan dua manfaat utama program Sewa PLTS:
 *   1. Backup otomatis saat PLN padam.
 *   2. Penghematan tagihan listrik bulanan.
 *
 * Section ini sengaja dipisah dari Keunggulan agar dua manfaat utama ini
 * mendapat sorotan visual khusus — bukan sekadar dua kartu di antara enam kartu.
 *
 * Penjelasan teknis (timer + relay kontaktor, C-NO/NC) sengaja TIDAK
 * ditampilkan. Yang ditonjolkan adalah OUTCOME dari skema tersebut:
 * "otomatis switch", "tagihan turun".
 */
export function SewaPltsDualMode() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-16 md:py-24 relative overflow-hidden" ref={ref}>
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-br from-solar/5 via-transparent to-gold/5" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14 max-w-3xl mx-auto"
        >
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold text-solar bg-solar/10 rounded-full">
            Satu Sistem, Dua Manfaat
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy dark:text-white mb-5">
            Bukan Sekedar Hemat.{" "}
            <span className="gradient-text">Juga Backup Listrik.</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Sistem Sewa PLTS kami dikonfigurasi cerdas — bekerja dua mode sekaligus.
            Tagihan listrik turun setiap bulan, dan rumah tetap menyala saat PLN
            padam. Dua manfaat yang biasanya harus dibeli terpisah, kini dalam satu
            paket sewa.
          </p>
        </motion.div>

        {/* Two-mode cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-12">
          {/* Mode 1: Backup */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative p-8 rounded-3xl bg-gradient-to-br from-navy to-navy-light text-white overflow-hidden group"
          >
            {/* Decoration */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-solar/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-xl bg-solar/20 border border-solar/30 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-solar-light" />
                </div>
                <span className="text-xs font-semibold text-solar-light uppercase tracking-wider">
                  Mode 1 — Backup
                </span>
              </div>

              <h3 className="text-2xl font-bold mb-3">
                PLN Padam? Rumah Tetap Menyala.
              </h3>

              <p className="text-white/75 leading-relaxed mb-6">
                Saat grid PLN mati, sistem otomatis mengalihkan beban rumah ke
                inverter dan baterai LiFePO4. Tidak perlu genset, tidak perlu
                UPS tambahan, tidak perlu panik. Lampu, kulkas, dan peralatan
                penting tetap berjalan sampai PLN kembali normal.
              </p>

              <ul className="space-y-2.5">
                {[
                  "Switching otomatis dalam hitungan detik",
                  "Tanpa genset bising & boros BBM",
                  "Baterai LiFePO4 tahan berjam-jam",
                  "Cocok untuk WFH, kulkas obat, pompa air",
                ].map((point, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.3, delay: 0.4 + i * 0.1 }}
                    className="flex items-start gap-2 text-sm text-white/85"
                  >
                    <ArrowRight className="w-4 h-4 text-solar-light flex-shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Mode 2: Save */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative p-8 rounded-3xl bg-gradient-to-br from-solar to-solar-dark text-white overflow-hidden group"
          >
            {/* Decoration */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-gold/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-gold-light" />
                </div>
                <span className="text-xs font-semibold text-gold-light uppercase tracking-wider">
                  Mode 2 — Save
                </span>
              </div>

              <h3 className="text-2xl font-bold mb-3">
                Tagihan Listrik Bulanan Turun.
              </h3>

              <p className="text-white/85 leading-relaxed mb-6">
                Saat baterai penuh atau pada jam-jam tertentu (misal malam hari),
                beban rumah otomatis dialihkan ke inverter. Hasilnya: pemakaian
                dari PLN berkurang, dan tagihan listrik bulanan turun signifikan.
                Tim kami yang mengkonfigurasi jadwal optimal — Anda tinggal
                nikmati tagihan yang lebih hemat.
              </p>

              <ul className="space-y-2.5">
                {[
                  "Penghematan tagihan hingga 90%",
                  "Biaya sewa tetap, dapat diprediksi",
                  "Jadwal switching dikonfigurasi tim ahli",
                  "Cocok untuk rumah dengan AC & peralatan modern",
                ].map((point, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.3, delay: 0.4 + i * 0.1 }}
                    className="flex items-start gap-2 text-sm text-white/95"
                  >
                    <ArrowRight className="w-4 h-4 text-gold-light flex-shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* How it works (high-level, no jargon) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="p-6 sm:p-8 rounded-2xl bg-card border border-border max-w-4xl mx-auto"
        >
          <h3 className="text-lg font-bold text-navy dark:text-white mb-4 text-center">
            Bagaimana Cara Kerjanya?
          </h3>
          <p className="text-sm text-muted-foreground text-center leading-relaxed mb-6">
            Sistem menggunakan konfigurasi cerdas dengan timer &amp; kontaktor
            yang dikonfigurasi oleh tim ahli kami. Anda tidak perlu memahami
            teknisnya — yang perlu Anda tahu: sistem bekerja otomatis, 24/7.
          </p>

          {/* Three-state diagram */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="text-center p-4 rounded-xl bg-muted/50">
              <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-3">
                <span className="text-xl">☀️</span>
              </div>
              <p className="text-sm font-bold text-navy dark:text-white mb-1">
                Siang Cerah
              </p>
              <p className="text-xs text-muted-foreground">
                Surya → beban + isi baterai. PLN standby.
              </p>
            </div>

            <div className="text-center p-4 rounded-xl bg-muted/50">
              <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mx-auto mb-3">
                <span className="text-xl">🌙</span>
              </div>
              <p className="text-sm font-bold text-navy dark:text-white mb-1">
                Malam / Jadwal Hemat
              </p>
              <p className="text-xs text-muted-foreground">
                Baterai → beban. Tagihan PLN otomatis turun.
              </p>
            </div>

            <div className="text-center p-4 rounded-xl bg-muted/50">
              <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-3">
                <span className="text-xl">⚠️</span>
              </div>
              <p className="text-sm font-bold text-navy dark:text-white mb-1">
                PLN Padam
              </p>
              <p className="text-xs text-muted-foreground">
                Otomatis switch ke baterai. Rumah tetap menyala.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-6 text-center">
            <a
              href={buildWhatsAppUrl(
                "Halo Jambi Solar Panel.\n\n" +
                  "Saya tertarik dengan program Sewa PLTS, khususnya fitur dual-mode (backup PLN padam + hemat tagihan).\n" +
                  "Mohon penjelasan lebih detail dan jadwal survei.\n\nTerima kasih."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-solar hover:bg-solar-dark text-white font-bold rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-solar/30 hover:scale-105"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Tanya Detail Cara Kerja
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
