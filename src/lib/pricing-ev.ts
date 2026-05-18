/* eslint-disable @typescript-eslint/no-unused-vars */
import { formatRpShort } from "./pricing";

/* ============================================================
   EV CHARGING PRICING — PT. Jaya Mandiri Smart Energy
   EV Charging Terintegrasi PLTS

   Charger: XCMG AC 7.2kW
   Panel: LONGi 650Wp
   Inverter: Powmr Hybrid

   Update 18 Mei 2026:
   - Realistic ROI calculation based on actual PLTS production
   - 7.2kWh EV battery × 2 charges/day × 365 = 5,256 kWh/year
   - PLN cost: Rp 1,500/kWh → Rp 7,884,000/year
   - Solar offset calculated per package based on actual kWp production
   ============================================================ */

export interface EVPackage {
  name: string;
  solarKwp: number;
  charger: string;
  price: number;
  panel: string;
  inverter: string;
  batteryKwh: number;
  monthlySavings: string;     // Formatted string for display
  annualSavings: number;      // Raw number for calculations
  roiYears: number;           // Simple ROI years
  features: string[];
  desc: string;
}

// Realistic EV charging assumptions
export const evAssumptions = {
  evBatteryKwh: 7.2,           // Typical EV battery (Wuling Air, BYD Dolphin)
  chargesPerDay: 2,             // Morning + evening
  dailyChargingKwh: 14.4,       // 7.2 × 2
  monthlyChargingKwh: 432,      // 14.4 × 30
  plnTariffPerKwh: 1500,        // Rp/kWh
  pshHours: 3.75,               // Peak Sun Hours Jambi
  efficiency: 0.80,             // System efficiency
  plnIncreaseRate: 0.06,        // 6% per year PLN tariff increase
  get annualPlnCost() {
    return Math.round(this.dailyChargingKwh * 365 * this.plnTariffPerKwh);
  },
  get monthlyPlnCost() {
    return Math.round(this.dailyChargingKwh * 30 * this.plnTariffPerKwh);
  },
  get annualSolarSavings() {
    // With 70% solar offset of total PLN charging cost
    return Math.round(this.annualPlnCost * 0.70);
  },
  get monthlySolarSavings() {
    return Math.round(this.monthlyPlnCost * 0.70);
  },
  get solarOffsetPct() {
    return 70;
  },
};

// Helper: calculate EV ROI for a given package
function calculateEVSavings(solarKwp: number, price: number) {
  const dailyProduction = solarKwp * evAssumptions.pshHours * evAssumptions.efficiency;
  const monthlyProduction = dailyProduction * 30;

  // Self-consumption rate for hybrid system (no battery)
  const selfConsumption = 0.70;

  // Monthly savings = solar production × self-consumption × PLN tariff
  const monthlySavings = Math.round(monthlyProduction * selfConsumption * evAssumptions.plnTariffPerKwh);
  const annualSavings = monthlySavings * 12;

  // ROI with PLN increase
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

  // 25-year return
  let cum25 = 0;
  if (annualSavings > 0) {
    for (let y = 0; y < 25; y++) {
      cum25 += annualSavings * Math.pow(1 + evAssumptions.plnIncreaseRate, y);
    }
  }
  const return25Year = Math.round(cum25 - price);
  const returnMultiplier = price > 0 ? Math.round((cum25 / price) * 10) / 10 : 0;

  return {
    monthlySavings,
    annualSavings,
    roiYearsWithIncrease,
    return25Year,
    returnMultiplier,
    dailyProduction: Math.round(dailyProduction * 10) / 10, // Safe 1-decimal rounding
  };
}

// formatRpShort imported from @/lib/pricing

