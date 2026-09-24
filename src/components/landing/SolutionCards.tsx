"use client";

import Link from "next/link";
import {
  Home,
  Building2,
  Sprout,
  Car,
  Cpu,
  Hammer,
  ArrowRight,
} from "lucide-react";

const solutions = [
  {
    icon: Home,
    subBrand: "Jambi Solar Home",
    title: "Panel Surya untuk Rumah",
    description: "Kurangi tagihan listrik & tetap nyala saat PLN padam dengan sistem hybrid + baterai. Investasi sekali, manfaat 25+ tahun. Cocok untuk rumah, villa, guest house.",
    href: "/solar-home",
    color: "bg-solar",
  },
  {
    icon: Building2,
    subBrand: "Jambi Solar Commercial",
    title: "Panel Surya Bisnis & Industri",
    description: "Pangkas biaya energi operasional — simulasi ROI tersedia per profil beban. Solusi untuk kantor, gudang, restoran, hotel, cold storage, dan pabrik.",
    href: "/solar-commercial",
    color: "bg-blue-600",
  },
  {
    icon: Sprout,
    subBrand: "Jambi Solar Agro",
    title: "PJUTS & Solar Pump untuk Kebun",
    description: "Lampu jalan mandiri tanpa kabel PLN, pompa irigasi gratis dari matahari. Solusi utama perkebunan sawit, karet, pertanian.",
    href: "/pjuts",
    color: "bg-emerald-600",
  },
  {
    icon: Car,
    subBrand: "Jambi Solar EV",
    title: "PLTS + EV Charging Terintegrasi",
    description: "Isi daya kendaraan listrik dari energi matahari untuk menekan biaya operasional. Cocok untuk rumah tangga dan area parkir komersial.",
    href: "/ev-charging",
    color: "bg-amber-600",
  },
  {
    icon: Cpu,
    subBrand: "Jambi Solar IoT",
    title: "Monitoring & Solar CCTV",
    description: "Monitoring real-time performa PLTS + CCTV keamanan 24/7 tanpa kabel PLN. Kontrol penuh dari smartphone Anda.",
    href: "/smart-iot",
    color: "bg-violet-600",
  },
  {
    icon: Hammer,
    subBrand: "Jambi Solar Infrastructure",
    title: "Tender, Pengadaan & Proyek Besar",
    description: "Pengadaan energi terbarukan untuk pemerintah, BUMN, dan korporasi. EPC profesional dengan legalitas lengkap.",
    href: "/tender-procurement",
    color: "bg-slate-700",
  },
];

export function SolutionCards() {

  return (
    <section id="solusi" className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold text-solar bg-solar/10 rounded-full">
            Solusi Lengkap
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy dark:text-white mb-6">
            Semua Kebutuhan Energi{" "}
            <span className="gradient-text">dalam Satu Mitra</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Dari rumah tangga hingga infrastruktur besar — kami menyediakan solusi
            energi surya Off-Grid &amp; Hybrid yang komprehensif. Melayani rumah, kebun, bisnis, dan proyek infrastruktur di Sumatera &amp; Jawa. Lihat{" "}
            <Link href="/harga-panel-surya-jambi" className="text-solar font-bold hover:underline underline-offset-2">
              harga paket PLTS
            </Link>
            .
          </p>
        </div>

        {/* Solution Grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {solutions.map((sol) => (
            <div key={sol.subBrand}>
              <Link
                href={sol.href}
                className="group block p-6 rounded-2xl border border-border bg-card hover:border-solar/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full"
              >
                <div className={`w-12 h-12 rounded-xl ${sol.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <sol.icon className="w-6 h-6 text-white" />
                </div>

                <h3 className="text-base font-bold text-navy dark:text-white mb-1">
                  {sol.subBrand}
                </h3>
                <p className="text-sm font-semibold text-solar mb-3">
                  {sol.title}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {sol.description}
                </p>

                <span className="inline-flex items-center gap-1 text-sm font-semibold text-solar group-hover:gap-2 transition-all duration-300">
                  Selengkapnya
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
