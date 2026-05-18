/* ============================================================
   PJUTS PRICING — PT. Jaya Mandiri Smart Energy
   Penerangan Jalan Umum Tenaga Surya

   Brand: LONGi Panel + BYD LiFePO4 Battery + LED Lamp
   Features: Auto on/off, remote monitoring, 3-year warranty
   ============================================================ */

export interface PJUTSPackage {
  name: string;
  wattage: number;
  price: number;
  panel: string;
  battery: string;
  lamp: string;
  pole: string;
  features: string[];
  desc: string;
}

export const pjutsPackages: PJUTSPackage[] = [
  {
    name: "PJUTS 30W",
    wattage: 30,
    price: 4_500_000,
    panel: "LONGi 50Wp",
    battery: "BYD LiFePO4 20Ah",
    lamp: "LED 30W SMD",
    pole: "Tiang All-in-One 4m",
    features: ["Auto on/off sensor cahaya", "Remote monitoring (opsional)", "Garansi 3 tahun", "Gratis instalasi", "Tahan air IP65"],
    desc: "Cocok untuk gang kecil, pekarangan rumah, area terbatas dengan pencahayaan fokus.",
  },
  {
    name: "PJUTS 40W",
    wattage: 40,
    price: 5_500_000,
    panel: "LONGi 80Wp",
    battery: "BYD LiFePO4 30Ah",
    lamp: "LED 40W SMD",
    pole: "Tiang All-in-One 5m",
    features: ["Auto on/off sensor cahaya", "Remote monitoring (opsional)", "Garansi 3 tahun", "Gratis instalasi", "Tahan air IP65"],
    desc: "Ideal untuk jalan kampung, perkebunan kecil, area parkir mini.",
  },
  {
    name: "PJUTS 60W",
    wattage: 60,
    price: 7_500_000,
    panel: "LONGi 120Wp",
    battery: "BYD LiFePO4 50Ah",
    lamp: "LED 60W SMD",
    pole: "Tiang All-in-One 6m",
    features: ["Auto on/off sensor cahaya", "Remote monitoring (opsional)", "Garansi 3 tahun", "Gratis instalasi", "Tahan air IP65"],
    desc: "Penerangan jalan desa, akses perkebunan, kawasan perumahan cluster.",
  },
  {
    name: "PJUTS 80W",
    wattage: 80,
    price: 10_000_000,
    panel: "LONGi 150Wp",
    battery: "BYD LiFePO4 60Ah",
    lamp: "LED 80W SMD",
    pole: "Tiang All-in-One 7m",
    features: ["Auto on/off sensor cahaya", "Remote monitoring", "Garansi 3 tahun", "Gratis instalasi", "Tahan air IP66"],
    desc: "Jalan utama desa, jalan perkebunan sawit, kawasan industri ringan.",
  },
  {
    name: "PJUTS 100W",
    wattage: 100,
    price: 13_000_000,
    panel: "LONGi 200Wp",
    battery: "BYD LiFePO4 80Ah",
    lamp: "LED 100W SMD",
    pole: "Tiang All-in-One 8m",
    features: ["Auto on/off sensor cahaya", "Remote monitoring", "Garansi 3 tahun", "Gratis instalasi", "Tahan air IP66"],
    desc: "Jalan kawasan industri, jalan utama perkebunan, area publik besar.",
  },
  {
    name: "PJUTS 150W",
    wattage: 150,
    price: 18_000_000,
    panel: "LONGi 300Wp",
    battery: "BYD LiFePO4 100Ah",
    lamp: "LED 150W SMD",
    pole: "Tiang All-in-One 9m",
    features: ["Auto on/off sensor cahaya", "Remote monitoring", "Garansi 3 tahun", "Gratis instalasi", "Tahan air IP66", "Motion sensor"],
    desc: "Penerangan jalan raya, lapangan, area luas yang butuh cahaya terang merata.",
  },
];
