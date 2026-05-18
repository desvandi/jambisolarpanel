"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ServicePageLayout } from "@/components/landing/ServicePageLayout";
import { solarPumpPackages } from "@/lib/pricing-solarpump";
import { formatRp } from "@/lib/pricing";
import { MessageCircle, Droplets, Shield, Sun, CheckCircle, TreePine, Factory } from "lucide-react";

const benefits = [
  { icon: TreePine, title: "Irigasi Kebun Sawit", desc: "Solusi utama untuk irigasi perkebunan sawit, karet, dan pertanian skala besar" },
  { icon: Sun, title: "Operasi Siang Hari", desc: "Pompa bekerja saat matahari bersinar — cukup untuk kebutuhan irigasi harian" },
  { icon: Droplets, title: "Tanpa Listrik PLN", desc: "100% tenaga surya, ideal untuk area terpencil tanpa jaringan listrik" },
  { icon: Shield, title: "Auto-Dry Run Protection", desc: "Sensor otomatis mencegah kerusakan pompa saat air habis" },
  { icon: Factory, title: "Stainless Steel", desc: "Body pompa stainless steel tahan karat, cocok untuk air tanah & sungai" },
  { icon: CheckCircle, title: "Garansi Pompa 2 Tahun", desc: "Samking submersible pump berkualitas dengan garansi resmi" },
];

