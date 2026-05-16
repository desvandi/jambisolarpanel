/* ============================================================
   PRICING MODULE — PT. Jaya Mandiri Smart Energy
   Shared pricing logic for ProductSection & Kalibrasi Harga
   ============================================================ */

// --- Types ---

export interface ComponentPrices {
  panelPerUnit: number;       // Harga 1 panel 630Wp
  mountingPerPanel: number;   // Mounting aluminium per panel
  bosPerPanel: number;        // BOS (kabel, MC4, CB) per panel
  laborPerPanel: number;      // Tenaga kerja per panel
  batteryPerKwh: number;      // LiFePO4 per kWh
  laborBatteryPerKwh: number; // Tenaga kerja integrasi baterai per kWh
  bosBatteryPerKwh: number;   // BOS baterai per kWh
}

export interface InverterPrices {
  deye3k6: number;
  deye6k: number;
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
  dailyProduction: string;
  savingsRange: string;
  batteryNote: string | null;
}

// --- Default Values ---

export const defaultComponentPrices: ComponentPrices = {
  panelPerUnit: 2_500_000,
  mountingPerPanel: 400_000,
  bosPerPanel: 500_000,
  laborPerPanel: 600_000,
  batteryPerKwh: 2_000_000,
  laborBatteryPerKwh: 250_000,
  bosBatteryPerKwh: 350_000,
};

export const defaultInverterPrices: InverterPrices = {
  deye3k6: 7_000_000,
  deye6k: 12_000_000,
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
  growatt10k: "GROWATT SPF 10.000ES Hybrid",
  deye10k3p: "DEYE 10.000W 3-Fase",
  deye15k3p: "DEYE 15.000W 3-Fase",
  deye20k3p: "DEYE 20.000W 3-Fase",
};

// --- Package Definitions ---

export const packageSpecs: PackageSpec[] = [
  // --- SILVER ---
  {
    name: "Silver 2 kWp (Tanpa Baterai)",
    desc: "4 panel PV 630Wp + Inverter Hybrid DEYE 3.600W. Cocok untuk rumah kecil: lampu, TV, kipas angin, charger.",
    specs: "4× Panel 630Wp | DEYE 3.6kW Hybrid",
    panelCount: 4,
    inverterKey: "deye3k6",
    batteryKwh: 0,
    tier: "silver",
    popular: false,
  },
  {
    name: "Silver 3 kWp (Tanpa Baterai)",
    desc: "5 panel PV 630Wp + Inverter Hybrid DEYE 3.600W. Ideal untuk rumah menengah dengan AC 1 unit dan kulkas.",
    specs: "5× Panel 630Wp | DEYE 3.6kW Hybrid",
    panelCount: 5,
    inverterKey: "deye3k6",
    batteryKwh: 0,
    tier: "silver",
    popular: false,
  },
  {
    name: "Silver 5 kWp (Tanpa Baterai)",
    desc: "9 panel PV 630Wp + Inverter Hybrid DEYE 6.000W. Rumah keluarga besar, AC 2 unit, water heater.",
    specs: "9× Panel 630Wp | DEYE 6kW Hybrid",
    panelCount: 9,
    inverterKey: "deye6k",
    batteryKwh: 0,
    tier: "silver",
    popular: true,
  },
  {
    name: "Silver 5 kWp (Baterai 5 kWh)",
    desc: "9 panel PV 630Wp + DEYE 6.000W + LiFePO4 5 kWh. Full backup saat PLN padam. Baterai menutupi kebutuhan malam hari.",
    specs: "9× Panel 630Wp | DEYE 6kW | LiFePO4 5kWh",
    panelCount: 9,
    inverterKey: "deye6k",
    batteryKwh: 5,
    tier: "silver",
    popular: false,
  },
  // --- GOLD ---
  {
    name: "Gold 7 kWp (Tanpa Baterai)",
    desc: "12 panel PV 630Wp + DEYE 6.000W Hybrid. Toko, kantor kecil, workshop, cold storage mini.",
    specs: "12× Panel 630Wp | DEYE 6kW Hybrid",
    panelCount: 12,
    inverterKey: "deye6k",
    batteryKwh: 0,
    tier: "gold",
    popular: false,
  },
  {
    name: "Gold 10 kWp (Tanpa Baterai)",
    desc: "16 panel PV 630Wp + GROWATT SPF 10.000ES Hybrid. Gudang, restoran, hotel kecil, minimarket.",
    specs: "16× Panel 630Wp | GROWATT 10kW Hybrid",
    panelCount: 16,
    inverterKey: "growatt10k",
    batteryKwh: 0,
    tier: "gold",
    popular: true,
  },
  {
    name: "Gold 10 kWp (Baterai 10 kWh)",
    desc: "16 panel PV 630Wp + GROWATT 10.000ES + LiFePO4 10 kWh. Full backup bisnis 24 jam.",
    specs: "16× Panel 630Wp | GROWATT 10kW | LiFePO4 10kWh",
    panelCount: 16,
    inverterKey: "growatt10k",
    batteryKwh: 10,
    tier: "gold",
    popular: false,
  },
  // --- PLATINUM ---
  {
    name: "Platinum 12 kWp (Baterai 10 kWh)",
    desc: "20 panel PV 630Wp + DEYE 10.000W 3-Fase + LiFePO4 10 kWh. Pabrik menengah, processing plant.",
    specs: "20× Panel 630Wp | DEYE 10kW 3P | LiFePO4 10kWh",
    panelCount: 20,
    inverterKey: "deye10k3p",
    batteryKwh: 10,
    tier: "platinum",
    popular: false,
  },
  {
    name: "Platinum 18 kWp (Baterai 15 kWh)",
    desc: "30 panel PV 630Wp + DEYE 15.000W 3-Fase + LiFePO4 15 kWh. Pabrik besar, agro-industri.",
    specs: "30× Panel 630Wp | DEYE 15kW 3P | LiFePO4 15kWh",
    panelCount: 30,
    inverterKey: "deye15k3p",
    batteryKwh: 15,
    tier: "platinum",
    popular: true,
  },
  {
    name: "Platinum 20 kWp (Baterai 20 kWh)",
    desc: "33 panel PV 630Wp + DEYE 20.000W 3-Fase + LiFePO4 20 kWh. Mega proyek, industrial complex.",
    specs: "33× Panel 630Wp | DEYE 20kW 3P | LiFePO4 20kWh",
    panelCount: 33,
    inverterKey: "deye20k3p",
    batteryKwh: 20,
    tier: "platinum",
    popular: false,
  },
];

