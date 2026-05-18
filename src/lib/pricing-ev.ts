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
    monthlySavings: "~Rp 3.000.000/bulan",
    features: ["PLTS 5.2 kWp + Charger AC 7.2kW", "Hemat ~Rp 3jt/bulan vs PLN charging", "Produksi ~15.6 kWh/hari", "Garansi panel 25 tahun", "Garansi inverter 5 tahun", "Gratis survei & instalasi", "PPN 11% termasuk"],
    desc: "Solusi terintegrasi PLTS + EV Charger untuk rumah. Isi daya kendaraan listrik Anda dengan energi surya — gratis dari matahari. Hemat Rp 3 juta per bulan dibanding charging dari PLN.",
  },
  {
    name: "EV Solar 7.8 kWp + Charger",
    solarKwp: 7.8,
    charger: "XCMG 7.2kW AC",
    price: 185_000_000,
    panel: "12× LONGi 650Wp",
    inverter: "Powmr 8kW Hybrid",
    batteryKwh: 0,
    monthlySavings: "~Rp 4.500.000/bulan",
    features: ["PLTS 7.8 kWp + Charger AC 7.2kW", "Hemat ~Rp 4.5jt/bulan vs PLN charging", "Produksi ~23.4 kWh/hari", "Garansi panel 25 tahun", "Garansi inverter 5 tahun", "Gratis survei & instalasi", "PPN 11% termasuk"],
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
    monthlySavings: "~Rp 6.000.000/bulan",
    features: ["PLTS 10.4 kWp + Charger AC 7.2kW", "Hemat ~Rp 6jt/bulan vs PLN charging", "Produksi ~31.2 kWh/hari", "Garansi panel 25 tahun", "Garansi inverter 5 tahun", "Gratis survei & instalasi", "PPN 11% termasuk", "Cocok untuk bisnis & komersial"],
    desc: "Solusi ideal untuk area parkir komersial, ruko, atau kantor yang menyediakan EV charging. Energi surplus menutupi kebutuhan listrik bisnis Anda.",
  },
];

// PLN Charging Cost Comparison
export const plnChargingCost = {
  perKwh: 1500, // Rp/kWh (tarif rumah tangga)
  evEfficiency: 0.16, // 16 kWh per 100km
  monthlyKm: 1000, // km per bulan rata-rata
  get monthlyPlnCost() {
    return Math.round(this.monthlyKm / 100 * this.evEfficiency * this.perKwh / 1000 * 10) / 10;
  },
};
