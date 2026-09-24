"use client";

import { useState, useCallback, useRef } from "react";
import {
  Calculator,
  TrendingDown,
  MessageCircle,
  Zap,
  Clock,
  TrendingUp,
  Sun,
  Info,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useEffect } from "react";
import { clearAllPricing } from "@/lib/pricing";
import { SavingsProjection } from "@/components/landing/SavingsProjection";
import {
  SELF_CONSUMPTION_PROFILES,
  DESIGN_PARAMS,
  type SelfConsumptionProfileId,
} from "@/lib/methodology";
import {
  calculatePackages,
  calculateROI,
  recommendPackage,
  formatRp,
  formatRpShort,
  roundTo,
  PLN_TARIFF_DEFAULT,
  PLN_INCREASE_RATE_DEFAULT,
  defaultComponentPrices,
  defaultInverterPrices,
  defaultSettings,
  loadRemotePricing,
  saveRemotePricing,
  saveComponentPrices,
  saveInverterPrices,
  saveSettings,
} from "@/lib/pricing";

// Pesan WA dibangun dinamis dari hasil simulasi terkini (lihat waHref di
// dalam komponen) — prospek datang dengan konteks lengkap, bukan pesan generik.

const billPresets = [
  { label: "Rp 500rb", value: 500000 },
  { label: "Rp 1jt", value: 1000000 },
  { label: "Rp 2jt", value: 2000000 },
  { label: "Rp 3jt", value: 3000000 },
  { label: "Rp 5jt", value: 5000000 },
  { label: "Rp 10jt", value: 10000000 },
];

interface AnalysisResult {
  recommended: ReturnType<typeof calculatePackages>[0];
  monthlyKwh: number;
  productionKwh: number;
  coverage: number;
  roi: ReturnType<typeof calculateROI>;
  co2PerYear: number;
  needsCustom: boolean;
  /** Persentase tagihan yang terpotong oleh surya (model pemanfaatan). */
  savingsPct: number;
}

/** Profil pemanfaatan aktif dari daftar resmi methodology.ts. */
function profileRate(id: SelfConsumptionProfileId): number {
  return (
    SELF_CONSUMPTION_PROFILES.find((p) => p.id === id)?.rate ??
    DESIGN_PARAMS.selfConsumptionDefault
  );
}

/**
 * Run analysis using EXPLICIT defaults (no localStorage).
 * This is 100% deterministic and always produces valid output.
 *
 * Model (audit Round 8):
 *   penghematan = min(produksi surya, pemakaian PLN)
 *                 × tingkat pemanfaatan profil × tarif
 */
function computeWithDefaults(
  billValue: number,
  selfConsumption: number
): AnalysisResult {
  const allPkgs = calculatePackages(
    defaultComponentPrices,
    defaultInverterPrices,
    defaultSettings
  );
  return computeWithPackages(
    billValue,
    recommendPackage(billValue, allPkgs) || allPkgs[0],
    allPkgs,
    selfConsumption
  );
}

/** Build analysis result from given packages and recommended package */
function computeWithPackages(
  billValue: number,
  rec: ReturnType<typeof calculatePackages>[0],
  allPkgs: ReturnType<typeof calculatePackages>,
  selfConsumption: number
): AnalysisResult {
  const monthlyKwh = billValue / PLN_TARIFF_DEFAULT;
  const dailyKwh = rec.kWp * DESIGN_PARAMS.kWhPerKwpPerDay;
  const productionKwh = Math.round(dailyKwh * 30);
  const coverage = Math.round((productionKwh / monthlyKwh) * 100);
  const roi = calculateROI(rec.price, dailyKwh, {
    selfConsumption,
    monthlyConsumptionKwh: monthlyKwh,
  });
  const co2PerYear = (roi.annualSavingsBase / PLN_TARIFF_DEFAULT) * 0.8 / 1000;
  const largestPkg = allPkgs[allPkgs.length - 1];
  const largestProduction = largestPkg
    ? Math.round(largestPkg.kWp * DESIGN_PARAMS.kWhPerKwpPerDay * 30)
    : 0;
  const needsCustom = largestProduction < monthlyKwh * 0.5;

  return {
    recommended: rec,
    monthlyKwh: Math.round(monthlyKwh),
    productionKwh,
    coverage,
    roi,
    co2PerYear,
    needsCustom,
    savingsPct: Math.min(
      100,
      Math.round((roi.monthlySavingsBase / billValue) * 100)
    ),
  };
}