export default function SolarPumpPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <ServicePageLayout
      subBrand="JMSE Agro Solar — Solar Pump"
      title="Solar Water Pump — Pompa Air Tenaga Surya"
      tagline="Irigasi kebun sawit, pertanian, peternakan tanpa listrik PLN."
      description="Pompa air submersible bertenaga surya untuk irigasi perkebunan sawit, pertanian, dan peternakan. Menggunakan pompa Samking submersible berkualitas, panel surya LONGi 650Wp, dan MPPT controller untuk efisiensi maksimal."
      breadcrumbs={[{ label: "Solusi", href: "/" }, { label: "Solar Pump" }]}
      waText="Halo PT. Jaya Mandiri Smart Energy, saya tertarik dengan Solar Water Pump. Mohon informasi lebih lanjut mengenai harga dan spesifikasi."
    >
      {/* Benefits */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy dark:text-white mb-4">
              Keunggulan Solar Pump JMSE
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Pompa air tenaga surya yang tangguh untuk segala kebutuhan irigasi dan supply air.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" ref={ref}>
            {benefits.map((b, i) => (
              <motion.div key={b.title} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: i * 0.08 }} className="p-5 rounded-xl border border-border bg-card hover:border-solar/30 transition-all hover:shadow-md">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center mb-3">
                  <b.icon className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-bold text-navy dark:text-white mb-1">{b.title}</h3>
                <p className="text-sm text-muted-foreground">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem-Solution Section */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-navy dark:text-white mb-8 text-center">
            PLN vs Genset vs Solar Pump — Mana Lebih Hemat?
          </h2>
          {/* Comparison table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-3 font-semibold text-navy dark:text-white">Aspek</th>
                  <th className="text-center p-3 font-semibold text-red-500">PLN</th>
                  <th className="text-center p-3 font-semibold text-orange-500">Genset</th>
                  <th className="text-center p-3 font-semibold text-solar">Solar Pump</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Biaya bahan bakar/listrik", "~Rp 2-5 jt/bulan", "~Rp 3-8 jt/bulan", "Rp 0 (gratis matahari)"],
                  ["Biaya operasional/tahun", "Rp 24-60 jt", "Rp 36-96 jt", "Rp 0"],
                  ["Investasi awal", "Rp 5-15 jt (kabel)", "Rp 10-30 jt", "Rp 18-45 jt"],
                  ["Balik modal", "-", "-", "2-4 tahun"],
                  ["Emisi CO2", "Tergantung PLN", "Sangat tinggi", "Zero emission"],
                  ["Ketersediaan area terpencil", "Tidak bisa", "Perlu BBM", "100% mandiri"],
                  ["Perawatan", "Minim", "Rutin (oli, filter)", "Minim"],
                  ["Daya tahan", "Tergantung jaringan", "5-8 tahun", "10-25 tahun"],
                ].map(([label, pln, genset, solar], i) => (
                  <tr key={i} className="border-b border-border/50 hover:bg-muted/30">
                    <td className="p-3 text-muted-foreground">{label}</td>
                    <td className="p-3 text-center text-red-500/80">{pln}</td>
                    <td className="p-3 text-center text-orange-500/80">{genset}</td>
                    <td className={`p-3 text-center font-medium ${i <= 1 ? "text-solar font-bold" : "text-solar/80"}`}>{solar}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 p-4 rounded-xl bg-solar/5 border border-solar/10 text-center">
            <p className="text-sm text-muted-foreground">
              Dalam <strong className="text-solar">2-4 tahun</strong>, Solar Pump sudah balik modal. Setelah itu, air gratis selama 20+ tahun.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold text-blue-600 bg-blue-600/10 rounded-full">
              Harga Paket Solar Pump
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy dark:text-white mb-4">
              Pilih Kapasitas Sesuai Kebutuhan
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {solarPumpPackages.map((pkg, i) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className={`relative p-6 rounded-2xl border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                  pkg.hp === 2
                    ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white border-blue-500 shadow-lg shadow-blue-500/20"
                    : "bg-card border-border hover:border-blue-500/30"
                }`}
              >
                {pkg.hp === 2 && <span className="absolute -top-3 left-6 px-3 py-1 bg-gold text-navy text-xs font-bold rounded-full shadow-md">BEST SELLER</span>}

                <h4 className={`text-lg font-bold mb-2 ${pkg.hp === 2 ? "text-white" : "text-navy dark:text-white"}`}>{pkg.name}</h4>
                <p className={`text-sm mb-4 leading-relaxed ${pkg.hp === 2 ? "text-white/80" : "text-muted-foreground"}`}>{pkg.desc}</p>

                <div className="space-y-2 mb-4">
                  {[
                    { label: "Pompa", value: pkg.pump },
                    { label: "Panel", value: pkg.panel },
                    { label: "Kapasitas", value: `${pkg.panelKwp} Wp` },
                    { label: "Debit Air", value: pkg.flowRate },
                    { label: "Kedalaman Max", value: pkg.maxHead },
                  ].map(spec => (
                    <div key={spec.label} className={`flex items-center justify-between text-xs ${pkg.hp === 2 ? "text-white/70" : "text-muted-foreground"}`}>
                      <span>{spec.label}</span>
                      <span className={`font-medium ${pkg.hp === 2 ? "text-white" : "text-navy dark:text-white"}`}>{spec.value}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-1.5 mb-5">
                  {pkg.features.map(f => (
                    <div key={f} className={`flex items-start gap-2 text-xs ${pkg.hp === 2 ? "text-white/70" : "text-muted-foreground"}`}>
                      <CheckCircle className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${pkg.hp === 2 ? "text-gold-light" : "text-blue-500"}`} />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>

                <p className={`text-2xl font-extrabold mb-4 ${pkg.hp === 2 ? "text-white" : "text-navy dark:text-white"}`}>{formatRp(pkg.price)}</p>

                <a
                  href={`https://wa.me/6281328190707?text=${encodeURIComponent(`Halo PT. Jaya Mandiri Smart Energy, saya tertarik paket ${pkg.name} (${formatRp(pkg.price)})`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${pkg.hp === 2 ? "bg-white text-blue-600 hover:bg-white/90" : "bg-blue-600 text-white hover:bg-blue-700"}`}
                >
                  <MessageCircle className="w-4 h-4" />
                  Tanya Paket Ini
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Analysis */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass rounded-2xl p-6 sm:p-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy dark:text-white mb-4">
              Simulasi Penghematan Solar Pump
            </h2>
            <p className="text-muted-foreground mb-6">
              Contoh: Solar Pump 2 HP — area sawit 2-4 hektar
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
              {[
                { label: "Biaya Genset/Bulan", value: "Rp 3-8 jt", color: "text-red-500" },
                { label: "Biaya Solar Pump/Bulan", value: "Rp 0", color: "text-solar" },
                { label: "Balik Modal", value: "2-4 tahun", color: "text-gold" },
              ].map(item => (
                <div key={item.label} className="p-3 rounded-xl bg-solar/5 border border-solar/10">
                  <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                  <p className={`text-lg font-bold ${item.color}`}>{item.value}</p>
                </div>
              ))}
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border border-emerald-200 dark:border-emerald-800/30">
              <p className="text-sm text-emerald-700 dark:text-emerald-300 leading-relaxed">
                Setelah <strong>2-4 tahun</strong>, Solar Pump sudah balik modal. Setelah itu, air gratis selama <strong>20+ tahun</strong>. 
                Total penghematan dalam 25 tahun bisa mencapai <strong>Rp 200-600 juta</strong> dibanding genset.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </ServicePageLayout>
  );
}
