import Image from "next/image";
import Link from "next/link";
import { Home, Building2, Sprout, Sun, Car, Cpu, MapPin } from "lucide-react";

const WA_HERO =
  "https://wa.me/6281328190707?text=Halo%20PT.%20Jaya%20Mandiri%20Smart%20Energy,%20saya%20tertarik%20konsultasi%20solusi%20energi%20mandiri%20dari%20website%20anda";

const features = [
  { icon: "📊", text: "Gratis Survei Area Tertentu" },
  { icon: "🛡️", text: "Garansi Sistem Resmi" },
  { icon: "⚙️", text: "Desain Custom Sesuai Kebutuhan" },
  { icon: "🇮🇩", text: "Sumatera & Jawa Bagian Barat" },
];

const funnelButtons = [
  { label: "Rumah Tangga", href: "/solar-home", icon: Home },
  { label: "Bisnis & Industri", href: "/solar-commercial", icon: Building2 },
  { label: "Kebun & Perkebunan", href: "/solar-pump", icon: Sprout },
  { label: "PJUTS & Infrastruktur", href: "/pjuts", icon: Sun },
  { label: "EV Charging", href: "/ev-charging", icon: Car },
  { label: "Smart IoT & CCTV", href: "/smart-iot", icon: Cpu },
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-solar.jpg"
          alt="Instalasi panel surya profesional untuk rumah dan bisnis di Jambi"
          fill
          className="object-cover"
          priority
          quality={85}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/80 to-navy/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />
        {/* Radial spotlight — memusatkan perhatian pada teks & meningkatkan kontras */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 30% 45%, rgba(15, 23, 42, 0.35) 0%, rgba(15, 23, 42, 0.65) 60%, rgba(15, 23, 42, 0.8) 100%)",
          }}
        />
        {/* Sun glow — aksen hangat bernapas (reduced-motion-safe) */}
        <div aria-hidden="true" className="hero-sun-glow" />
      </div>

      {/* Animated particles */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-solar/30 rounded-full animate-float"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i * 0.5}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40">
        <div className="max-w-3xl">
          {/* Brand Trust Badge */}
          <div
            className="stagger-item inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full bg-solar/20 border border-solar/30 text-solar-light text-sm font-bold"
            style={{ animationDelay: "0.05s" }}
          >
            <span className="text-base">&#9728;&#65039;</span>
            <span>Jambi Solar Panel &mdash; by PT. Jaya Mandiri Smart Energy</span>
          </div>

          {/* Trust badge — fakta layanan, bukan klaim angka tanpa sumber */}
          <div
            className="stagger-item inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm"
            style={{ animationDelay: "0.1s" }}
          >
            <MapPin className="w-4 h-4 text-solar-light flex-shrink-0" />
            <span>Melayani Jambi, Sumatera &amp; Jawa Bagian Barat</span>
          </div>

          {/* Headline — satu intent utama: jasa pasang panel surya / PLTS Jambi */}
          <h1
            className="stagger-item text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6"
            style={{ animationDelay: "0.15s" }}
          >
            Jasa Pasang Panel Surya &amp;{" "}
            <span className="gradient-text">PLTS di Jambi</span>
          </h1>

          {/* Subheadline */}
          <p
            className="stagger-item text-lg sm:text-xl text-solar-light font-semibold mb-2 max-w-2xl"
            style={{ animationDelay: "0.2s" }}
          >
            Survey, desain, pengadaan, instalasi, dan maintenance sistem PLTS
          </p>
          <p
            className="stagger-item text-sm text-white/50 mb-8 max-w-2xl"
            style={{ animationDelay: "0.25s" }}
          >
            Untuk rumah, bisnis, kebun, dan industri di Jambi. Hemat tagihan
            listrik, tetap nyala saat PLN padam &mdash; lihat{" "}
            <Link
              href="/harga-panel-surya-jambi"
              className="underline decoration-solar/60 underline-offset-2 hover:text-solar-light transition-colors"
            >
              harga paket PLTS
            </Link>{" "}
            atau{" "}
            <Link
              href="/sewa-plts"
              className="underline decoration-solar/60 underline-offset-2 hover:text-solar-light transition-colors"
            >
              sewa PLTS bayar bulanan
            </Link>
            .
          </p>

          {/* CTA Buttons */}
          <div
            className="stagger-item flex flex-col sm:flex-row gap-4 mb-10"
            style={{ animationDelay: "0.3s" }}
          >
            <a
              href={WA_HERO}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-solar hover:bg-solar-dark text-white font-bold text-lg rounded-full transition-all duration-300 hover:shadow-2xl hover:shadow-solar/40 hover:scale-105 hover:-translate-y-0.5 animate-whatsapp-pulse btn-shine"
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Konsultasi Gratis via WhatsApp
            </a>
            <a
              href="#solusi"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold text-lg rounded-full border-2 border-white/25 hover:border-white/50 transition-all duration-300 hover:scale-105"
            >
              Lihat Solusi Kami
            </a>
          </div>

          {/* Funnel Buttons */}
          <div className="stagger-item mb-10" style={{ animationDelay: "0.35s" }}>
            <p className="text-xs text-white/50 uppercase tracking-wider font-semibold mb-3">
              Pilih Kebutuhan Anda
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {funnelButtons.map((btn) => (
                <Link
                  key={btn.label}
                  href={btn.href}
                  className="group flex items-center gap-2 px-3 py-2.5 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 hover:border-solar/40 text-white text-sm font-medium transition-all duration-200 hover:scale-[1.02]"
                >
                  <btn.icon className="w-4 h-4 text-solar-light flex-shrink-0 transition-transform duration-200 group-hover:scale-110" />
                  <span>{btn.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Facts — hanya klaim yang dapat diverifikasi */}
          <div
            className="stagger-item grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10"
            style={{ animationDelay: "0.4s" }}
          >
            {[
              { value: "25 Thn", label: "Garansi Performa Panel" },
              { value: "1.3–20.8", label: "Paket kWp Tersedia" },
              { value: "2 Wilayah", label: "Sumatera & Jawa Barat" },
              { value: "Gratis", label: "Survei & Konsultasi" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="relative text-center p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-solar/30 transition-colors duration-300"
              >
                <p className="text-2xl sm:text-3xl font-extrabold text-solar-light">
                  {stat.value}
                </p>
                <p className="text-xs sm:text-sm text-white/60 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Features */}
          <div
            className="stagger-item grid grid-cols-2 sm:grid-cols-4 gap-3"
            style={{ animationDelay: "0.5s" }}
          >
            {features.map((f) => (
              <div
                key={f.text}
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 text-sm text-white/80"
              >
                <span className="text-lg">{f.icon}</span>
                <span className="font-medium">{f.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
}
