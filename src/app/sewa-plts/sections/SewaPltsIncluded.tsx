"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  ShieldCheck,
  Wrench,
  Eye,
  CheckCircle2,
  Headphones,
  MessageCircle,
} from "lucide-react";

/**
 * Section "Sudah Termasuk" — kotak hijau yang memberi rasa aman
 * kepada calon pelanggan. Menjawab keraguan tanpa harus bertanya.
 *
 * Ditempatkan setelah Daftar Paket agar user melihat nilai paket
 * sebelum melihat apa saja yang sudah termasuk.
 */
export function SewaPltsIncluded() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const included = [
    {
      icon: Wrench,
      title: "Instalasi Profesional",
      desc: "Tim teknisi bersertifikat, standar K3 & SNI",
    },
    {
      icon: ShieldCheck,
      title: "Maintenance Berkala",
      desc: "Pemeliharaan rutin selama masa kontrak",
    },
    {
      icon: Eye,
      title: "Monitoring Sistem",
      desc: "Pantau performa PLTS real-time via aplikasi",
    },
    {
      icon: CheckCircle2,
      title: "Garansi Pekerjaan",
      desc: "Garansi instalasi & dukungan langsung dari JMSE",
    },
    {
      icon: Headphones,
      title: "Dukungan Teknis",
      desc: "Tim siap membantu via WhatsApp & kunjungan",
    },
    {
      icon: MessageCircle,
      title: "Konsultasi Gratis",
      desc: "Survei lokasi & rekomendasi paket tanpa biaya",
    },
  ];

  return (
    <section className="py-12 md:py-16" ref={ref}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border-2 border-emerald-300 dark:border-emerald-700/50 p-6 sm:p-8"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-3 rounded-full bg-emerald-600 text-white text-sm font-bold">
              <ShieldCheck className="w-4 h-4" />
              Sudah Termasuk
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-navy dark:text-white mb-2">
              Semua Ini Anda Dapatkan Tanpa Biaya Tambahan
            </h3>
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
              Tidak ada biaya tersembunyi. Semua layanan di bawah ini sudah
              termasuk dalam biaya sewa bulanan Anda.
            </p>
          </div>

          {/* Grid layanan */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {included.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.3, delay: 0.1 + i * 0.08 }}
                className="flex items-start gap-3 p-4 rounded-xl bg-white/60 dark:bg-white/5 backdrop-blur-sm border border-emerald-200/50 dark:border-emerald-800/30"
              >
                <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <p className="font-bold text-navy dark:text-white text-sm flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    {item.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom reassurance */}
          <div className="mt-6 pt-6 border-t border-emerald-200 dark:border-emerald-800/40 text-center">
            <p className="text-sm text-emerald-700 dark:text-emerald-300 font-medium">
              ✅ Garansi pekerjaan didukung langsung oleh PT. Jaya Mandiri Smart Energy
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Bekerja sama dengan brand terpercaya: LONGi, Powmr, LiFePO4
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
