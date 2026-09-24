import { PjutsConfigurator } from "./sections/PjutsConfigurator";
import { pjutsPackages } from "@/lib/pricing-pjuts";
import { formatRp } from "@/lib/pricing";
import { MessageCircle, Sun, Shield, Clock, MapPin, Wrench, CheckCircle } from "lucide-react";

/**
 * Konten /pjuts — SERVER COMPONENT (optimasi CWV, pola R7/R8).
 * Animasi entrance via CSS (.stagger-item / .fade-in-item — lihat
 * globals.css). Client island: PjutsConfigurator (interaktif, file
 * terpisah). Kartu paket memakai .fade-in-item (opacity-only) agar
 * efek hover:-translate-y-1 tetap berfungsi.
 */

const benefits = [
  { icon: MapPin, title: "Tanpa Kabel PLN", desc: "Berdiri mandiri di mana saja — jalan desa, perkebunan, area terpencil" },
  { icon: Sun, title: "Auto On/Off", desc: "Sensor cahaya otomatis, menyala saat gelap dan mati saat pagi" },
  { icon: Shield, title: "Garansi 3 Tahun", desc: "Panel surya + baterai LiFePO4 berkualitas tinggi" },
  { icon: Clock, title: "Gratis Instalasi", desc: "Pemasangan tiang all-in-one oleh tim teknisi berpengalaman" },
  { icon: Wrench, title: "Perawatan Mudah", desc: "Sistem all-in-one minim perawatan, panel self-cleaning" },
  { icon: CheckCircle, title: "Tahan Cuaca", desc: "Rating IP65/IP66, tahan hujan deras dan panas terik" },
];

export default function PJUTSPage() {
  return (
    <>
      {/* Benefits */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="stagger-item text-center mb-12" style={{ animationDelay: "0s" }}>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy dark:text-white mb-4">
              Keunggulan PJUTS JMSE
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Sistem all-in-one yang dirancang untuk ketahanan dan kemudahan instalasi di segala medan.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <div
                key={b.title}
                className="stagger-item p-5 rounded-xl border border-border bg-card hover:border-solar/30 transition-all hover:shadow-md"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-3">
                  <b.icon className="w-5 h-5 text-emerald-600" />
                </div>
                <h3 className="font-bold text-navy dark:text-white mb-1">{b.title}</h3>
                <p className="text-sm text-muted-foreground">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem → Solution */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-navy dark:text-white mb-8 text-center">
            Masalah Penerangan Area Anda? Ini Solusinya
          </h2>
          <div className="space-y-6">
            {[
              {
                problem: "Jalan akses perkebunan gelap di malam hari",
                solution: "PJUTS all-in-one menyala otomatis saat gelap. Tanpa kabel PLN, berdiri mandiri di mana saja. Cahaya terang & merata untuk keamanan area.",
                icon: "🌙",
              },
              {
                problem: "Biaya tarik kabel PLN ke lokasi terpencil sangat mahal",
                solution: "PJUTS tidak membutuhkan koneksi PLN sama sekali. Biaya sekali pasang — panel menghasilkan listrik dari matahari dengan garansi performa hingga 25 tahun.",
                icon: "🔌",
              },
              {
                problem: "Genset untuk PJU boros BBM & perawatan rutin",
                solution: "Solar panel + baterai LiFePO4 bekerja tanpa bahan bakar. System all-in-one minim perawatan, cukup bersih panel 2x setahun.",
                icon: "⛽",
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
              href="https://wa.me/6281328190707?text=Halo%20PT.%20Jaya%20Mandiri%20Smart%20Energy,%20saya%20ingin%20konsultasi%20paket%20PJUTS"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-full transition-all duration-300"
            >
              <MessageCircle className="w-4 h-4" />
              Konsultasi PJUTS via WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Pemilih paket cepat — mini-configurator */}
      <PjutsConfigurator />

      {/* Pricing */}
      <section id="harga" className="py-16 md:py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="stagger-item text-center mb-12" style={{ animationDelay: "0s" }}>
            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold text-emerald-600 bg-emerald-600/10 rounded-full">
              Harga Paket PJUTS
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy dark:text-white mb-4">
              Pilih Paket PJUTS Sesuai Kebutuhan
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Semua paket sudah termasuk panel surya, baterai, lampu LED, tiang all-in-one, dan gratis instalasi.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pjutsPackages.map((pkg, i) => (
              <div
                key={pkg.name}
                className={`fade-in-item relative p-6 rounded-2xl border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                  pkg.wattage === 60
                    ? "bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border-emerald-500 shadow-lg shadow-emerald-500/20"
                    : "bg-card border-border hover:border-emerald-500/30"
                }`}
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                {pkg.wattage === 60 && (
                  <span className="absolute -top-3 left-6 px-3 py-1 bg-gold text-navy text-xs font-bold rounded-full shadow-md">
                    BEST SELLER
                  </span>
                )}

                <h4 className={`text-lg font-bold mb-2 ${pkg.wattage === 60 ? "text-white" : "text-navy dark:text-white"}`}>
                  {pkg.name}
                </h4>

                <p className={`text-sm mb-4 leading-relaxed ${pkg.wattage === 60 ? "text-white/80" : "text-muted-foreground"}`}>
                  {pkg.desc}
                </p>

                {/* Specs */}
                <div className={`space-y-2 mb-4 ${pkg.wattage === 60 ? "" : ""}`}>
                  {[
                    { label: "Panel", value: pkg.panel },
                    { label: "Baterai", value: pkg.battery },
                    { label: "Lampu", value: pkg.lamp },
                    { label: "Tiang", value: pkg.pole },
                  ].map(spec => (
                    <div key={spec.label} className={`flex items-center justify-between text-xs ${pkg.wattage === 60 ? "text-white/70" : "text-muted-foreground"}`}>
                      <span>{spec.label}</span>
                      <span className={`font-medium ${pkg.wattage === 60 ? "text-white" : "text-navy dark:text-white"}`}>{spec.value}</span>
                    </div>
                  ))}
                </div>

                {/* Features */}
                <div className={`space-y-1.5 mb-5`}>
                  {pkg.features.map(f => (
                    <div key={f} className={`flex items-start gap-2 text-xs ${pkg.wattage === 60 ? "text-white/70" : "text-muted-foreground"}`}>
                      <CheckCircle className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${pkg.wattage === 60 ? "text-gold-light" : "text-emerald-500"}`} />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>

                <p className={`text-2xl font-extrabold mb-4 ${pkg.wattage === 60 ? "text-white" : "text-navy dark:text-white"}`}>
                  {formatRp(pkg.price)}
                </p>

                <a
                  href={`https://wa.me/6281328190707?text=${encodeURIComponent(`Halo PT. Jaya Mandiri Smart Energy, saya tertarik paket ${pkg.name} (${formatRp(pkg.price)}) untuk PJUTS`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                    pkg.wattage === 60
                      ? "bg-white text-emerald-600 hover:bg-white/90"
                      : "bg-emerald-600 text-white hover:bg-emerald-700"
                  }`}
                >
                  <MessageCircle className="w-4 h-4" />
                  Tanya Paket Ini
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
