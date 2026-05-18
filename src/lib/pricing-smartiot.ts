/* ============================================================
   SMART IoT PRICING — PT. Jaya Mandiri Smart Energy
   Smart Monitoring & Solar CCTV

   Monitoring: Basic / Standard / Industrial
   CCTV: 4MP / 8MP / 4CH NVR Kit
   ============================================================ */

export interface SmartMonitoringPackage {
  name: string;
  price: number;
  tier: "basic" | "standard" | "industrial";
  features: string[];
  desc: string;
  idealFor: string;
}

export interface SolarCCTVPackage {
  name: string;
  price: number;
  resolution: string;
  features: string[];
  desc: string;
}

export const smartMonitoringPackages: SmartMonitoringPackage[] = [
  {
    name: "Smart Monitoring Basic",
    price: 4_600_000,
    tier: "basic",
    features: [
      "WiFi + 4G module",
      "Monitoring real-time via smartphone",
      "Data produksi harian",
      "Notifikasi alert offline",
      "Garansi 1 tahun",
      "Termasuk instalasi",
    ],
    desc: "Monitoring performa PLTS dasar via aplikasi smartphone. Cocok untuk paket Silver rumah tangga.",
    idealFor: "PLTS 1-5 kWp (rumah tangga)",
  },
  {
    name: "Smart Monitoring Standard",
    price: 12_200_000,
    tier: "standard",
    features: [
      "WiFi + 4G + Ethernet",
      "Dashboard real-time multi-parameter",
      "Monitoring per panel (string level)",
      "Data historis 1 tahun",
      "Alert intelligence (anomali deteksi)",
      "Remote ON/OFF inverter",
      "Laporan bulanan otomatis",
      "Garansi 2 tahun",
      "Termasuk instalasi",
    ],
    desc: "Monitoring komprehensif untuk bisnis. Dashboard detail dengan alert cerdas dan laporan otomatis.",
    idealFor: "PLTS 5-15 kWp (bisnis & UMKM)",
  },
  {
    name: "Smart Monitoring Industrial",
    price: 38_000_000,
    tier: "industrial",
    features: [
      "WiFi + 4G + Ethernet + RS485",
      "SCADA-grade monitoring platform",
      "Weather station integration",
      "Per-panel monitoring (module level)",
      "Data historis 5 tahun + cloud backup",
      "Predictive maintenance AI",
      "API integration (ERP/BMS)",
      "Multi-user access control",
      "Laporan otomatis (harian/mingguan/bulanan)",
      "Garansi 3 tahun + SLA",
      "Termasuk instalasi & training",
    ],
    desc: "Solusi monitoring enterprise-grade untuk proyek besar. SCADA platform dengan predictive maintenance dan API integration.",
    idealFor: "PLTS 15+ kWp (industri & infrastruktur)",
  },
];

export const solarCCTVPackages: SolarCCTVPackage[] = [
  {
    name: "Solar CCTV 4MP",
    price: 8_500_000,
    resolution: "4 Megapixel (2K)",
    features: [
      "Kamera 4MP Night Vision",
      "Panel surya 30Wp terintegrasi",
      "Baterai LiFePO4 built-in",
      "WiFi + 4G (SIM card)",
      "Motion detection",
      "Cloud recording 7 hari gratis",
      "Tahan air IP67",
      "Gratis instalasi",
    ],
    desc: "CCTV tenaga surya mandiri tanpa kabel listrik PLN. Cocok untuk keamanan kebun, gudang, rumah kosong, proyek bangunan.",
  },
  {
    name: "Solar CCTV 8MP",
    price: 12_000_000,
    resolution: "8 Megapixel (4K)",
    features: [
      "Kamera 8MP 4K Night Vision",
      "Panel surya 50Wp terintegrasi",
      "Baterai LiFePO4 built-in",
      "WiFi + 4G (SIM card)",
      "Motion detection + person detection",
      "Cloud recording 30 hari gratis",
      "2-way audio (intercom)",
      "Tahan air IP67",
      "Gratis instalasi",
    ],
    desc: "CCTV tenaga surya resolusi tinggi 4K dengan person detection. Ideal untuk area strategis yang butuh detail gambar jernih.",
  },
  {
    name: "Solar CCTV 4CH NVR Kit",
    price: 25_000_000,
    resolution: "4× 4MP + NVR 1TB",
    features: [
      "4 unit kamera 4MP Night Vision",
      "Panel surya 100Wp + baterai terintegrasi",
      "NVR 1TB (rekam 30 hari)",
      "WiFi + 4G + Ethernet",
      "Motion & person detection",
      "Remote viewing via smartphone",
      "Tahan air IP67 semua kamera",
      "Gratis instalasi 4 titik",
    ],
    desc: "Sistem CCTV 4 titik lengkap dengan NVR. Ideal untuk keamanan perkebunan, gudang, pabrik, atau area luas yang butuh multi-angle coverage.",
  },
];
