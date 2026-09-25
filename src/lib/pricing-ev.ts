import { formatRpShort } from "./pricing";
import { DESIGN_PARAMS, WARRANTY_CONFIG } from "./methodology";

/* ============================================================
   EV CHARGING PRICING — PT. Jaya Mandiri Smart Energy
   EV Charging Terintegrasi PLTS

   MODEL SIMULASI KHUSUS EV (audit Round 8 — P1):
   Model ini BUKAN bagian dari model finansial global situs, dan
   hanya menghitung penghematan pada beban CHARGING EV:

     penghematan charging/bln
       = min(produksi PLTS, kebutuhan charging EV)
         × pemanfaatan khusus EV (70%)
         × tarif PLN (DESIGN_PARAMS.plnTariffPerKwh)

   Parameter yang mengikuti model pusat (src/lib/methodology.ts):
     - Tarif PLN Rp 1.444,7/kWh (R-1 1300VA+, non-subsidi)
     - PSH 3,75 jam/hari (parameter desain internal) & efisiensi 80%
     - Eskalasi tarif 6%/tahun (asumsi skenario simulasi, bukan
       rata-rata historis PLN dan bukan prediksi)

   Parameter KHUSUS EV (dinyatakan eksplisit; TIDAK dipakai di
   luar halaman ini — berbeda dari default global 80%):
     - Kebutuhan charging 7,2 kWh × 2x/hari = 432 kWh/bulan
       (asumsi pola penggunaan EV kota)
     - Pemanfaatan 70%: profil waktu charging 2x/hari (pagi +
       malam) pada sistem hybrid TANPA baterai khusus EV — sesi
       malam sebagian masih disuplai PLN, sehingga pemanfaatan
       efektif lebih rendah dari profil "campuran + baterai" (80%).

   Batasan model (wajib ditampilkan bersama angkanya):
     - TIDAK menghitung nilai surplus produksi di luar kebutuhan
       charging (surplus dapat melayani beban rumah/bisnis —
       nilainya tergantung profil beban, di luar model ini).
     - Angka adalah simulasi berdasarkan asumsi di atas, bukan
       hasil pengukuran; hasil aktual dapat berbeda.
   ============================================================ */

export interface EVPackage {
  name: string;
  solarKwp: number;
  charger: string;
  price: number;
  panel: string;
  inverter: string;
  batteryKwh: number;
  monthlySavings: string;     // Formatted string for display (simulasi charging EV)
  annualSavings: number;      // Raw number for calculations
  roiYears: number;           // ROI dari penghematan charging EV saja (skenario)
  /** Sisa produksi bulanan di luar kebutuhan charging EV (kWh) — untuk beban rumah/bisnis. */
  surplusKwh: number;
  features: string[];
  desc: string;
}

// Asumsi model simulasi khusus EV.
// Parameter global diambil dari single source: src/lib/methodology.ts
export const evAssumptions = {
  /** Kapasitas baterai EV kota tipikal (kWh) — asumsi pola penggunaan EV. */
  evBatteryKwh: 7.2,
  /** Frekuensi charging per hari (pagi + malam) — asumsi pola penggunaan EV. */
  chargesPerDay: 2,
  /** Kebutuhan charging harian (kWh) = 7,2 × 2. */
  dailyChargingKwh: 14.4,
  /** Kebutuhan charging bulanan (kWh) = 14,4 × 30. */
  monthlyChargingKwh: 432,
  /** Tarif PLN — mengikuti model pusat (R-1 1300VA+, non-subsidi). */
  plnTariffPerKwh: DESIGN_PARAMS.plnTariffPerKwh,
  /** PSH — parameter desain internal (bukan rata-rata terukur resmi). */
  pshHours: DESIGN_PARAMS.pshJambi,
  /** Efisiensi sistem (losses kabel, suhu, konversi inverter). */
  efficiency: DESIGN_PARAMS.systemEfficiency,
  /** Asumsi skenario simulasi — bukan rata-rata historis PLN, bukan prediksi. */
  plnIncreaseRate: DESIGN_PARAMS.plnIncreaseRatePerYear,
  /**
   * Pemanfaatan khusus EV (0–1) — PARAMETER SIMULASI KHUSUS EV.
   * Profil charging 2x/hari (termasuk sesi malam) pada sistem hybrid
   * tanpa baterai khusus EV → lebih rendah dari default global 80%
   * (profil "campuran + baterai"). Hanya dipakai model EV.
   */
  evSelfConsumption: 0.70,
  /** Biaya charging full PLN per tahun (simulasi). */
  get annualPlnCost() {
    return Math.round(this.dailyChargingKwh * 365 * this.plnTariffPerKwh);
  },
  /** Biaya charging full PLN per bulan (simulasi). */
  get monthlyPlnCost() {
    return Math.round(this.dailyChargingKwh * 30 * this.plnTariffPerKwh);
  },
  /** Simulasi penghematan/tahun (asumsi PLTS menutup kebutuhan charging). */
  get annualSolarSavings() {
    return Math.round(this.annualPlnCost * this.evSelfConsumption);
  },
  /** Simulasi penghematan/bulan (asumsi PLTS menutup kebutuhan charging). */
  get monthlySolarSavings() {
    return Math.round(this.monthlyPlnCost * this.evSelfConsumption);
  },
  /** Sisa biaya PLN untuk charging setelah offset surya (simulasi). */
  get monthlyRemainingPlnCost() {
    return this.monthlyPlnCost - this.monthlySolarSavings;
  },
  /** Sisa biaya PLN untuk charging per tahun setelah offset surya (simulasi). */
  get annualRemainingPlnCost() {
    return this.annualPlnCost - this.annualSolarSavings;
  },
  /** Persentase offset simulasi (dari evSelfConsumption). */
  get solarOffsetPct() {
    return Math.round(this.evSelfConsumption * 100);
  },
};

