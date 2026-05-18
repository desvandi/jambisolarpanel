/* ============================================================
   EV CHARGING PRICING — PT. Jaya Mandiri Smart Energy
   EV Charging Terintegrasi PLTS

   Charger: XCMG AC 7.2kW
   Panel: LONGi 650Wp
   Inverter: Powmr Hybrid
   ============================================================ */

export interface EVPackage {
  name: string;
  solarKwp: number;
  charger: string;
  price: number;
  panel: string;
  inverter: string;
  batteryKwh: number;
  monthlySavings: string;
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
  solarOffsetPct: 70,           // 70% covered by solar (daytime)
  get monthlyPlnCost() {
    return Math.round(this.dailyChargingKwh * 30 * this.plnTariffPerKwh);
  },
  get annualPlnCost() {
    return this.monthlyPlnCost * 12;
  },
  get monthlySolarSavings() {
    return Math.round(this.monthlyPlnCost * this.solarOffsetPct / 100);
  },
  get annualSolarSavings() {
    return this.monthlySolarSavings * 12;
  },
};

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
    monthlySavings: "~Rp 324.000/bulan",
    features: ["PLTS 5.2 kWp + Charger AC 7.2kW", "Hemat ~Rp 324rb/bulan vs PLN charging", "Produksi ~15.6 kWh/hari", "Isi daya 1x/hari dari surya", "Garansi panel 25 tahun", "Garansi inverter 5 tahun", "Gratis survei & instalasi", "PPN 11% termasuk"],
    desc: "Solusi terintegrasi PLTS + EV Charger untuk rumah. Isi daya kendaraan listrik Anda dengan energi surya — gratis dari matahari. Hemat Rp 324 ribu per bulan dibanding charging dari PLN.",
  },
  {
    name: "EV Solar 7.8 kWp + Charger",
    solarKwp: 7.8,
    charger: "XCMG 7.2kW AC",
    price: 185_000_000,
    panel: "12× LONGi 650Wp",
    inverter: "Powmr 8kW Hybrid",
    batteryKwh: 0,
    monthlySavings: "~Rp 486.000/bulan",
    features: ["PLTS 7.8 kWp + Charger AC 7.2kW", "Hemat ~Rp 486rb/bulan vs PLN charging", "Produksi ~23.4 kWh/hari", "Isi daya ~1.6x/hari dari surya", "Garansi panel 25 tahun", "Garansi inverter 5 tahun", "Gratis survei & instalasi", "PPN 11% termasuk"],
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
    monthlySavings: "~Rp 648.000/bulan",
    features: ["PLTS 10.4 kWp + Charger AC 7.2kW", "Hemat ~Rp 648rb/bulan vs PLN charging", "Produksi ~31.2 kWh/hari", "Isi daya ~2.2x/hari dari surya", "Garansi panel 25 tahun", "Garansi inverter 5 tahun", "Gratis survei & instalasi", "PPN 11% termasuk", "Cocok untuk bisnis & komersial"],
    desc: "Solusi ideal untuk area parkir komersial, ruko, atau kantor yang menyediakan EV charging. Energi surplus menutupi kebutuhan listrik bisnis Anda.",
  },
];
