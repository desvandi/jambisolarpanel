/* ============================================================
   PRICING MODULE v4 — PT. Jaya Mandiri Smart Energy
   Shared pricing logic for ProductSection & Kalibrasi Harga

   Update: 18 Mei 2026
   - Brand: Inverter Powmr | Panel LONGi 650Wp | Baterai LiFePO4 48V 100Ah
   - Package naming: Powmr kWp (replaces Silver/Gold/Platinum tier names)
   - Battery moved to optional add-on (4.8 kWh units)
   - Battery sizing: kWp × PSH, rounded to nearest 4.8 kWh
   - Package structure: 1.3,2.6,3.25,5.2 / 7.15,10.4 / 11.7,20.8 kWp
   - Add-on support (Carport, Smart Monitoring, Battery)
   - PSH Jambi: 3.75 jam | Efficiency: 80%
   - Margin: 35% | PPN: 11%

   Battery Logic:
   - Unit size: 4.8 kWh LiFePO4 Battery Pack (48V 100Ah)
   - Recommended capacity = kWp × PSH (daily production without efficiency)
   - When battery is full & no PLN outage, solar directly supplies loads
     via Powmr inverter SBU/SUB/Mix priority settings
   ============================================================ */

// --- Types ---

export interface ComponentPrices {
  // Panel
  panelWattage: number;          // Wp per panel (e.g., LONGi 650Wp)
  panelPerUnit: number;          // Harga 1 panel

  // Mounting
  mountingPerPanel: number;      // Roof mounting per panel (bracket, baut, labor)
  carportPerKwp: number;         // Carport canopy per kWp (add-on)

  // BOS per panel
  bosPerPanel: number;           // Cables, MC4, connectors per panel

  // Proteksi per sistem — Tomzn MCCB AC, MCB DC PV-Inverter, SPD
  spdGroundingPerSystem: number; // SPD + grounding + Tomzn protection

  // Labor
  laborPerPanel: number;         // Panel installation labor per panel
  laborInverterPerUnit: number;  // Inverter installation labor per unit
  laborBatteryPerKwh: number;    // Battery installation & wiring per kWh

  // Battery
  batteryPerKwh: number;         // LiFePO4 48V 100Ah per kWh
  bosBatteryPerKwh: number;      // Battery BOS: Tomzn MCCB/AC/DC, cables, fuse per kWh

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
  tier: "silver" | "gold" | "platinum";
  popular: boolean;
}

export interface BatteryOption {
  kwh: number;           // e.g., 4.8, 9.6, 14.4
  unitCount: number;     // e.g., 1, 2, 3
  price: number;         // total price with margin + PPN
  priceFormatted: string;
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
  // Add-on prices (incl. margin & PPN)
  carportAddonPrice: number;
  monitoringBasicPrice: number;
  monitoringStandardPrice: number;
  monitoringIndustrialPrice: number;
  // Battery add-on
  batteryUnitKwh: number;
  batteryPricePerUnit: number;
  batteryPricePerUnitFormatted: string;
  batteryOptions: BatteryOption[];
  batteryMaxKwh: number;         // max selectable = kWp × PSH (rounded up to 4.8)
  batteryMaxUnits: number;       // max units
}

// --- Constants ---

export const BATTERY_UNIT_KWH = 4.8;

// --- Default Values (Acuan 2026) ---