// --- LocalStorage Keys ---

const LS_COMPONENT = "jmse_component_prices";
const LS_INVERTER = "jmse_inverter_prices";
const LS_SETTINGS = "jmse_pricing_settings";

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
  }
}

export function hasCustomPricing(): boolean {
  if (typeof window === "undefined") return false;
  return !!(localStorage.getItem(LS_COMPONENT) || localStorage.getItem(LS_INVERTER) || localStorage.getItem(LS_SETTINGS));
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
    c.panelPerUnit + c.mountingPerPanel + c.bosPerPanel + c.laborPerPanel;

  const batteryCostPerKwh = c.batteryPerKwh + c.laborBatteryPerKwh + c.bosBatteryPerKwh;

  const marginMultiplier = 1 + s.marginPct / 100;
  const ppnMultiplier = 1 + s.ppnPct / 100;

  return packageSpecs.map((pkg) => {
    const panelCost = pkg.panelCount * costPerPanel;
    const inverterCost = inv[pkg.inverterKey];
    const batteryCost = pkg.batteryKwh * batteryCostPerKwh;

    const hpp = panelCost + inverterCost + batteryCost;
    const subtotal = hpp * marginMultiplier;
    const ppn = subtotal * (s.ppnPct / 100);
    const price = Math.round(subtotal * ppnMultiplier / 100_000) * 100_000; // Bulatkan ke 100rb terdekat

    // Daily production
    const kWp = (pkg.panelCount * 630) / 1000;
    const dailyKwh = kWp * s.pshHours * s.efficiency;

    // Battery ratio
    const battRatio = pkg.batteryKwh > 0 ? (pkg.batteryKwh / dailyKwh) * 100 : 0;
    const batteryNote = pkg.batteryKwh > 0
      ? `Rasio baterai ${battRatio.toFixed(0)}% dari produksi harian — ${battRatio < 28 ? "optimal untuk backup beban esensial malam" : "cukup untuk backup operasional malam"}`
      : null;

    // Savings estimation (based on PLN average tariff ~Rp 1.500/kWh)
    const monthlySavingsLow = Math.round(dailyKwh * 0.5 * 30 * 1500 / 1_000_000 * 10) / 10; // 50% self-consumption
    const monthlySavingsHigh = Math.round(dailyKwh * 0.75 * 30 * 1500 / 1_000_000 * 10) / 10;

    const formatSavings = (val: number) => {
      if (val >= 1) return `${val.toFixed(val % 1 === 0 ? 0 : 1)}jt`;
      return `${Math.round(val * 1000)}rb`;
    };

    return {
      ...pkg,
      hpp,
      subtotal: Math.round(subtotal),
      ppn: Math.round(ppn),
      price,
      priceFormatted: formatRp(price),
      dailyProduction: `~${dailyKwh.toFixed(1)} kWh/hari`,
      savingsRange: `${formatSavings(monthlySavingsLow)} - ${formatSavings(monthlySavingsHigh)}/bulan`,
      batteryNote,
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
