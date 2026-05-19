/* ============================================================
   SOLAR PUMP PRICING — PT. Jaya Mandiri Smart Energy
   Pompa Air Tenaga Surya untuk Irigasi & Pertanian

   Brand: Samking Submersible Pump + LONGi 650Wp Panel
   Features: Auto-dry run protection, MPPT controller
   ============================================================ */

export interface SolarPumpPackage {
  name: string;
  hp: number;
  panelKwp: number;
  price: number;
  pump: string;
  panel: string;
  controller: string;
  flowRate: string;
  maxHead: string;
  features: string[];
  desc: string;
}

export const solarPumpPackages: SolarPumpPackage[] = [
  {
    name: "Solar Pump 1 HP",
    hp: 1,
    panelKwp: 500,
    price: 18_000_000,
    pump: "Pompa Submersible 1 HP",
    panel: "1× Panel Surya 650Wp",
    controller: "MPPT Solar Pump Controller",
    flowRate: "1-2 m³/jam",
    maxHead: "30 meter",
    features: ["Auto-dry run protection", "MPPT controller", "Day-only operation", "Stainless steel body", "Garansi pompa 2 tahun", "Gratis instalasi"],
    desc: "Ideal untuk kebutuhan air rumah tangga, taman kecil, kolam ikan, dan irigasi lahan kecil < 1 hektar.",
  },
  {
    name: "Solar Pump 1.5 HP",
    hp: 1.5,
    panelKwp: 750,
    price: 25_000_000,
    pump: "Pompa Submersible 1.5 HP",
    panel: "2× Panel Surya 650Wp",
    controller: "MPPT Solar Pump Controller",
    flowRate: "2-4 m³/jam",
    maxHead: "45 meter",
    features: ["Auto-dry run protection", "MPPT controller", "Day-only operation", "Stainless steel body", "Garansi pompa 2 tahun", "Gratis instalasi"],
    desc: "Cocok untuk irigasi sawit kecil (1-2 hektar), pertanian sayuran, peternakan skala menengah.",
  },
  {
    name: "Solar Pump 2 HP",
    hp: 2,
    panelKwp: 1000,
    price: 32_000_000,
    pump: "Pompa Submersible 2 HP",
    panel: "2× Panel Surya 650Wp",
    controller: "MPPT Solar Pump Controller",
    flowRate: "4-6 m³/jam",
    maxHead: "60 meter",
    features: ["Auto-dry run protection", "MPPT controller", "Day-only operation", "Stainless steel body", "Garansi pompa 2 tahun", "Gratis instalasi"],
    desc: "Solusi irigasi kebun sawit 2-4 hektar, kebun karet, perkebunan skala menengah.",
  },
  {
    name: "Solar Pump 3 HP",
    hp: 3,
    panelKwp: 1500,
    price: 45_000_000,
    pump: "Pompa Submersible 3 HP",
    panel: "3× Panel Surya 650Wp",
    controller: "MPPT Solar Pump Controller",
    flowRate: "6-10 m³/jam",
    maxHead: "80 meter",
    features: ["Auto-dry run protection", "MPPT controller", "Day-only operation", "Stainless steel body", "Garansi pompa 2 tahun", "Gratis instalasi"],
    desc: "Irigasi perkebunan besar 5-10 hektar, supply air untuk pabrik mini, kebutuhan industrial ringan.",
  },
];