export const defaultComponentPrices: ComponentPrices = {
  panelWattage: 650,
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
  deye3k6: "Powmr 3.600W Hybrid",
  deye6k: "Powmr 6.000W Hybrid",
  deye8k: "Powmr 8.000W Hybrid",
  growatt10k: "Powmr 10.000W Hybrid",
  deye10k3p: "Powmr 10.000W 3-Fase",
  deye15k3p: "Powmr 15.000W 3-Fase",
  deye20k3p: "Powmr 20.000W 3-Fase",
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

// --- Package Definitions (no bundled batteries) ---

// --- Package Name Migration Map (v3 tier-based → v4 Powmr-based) ---

export const packageNameMigration: Record<string, string> = {
  "Silver 1 kWp": "Powmr 1.3 kWp",
  "Silver 2 kWp": "Powmr 2.6 kWp",
  "Silver 3 kWp": "Powmr 3.25 kWp",
  "Silver 5 kWp": "Powmr 5.2 kWp",
  "Gold 6.5 kWp": "Powmr 7.15 kWp",
  "Gold 10 kWp": "Powmr 10.4 kWp",
  "Platinum 11 kWp": "Powmr 11.7 kWp",
  "Platinum 20 kWp": "Powmr 20.8 kWp",
};

export const packageSpecs: PackageSpec[] = [
  // ============================
  // Rumah Tangga (1 Fase)
  // ============================
  {
    name: "Powmr 1.3 kWp",
    desc: "2 panel LONGi 650Wp + Inverter Hybrid Powmr 3.600W. Starter untuk rumah kecil: lampu LED, TV, charger HP, kipas angin.",
    specs: "2× LONGi 650Wp | Powmr 3.6kW Hybrid",
    panelCount: 2,
    inverterKey: "deye3k6",
    tier: "silver",
    popular: false,
  },
  {
    name: "Powmr 2.6 kWp",
    desc: "4 panel LONGi 650Wp + Inverter Hybrid Powmr 3.600W. Rumah kecil-menengah: lampu, TV, kipas angin, kulkas kecil.",
    specs: "4× LONGi 650Wp | Powmr 3.6kW Hybrid",
    panelCount: 4,
    inverterKey: "deye3k6",
    tier: "silver",
    popular: false,
  },
  {
    name: "Powmr 3.25 kWp",
    desc: "5 panel LONGi 650Wp + Inverter Hybrid Powmr 3.600W. Rumah menengah: AC 1 unit, kulkas, mesin cuci.",
    specs: "5× LONGi 650Wp | Powmr 3.6kW Hybrid",
    panelCount: 5,
    inverterKey: "deye3k6",
    tier: "silver",
    popular: false,
  },
  {
    name: "Powmr 5.2 kWp",
    desc: "8 panel LONGi 650Wp + Inverter Hybrid Powmr 6.000W. Rumah keluarga besar: AC 2 unit, water heater, dispenser.",
    specs: "8× LONGi 650Wp | Powmr 6kW Hybrid",
    panelCount: 8,
    inverterKey: "deye6k",
    tier: "silver",
    popular: true,
  },

  // ============================
  // Bisnis & UMKM (1 Fase)
  // ============================
  {
    name: "Powmr 7.15 kWp",
    desc: "11 panel LONGi 650Wp + Inverter Hybrid Powmr 8.000W. Toko, ruko, kantor kecil, cold storage mini, bengkel.",
    specs: "11× LONGi 650Wp | Powmr 8kW Hybrid",
    panelCount: 11,
    inverterKey: "deye8k",
    tier: "gold",
    popular: false,
  },
  {
    name: "Powmr 10.4 kWp",
    desc: "16 panel LONGi 650Wp + Inverter Hybrid Powmr 10.000W. Gudang, restoran, hotel kecil, minimarket, clinic.",
    specs: "16× LONGi 650Wp | Powmr 10kW Hybrid",
    panelCount: 16,
    inverterKey: "growatt10k",
    tier: "gold",
    popular: true,
  },

  // ============================
  // Industri (3 Fase)
  // ============================
  {
    name: "Powmr 11.7 kWp",
    desc: "18 panel LONGi 650Wp + Powmr 10.000W 3-Fase Hybrid. Pabrik menengah, processing plant, warehouse besar.",
    specs: "18× LONGi 650Wp | Powmr 10kW 3-Fase",
    panelCount: 18,
    inverterKey: "deye10k3p",
    tier: "platinum",
    popular: true,
  },
  {
    name: "Powmr 20.8 kWp",
    desc: "32 panel LONGi 650Wp + Powmr 20.000W 3-Fase Hybrid. Mega proyek, industrial complex, pabrik besar, hotel bintang 4.",
    specs: "32× LONGi 650Wp | Powmr 20kW 3-Fase",
    panelCount: 32,
    inverterKey: "deye20k3p",
    tier: "platinum",
    popular: false,
  },
];

// --- LocalStorage Keys (v4 — migrated from v2/v3) ---

const LS_COMPONENT = "jmse_v4_component_prices";
const LS_INVERTER = "jmse_v4_inverter_prices";
const LS_SETTINGS = "jmse_v4_pricing_settings";
const LS_VERSION = "jmse_pricing_version";
const CURRENT_VERSION = 4;

// Legacy keys for migration
const LEGACY_KEYS: Record<number, string[]> = {
  2: ["jmse_v2_component_prices", "jmse_v2_inverter_prices", "jmse_v2_pricing_settings"],
  3: ["jmse_v3_component_prices", "jmse_v3_inverter_prices", "jmse_v3_pricing_settings"],
};

/**
 * Migrate localStorage data from older versions to current version.
 * Copies pricing data from legacy keys to new keys.
 */
function migrateLocalStorage(): void {
  if (typeof window === "undefined") return;
  try {
    const savedVersion = parseInt(localStorage.getItem(LS_VERSION) || "0", 10);
    if (savedVersion >= CURRENT_VERSION) return;

    // Try migrating from legacy versions (highest first)
    for (let v = 3; v >= 2; v--) {
      const legacy = LEGACY_KEYS[v];
      if (!legacy) continue;

      const oldComponent = localStorage.getItem(legacy[0]);
      if (oldComponent) {
        localStorage.setItem(LS_COMPONENT, oldComponent);
        localStorage.setItem(LS_INVERTER, localStorage.getItem(legacy[1]) || "{}");
        localStorage.setItem(LS_SETTINGS, localStorage.getItem(legacy[2]) || "{}");
        console.log(`[JMSE] Migrated pricing data from v${v} to v${CURRENT_VERSION}`);
        break;
      }
    }

    // Also clear v1 keys for cleanup
    localStorage.removeItem("jmse_component_prices");
    localStorage.removeItem("jmse_inverter_prices");
    localStorage.removeItem("jmse_pricing_settings");

    localStorage.setItem(LS_VERSION, String(CURRENT_VERSION));
  } catch {
    // Silent fail — will use defaults
  }
}

// --- LocalStorage Helpers ---

export function saveComponentPrices(prices: ComponentPrices): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(LS_COMPONENT, JSON.stringify(prices));
  }
}

