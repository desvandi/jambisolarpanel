"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ServicePageLayout } from "@/components/landing/ServicePageLayout";
import { formatRp } from "@/lib/pricing";
import { MessageCircle, Wrench, Shield, Clock, Search, Settings, CheckCircle, MapPin, Zap } from "lucide-react";

const maintenanceServices = [
  {
    name: "Maintenance Rutin (6 Bulanan)",
    price: 1_500_000,
    unit: "/kunjungan",
    icon: Wrench,
    desc: "Pembersihan panel, pengecekan koneksi, inspeksi visual, pengukuran performa dasar.",
    features: ["Pembersihan panel surya", "Pengecekan semua koneksi & terminal", "Inspeksi visual inverter & baterai", "Pengukuran tegangan & arus", "Laporan hasil pemeriksaan"],
    popular: false,
  },
  {
    name: "Maintenance Tahunan Komprehensif",
    price: 5_000_000,
    unit: "/tahun",
    icon: Settings,
    desc: "Full inspection termasuk thermal imaging, tightening torque, pengujian baterai, dan laporan detail.",
    features: ["Semua layanan maintenance rutin", "Thermal imaging panel & inverter", "Tightening torque semua bolt", "Pengujian kapasitas baterai", "Kalibrasi monitoring system", "Laporan detail & rekomendasi", "2x kunjungan per tahun"],
    popular: true,
  },
  {
    name: "Emergency Repair",
    price: 2_500_000,
    unit: "mulai",
    icon: Zap,
    desc: "Penanganan darurat untuk sistem PLTS yang mengalami masalah — hubungi kami untuk respon cepat.",
    features: ["Respon cepat 24-48 jam", "Diagnosa & troubleshooting", "Penggantian komponen rusak", "Testing & verifikasi perbaikan", "Biaya komponen terpisah"],
    popular: false,
  },
  {
    name: "Audit Sistem PLTS",
    price: 3_000_000,
    unit: "/audit",
    icon: Search,
    desc: "Evaluasi menyeluruh performa sistem PLTS untuk memastikan operasi optimal dan mengidentifikasi potensi masalah.",
    features: ["Analisis data produksi vs estimasi", "Thermal imaging seluruh sistem", "Evaluasi kondisi baterai & inverter", "Inspeksi grounding & proteksi", "Laporan audit komprehensif", "Rekomendasi perbaikan & optimasi"],
    popular: false,
  },
  {
    name: "Retrofit & Upgrade",
    price: 0,
    unit: "konsultasi",
    icon: Shield,
    desc: "Upgrade sistem lama dengan teknologi terbaru. Tambah kapasitas panel, ganti inverter, atau upgrade baterai.",
    features: ["Konsultasi kebutuhan upgrade", "Studi kelayakan teknis", "Proposal retrofit lengkap", "Eksekusi upgrade profesional", "Garansi pekerjaan"],
    popular: false,
  },
];

