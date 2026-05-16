/* ============================================================
   PRICING MODULE v2 — PT. Jaya Mandiri Smart Energy
   Shared pricing logic for ProductSection & Kalibrasi Harga

   Update: 16 Mei 2026
   - New package structure (1,2,3,5 / 6.5,10 / 11,20 kWp)
   - Add-on support (Carport, Smart Monitoring)
   - Battery sizing: 26-33% of daily PV production (Opsi A)
   - PSH Jambi: 3.75 jam | Efficiency: 80%
   - Margin: 35% | PPN: 11%
   ============================================================ */

// --- Types ---

export interface ComponentPrices {
  // Panel
  panelWattage: number;          // Wp per panel (e.g., 630)
  panelPerUnit: number;          // Harga 1 panel

  // Mounting
  mountingPerPanel: number;      // Roof mounting per panel (bracket, baut, labor)
  carportPerKwp: number;         // Carport canopy per kWp (add-on)

  // BOS per panel
  bosPerPanel: number;           // Cables, MC4, connectors per panel

  // Proteksi per sistem (lump sum)
  spdGroundingPerSystem: number; // SPD + grounding system

  // Labor
  laborPerPanel: number;         // Panel installation labor per panel
  laborInverterPerUnit: number;  // Inverter installation labor per unit
  laborBatteryPerKwh: number;    // Battery installation & wiring per kWh

  // Battery
  batteryPerKwh: number;         // LiFePO4 per kWh
  bosBatteryPerKwh: number;      // Battery BOS: cables, fuse, protective per kWh

  // Professional Services (lump sum)
  surveyDesignFee: number;       // Survei & desain
  commissioningFee: number;      // Testing & commissioning

  // Logistics
  logisticsPerPanel: number;     // Shipping per panel

  // Smart Monitoring (add-on)
  monitoringBasic: number;       // Basic monitoring system
  monitoringStandard: number;    // Standard monitoring system
  monitoringIndustrial: number;  // Industrial monitoring system
}

export interface InverterPrices {
  deye3k6: number;
  deye6k: number;
  deye8k: number;
  growatt10k: number;
  deye10k3p: number;
  deye15k3p: number;
  deye20k3p: number;
}

export interface PricingSettings {
  marginPct: number;    // Profit margin (e.g. 35)
  ppnPct: number;       // PPN (e.g. 11)
  pshHours: number;     // Peak Sun Hours Jambi
  efficiency: number;   // System efficiency (e.g. 0.80)
}

export interface PackageSpec {
  name: string;
  desc: string;
  specs: string;
  panelCount: number;
  inverterKey: keyof InverterPrices;
  batteryKwh: number;
  tier: "silver" | "gold" | "platinum";
  popular: boolean;
}

export interface CalculatedPackage extends PackageSpec {
  hpp: number;
  subtotal: number;
  ppn: number;
  price: number;
  priceFormatted: string;
  kWp: number;
  dailyProduction: string;
  savingsRange: string;
  batteryNote: string | null;
  // Add-on prices (incl. margin & PPN)
  carportAddonPrice: number;
  monitoringBasicPrice: number;
  monitoringStandardPrice: number;
  monitoringIndustrialPrice: number;
}

// --- Default Values (Acuan 2026) ---

export const defaultComponentPrices: ComponentPrices = {
  panelWattage: 630,
  panelPerUnit: 2_500_000,
  mountingPerPanel: 400_000,
  carportPerKwp: 5_000_000,
  bosPerPanel: 500_000,
  spdGroundingPerSystem: 1_500_000,
  laborPerPanel: 600_000,
  laborInverterPerUnit: 1_500_000,
  laborBatteryPerKwh: 250_000,
  batteryPerKwh: 2_000_000,
  bosBatteryPerKwh: 350_000,
  surveyDesignFee: 1_500_000,
  commissioningFee: 1_000_000,
  logisticsPerPanel: 200_000,
  monitoringBasic: 3_000_000,
  monitoringStandard: 8_000_000,
  monitoringIndustrial: 25_000_000,
};

export const defaultInverterPrices: InverterPrices = {
  deye3k6: 7_000_000,
  deye6k: 12_000_000,
  deye8k: 16_000_000,
  growatt10k: 18_000_000,
  deye10k3p: 26_000_000,
  deye15k3p: 38_000_000,
  deye20k3p: 52_000_000,
};

export const defaultSettings: PricingSettings = {
  marginPct: 35,
  ppnPct: 11,
  pshHours: 3.75,
  efficiency: 0.80,
};

// --- Inverter Display Names ---