export function loadComponentPrices(): ComponentPrices {
  if (typeof window === "undefined") return { ...defaultComponentPrices };
  try {
    migrateLocalStorage();
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
    migrateLocalStorage();
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
    migrateLocalStorage();
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
  migrateLocalStorage();
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
  const addonMultiplier = marginMultiplier * ppnMultiplier;

  return packageSpecs.map((pkg) => {
    const panelCost = pkg.panelCount * costPerPanel;
    const inverterCost = inv[pkg.inverterKey];
    const inverterLaborCost = c.laborInverterPerUnit;
    const kWp = (pkg.panelCount * c.panelWattage) / 1000;

    // No bundled battery cost
    const hpp = panelCost + inverterCost + inverterLaborCost + fixedPerSystem;
    const subtotal = Math.round(hpp * marginMultiplier);
    const ppn = Math.round(subtotal * (s.ppnPct / 100));
    const price = Math.round(subtotal * ppnMultiplier / 100_000) * 100_000;

    // Daily production
    const dailyKwh = kWp * s.pshHours * s.efficiency;

    // Savings estimation (based on PLN average tariff ~Rp 1.500/kWh)
    const monthlySavingsLow =
      Math.round((dailyKwh * 0.5 * 30 * 1500) / 1_000_000 * 10) / 10;
    const monthlySavingsHigh =
      Math.round((dailyKwh * 0.75 * 30 * 1500) / 1_000_000 * 10) / 10;

    // Ensure no floating-point artifacts (e.g. 3.90000000001)
    const cleanSavingsLow = Math.round(monthlySavingsLow * 10) / 10;
    const cleanSavingsHigh = Math.round(monthlySavingsHigh * 10) / 10;

    const formatSavings = (val: number) => {
      const clean = Math.round(val * 10) / 10;
      if (clean >= 1) return `${clean.toFixed(clean % 1 === 0 ? 0 : 1)}jt`;
      return `${Math.round(clean * 1000)}rb`;
    };

    // Add-on prices (with margin & PPN)
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

    // Battery add-on calculation (4.8 kWh units)
    // MAKS kapasitas = kWp × PSH (kelipatan 4.8 kWh)
    // Logic: saat baterai penuh & tidak ada pemadaman PLN, solar langsung
    // supply beban via pengaturan SBU/SUB/Mix di inverter Powmr.
    const batteryUnitCost = batteryCostPerKwh * BATTERY_UNIT_KWH;
    const batteryUnitPrice = batteryCostPerKwh > 0
      ? Math.round((batteryUnitCost * addonMultiplier) / 100_000) * 100_000
      : 0;

    // Max battery = kWp × PSH, rounded UP to nearest 4.8 kWh unit
    const dailyProdRaw = kWp * s.pshHours; // kWp × PSH (tanpa efficiency)
    const maxUnits = Math.max(1, Math.ceil(dailyProdRaw / BATTERY_UNIT_KWH));
    const maxKwh = maxUnits * BATTERY_UNIT_KWH;

    // Generate battery options: 1 unit → maxUnits
    const batteryOptions: BatteryOption[] = [];
    for (let i = 1; i <= maxUnits; i++) {
      const kwh = i * BATTERY_UNIT_KWH;
      const totalPrice = i * batteryUnitPrice;
      batteryOptions.push({
        kwh,
        unitCount: i,
        price: totalPrice,
        priceFormatted: formatRp(totalPrice),
      });
    }

    return {
      ...pkg,
      hpp,
      subtotal,
      ppn,
      price,
      priceFormatted: formatRp(price),
      kWp,
      dailyProduction: `~${roundTo(dailyKwh, 1).toFixed(1)} kWh/hari`,
      savingsRange: `${formatSavings(cleanSavingsLow)} - ${formatSavings(cleanSavingsHigh)}/bulan`,
      carportAddonPrice: carportAddon,
      monitoringBasicPrice: monBasic,
      monitoringStandardPrice: monStd,
      monitoringIndustrialPrice: monInd,
      batteryUnitKwh: BATTERY_UNIT_KWH,
      batteryPricePerUnit: batteryUnitPrice,
      batteryPricePerUnitFormatted: formatRp(batteryUnitPrice),
      batteryOptions,
      batteryMaxKwh: maxKwh,
      batteryMaxUnits: maxUnits,
    };
  });
}

// --- ROI & Return Calculation ---

export const PLN_TARIFF_DEFAULT = 1500; // Rp/kWh (R-1 1300VA+)
export const SELF_CONSUMPTION_DEFAULT = 0.70; // 70% utilization (hybrid without battery)
export const PLN_INCREASE_RATE_DEFAULT = 0.06; // 6% per tahun

export interface ROIResult {
  roiYears: number;            // Simple ROI (flat tariff)
  roiYearsWithIncrease: number; // ROI dengan kenaikan PLN 6%/thn
  return25Year: number;         // Net profit 25 tahun (dengan kenaikan PLN)
  returnMultiplier: number;     // Total return 25thn / investasi
  annualSavingsBase: number;    // Hemat per tahun (tarif tetap)
  monthlySavingsBase: number;   // Hemat per bulan (tarif tetap)
}

export function calculateROI(
  price: number,
  dailyKwh: number,
  options?: {
    plnTariff?: number;
    selfConsumption?: number;
    plnIncreaseRate?: number;
  }
): ROIResult {
  const tariff = options?.plnTariff ?? PLN_TARIFF_DEFAULT;
  const selfCons = options?.selfConsumption ?? SELF_CONSUMPTION_DEFAULT;
  const increaseRate = options?.plnIncreaseRate ?? PLN_INCREASE_RATE_DEFAULT;

  const annualSavingsBase = Math.round(dailyKwh * 365 * tariff * selfCons);
  const monthlySavingsBase = Math.round(dailyKwh * 30 * tariff * selfCons);

  // Simple ROI (tarif tetap)
  const roiYears = annualSavingsBase > 0 ? price / annualSavingsBase : 99;

  // ROI dengan kenaikan PLN per tahun
  let cumIncrease = 0;
  let roiYearsWithIncrease = 30;
  if (annualSavingsBase > 0) {
    for (let y = 1; y <= 30; y++) {
      cumIncrease += annualSavingsBase * Math.pow(1 + increaseRate, y - 1);
      if (cumIncrease >= price) {
        roiYearsWithIncrease = y;
        break;
      }
    }
  }

  // Total return 25 tahun (dengan kenaikan PLN)
  let cum25 = 0;
  if (annualSavingsBase > 0) {
    for (let y = 0; y < 25; y++) {
      cum25 += annualSavingsBase * Math.pow(1 + increaseRate, y);
    }
  }
  const return25Year = Math.round(cum25 - price);
  const returnMultiplier = price > 0 ? cum25 / price : 0;

  return {
    roiYears: Math.round(roiYears * 10) / 10,
    roiYearsWithIncrease,
    return25Year,
    returnMultiplier: Math.round(returnMultiplier * 10) / 10,
    annualSavingsBase,
    monthlySavingsBase,
  };
}

export function recommendPackage(
  monthlyBillRp: number,
  packages: CalculatedPackage[],
  options?: { plnTariff?: number }
): CalculatedPackage | null {
  const tariff = options?.plnTariff ?? PLN_TARIFF_DEFAULT;
  const monthlyKwh = monthlyBillRp / tariff;

  let recommended: CalculatedPackage | null = null;
  let bestScore = Infinity;

  for (const pkg of packages) {
    const productionKwh = pkg.kWp * defaultSettings.pshHours * defaultSettings.efficiency * 30;
    const pct = (productionKwh / monthlyKwh) * 100;

    // Score: distance from 80% coverage (sweet spot)
    let score: number;
    if (pct < 50) {
      score = 1000 + (50 - pct);
    } else if (pct > 120) {
      score = pct - 120;
    } else {
      score = Math.abs(pct - 80);
    }

    if (score < bestScore) {
      bestScore = score;
      recommended = pkg;
    }
  }

  return recommended;
}

// --- Utility ---

/**
 * Round a number to a fixed number of decimal places.
 * Uses string-based rounding to avoid floating-point artifacts
 * (e.g. 14.399999999999999 → 14.4, not 14.399999999999999).
 */
export function roundTo(num: number, decimals: number = 1): number {
  const factor = Math.pow(10, decimals);
  return Math.round(num * factor) / factor;
}

export function formatRp(num: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
}

/** Short Rupiah format: Rp 1.5jt, Rp 300rb */
export function formatRpShort(num: number): string {
  if (num >= 1_000_000) {
    const jt = roundTo(num / 1_000_000, 1);
    return `Rp ${jt % 1 === 0 ? jt.toFixed(0) : jt.toFixed(1)}jt`;
  }
  return `Rp ${Math.round(num / 1000)}rb`;
}

export function parseRpToNumber(str: string): number {
  return parseInt(str.replace(/\D/g, ""), 10) || 0;
}
