import { MessageCircle, ClipboardList, FileText, Search, Package, Wrench, ArrowRight, CheckCircle, Building, Landmark } from "lucide-react";

/**
 * Konten /tender-procurement — SERVER COMPONENT (optimasi CWV, pola R7/R8).
 * Halaman statis murni (tanpa interaksi) — animasi entrance via CSS
 * (.stagger-item — lihat globals.css).
 */

const services = [
  { icon: ClipboardList, title: "EPC (Engineering, Procurement, Construction)", desc: "Layanan lengkap dari desain, pengadaan material, hingga konstruksi dan commissioning sistem energi terbarukan." },
  { icon: FileText, title: "RAB & Proposal Teknis", desc: "Penyusunan Rencana Anggaran Biaya dan proposal teknis sesuai standar yang dibutuhkan untuk proses tender." },
  { icon: Search, title: "Survei & Desain Sistem", desc: "Survei lokasi profesional, analisis kebutuhan energi, dan desain sistem optimal berdasarkan kondisi site." },
  { icon: Package, title: "Pengadaan Material", desc: "Supply panel surya, inverter, baterai LiFePO4, dan komponen BOS dari brand-brand terpercaya." },
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
  return (
    <>
      {/* Target Clients */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="stagger-item text-center mb-12" style={{ animationDelay: "0s" }}>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy dark:text-white mb-4">
              Siap Melayani
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Kami terbuka untuk kolaborasi dengan berbagai institusi dan organisasi.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: Landmark, title: "Pemerintah Daerah", desc: "Pemkab, Pemkot, Dinas terkait, Bappeda untuk proyek infrastruktur energi terbarukan" },
              { icon: Building, title: "BUMN & Korporasi", desc: "Perusahaan negara dan swasta yang membutuhkan solusi energi terbarukan" },
              { icon: ClipboardList, title: "Institusi & Yayasan", desc: "Sekolah, kampus, rumah sakit, masjid, dan lembaga sosial lainnya" },
            ].map((c, i) => (
              <div key={c.title} className="stagger-item p-6 rounded-xl border border-border bg-card hover:border-solar/30 transition-all hover:shadow-md text-center" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="w-12 h-12 rounded-xl bg-slate-500/10 flex items-center justify-center mx-auto mb-4">
                  <c.icon className="w-6 h-6 text-slate-600" />
                </div>
                <h3 className="font-bold text-navy dark:text-white mb-2">{c.title}</h3>
                <p className="text-sm text-muted-foreground">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem → Solution */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-navy dark:text-white mb-8 text-center">
            Masalah Proyek Energi Terbarukan? Kami Punya Solusinya
          </h2>
          <div className="space-y-6">
            {[
              {
                problem: "Proyek PLTS tender kompleks & banyak persyaratan",
                solution: "Kami membantu penyusunan dokumen teknis, RAB, dan proposal sesuai standar tender pemerintah/BUMN. Pengalaman menangani proyek skala kecil hingga besar.",
                icon: "📄",
              },
              {
                problem: "Butuh vendor dengan legalitas lengkap",
                solution: "PT. Jaya Mandiri Smart Energy adalah perusahaan resmi dengan NIB, Sertifikat Standar, dan dokumen legalitas lengkap untuk memenuhi kualifikasi tender.",
                icon: "🏢",
              },
              {
                problem: "Takut proyek molor & kualitas buruk",
                solution: "Project management profesional dengan timeline jelas, milestone tracking, dan quality control di setiap tahap. Tepat waktu, tepat mutu, tepat biaya.",
                icon: "✅",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="stagger-item p-5 rounded-xl border border-border bg-card"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="flex items-start gap-3 mb-2">
                  <span className="text-xl flex-shrink-0">{item.icon}</span>
                  <div>
                    <p className="font-bold text-red-600 dark:text-red-400 mb-1">{item.problem}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.solution}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <a
              href="https://wa.me/6281328190707?text=Halo%20PT.%20Jaya%20Mandiri%20Smart%20Energy,%20saya%20ingin%20konsultasi%20pengadaan%20energi%20terbarukan"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-800 text-white font-bold rounded-full transition-all duration-300"
            >
              <MessageCircle className="w-4 h-4" />
              Konsultasi Tender via WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="stagger-item text-center mb-12" style={{ animationDelay: "0s" }}>
            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold text-slate-600 bg-slate-600/10 rounded-full">Layanan Pengadaan</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy dark:text-white mb-4">
              Cakupan Layanan Kami
            </h2>
          </div>
          <div className="space-y-4 max-w-4xl mx-auto">
            {services.map((s, i) => (
              <div
                key={s.title}
                className="stagger-item flex items-start gap-4 p-5 rounded-xl border border-border bg-card hover:border-solar/30 transition-all hover:shadow-md"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className="w-10 h-10 rounded-lg bg-solar/10 flex items-center justify-center flex-shrink-0">
                  <s.icon className="w-5 h-5 text-solar" />
                </div>
                <div>
                  <h3 className="font-bold text-navy dark:text-white mb-1">{s.title}</h3>
                  <p className="text-sm text-muted-foreground">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="stagger-item text-center mb-12" style={{ animationDelay: "0s" }}>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy dark:text-white mb-4">
              Proses Kerja Sama
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {processSteps.map((s, i) => (
              <div
                key={s.step}
                className="stagger-item text-center p-4 rounded-xl border border-border bg-card"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className="w-10 h-10 rounded-full bg-solar text-white flex items-center justify-center mx-auto mb-3 text-lg font-bold">
                  {s.step}
                </div>
                <h3 className="font-bold text-navy dark:text-white text-sm mb-1">{s.title}</h3>
                <p className="text-xs text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="stagger-item" style={{ animationDelay: "0s" }}>
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
          </div>
        </div>
      </section>
    </>
  );
}