/** Label tarif 1-desimal (mis. "Rp 1.444,7") — konsisten dengan methodology.ts. */
export function formatTariffLabel(
  tariff: number = DESIGN_PARAMS.plnTariffPerKwh
): string {
  return `Rp ${tariff.toLocaleString("id-ID", { maximumFractionDigits: 1 })}`;
}

/**
 * Hitung penghematan simulasi khusus EV untuk sebuah paket.
 *
 * Model: min(produksi PLTS, kebutuhan charging 432 kWh/bln)
 *        × pemanfaatan khusus EV (70%)
 *        × tarif PLN (DESIGN_PARAMS).
 * Cap min() memastikan penghematan tidak pernah melebihi biaya
 * charging PLN (tanpa kompensasi ekspor).
 */
function calculateEVSavings(solarKwp: number, price: number) {
  const dailyProduction = solarKwp * evAssumptions.pshHours * evAssumptions.efficiency;
  const monthlyProduction = dailyProduction * 30;

  // Cap: energi surya tidak dapat meng-offset lebih dari kebutuhan charging EV
  const solarCoveredKwh = Math.min(monthlyProduction, evAssumptions.monthlyChargingKwh);

  // Penghematan simulasi charging EV (model khusus EV)
  const monthlySavings = Math.round(
    solarCoveredKwh * evAssumptions.evSelfConsumption * evAssumptions.plnTariffPerKwh
  );
  const annualSavings = monthlySavings * 12;

  // ROI dengan skenario kenaikan tarif (asumsi simulasi 6%/tahun)
  let cumIncrease = 0;
  let roiYearsWithIncrease = 30;
  if (annualSavings > 0) {
    for (let y = 1; y <= 30; y++) {
      cumIncrease += annualSavings * Math.pow(1 + evAssumptions.plnIncreaseRate, y - 1);
      if (cumIncrease >= price) {
        roiYearsWithIncrease = y;
        break;
      }
    }
  }

  // Akumulasi 25 tahun (kumulatif, bukan return per tahun)
  let cum25 = 0;
  if (annualSavings > 0) {
    for (let y = 0; y < 25; y++) {
      cum25 += annualSavings * Math.pow(1 + evAssumptions.plnIncreaseRate, y);
    }
  }
  const return25Year = Math.round(cum25 - price);
  const returnMultiplier = price > 0 ? Math.round((cum25 / price) * 10) / 10 : 0;

  // Sisa produksi di luar kebutuhan charging — dapat melayani beban
  // rumah/bisnis (nilai tergantung profil beban; TIDAK dihitung model ini)
  const surplusKwh = Math.max(
    Math.round(monthlyProduction - evAssumptions.monthlyChargingKwh),
    0
  );

  return {
    monthlySavings,
    annualSavings,
    roiYearsWithIncrease,
    return25Year,
    returnMultiplier,
    dailyProduction: Math.round(dailyProduction * 10) / 10, // Safe 1-decimal rounding
    surplusKwh,
  };
}

// formatRpShort imported from @/lib/pricing

