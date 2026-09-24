import { smartMonitoringPackages, solarCCTVPackages } from "@/lib/pricing-smartiot";
import { formatRp } from "@/lib/pricing";
import { MessageCircle, Monitor, Camera, CheckCircle, Wifi, Shield, BarChart3 } from "lucide-react";

/**
 * Konten /smart-iot — SERVER COMPONENT (optimasi CWV, pola R7/R8).
 * Data paket dari pricing-smartiot.ts (modul murni, server-safe).
 * Animasi entrance via CSS (.stagger-item / .fade-in-item — lihat
 * globals.css); kartu paket memakai .fade-in-item (opacity-only) agar
 * efek hover:-translate-y-1 tetap berfungsi.
 */

export default function SmartIoTPage() {
  return (
    <>
      {/* Benefits */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="stagger-item text-center mb-12" style={{ animationDelay: "0s" }}>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy dark:text-white mb-4">
              Kenapa Perlu Smart Monitoring?
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Monitor, title: "Real-time Dashboard", desc: "Pantau produksi, konsumsi, dan status sistem dari smartphone" },
              { icon: BarChart3, title: "Laporan Otomatis", desc: "Data historis & laporan bulanan otomatis untuk keputusan bisnis" },
              { icon: Wifi, title: "Alert Cerdas", desc: "Notifikasi instant saat ada anomali atau sistem offline" },
              { icon: Shield, title: "Keamanan 24/7", desc: "Solar CCTV tanpa kabel — cocok untuk kebun, gudang, proyek" },
            ].map((b, i) => (
              <div key={b.title} className="stagger-item p-5 rounded-xl border border-border bg-card hover:border-solar/30 transition-all hover:shadow-md" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center mb-3">
                  <b.icon className="w-5 h-5 text-violet-600" />
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
            Masalah Keamanan & Monitoring? Kami Punya Solusinya
          </h2>
          <div className="space-y-6">
            {[
              {
                problem: "Keamanan area terpencil tanpa listrik PLN",
                solution: "Solar CCTV berdiri mandiri tanpa kabel listrik. Panel surya + baterai menyediakan daya 24/7 untuk rekam CCTV di kebun, gudang, atau proyek terpencil.",
                icon: "📹",
              },
              {
                problem: "Tidak bisa monitoring dari jarak jauh",
                solution: "IoT Dashboard memungkinkan Anda memantau performa PLTS dan CCTV dari smartphone kapan saja, di mana saja. Data real-time & laporan otomatis.",
                icon: "📱",
              },
              {
                problem: "Pencurian di area perkebunan/gudang",
                solution: "Solar CCTV dengan motion detection & night vision memberikan peringatan instan saat ada aktivitas mencurigakan. Rekaman tersimpan di cloud.",
                icon: "🔒",
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
              href="https://wa.me/6281328190707?text=Halo%20PT.%20Jaya%20Mandiri%20Smart%20Energy,%20saya%20ingin%20konsultasi%20Smart%20IoT%20atau%20Solar%20CCTV"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white font-bold rounded-full transition-all duration-300"
            >
              <MessageCircle className="w-4 h-4" />
              Konsultasi Smart IoT via WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Smart Monitoring Packages */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="stagger-item text-center mb-12" style={{ animationDelay: "0s" }}>
            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold text-violet-600 bg-violet-600/10 rounded-full">
              <Monitor className="w-3.5 h-3.5 inline mr-1" />
              Smart Monitoring System
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy dark:text-white mb-4">
              Paket Smart Monitoring
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Monitoring performa PLTS sesuai skala kebutuhan Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {smartMonitoringPackages.map((pkg, i) => (
              <div
                key={pkg.name}
                className={`fade-in-item relative p-6 rounded-2xl border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                  pkg.tier === "standard"
                    ? "bg-gradient-to-br from-violet-500 to-violet-600 text-white border-violet-500 shadow-lg shadow-violet-500/20"
                    : "bg-card border-border hover:border-violet-500/30"
                }`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {pkg.tier === "standard" && <span className="absolute -top-3 left-6 px-3 py-1 bg-gold text-navy text-xs font-bold rounded-full shadow-md">RECOMMENDED</span>}

                <h4 className={`text-lg font-bold mb-1 ${pkg.tier === "standard" ? "text-white" : "text-navy dark:text-white"}`}>{pkg.name}</h4>
                <p className={`text-xs mb-4 ${pkg.tier === "standard" ? "text-white/60" : "text-muted-foreground"}`}>Ideal untuk: {pkg.idealFor}</p>
                <p className={`text-sm mb-4 leading-relaxed ${pkg.tier === "standard" ? "text-white/80" : "text-muted-foreground"}`}>{pkg.desc}</p>

                <div className="space-y-1.5 mb-5">
                  {pkg.features.map(f => (
                    <div key={f} className={`flex items-start gap-2 text-xs ${pkg.tier === "standard" ? "text-white/70" : "text-muted-foreground"}`}>
                      <CheckCircle className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${pkg.tier === "standard" ? "text-gold-light" : "text-violet-500"}`} />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>

                <p className={`text-2xl font-extrabold mb-4 ${pkg.tier === "standard" ? "text-white" : "text-navy dark:text-white"}`}>{formatRp(pkg.price)}</p>
                <p className={`text-xs mb-4 ${pkg.tier === "standard" ? "text-white/50" : "text-muted-foreground"}`}>Termasuk instalasi</p>

                <a
                  href={`https://wa.me/6281328190707?text=${encodeURIComponent(`Halo PT. Jaya Mandiri Smart Energy, saya tertarik paket ${pkg.name} (${formatRp(pkg.price)})`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm transition-all ${pkg.tier === "standard" ? "bg-white text-violet-600 hover:bg-white/90" : "bg-violet-600 text-white hover:bg-violet-700"}`}
                >
                  <MessageCircle className="w-4 h-4" />
                  Tanya Paket Ini
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solar CCTV */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="stagger-item text-center mb-12" style={{ animationDelay: "0s" }}>
            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold text-violet-600 bg-violet-600/10 rounded-full">
              <Camera className="w-3.5 h-3.5 inline mr-1" />
              Solar CCTV — CCTV Tenaga Surya
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy dark:text-white mb-4">
              Keamanan Tanpa Kabel Listrik
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              CCTV mandiri bertenaga surya untuk kebun, gudang, proyek, dan area tanpa listrik PLN.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {solarCCTVPackages.map((pkg, i) => (
              <div
                key={pkg.name}
                className="fade-in-item p-6 rounded-2xl border border-border bg-card hover:border-violet-500/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <h4 className="text-lg font-bold text-navy dark:text-white mb-1">{pkg.name}</h4>
                <p className="text-xs text-muted-foreground mb-3">Resolusi: {pkg.resolution}</p>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{pkg.desc}</p>

                <div className="space-y-1.5 mb-5">
                  {pkg.features.map(f => (
                    <div key={f} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <CheckCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-violet-500" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>

                <p className="text-2xl font-extrabold text-navy dark:text-white mb-4">{formatRp(pkg.price)}</p>

                <a
                  href={`https://wa.me/6281328190707?text=${encodeURIComponent(`Halo PT. Jaya Mandiri Smart Energy, saya tertarik paket ${pkg.name} (${formatRp(pkg.price)})`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm transition-all bg-violet-600 text-white hover:bg-violet-700"
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