export const inverterDisplayNames: Record<keyof InverterPrices, string> = {
  deye3k6: "DEYE 3.600W Hybrid",
  deye6k: "DEYE 6.000W Hybrid",
  deye8k: "DEYE 8.000W Hybrid",
  growatt10k: "GROWATT SPF 10.000ES Hybrid",
  deye10k3p: "DEYE 10.000W 3-Fase",
  deye15k3p: "DEYE 15.000W 3-Fase",
  deye20k3p: "DEYE 20.000W 3-Fase",
};

// Inverter metadata for kalibrasi detail
export const inverterMeta: Record<keyof InverterPrices, { capacity: number; phase: string; type: string }> = {
  deye3k6: { capacity: 3.6, phase: "1-Fase", type: "Hybrid" },
  deye6k: { capacity: 6.0, phase: "1-Fase", type: "Hybrid" },
  deye8k: { capacity: 8.0, phase: "1-Fase", type: "Hybrid" },
  growatt10k: { capacity: 10.0, phase: "1-Fase", type: "Hybrid" },
  deye10k3p: { capacity: 10.0, phase: "3-Fase", type: "Hybrid" },
  deye15k3p: { capacity: 15.0, phase: "3-Fase", type: "Hybrid" },
  deye20k3p: { capacity: 20.0, phase: "3-Fase", type: "Hybrid" },
};

// --- Package Definitions ---

export const packageSpecs: PackageSpec[] = [
  // ============================
  // SILVER — Rumah Tangga (1 Fase)
  // ============================
  {
    name: "Silver 1 kWp",
    desc: "2 panel PV 630Wp + Inverter Hybrid DEYE 3.600W. Starter untuk rumah kecil: lampu LED, TV, charger HP, kipas angin.",
    specs: "2× Panel 630Wp | DEYE 3.6kW Hybrid",
    panelCount: 2,
    inverterKey: "deye3k6",
    batteryKwh: 0,
    tier: "silver",
    popular: false,
  },
  {
    name: "Silver 2 kWp",
    desc: "4 panel PV 630Wp + Inverter Hybrid DEYE 3.600W. Rumah kecil-menengah: lampu, TV, kipas angin, kulkas kecil.",
    specs: "4× Panel 630Wp | DEYE 3.6kW Hybrid",
    panelCount: 4,
    inverterKey: "deye3k6",
    batteryKwh: 0,
    tier: "silver",
    popular: false,
  },
  {
    name: "Silver 3 kWp",
    desc: "5 panel PV 630Wp + Inverter Hybrid DEYE 3.600W. Rumah menengah: AC 1 unit, kulkas, mesin cuci.",
    specs: "5× Panel 630Wp | DEYE 3.6kW Hybrid",
    panelCount: 5,
    inverterKey: "deye3k6",
    batteryKwh: 0,
    tier: "silver",
    popular: false,
  },
  {
    name: "Silver 5 kWp",
    desc: "8 panel PV 630Wp + Inverter Hybrid DEYE 6.000W. Rumah keluarga besar: AC 2 unit, water heater, dispenser.",
    specs: "8× Panel 630Wp | DEYE 6kW Hybrid",
    panelCount: 8,
    inverterKey: "deye6k",
    batteryKwh: 0,
    tier: "silver",
    popular: true,
  },
  {
    name: "Silver 5 kWp + Baterai 5 kWh",
    desc: "8 panel PV 630Wp + DEYE 6.000W + LiFePO4 5 kWh. Full backup saat PLN padam. Baterai menutupi kebutuhan malam hari.",
    specs: "8× Panel 630Wp | DEYE 6kW | LiFePO4 5kWh",
    panelCount: 8,
    inverterKey: "deye6k",
    batteryKwh: 5,
    tier: "silver",
    popular: false,
  },

  // ============================
  // GOLD — Bisnis & UMKM (1 Fase)
  // ============================
  {
    name: "Gold 6.5 kWp",
    desc: "11 panel PV 630Wp + Inverter Hybrid DEYE 8.000W. Toko, ruko, kantor kecil, cold storage mini, bengkel.",
    specs: "11× Panel 630Wp | DEYE 8kW Hybrid",
    panelCount: 11,
    inverterKey: "deye8k",
    batteryKwh: 0,
    tier: "gold",
    popular: false,
  },
  {
    name: "Gold 10 kWp",
    desc: "16 panel PV 630Wp + GROWATT SPF 10.000ES Hybrid. Gudang, restoran, hotel kecil, minimarket, clinic.",
    specs: "16× Panel 630Wp | GROWATT 10kW Hybrid",
    panelCount: 16,
    inverterKey: "growatt10k",
    batteryKwh: 0,
    tier: "gold",
    popular: true,
  },
  {
    name: "Gold 10 kWp + Baterai 10 kWh",
    desc: "16 panel PV 630Wp + GROWATT 10.000ES + LiFePO4 10 kWh. Full backup bisnis 24 jam. Operasional tanpa gangguan.",
    specs: "16× Panel 630Wp | GROWATT 10kW | LiFePO4 10kWh",
    panelCount: 16,
    inverterKey: "growatt10k",
    batteryKwh: 10,
    tier: "gold",
    popular: false,
  },

  // ============================
  // PLATINUM — Industri (3 Fase)
  // ============================
  {
    name: "Platinum 11 kWp",
    desc: "18 panel PV 630Wp + DEYE 10.000W 3-Fase Hybrid. Pabrik menengah, processing plant, warehouse besar.",
    specs: "18× Panel 630Wp | DEYE 10kW 3-Fase",
    panelCount: 18,
    inverterKey: "deye10k3p",
    batteryKwh: 0,
    tier: "platinum",
    popular: false,
  },
  {
    name: "Platinum 11 kWp + Baterai 10 kWh",
    desc: "18 panel PV 630Wp + DEYE 10.000W 3-Fase + LiFePO4 10 kWh. Pabrik dengan backup operasional malam hari.",
    specs: "18× Panel 630Wp | DEYE 10kW 3P | LiFePO4 10kWh",
    panelCount: 18,
    inverterKey: "deye10k3p",
    batteryKwh: 10,
    tier: "platinum",
    popular: true,
  },
  {
    name: "Platinum 20 kWp",
    desc: "32 panel PV 630Wp + DEYE 20.000W 3-Fase Hybrid. Mega proyek, industrial complex, pabrik besar, hotel bintang 4.",
    specs: "32× Panel 630Wp | DEYE 20kW 3-Fase",
    panelCount: 32,
    inverterKey: "deye20k3p",
    batteryKwh: 0,
    tier: "platinum",
    popular: false,
  },
  {
    name: "Platinum 20 kWp + Baterai 20 kWh",
    desc: "32 panel PV 630Wp + DEYE 20.000W 3-Fase + LiFePO4 20 kWh. Full backup industri 24 jam. Energi mandiri penuh.",
    specs: "32× Panel 630Wp | DEYE 20kW 3P | LiFePO4 20kWh",
    panelCount: 32,
    inverterKey: "deye20k3p",
    batteryKwh: 20,
    tier: "platinum",
    popular: false,
  },
];

