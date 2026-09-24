"use client";

import { useState } from "react";
import {
  Scale,
  ShoppingBag,
  Repeat,
  CalendarClock,
  Info,
  ArrowRight,
  Calculator as CalcIcon,
} from "lucide-react";
import {
  rentalPackages,
  buildWhatsAppUrl,
  formatRentalRp,
  getInstallationFee,
  getInstallationInstallment,
} from "@/lib/rentalPackages";

/**
 * Section "Simulasi Biaya: Beli vs Sewa" — interaktif.
 *
 * Semua angka dihitung murni dari data resmi src/lib/rentalPackages.ts
 * (monthlyPrice, annualPrice, buyPrice, biaya instalasi bertingkat).
 * Tidak ada klaim tambahan di luar aritmetika data — framing tetap
 * jujur dua arah (kelebihan sewa MAUPUN kelebihan beli).
 *
 * Rumus:
 *   totalSewa(N)  = harga × N + biaya instalasi (mode bulanan),
 *                   atau annualPrice × tahun + bulanan sisa + biaya instalasi (mode tahunan)
 *   totalBeli     = buyPrice (instalasi & survei sudah termasuk)
 *   breakeven     = (buyPrice − biaya instalasi) / harga per bulan
 *
 * CLIENT COMPONENT (island) — slider/toggle interaktif. Tanpa framer-motion
 * (optimasi CWV): animasi entrance via CSS .stagger-item.
 */
const HORIZON_MIN = 12;
const HORIZON_MAX = 120;
const HORIZON_STEP = 6;

type PayMode = "bulanan" | "tahunan";

function pluralBulan(n: number): string {
  if (n < 12) return `${n} bulan`;
  const years = Math.floor(n / 12);
  const rest = n % 12;
  if (rest === 0) return years === 1 ? "1 tahun" : `${years} tahun`;
  return `${years} thn ${rest} bln`;
}