export const evPackages: EVPackage[] = [
  {
    name: "EV Home Charger Only",
    solarKwp: 0,
    charger: "Charger AC 7.2kW",
    price: 25_000_000,
    panel: "-",
    inverter: "-",
    batteryKwh: 0,
    monthlySavings: "-",
    annualSavings: 0,
    roiYears: 0,
    surplusKwh: 0,
    features: ["Charger AC 7.2kW (1-fase)", "Plug & Play instalasi", "Kompatibel semua EV Indonesia", "Proteksi overcurrent & overheating", "Garansi 2 tahun"],
    desc: "Charger AC 7.2kW untuk pengisian kendaraan listrik di rumah. Cukup colok ke listrik PLN rumah Anda. Instalasi mudah, pengisian aman.",
  },
  {
    name: "EV Solar 5.2 kWp + Charger",
    solarKwp: 5.2,
    charger: "Charger AC 7.2kW",
    price: 135_000_000,
    panel: "8× Panel Surya 650Wp",
    inverter: "Inverter Hybrid 5kW",
    batteryKwh: 0,
    monthlySavings: "",
    annualSavings: 0,
    roiYears: 0,
    surplusKwh: 0,
    features: [
      "PLTS 5.2 kWp + Charger AC 7.2kW",
      "Produksi ±15.6 kWh/hari (parameter desain)",
      "Charging EV dari produksi surya di siang hari",
      "Sisa produksi untuk beban rumah tangga",
      "Garansi panel 25 tahun",
      `Garansi inverter ${WARRANTY_CONFIG.inverter}`,
      "Gratis survei & instalasi",
      "PPN 11% termasuk",
    ],
    desc: "Solusi terintegrasi PLTS + EV Charger untuk rumah. Isi daya kendaraan listrik dari produksi surya Anda sendiri; sistem hybrid menjaga suplai listrik stabil untuk rumah dan EV.",
  },
  {
    name: "EV Solar 7.8 kWp + Charger",
    solarKwp: 7.8,
    charger: "Charger AC 7.2kW",
    price: 185_000_000,
    panel: "12× Panel Surya 650Wp",
    inverter: "Inverter Hybrid 8kW",
    batteryKwh: 0,
    monthlySavings: "",
    annualSavings: 0,
    roiYears: 0,
    surplusKwh: 0,
    features: [
      "PLTS 7.8 kWp + Charger AC 7.2kW",
      "Produksi ±23.4 kWh/hari (parameter desain)",
      "Cukup untuk 1-2 EV sekaligus",
      "Sisa produksi lebih besar untuk beban rumah",
      "Garansi panel 25 tahun",
      `Garansi inverter ${WARRANTY_CONFIG.inverter}`,
      "Gratis survei & instalasi",
      "PPN 11% termasuk",
    ],
    desc: "Paket premium untuk rumah dengan 2 kendaraan listrik atau kebutuhan listrik rumah tinggi. Sisa produksi di luar jam charging EV dapat digunakan untuk kebutuhan rumah tangga lainnya.",
  },
  {
    name: "EV Solar 10.4 kWp + Charger",
    solarKwp: 10.4,
    charger: "Charger AC 7.2kW",
    price: 240_000_000,
    panel: "16× Panel Surya 650Wp",
    inverter: "Inverter Hybrid 10kW",
    batteryKwh: 0,
    monthlySavings: "",
    annualSavings: 0,
    roiYears: 0,
    surplusKwh: 0,
    features: [
      "PLTS 10.4 kWp + Charger AC 7.2kW",
      "Produksi ±31.2 kWh/hari (parameter desain)",
      "Cocok untuk bisnis & area parkir komersial",
      "Sisa produksi membantu beban operasional bisnis",
      "Garansi panel 25 tahun",
      `Garansi inverter ${WARRANTY_CONFIG.inverter}`,
      "Gratis survei & instalasi",
      "PPN 11% termasuk",
    ],
    desc: "Solusi ideal untuk area parkir komersial, ruko, atau kantor yang menyediakan EV charging. Sisa produksi di luar jam charging dapat membantu menutupi kebutuhan listrik bisnis Anda.",
  },
];

// Populate nilai simulasi (model khusus EV) setelah module load
evPackages.forEach((pkg) => {
  if (pkg.solarKwp > 0) {
    const calc = calculateEVSavings(pkg.solarKwp, pkg.price);
    pkg.monthlySavings = `~${formatRpShort(calc.monthlySavings)}/bulan`;
    pkg.annualSavings = calc.annualSavings;
    pkg.roiYears = calc.roiYearsWithIncrease;
    pkg.surplusKwh = calc.surplusKwh;
  }
});

// Export helper for use in components
export function getEVRoiData(solarKwp: number, price: number) {
  return calculateEVSavings(solarKwp, price);
}