// --- LocalStorage Keys (v2) ---

const LS_COMPONENT = "jmse_v2_component_prices";
const LS_INVERTER = "jmse_v2_inverter_prices";
const LS_SETTINGS = "jmse_v2_pricing_settings";

// --- LocalStorage Helpers ---

export function saveComponentPrices(prices: ComponentPrices): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(LS_COMPONENT, JSON.stringify(prices));
  }
}

export function loadComponentPrices(): ComponentPrices {
  if (typeof window === "undefined") return { ...defaultComponentPrices };
  try {
    const raw = localStorage.getItem(LS_COMPONENT);
    if (!raw) return { ...defaultComponentPrices };
    return { ...defaultComponentPrices, ...JSON.parse(raw) };
  } catch {
    return { ...defaultComponentPrices };
  }
}

export function saveInverterPrices(prices: InverterPrices): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(LS_INVERTER, JSON.stringify(prices));
  }
}

export function loadInverterPrices(): InverterPrices {
  if (typeof window === "undefined") return { ...defaultInverterPrices };
  try {
    const raw = localStorage.getItem(LS_INVERTER);
    if (!raw) return { ...defaultInverterPrices };
    return { ...defaultInverterPrices, ...JSON.parse(raw) };
  } catch {
    return { ...defaultInverterPrices };
  }
}

export function saveSettings(settings: PricingSettings): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(LS_SETTINGS, JSON.stringify(settings));
  }
}

export function loadSettings(): PricingSettings {
  if (typeof window === "undefined") return { ...defaultSettings };
  try {
    const raw = localStorage.getItem(LS_SETTINGS);
    if (!raw) return { ...defaultSettings };
    return { ...defaultSettings, ...JSON.parse(raw) };
  } catch {
    return { ...defaultSettings };
  }
}

export function clearAllPricing(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(LS_COMPONENT);
    localStorage.removeItem(LS_INVERTER);
    localStorage.removeItem(LS_SETTINGS);
    // Also clear v1 keys for cleanup
    localStorage.removeItem("jmse_component_prices");
    localStorage.removeItem("jmse_inverter_prices");
    localStorage.removeItem("jmse_pricing_settings");
  }
}