export default function MaintenancePage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <ServicePageLayout
      subBrand="JMSE O&M"
      title="Operation & Maintenance PLTS"
      tagline="Jaga performa sistem PLTS Anda tetap optimal dengan layanan maintenance profesional."
      description="Layanan pemeliharaan berkala dan perbaikan untuk sistem PLTS Anda. Tim teknisi berpengalaman kami siap menjaga performa dan umur panjang investasi energi surya Anda."
      breadcrumbs={[{ label: "Solusi", href: "/" }, { label: "Maintenance" }]}
      waText="Halo PT. Jaya Mandiri Smart Energy, saya ingin mengetahui layanan maintenance PLTS. Mohon informasi lebih lanjut."
    >
      {/* Coverage */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy dark:text-white mb-4">
              Kenapa Maintenance PLTS Penting?
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Zap, title: "Jaga Performa Optimal", desc: "Panel bersih & koneksi baik = produksi maksimal" },
              { icon: Shield, title: "Perpanjang Umur Sistem", desc: "Deteksi masalah dini mencegah kerusakan besar" },
              { icon: Clock, title: "Minim Downtime", desc: "Maintenance rutin kurangi risiko gangguan operasional" },
              { icon: MapPin, title: "Coverage Luas", desc: "Melayani area Sumatera & Jawa Bagian Barat" },
            ].map((b, i) => (
              <motion.div key={b.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }} className="p-5 rounded-xl border border-border bg-card hover:border-solar/30 transition-all hover:shadow-md">
                <div className="w-10 h-10 rounded-lg bg-solar/10 flex items-center justify-center mb-3">
                  <b.icon className="w-5 h-5 text-solar" />
                </div>
                <h3 className="font-bold text-navy dark:text-white mb-1">{b.title}</h3>
                <p className="text-sm text-muted-foreground">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem → Solution */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-navy dark:text-white mb-8 text-center">
            Masalah Maintenance PLTS? Kami Punya Solusinya
          </h2>
          <div className="space-y-6">
            {[
              {
                problem: "Performa PLTS menurun tanpa terasa",
                solution: "Preventive maintenance rutin menjaga panel bersih, koneksi optimal, dan inverter bekerja maksimal. Produksi listrik tetap stabil sepanjang tahun.",
                icon: "📉",
              },
              {
                problem: "Tidak ada laporan performa sistem",
                solution: "Setiap kunjungan maintenance disertai laporan lengkap: produksi harian, efisiensi sistem, dan rekomendasi optimasi. Anda selalu tahu kondisi PLTS Anda.",
                icon: "📋",
              },
              {
                problem: "Saat rusak, tidak tahu siapa yang mengerti",
                solution: "Tim teknisi JMSE berpengalaman menangani berbagai merek dan tipe PLTS. Emergency repair tersedia dengan respon cepat 24-48 jam.",
                icon: "🔧",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="p-5 rounded-xl border border-border bg-card"
              >
                <div className="flex items-start gap-3 mb-2">
                  <span className="text-xl flex-shrink-0">{item.icon}</span>
                  <div>
                    <p className="font-bold text-red-600 dark:text-red-400 mb-1">{item.problem}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.solution}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <a
              href="https://wa.me/6281328190707?text=Halo%20PT.%20Jaya%20Mandiri%20Smart%20Energy,%20saya%20ingin%20konsultasi%20maintenance%20PLTS"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-solar hover:bg-solar-dark text-white font-bold rounded-full transition-all duration-300"
            >
              <MessageCircle className="w-4 h-4" />
              Konsultasi Maintenance via WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold text-solar bg-solar/10 rounded-full">Layanan Maintenance</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy dark:text-white mb-4">
              Paket Layanan Kami
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" ref={ref}>
            {maintenanceServices.map((s, i) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className={`relative p-6 rounded-2xl border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                  s.popular
                    ? "bg-gradient-to-br from-solar to-solar-dark text-white border-solar shadow-lg shadow-solar/20"
                    : "bg-card border-border hover:border-solar/30"
                }`}
              >
                {s.popular && (
                  <span className="absolute -top-3 left-6 px-3 py-1 bg-gold text-navy text-xs font-bold rounded-full shadow-md">
                    PALING POPULER
                  </span>
                )}

                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${s.popular ? "bg-white/10" : "bg-solar/10"}`}>
                    <s.icon className={`w-5 h-5 ${s.popular ? "text-gold-light" : "text-solar"}`} />
                  </div>
                  <div>
                    <h4 className={`font-bold text-sm ${s.popular ? "text-white" : "text-navy dark:text-white"}`}>{s.name}</h4>
                  </div>
                </div>

                <p className={`text-sm mb-4 leading-relaxed ${s.popular ? "text-white/80" : "text-muted-foreground"}`}>{s.desc}</p>

                <div className="space-y-1.5 mb-5">
                  {s.features.map(f => (
                    <div key={f} className={`flex items-start gap-2 text-xs ${s.popular ? "text-white/70" : "text-muted-foreground"}`}>
                      <CheckCircle className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${s.popular ? "text-gold-light" : "text-solar"}`} />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>

                {s.price > 0 ? (
                  <div className="mb-4">
                    <p className={`text-xl font-extrabold ${s.popular ? "text-white" : "text-navy dark:text-white"}`}>
                      {formatRp(s.price)}
                      <span className={`text-xs font-normal ml-1 ${s.popular ? "text-white/50" : "text-muted-foreground"}`}>{s.unit}</span>
                    </p>
                  </div>
                ) : (
                  <p className={`text-sm font-bold mb-4 ${s.popular ? "text-gold-light" : "text-solar"}`}>
                    Konsultasi via WhatsApp
                  </p>
                )}

                <a
                  href={`https://wa.me/6281328190707?text=${encodeURIComponent(`Halo PT. Jaya Mandiri Smart Energy, saya tertarik layanan ${s.name}. Mohon informasi lebih lanjut.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                    s.popular
                      ? "bg-white text-solar hover:bg-white/90"
                      : "bg-solar text-white hover:bg-solar-dark"
                  }`}
                >
                  <MessageCircle className="w-4 h-4" />
                  {s.price > 0 ? "Tanya Layanan Ini" : "Konsultasi Sekarang"}
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </ServicePageLayout>
  );
}