export function SewaPltsCostSimulator() {
  const packages = rentalPackages.filter((p) => p.active);
  const [pkgId, setPkgId] = useState<string>(
    packages.find((p) => p.popular)?.id ?? packages[0]?.id ?? ""
  );
  const [months, setMonths] = useState<number>(36);
  const [mode, setMode] = useState<PayMode>("bulanan");

  const pkg = packages.find((p) => p.id === pkgId) ?? packages[0];
  const installFee = pkg ? getInstallationFee(pkg.kWp) : 0;
  const installment = pkg ? getInstallationInstallment(pkg.kWp) : null;

  const rentalTotal = pkg
    ? mode === "bulanan"
      ? pkg.monthlyPrice * months
      : pkg.annualPrice * Math.floor(months / 12) +
        pkg.monthlyPrice * (months % 12)
    : 0;
  const grandTotal = rentalTotal + installFee;

  const breakevenMonths = pkg
    ? Math.max(1, Math.ceil((pkg.buyPrice - installFee) / pkg.monthlyPrice))
    : 0;
  const rentWins = months < breakevenMonths;
  const diff = Math.abs(grandTotal - (pkg?.buyPrice ?? 0));

  const waMessage = pkg
    ? `Halo PT. Jaya Mandiri Smart Energy, saya baru mencoba Simulasi Biaya Beli vs Sewa untuk paket ${pkg.name} (${pkg.kWp} kWp) dengan horizon ${pluralBulan(months)}. Mohon bantu saya memilih skema terbaik.`
    : "";

  return (
    <section className="py-16 md:py-24" id="simulasi-beli-sewa">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div
          className="stagger-item text-center mb-12 max-w-3xl mx-auto"
          style={{ animationDelay: "0s" }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 text-sm font-semibold text-solar bg-solar/10 rounded-full">
            <CalcIcon className="w-4 h-4" />
            Simulasi Biaya — Beli vs Sewa
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy dark:text-white mb-5">
            Hitung Sendiri:{" "}
            <span className="gradient-text">Kapan Sewa Lebih Untung?</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Pilih paket dan periode pemakaian — simulasi ini menghitung total
            biaya dua skema dari harga resmi paket, tanpa angka tersembunyi.
          </p>
        </div>

        {/* Controls */}
        <div
          className="stagger-item p-5 sm:p-7 rounded-2xl bg-card border border-border mb-8"
          style={{ animationDelay: "0.15s" }}
        >
          {/* Package chips */}
          <p className="text-xs font-bold text-solar uppercase tracking-wider mb-3">
            1 — Pilih Paket
          </p>
          <div className="flex flex-wrap gap-2 mb-7">
            {packages.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setPkgId(p.id)}
                aria-pressed={p.id === pkgId}
                className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-200 ${
                  p.id === pkgId
                    ? "bg-solar text-white border-solar shadow-md shadow-solar/30"
                    : "bg-background border-border text-foreground/80 hover:border-solar/40 hover:text-solar"
                }`}
              >
                {p.name}
                <span
                  className={`ml-1.5 text-xs font-normal ${
                    p.id === pkgId ? "text-white/80" : "text-muted-foreground"
                  }`}
                >
                  {p.kWp} kWp
                </span>
              </button>
            ))}
          </div>

          {/* Mode toggle */}
          <p className="text-xs font-bold text-solar uppercase tracking-wider mb-3">
            2 — Skema Pembayaran Sewa
          </p>
          <div className="inline-flex p-1 rounded-xl bg-muted border border-border mb-7" role="group" aria-label="Skema pembayaran">
            {(
              [
                { key: "bulanan", label: "Bulanan" },
                { key: "tahunan", label: "Tahunan (bayar 12 bln di muka)" },
              ] as const
            ).map((opt) => (
              <button
                key={opt.key}
                type="button"
                onClick={() => setMode(opt.key)}
                aria-pressed={mode === opt.key}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  mode === opt.key
                    ? "bg-card text-navy dark:text-white shadow-sm border border-border"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Horizon slider */}
          <div className="flex items-center justify-between gap-4 mb-2">
            <p className="text-xs font-bold text-solar uppercase tracking-wider">
              3 — Periode Pemakaian
            </p>
            <p className="text-sm font-bold text-navy dark:text-white">
              {pluralBulan(months)}
            </p>
          </div>
          <input
            type="range"
            min={HORIZON_MIN}
            max={HORIZON_MAX}
            step={HORIZON_STEP}
            value={months}
            onChange={(e) => setMonths(Number(e.target.value))}
            aria-label="Periode pemakaian dalam bulan"
            aria-valuetext={pluralBulan(months)}
            className="range-styled w-full cursor-pointer"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1.5">
            <span>1 tahun</span>
            <span>5 tahun</span>
            <span>10 tahun</span>
          </div>
        </div>

        {/* Results */}
        {pkg ? (
          <div
            className="stagger-item grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            style={{ animationDelay: "0.25s" }}
          >
            {/* Sewa */}
            <div className="compare-card p-6 rounded-2xl bg-card border border-solar/25">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-9 h-9 rounded-xl bg-solar/10 flex items-center justify-center">
                  <Repeat className="w-5 h-5 text-solar" />
                </span>
                <div>
                  <p className="text-sm font-bold text-navy dark:text-white">
                    Total Sewa
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {pluralBulan(months)} · {mode === "bulanan" ? "bayar bulanan" : "bayar tahunan"}
                  </p>
                </div>
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold text-navy dark:text-white mb-1">
                {formatRentalRp(grandTotal)}
              </p>
              <ul className="mt-4 space-y-1.5 text-xs text-muted-foreground">
                <li className="flex justify-between gap-2">
                  <span>
                    Sewa {mode === "bulanan" ? `${months} bln` : `(${months} bln)`}
                  </span>
                  <span className="font-semibold text-foreground/80">
                    {formatRentalRp(rentalTotal)}
                  </span>
                </li>
                <li className="flex justify-between gap-2">
                  <span>Biaya instalasi (sekali)</span>
                  <span className="font-semibold text-foreground/80">
                    {formatRentalRp(installFee)}
                  </span>
                </li>
                {installment ? (
                  <li className="flex justify-between gap-2">
                    <span>Cicilan instalasi</span>
                    <span className="font-semibold text-foreground/80">
                      {installment.months} bln
                    </span>
                  </li>
                ) : null}
                <li className="flex justify-between gap-2 pt-1.5 border-t border-border">
                  <span className="flex items-center gap-1">
                    <Info className="w-3 h-3" />
                    Termasuk maintenance berkala
                  </span>
                </li>
              </ul>
            </div>

            {/* Beli */}
            <div className="compare-card p-6 rounded-2xl bg-card border border-border">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 text-navy dark:text-white" />
                </span>
                <div>
                  <p className="text-sm font-bold text-navy dark:text-white">
                    Total Beli
                  </p>
                  <p className="text-xs text-muted-foreground">
                    sekali bayar · sistem jadi milik Anda
                  </p>
                </div>
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold text-navy dark:text-white mb-1">
                {formatRentalRp(pkg.buyPrice)}
              </p>
              <ul className="mt-4 space-y-1.5 text-xs text-muted-foreground">
                <li className="flex justify-between gap-2">
                  <span>Survei, desain & instalasi</span>
                  <span className="font-semibold text-foreground/80">Termasuk</span>
                </li>
                <li className="flex justify-between gap-2">
                  <span>Baterai LiFePO4 {pkg.storageKwh} kWh</span>
                  <span className="font-semibold text-foreground/80">Termasuk</span>
                </li>
                <li className="flex justify-between gap-2 pt-1.5 border-t border-border">
                  <span className="flex items-center gap-1">
                    <Info className="w-3 h-3" />
                    Garansi tertulis per komponen
                  </span>
                </li>
              </ul>
            </div>

            {/* Verdict */}
            <div className="compare-card-verdict p-6 rounded-2xl md:col-span-2 lg:col-span-1 bg-gradient-to-br from-solar/10 via-solar/5 to-transparent border border-solar/25">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-9 h-9 rounded-xl bg-solar/15 flex items-center justify-center">
                  <CalendarClock className="w-5 h-5 text-solar" />
                </span>
                <div>
                  <p className="text-sm font-bold text-navy dark:text-white">
                    Titik Impas Sewa vs Beli
                  </p>
                  <p className="text-xs text-muted-foreground">
                    kapan total sewa menyamai harga beli
                  </p>
                </div>
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold text-solar mb-1">
                ± {pluralBulan(breakevenMonths)}
              </p>
              <p
                className={`text-sm leading-relaxed mt-3 ${
                  rentWins ? "text-foreground/90" : "text-foreground/90"
                }`}
              >
                {rentWins ? (
                  <>
                    Pada periode <strong>{pluralBulan(months)}</strong>, total
                    sewa masih{" "}
                    <strong className="text-solar">
                      {formatRentalRp(diff)} di bawah
                    </strong>{" "}
                    harga beli — tanpa investasi di depan, dan maintenance
                    berkala tetap ditanggung penyedia.
                  </>
                ) : (
                  <>
                    Pada periode <strong>{pluralBulan(months)}</strong>, total
                    sewa sudah{" "}
                    <strong className="text-navy dark:text-white">
                      {formatRentalRp(diff)} di atas
                    </strong>{" "}
                    harga beli. Jika berencana memakai sistem &gt;
                    {" "}{pluralBulan(breakevenMonths)}, skema{" "}
                    <strong>beli</strong> atau tanyakan opsi{" "}
                    <strong>rent-to-own</strong> ke tim kami.
                  </>
                )}
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed mt-4 pt-3 border-t border-solar/20">
                Sewa unggul di fleksibilitas &amp; beban maintenance; beli
                unggul jangka panjang — ROI beli vs tagihan PLN untuk rumah
                berkisar 9–11 tahun dalam simulasi kami (asumsi skenario
                kenaikan tarif 6%/tahun dan pemanfaatan energi 80% pada profil
                campuran + baterai).
              </p>
            </div>
          </div>
        ) : null}

        {/* CTA + disclaimer */}
        <div
          className="stagger-item mt-8 flex flex-col sm:flex-row items-center justify-between gap-5 p-5 rounded-2xl bg-muted/40 border border-border"
          style={{ animationDelay: "0.35s" }}
        >
          <p className="text-xs text-muted-foreground leading-relaxed flex items-start gap-2 max-w-2xl">
            <Scale className="w-4 h-4 text-solar flex-shrink-0 mt-0.5" />
            Simulasi ini murni aritmetika dari harga resmi paket sewa &amp;
            harga beli ekuivalen — belum termasuk kenaikan tarif PLN yang
            membuat keduanya makin menguntungkan dibanding tagihan biasa.
            Simulasi final disesuaikan saat survei gratis.
          </p>
          <a
            href={buildWhatsAppUrl(waMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-solar hover:bg-solar-dark text-white font-bold text-sm rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-solar/30 flex-shrink-0"
          >
            Diskusikan Skema Terbaik
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
