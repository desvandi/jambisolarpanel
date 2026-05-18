"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ServicePageLayout } from "@/components/landing/ServicePageLayout";
import { MessageCircle, ClipboardList, FileText, Search, Package, Wrench, ArrowRight, CheckCircle, Building, Landmark } from "lucide-react";

const services = [
  { icon: ClipboardList, title: "EPC (Engineering, Procurement, Construction)", desc: "Layanan lengkap dari desain, pengadaan material, hingga konstruksi dan commissioning sistem energi terbarukan." },
  { icon: FileText, title: "RAB & Proposal Teknis", desc: "Penyusunan Rencana Anggaran Biaya dan proposal teknis sesuai standar yang dibutuhkan untuk proses tender." },
  { icon: Search, title: "Survei & Desain Sistem", desc: "Survei lokasi profesional, analisis kebutuhan energi, dan desain sistem optimal berdasarkan kondisi site." },
  { icon: Package, title: "Pengadaan Material", desc: "Supply panel surya LONGi, inverter, baterai LiFePO4, dan komponen BOS dari brand-brand terpercaya." },
  { icon: Wrench, title: "Maintenance Contract", desc: "Kontrak pemeliharaan berkala untuk menjaga performa sistem tetap optimal sepanjang masa operasional." },
];

const processSteps = [
  { step: 1, title: "Konsultasi", desc: "Diskusi kebutuhan, skala proyek, dan timeline" },
  { step: 2, title: "Survei", desc: "Survei lokasi & analisis teknis detail" },
  { step: 3, title: "Proposal", desc: "RAB, proposal teknis & commercial" },
  { step: 4, title: "Negosiasi", desc: "Diskusi harga, garansi, dan timeline" },
  { step: 5, title: "Eksekusi", desc: "Pengadaan, instalasi & commissioning" },
  { step: 6, title: "Serah Terima", desc: "Dokumentasi, training & handover" },
];

export default function TenderProcurementPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <ServicePageLayout
      subBrand="JMSE Infrastructure"
      title="Pengadaan Barang & Jasa Energi Terbarukan"
      tagline="Siap melayani proyek pengadaan energi terbarukan untuk pemerintah, BUMN, dan korporasi."
      description="JMSE menyediakan layanan EPC dan pengadaan barang & jasa energi terbarukan secara profesional. Kami siap mendukung proyek pemerintah daerah, BUMN, korporasi, dan institusi dalam mewujudkan transisi energi bersih."
      breadcrumbs={[{ label: "Solusi", href: "/" }, { label: "Tender & Procurement" }]}
      waText="Halo PT. Jaya Mandiri Smart Energy, saya ingin konsultasi mengenai pengadaan/tender energi terbarukan. Mohon informasi lebih lanjut."
    >
      {/* Target Clients */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy dark:text-white mb-4">
              Siap Melayani
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Kami terbuka untuk kolaborasi dengan berbagai institusi dan organisasi.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: Landmark, title: "Pemerintah Daerah", desc: "Pemkab, Pemkot, Dinas terkait, Bappeda untuk proyek infrastruktur energi terbarukan" },
              { icon: Building, title: "BUMN & Korporasi", desc: "Perusahaan negara dan swasta yang membutuhkan solusi energi terbarukan" },
              { icon: ClipboardList, title: "Institusi & Yayasan", desc: "Sekolah, kampus, rumah sakit, masjid, dan lembaga sosial lainnya" },
            ].map((c, i) => (
              <motion.div key={c.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }} className="p-6 rounded-xl border border-border bg-card hover:border-solar/30 transition-all hover:shadow-md text-center">
                <div className="w-12 h-12 rounded-xl bg-slate-500/10 flex items-center justify-center mx-auto mb-4">
                  <c.icon className="w-6 h-6 text-slate-600" />
                </div>
                <h3 className="font-bold text-navy dark:text-white mb-2">{c.title}</h3>
                <p className="text-sm text-muted-foreground">{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold text-slate-600 bg-slate-600/10 rounded-full">Layanan Pengadaan</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy dark:text-white mb-4">
              Cakupan Layanan Kami
            </h2>
          </motion.div>
          <div className="space-y-4 max-w-4xl mx-auto" ref={ref}>
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex items-start gap-4 p-5 rounded-xl border border-border bg-card hover:border-solar/30 transition-all hover:shadow-md"
              >
                <div className="w-10 h-10 rounded-lg bg-solar/10 flex items-center justify-center flex-shrink-0">
                  <s.icon className="w-5 h-5 text-solar" />
                </div>
                <div>
                  <h3 className="font-bold text-navy dark:text-white mb-1">{s.title}</h3>
                  <p className="text-sm text-muted-foreground">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy dark:text-white mb-4">
              Proses Kerja Sama
            </h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {processSteps.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="text-center p-4 rounded-xl border border-border bg-card"
              >
                <div className="w-10 h-10 rounded-full bg-solar text-white flex items-center justify-center mx-auto mb-3 text-lg font-bold">
                  {s.step}
                </div>
                <h3 className="font-bold text-navy dark:text-white text-sm mb-1">{s.title}</h3>
                <p className="text-xs text-muted-foreground">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy dark:text-white mb-4">
              Siap Berdiskusi untuk Proyek Anda
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Hubungi kami untuk konsultasi awal mengenai kebutuhan pengadaan energi terbarukan Anda. Kami siap menyusun RAB dan proposal teknis.
            </p>
            <a
              href="https://wa.me/6281328190707?text=Halo%20PT.%20Jaya%20Mandiri%20Smart%20Energy,%20saya%20ingin%20konsultasi%20mengenai%20pengadaan%20energi%20terbarukan%20untuk%20proyek%20kami.%20Mohon%20informasi%20lebih%20lanjut."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-solar hover:bg-solar-dark text-white font-bold rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-solar/30 hover:scale-105"
            >
              <MessageCircle className="w-5 h-5" />
              Konsultasi via WhatsApp
            </a>
          </motion.div>
        </div>
      </section>
    </ServicePageLayout>
  );
}