export function SavingsCalculator() {
  const [bill, setBill] = useState(2000000);
  const [profileId, setProfileId] = useState<SelfConsumptionProfileId>("campuran");
  const [showAssumptions, setShowAssumptions] = useState(false);

  const selfRate = profileRate(profileId);
  const selfRateRef = useRef(selfRate);

  // Initialize with DEFAULTS so the calculator ALWAYS renders with real content
  // on first paint — no empty skeleton, no dependency on network/localStorage.
  const [analysis, setAnalysis] = useState<AnalysisResult>(() =>
    computeWithDefaults(2000000, profileRate("campuran"))
  );
  // Track where pricing data comes from (for UI badge)
  const [pricingSource, setPricingSource] = useState<"default" | "remote" | "local">("default");

  // Cache paket aktif agar perubahan bill (mis. drag slider) TIDAK
  // memicu fetch ulang remote/localStorage — cukup rekomputasi lokal.
  const packagesRef = useRef<ReturnType<typeof calculatePackages> | null>(null);
  const billRef = useRef(bill);

  // After mount: fetch remote pricing (Google Sheets) ONCE, then localStorage
  // as fallback. Data disimpan ke packagesRef untuk rekomputasi berikutnya.
  useEffect(() => {
    let cancelled = false;

    (async () => {
      // Priority 1: Remote (Google Sheets) — synced across all devices
      try {
        const remote = await loadRemotePricing();
        if (cancelled) return;

        if (remote) {
          const pkgs = calculatePackages(remote.components, remote.inverters, remote.settings);
          if (pkgs && pkgs.length > 0) {
            const rec = recommendPackage(billRef.current, pkgs) || pkgs[0];
            if (rec && isFinite(rec.kWp) && rec.kWp > 0) {
              packagesRef.current = pkgs;
              setAnalysis(computeWithPackages(billRef.current, rec, pkgs, selfRateRef.current));
              setPricingSource("remote");
              // Sync remote data to localStorage for offline use
              saveComponentPrices(remote.components);
              saveInverterPrices(remote.inverters);
              saveSettings(remote.settings);
              return;
            }
          }
        }
      } catch (err) {
        console.warn("[SavingsCalculator] Remote pricing unavailable:", err);
      }

      // Priority 2: localStorage (kalibrasi-harga data on this device)
      try {
        const allPkgs = calculatePackages(); // reads from localStorage
        if (!cancelled && allPkgs && allPkgs.length > 0) {
          const rec = recommendPackage(billRef.current, allPkgs) || allPkgs[0];
          if (rec && isFinite(rec.kWp) && rec.kWp > 0) {
            packagesRef.current = allPkgs;
            setAnalysis(computeWithPackages(billRef.current, rec, allPkgs, selfRateRef.current));
            setPricingSource("local");
            return;
          }
        }
      } catch {
        // Keep defaults
      }

      // Priority 3: defaults (already set in useState initializer)
    })();

    return () => { cancelled = true; };
  }, []);

  // Recompute when bill or utilization profile changes — cepat & lokal
  // (tanpa network), aman untuk drag slider berulang.
  useEffect(() => {
    billRef.current = bill; // sinkronkan ref di dalam effect (bukan render)
    selfRateRef.current = selfRate;
    const pkgs = packagesRef.current;
    if (!pkgs) {
      // cache belum siap — pakai default deterministic
      setAnalysis(computeWithDefaults(bill, selfRate));
      return;
    }
    const rec = recommendPackage(bill, pkgs) || pkgs[0];
    if (rec && isFinite(rec.kWp) && rec.kWp > 0) {
      setAnalysis(computeWithPackages(bill, rec, pkgs, selfRate));
    }
  }, [bill, selfRate]);

  // Recompute when pricing settings change (from kalibrasi-harga "Simpan")
  useEffect(() => {
    const handler = () => {
      try {
        const allPkgs = calculatePackages(); // reads from localStorage
        if (!allPkgs || allPkgs.length === 0) return;
        const rec = recommendPackage(billRef.current, allPkgs) || allPkgs[0];
        if (!rec || !isFinite(rec.kWp) || rec.kWp <= 0) return;
        packagesRef.current = allPkgs;
        setAnalysis(computeWithPackages(billRef.current, rec, allPkgs, selfRateRef.current));
        setPricingSource("local");
      } catch (err) {
        console.error("[SavingsCalculator] Pricing update failed:", err);
      }
    };
    window.addEventListener("jmse-pricing-updated", handler);
    return () => window.removeEventListener("jmse-pricing-updated", handler);
  }, []);

  // Recompute when bill changes
  const handleBillChange = useCallback((value: number) => {
    setBill(value);
  }, []);

  // Derive values from analysis (always non-null due to defaults init)
  const rec = analysis.recommended;
  const monthlyKwh = analysis.monthlyKwh;
  const productionKwh = analysis.productionKwh;
  const coverage = analysis.coverage;
  const roi = analysis.roi;
  const co2PerYear = analysis.co2PerYear;
  const needsCustom = analysis.needsCustom;
  const savingsPct = analysis.savingsPct;
  const activeProfile = SELF_CONSUMPTION_PROFILES.find((p) => p.id === profileId)!;

  // Tautan WA membawa ringkasan hasil — lead terprakualifikasi.
  const waHref = `https://wa.me/6281328190707?text=${encodeURIComponent(
    `Halo PT. Jaya Mandiri Smart Energy, saya sudah mencoba kalkulator di website anda:\n` +
      `- Tagihan listrik: ${formatRp(bill)}/bulan\n` +
      `- Profil pemakaian: ${activeProfile.label} (pemanfaatan ${Math.round(selfRate * 100)}%)\n` +
      `- Rekomendasi: ${rec.name} — ${rec.priceFormatted}\n` +
      `- Estimasi hemat (simulasi): ${formatRpShort(roi.monthlySavingsBase)}/bulan (~${savingsPct}% tagihan)\n` +
      `- Estimasi balik modal (skenario 6%/thn): ~${roi.roiYearsWithIncrease} tahun\n` +
      `Mohon info lebih lanjut & jadwal survei gratis. Terima kasih.`
  )}`;

  return (
    <section
      id="kalkulator"
      className="py-20 md:py-28 solar-gradient relative overflow-hidden"
     
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 right-10 w-64 h-64 bg-solar/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-gold/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 text-sm font-semibold text-white bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <Calculator className="w-4 h-4" />
            Kalkulator Penghematan
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6">
            Hitung Potensi{" "}
            <span className="text-gold-light">Penghematan</span> Anda
          </h2>
          <p className="text-lg text-white/70 leading-relaxed">
            Masukkan tagihan listrik bulanan Anda — kami akan menganalisis
            kebutuhan dan merekomendasikan paket yang paling sesuai.
          </p>
        </div>

        <div
          className="max-w-4xl mx-auto"
        >
          <div className="glass rounded-3xl p-6 sm:p-10">
            {/* Custom pricing indicator */}
            {pricingSource === "remote" && (
              <div className="mb-4 p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/30">
                <p className="text-xs text-blue-700 dark:text-blue-300 text-center">
                  Menggunakan harga dari Google Sheets (sinkron semua device)
                </p>
              </div>
            )}
            {pricingSource === "local" && (
              <div className="mb-4 p-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/30">
                <p className="text-xs text-amber-700 dark:text-amber-300 text-center">
                  Menggunakan harga custom dari Kalibrasi Harga (device ini)
                </p>
              </div>
            )}

            {/* Step 1: Bill Input */}
            <div className="text-center mb-8">
              <p className="text-sm font-medium text-navy/60 dark:text-white/60 mb-4">
                Tagihan listrik bulanan Anda:
              </p>
              <div className="flex flex-wrap justify-center gap-3 mb-6">
                {billPresets.map((preset) => (
                  <button
                    key={preset.value}
                    onClick={() => handleBillChange(preset.value)}
                    className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                      bill === preset.value
                        ? "bg-solar text-white shadow-lg shadow-solar/30"
                        : "bg-white dark:bg-navy text-navy dark:text-white border border-border hover:border-solar/50"
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>

              {/* Slider untuk nilai di antara preset */}
              <div className="max-w-md mx-auto mb-2">
                <label
                  htmlFor="bill-slider"
                  className="sr-only"
                >
                  Atur tagihan listrik bulanan
                </label>
                <input
                  id="bill-slider"
                  type="range"
                  min={500000}
                  max={10000000}
                  step={250000}
                  value={bill}
                  onChange={(e) => handleBillChange(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer bg-white/20 accent-solar focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solar focus-visible:ring-offset-2"
                  aria-valuetext={`${formatRp(bill)} per bulan`}
                />
                <div className="flex justify-between text-[10px] text-white/50 mt-1.5 font-medium">
                  <span>Rp 500rb</span>
                  <span>Rp 10jt+</span>
                </div>
              </div>

              <div className="text-4xl sm:text-5xl font-extrabold text-solar">
                {formatRp(bill)}
                <span className="text-lg font-medium text-muted-foreground">/bulan</span>
              </div>
            </div>

            {/* Step 1b: Utilization Profile — parameter eksplisit (audit Round 8) */}
            <div className="mb-8">
              <p className="text-sm font-medium text-navy/60 dark:text-white/60 mb-2 text-center">
                Kapan listrik paling banyak terpakai di lokasi Anda?
              </p>
              <div
                role="radiogroup"
                aria-label="Profil pemakaian listrik"
                className="grid grid-cols-1 sm:grid-cols-3 gap-2.5"
              >
                {SELF_CONSUMPTION_PROFILES.map((p) => (
                  <button
                    key={p.id}
                    role="radio"
                    aria-checked={profileId === p.id}
                    onClick={() => setProfileId(p.id)}
                    className={`p-3.5 rounded-xl text-left transition-all duration-200 border ${
                      profileId === p.id
                        ? "bg-solar/10 border-solar shadow-sm"
                        : "bg-white/60 dark:bg-navy/40 border-border hover:border-solar/40"
                    }`}
                  >
                    <span className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-sm font-bold text-navy dark:text-white">
                        {p.label}
                      </span>
                      <span
                        className={`text-xs font-bold ${
                          profileId === p.id ? "text-solar" : "text-muted-foreground"
                        }`}
                      >
                        {Math.round(p.rate * 100)}%
                      </span>
                    </span>
                    <span className="block text-[11px] leading-snug text-muted-foreground">
                      {p.desc}
                    </span>
                  </button>
                ))}
              </div>
              <p className="mt-2 text-[11px] text-muted-foreground text-center leading-relaxed">
                Persentase = asumsi tingkat pemanfaatan energi surya (berapa
                bagian produksi yang benar-benar terpakai oleh beban Anda).
              </p>
            </div>

            {/* Step 2: Analysis */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-solar/5 to-gold/5 border border-solar/15 mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Sun className="w-5 h-5 text-solar" />
                <h3 className="font-bold text-navy dark:text-white text-base">
                  Analisis Kebutuhan Anda
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Consumption */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-navy/5 dark:bg-white/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Zap className="w-4 h-4 text-navy dark:text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Estimasi Pemakaian</p>
                    <p className="font-bold text-navy dark:text-white">
                      ~{monthlyKwh.toLocaleString("id-ID")} kWh/bulan
                    </p>
                  </div>
                </div>

                {/* Recommended Package */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-solar/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Calculator className="w-4 h-4 text-solar" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Rekomendasi Paket</p>
                    <p className="font-bold text-solar">{rec.name}</p>
                  </div>
                </div>

                {/* Production */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Produksi Sistem</p>
                    <p className="font-bold text-navy dark:text-white">
                      {productionKwh.toLocaleString("id-ID")} kWh/bulan
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Mencakup ~{Math.min(coverage, 100)}% pemakaian Anda
                    </p>
                  </div>
                </div>

                {/* System Price */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Clock className="w-4 h-4 text-gold" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Investasi</p>
                    <p className="font-bold text-navy dark:text-white">{rec.priceFormatted}</p>
                    <p className="text-xs text-muted-foreground">
                      Sudah termasuk PPN 11%
                    </p>
                  </div>
                </div>
              </div>

              {needsCustom && (
                <div className="mt-4 p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/30">
                  <p className="text-xs text-blue-700 dark:text-blue-300 leading-relaxed">
                    <strong>Custom Solution:</strong> Kebutuhan Anda melebihi kapasitas
                    paket standar terbesar. Tim kami dapat merancang sistem custom
                    hingga 500+ kWp. Hubungi kami untuk proposal khusus.
                  </p>
                </div>
              )}
            </div>

            {/* Step 3: Results */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-4 rounded-2xl bg-solar/5 border border-solar/10">
                <TrendingDown className="w-6 h-6 text-solar mx-auto mb-2" />
                <p className="text-xs text-muted-foreground mb-1">Hemat / Bulan</p>
                <p className="text-xl sm:text-2xl font-bold text-solar">
                  {formatRpShort(roi.monthlySavingsBase)}
                </p>
                <p className="text-[10px] text-muted-foreground">
                  ≈{savingsPct}% tagihan
                </p>
              </div>
              <div className="text-center p-4 rounded-2xl bg-solar/5 border border-solar/10">
                <TrendingDown className="w-6 h-6 text-solar mx-auto mb-2" />
                <p className="text-xs text-muted-foreground mb-1">Hemat / Tahun</p>
                <p className="text-xl sm:text-2xl font-bold text-solar">
                  {formatRpShort(roi.annualSavingsBase)}
                </p>
                <p className="text-[10px] text-muted-foreground">
                  {roi.monthlySolarUtilizedKwh.toLocaleString("id-ID")} kWh surya terpakai/bln
                </p>
              </div>
              <div className="text-center p-4 rounded-2xl bg-gold/5 border border-gold/20">
                <Clock className="w-6 h-6 text-gold mx-auto mb-2" />
                <p className="text-xs text-muted-foreground mb-1">
                  Estimasi ROI
                </p>
                <p className="text-xl sm:text-2xl font-bold text-gold">
                  ~{roi.roiYearsWithIncrease} thn
                </p>
                <p className="text-[10px] text-muted-foreground">
                  (skenario tarif +{Math.round(PLN_INCREASE_RATE_DEFAULT * 100)}%/thn)
                </p>
              </div>
              <div className="text-center p-4 rounded-2xl bg-gold/5 border border-gold/20">
                <TrendingUp className="w-6 h-6 text-gold mx-auto mb-2" />
                <p className="text-xs text-muted-foreground mb-1">
                  Total Hemat 25 Thn
                </p>
                <p className="text-xl sm:text-2xl font-bold text-gold">
                  {formatRpShort(roi.return25Year + rec.price)}
                </p>
                <p className="text-[10px] text-muted-foreground">
                  ≈{roi.returnMultiplier}x investasi (kumulatif, bukan per tahun)
                </p>
              </div>
            </div>

            {/* Proyeksi 25 tahun — grafik balik modal */}
            <SavingsProjection
              price={rec.price}
              annualSavingsBase={roi.annualSavingsBase}
              increaseRate={PLN_INCREASE_RATE_DEFAULT}
              breakevenYear={roi.roiYearsWithIncrease}
            />

            {/* Key insight box — simulasi jujur (audit Round 8: tanpa perbandingan deposito) */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border border-emerald-200 dark:border-emerald-800/30 mb-6">
              <p className="text-center text-sm text-emerald-700 dark:text-emerald-300 leading-relaxed">
                Hasil di atas adalah <strong>simulasi akumulasi penghematan selama 25 tahun</strong>{" "}
                berdasarkan asumsi yang ditampilkan: profil{" "}
                <strong>{activeProfile.label.toLowerCase()}</strong> (pemanfaatan{" "}
                {Math.round(selfRate * 100)}%) dan skenario kenaikan tarif{" "}
                {Math.round(PLN_INCREASE_RATE_DEFAULT * 100)}%/tahun. Hasil aktual dapat
                berbeda — simulasi spesifik properti Anda kami susun saat survei gratis.
              </p>
            </div>

            {/* Environmental impact */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-green-50 to-lime-50 dark:from-green-900/20 dark:to-lime-900/20 border border-green-200 dark:border-green-800/30 mb-6">
              <p className="text-center text-sm text-green-700 dark:text-green-300">
                Selain hemat uang, Anda juga mengurangi emisi{" "}
                <span className="font-bold">
                  {roundTo(co2PerYear, 1).toFixed(1)} ton CO2 per tahun
                </span>{" "}
                dan berkontribusi pada lingkungan yang lebih bersih.
              </p>
            </div>

            {/* Assumptions */}
            <button
              onClick={() => setShowAssumptions(!showAssumptions)}
              className="flex items-center gap-2 mx-auto text-xs text-muted-foreground hover:text-navy dark:hover:text-white transition-colors mb-6"
            >
              <Info className="w-3.5 h-3.5" />
              Lihat asumsi perhitungan
              {showAssumptions ? (
                <ChevronUp className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
            </button>
            {showAssumptions && (
              <div
                className="mb-6 p-4 rounded-xl bg-muted/50 border border-border text-xs text-muted-foreground space-y-2 leading-relaxed"
              >
                <p>
                  <strong>Tarif PLN:</strong> Rp {PLN_TARIFF_DEFAULT.toLocaleString("id-ID")}/kWh
                  (tarif R-1 1300VA ke atas, non-subsidi). Bisnis &amp; industri mungkin memiliki
                  tarif berbeda.
                </p>
                <p>
                  <strong>Rumus penghematan:</strong> min(produksi surya, pemakaian listrik Anda)
                  × tingkat pemanfaatan profil terpilih ({Math.round(selfRate * 100)}%) × tarif
                  PLN. Produksi surya tidak bisa meng-offset lebih dari yang Anda pakai —
                  pelanggan R-1 tidak mendapat kompensasi ekspor ke PLN.
                </p>
                <p>
                  <strong>Pemanfaatan energi:</strong> persentase per profil (Dominan siang 90%,
                  Campuran + baterai 80%, Dominan malam 50%) adalah{" "}
                  <em>asumsi skenario</em> — bukan hasil pengukuran. Profil beban aktual Anda
                  menentukan angka sebenarnya.
                </p>
                <p>
                  <strong>PSH:</strong> 3,75 jam/hari — parameter desain internal kami untuk
                  Jambi (bukan angka resmi terukur). Efisiensi sistem: 80% (losses kabel, suhu,
                  konversi inverter).
                </p>
                <p>
                  <strong>Kenaikan tarif {Math.round(PLN_INCREASE_RATE_DEFAULT * 100)}%/tahun:</strong>{" "}
                  asumsi skenario untuk simulasi ROI — <em>bukan</em> rata-rata historis PLN
                  (statistik tarif rumah tangga 2017–2024 naik ± 1–2%/tahun) dan bukan prediksi
                  tarif. Faktual bisa berbeda.
                </p>
                <p>
                  <strong>ROI &amp; total 25 tahun</strong> dihitung dari akumulasi penghematan
                  tahunan (dengan skenario kenaikan tarif) vs harga investasi paket. Kelipatan
                  investasi (mis. 4x) adalah <em>akumulasi 25 tahun</em>, bukan return per tahun.
                  Angka bersifat estimasi simulasi dan dapat berbeda tergantung pola konsumsi
                  aktual.
                </p>
              </div>
            )}

            {/* CTA */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Ingin perhitungan yang lebih akurat untuk lokasi spesifik Anda?
                Konsultasi dengan tim kami — gratis!
              </p>
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-solar hover:bg-solar-dark text-white font-bold rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-solar/30 hover:scale-105 btn-shine"
              >
                <MessageCircle className="w-5 h-5" />
                Konsultasi Gratis Sekarang
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