export const evPackages: EVPackage[] = [
  {
    name: "EV Home Charger Only",
    solarKwp: 0,
    charger: "XCMG 7.2kW AC",
    price: 25_000_000,
    panel: "-",
    inverter: "-",
    batteryKwh: 0,
    monthlySavings: "-",
    annualSavings: 0,
    roiYears: 0,
    features: ["Charger AC 7.2kW (1-fase)", "Plug & Play instalasi", "Kompatibel semua EV Indonesia", "Proteksi overcurrent & overheating", "Garansi 2 tahun"],
    desc: "Charger AC 7.2kW untuk pengisian kendaraan listrik di rumah. Cukup colok ke listrik PLN rumah Anda. Instalasi mudah, pengisian aman.",
  },
  {
    name: "EV Solar 5.2 kWp + Charger",
    solarKwp: 5.2,
    charger: "XCMG 7.2kW AC",
    price: 135_000_000,
    panel: "8× LONGi 650Wp",
    inverter: "Powmr 5kW Hybrid",
    batteryKwh: 0,
    monthlySavings: "",
    annualSavings: 0,
    roiYears: 0,
    features: ["PLTS 5.2 kWp + Charger AC 7.2kW", "Produksi ~15.6 kWh/hari dari surya", "Hemat Rp 400-500rb/bulan vs PLN charging", "Isi daya EV dari surya — gratis", "Garansi panel 25 tahun", "Garansi inverter 5 tahun", "Gratis survei & instalasi", "PPN 11% termasuk"],
    desc: "Solusi terintegrasi PLTS + EV Charger untuk rumah. Isi daya kendaraan listrik Anda dengan energi surya — gratis dari matahari. Sistem hybrid Powmr memastikan supply listrik stabil untuk rumah dan EV charging.",
  },
  {
    name: "EV Solar 7.8 kWp + Charger",
    solarKwp: 7.8,
    charger: "XCMG 7.2kW AC",
    price: 185_000_000,
    panel: "12× LONGi 650Wp",
    inverter: "Powmr 8kW Hybrid",
    batteryKwh: 0,
    monthlySavings: "",
    annualSavings: 0,
    roiYears: 0,
    features: ["PLTS 7.8 kWp + Charger AC 7.2kW", "Produksi ~23.4 kWh/hari dari surya", "Hemat Rp 600-750rb/bulan vs PLN charging", "Cukup untuk 1-2 EV sekaligus", "Garansi panel 25 tahun", "Garansi inverter 5 tahun", "Gratis survei & instalasi", "PPN 11% termasuk"],
    desc: "Paket premium untuk rumah dengan 2 kendaraan listrik atau kebutuhan listrik rumah tinggi. Energi surplus dari PLTS dapat digunakan untuk kebutuhan rumah tangga lainnya.",
  },
  {
    name: "EV Solar 10.4 kWp + Charger",
    solarKwp: 10.4,
    charger: "XCMG 7.2kW AC",
    price: 240_000_000,
    panel: "16× LONGi 650Wp",
    inverter: "Powmr 10kW Hybrid",
    batteryKwh: 0,
    monthlySavings: "",
    annualSavings: 0,
    roiYears: 0,
    features: ["PLTS 10.4 kWp + Charger AC 7.2kW", "Produksi ~31.2 kWh/hari dari surya", "Hemat Rp 800rb-1jt/bulan vs PLN charging", "Cocok untuk bisnis & komersial", "Garansi panel 25 tahun", "Garansi inverter 5 tahun", "Gratis survei & instalasi", "PPN 11% termasuk", "Energi surplus menutupi kebutuhan bisnis"],
    desc: "Solusi ideal untuk area parkir komersial, ruko, atau kantor yang menyediakan EV charging. Energi surplus menutupi kebutuhan listrik bisnis Anda.",
  },
];

// Populate dynamic values after module load
evPackages.forEach((pkg) => {
  if (pkg.solarKwp > 0) {
    const calc = calculateEVSavings(pkg.solarKwp, pkg.price);
    pkg.monthlySavings = `~${formatRpShort(calc.monthlySavings)}/bulan`;
    pkg.annualSavings = calc.annualSavings;
    pkg.roiYears = calc.roiYearsWithIncrease;
  }
});

// Export helper for use in components
export function getEVRoiData(solarKwp: number, price: number) {
  return calculateEVSavings(solarKwp, price);
}
