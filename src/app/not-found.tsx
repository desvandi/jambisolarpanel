import Link from "next/link";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { FloatingButtons } from "@/components/landing/FloatingButtons";
import {
  Home,
  BookOpen,
  Calculator,
  Sun,
  Home as HouseIcon,
  Building2,
  Sprout,
  ArrowRight,
  SearchX,
} from "lucide-react";

/**
 * Custom 404 — halaman tidak ditemukan.
 * Status 404 otomatis dikirim oleh Next.js, sehingga halaman ini
 * tidak akan diindeks mesin pencari. Konten membantu pengunjung
 * (dan crawler) menemukan halaman penting lainnya.
 */
export default function NotFound() {
  const popularLinks = [
    {
      href: "/solar-home",
      icon: HouseIcon,
      label: "Panel Surya Rumah",
      desc: "PLTS hybrid & off-grid untuk rumah tangga",
    },
    {
      href: "/solar-commercial",
      icon: Building2,
      label: "PLTS Bisnis & Industri",
      desc: "Instalasi solar panel untuk operasional bisnis",
    },
    {
      href: "/solar-pump",
      icon: Sprout,
      label: "Solar Pump & PJUTS",
      desc: "Pompa air dan lampu jalan tenaga surya",
    },
    {
      href: "/sewa-plts",
      icon: Sun,
      label: "Sewa PLTS",
      desc: "Gunakan PLTS dengan pembayaran bulanan",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />

      <main id="main-content" className="flex-1 flex items-center py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* 404 Illustration */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-solar/10 border border-solar/20 mb-8">
            <SearchX className="w-10 h-10 text-solar" />
          </div>

          <p className="text-sm font-bold tracking-widest text-solar uppercase mb-3">
            Error 404
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy dark:text-white mb-4 leading-tight">
            Halaman Tidak Ditemukan
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto mb-10">
            Halaman yang Anda cari mungkin sudah dipindahkan atau alamatnya
            salah tertulis. Silakan kembali ke beranda atau jelajahi halaman
            populer kami di bawah ini.
          </p>

          {/* Primary CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-solar hover:bg-solar-dark text-white font-bold rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-solar/30 hover:-translate-y-0.5"
            >
              <Home className="w-5 h-5" />
              Kembali ke Beranda
            </Link>
            <Link
              href="/harga-panel-surya-jambi"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white dark:bg-navy border-2 border-solar/30 text-solar font-semibold rounded-full transition-all duration-300 hover:border-solar hover:bg-solar/5"
            >
              <Calculator className="w-5 h-5" />
              Lihat Harga Paket PLTS
            </Link>
          </div>

          {/* Popular pages */}
          <div className="text-left">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-solar" />
              Halaman Populer
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {popularLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group flex items-start gap-4 p-5 rounded-2xl bg-card border border-border hover:border-solar/30 hover-lift"
                >
                  <div className="w-10 h-10 rounded-xl bg-solar/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <link.icon className="w-5 h-5 text-solar" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-navy dark:text-white text-sm mb-1 group-hover:text-solar transition-colors">
                      {link.label}
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {link.desc}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-solar opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all mt-1 shrink-0" />
                </Link>
              ))}
            </div>

            <p className="text-center text-sm text-muted-foreground mt-10">
              Atau jelajahi{" "}
              <Link
                href="/artikel"
                className="text-solar font-semibold hover:underline underline-offset-2"
              >
                artikel &amp; panduan panel surya
              </Link>{" "}
              dan{" "}
              <Link
                href="/istilah-plts"
                className="text-solar font-semibold hover:underline underline-offset-2"
              >
                kamus istilah PLTS
              </Link>{" "}
              kami untuk mempelajari PLTS lebih dalam.
            </p>
          </div>
        </div>
      </main>

      <Footer />
      <FloatingButtons />
    </div>
  );
}