export function hasCustomPricing(): boolean {
  if (typeof window === "undefined") return false;
  return !!(
    localStorage.getItem(LS_COMPONENT) ||
    localStorage.getItem(LS_INVERTER) ||
    localStorage.getItem(LS_SETTINGS)
  );
}

// --- Calculation Functions ---

export function calculatePackages(
  components?: ComponentPrices,
  inverters?: InverterPrices,
  settings?: PricingSettings
): CalculatedPackage[] {
  const c = components || loadComponentPrices();
  const inv = inverters || loadInverterPrices();
  const s = settings || loadSettings();

  const costPerPanel =
    c.panelPerUnit +
    c.mountingPerPanel +
    c.bosPerPanel +
    c.laborPerPanel +
    c.logisticsPerPanel;

  const batteryCostPerKwh =
    c.batteryPerKwh + c.laborBatteryPerKwh + c.bosBatteryPerKwh;

  const fixedPerSystem =
    c.spdGroundingPerSystem + c.surveyDesignFee + c.commissioningFee;

  const marginMultiplier = 1 + s.marginPct / 100;
  const ppnMultiplier = 1 + s.ppnPct / 100;

  return packageSpecs.map((pkg) => {
    const panelCost = pkg.panelCount * costPerPanel;
    const inverterCost = inv[pkg.inverterKey];
    const inverterLaborCost = c.laborInverterPerUnit;
    const batteryCost = pkg.batteryKwh * batteryCostPerKwh;
    const kWp = (pkg.panelCount * c.panelWattage) / 1000;

    const hpp = panelCost + inverterCost + inverterLaborCost + batteryCost + fixedPerSystem;
    const subtotal = Math.round(hpp * marginMultiplier);
    const ppn = Math.round(subtotal * (s.ppnPct / 100));
    const price = Math.round(subtotal * ppnMultiplier / 100_000) * 100_000;

    // Daily production
    const dailyKwh = kWp * s.pshHours * s.efficiency;

    // Battery ratio
    const battRatio = pkg.batteryKwh > 0 ? (pkg.batteryKwh / dailyKwh) * 100 : 0;
    const batteryNote =
      pkg.batteryKwh > 0
        ? `Rasio baterai ${battRatio.toFixed(0)}% dari produksi harian — ${
            battRatio < 28
              ? "optimal untuk backup beban esensial malam"
              : battRatio <= 40
                ? "cukup untuk backup operasional malam"
                : "perlu evaluasi (over-sizing)"
          }`
        : null;

    // Savings estimation (based on PLN average tariff ~Rp 1.500/kWh)
    const monthlySavingsLow =
      Math.round((dailyKwh * 0.5 * 30 * 1500) / 1_000_000 * 10) / 10;
    const monthlySavingsHigh =
      Math.round((dailyKwh * 0.75 * 30 * 1500) / 1_000_000 * 10) / 10;

    const formatSavings = (val: number) => {
      if (val >= 1) return `${val.toFixed(val % 1 === 0 ? 0 : 1)}jt`;
      return `${Math.round(val * 1000)}rb`;
    };

    // Add-on prices (with margin & PPN)
    const addonMultiplier = marginMultiplier * ppnMultiplier;
    const carportAddon = c.carportPerKwp > 0
      ? Math.round((kWp * c.carportPerKwp * addonMultiplier) / 100_000) * 100_000
      : 0;
    const monBasic = c.monitoringBasic > 0
      ? Math.round((c.monitoringBasic * addonMultiplier) / 100_000) * 100_000
      : 0;
    const monStd = c.monitoringStandard > 0
      ? Math.round((c.monitoringStandard * addonMultiplier) / 100_000) * 100_000
      : 0;
    const monInd = c.monitoringIndustrial > 0
      ? Math.round((c.monitoringIndustrial * addonMultiplier) / 100_000) * 100_000
      : 0;

    return {
      ...pkg,
      hpp,
      subtotal,
      ppn,
      price,
      priceFormatted: formatRp(price),
      kWp,
      dailyProduction: `~${dailyKwh.toFixed(1)} kWh/hari`,
      savingsRange: `${formatSavings(monthlySavingsLow)} - ${formatSavings(monthlySavingsHigh)}/bulan`,
      batteryNote,
      carportAddonPrice: carportAddon,
      monitoringBasicPrice: monBasic,
      monitoringStandardPrice: monStd,
      monitoringIndustrialPrice: monInd,
    };
  });
}

// --- Utility ---

export function formatRp(num: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
}

export function parseRpToNumber(str: string): number {
  return parseInt(str.replace(/\D/g, ""), 10) || 0;
}
