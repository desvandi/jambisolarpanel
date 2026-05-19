/* ============================================================
   PRICING MODULE v4 — PT. Jaya Mandiri Smart Energy
   Shared pricing logic for ProductSection & Kalibrasi Harga

   Update: 18 Mei 2026
   - Brand: Inverter Powmr | Panel LONGi 650Wp | Baterai LiFePO4 48V 100Ah
   - Package naming: Paket kWp (replaces Silver/Gold/Platinum tier names)
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
     via inverter SBU/SUB/Mix priority settings
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
  powmr3k6: number;
  powmr6k: number;
  powmr8k: number;
  powmr10k: number;
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
  powmr3k6: 7_000_000,
  powmr6k: 12_000_000,
  powmr8k: 16_000_000,
  powmr10k: 18_000_000,
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
  powmr3k6: "PowMr Hybrid 3.600W",
  powmr6k: "PowMr Hybrid 6.000W",
  powmr8k: "PowMr Hybrid 8.000W",
  powmr10k: "PowMr Hybrid 10.000W",
  deye10k3p: "Deye Hybrid 10.000W 3-Fase",
  deye15k3p: "Deye Hybrid 15.000W 3-Fase",
  deye20k3p: "Deye Hybrid 20.000W 3-Fase",
};

// Inverter metadata for kalibrasi detail
export const inverterMeta: Record<keyof InverterPrices, { capacity: number; phase: string; type: string; brand: string }> = {
  powmr3k6: { capacity: 3.6, phase: "1-Fase", type: "Hybrid", brand: "PowMr" },
  powmr6k: { capacity: 6.0, phase: "1-Fase", type: "Hybrid", brand: "PowMr" },
  powmr8k: { capacity: 8.0, phase: "1-Fase", type: "Hybrid", brand: "PowMr" },
  powmr10k: { capacity: 10.0, phase: "1-Fase", type: "Hybrid", brand: "PowMr" },
  deye10k3p: { capacity: 10.0, phase: "3-Fase", type: "Hybrid", brand: "Deye" },
  deye15k3p: { capacity: 15.0, phase: "3-Fase", type: "Hybrid", brand: "Deye" },
  deye20k3p: { capacity: 20.0, phase: "3-Fase", type: "Hybrid", brand: "Deye" },
};

// --- Package Definitions (no bundled batteries) ---

// --- Package Name Migration Map (v3 tier-based → v4 Powmr-based) ---

export const packageNameMigration: Record<string, string> = {
  "Silver 1 kWp": "Paket 1.3 kWp",
  "Silver 2 kWp": "Paket 2.6 kWp",
  "Silver 3 kWp": "Paket 3.25 kWp",
  "Silver 5 kWp": "Paket 5.2 kWp",
  "Gold 6.5 kWp": "Paket 7.15 kWp",
  "Gold 10 kWp": "Paket 10.4 kWp",
  "Platinum 11 kWp": "Paket 11.7 kWp",
  "Platinum 20 kWp": "Paket 20.8 kWp",
};

export const packageSpecs: PackageSpec[] = [
  // ============================
  // Rumah Tangga (1 Fase)
  // ============================
  {
    name: "Paket 1.3 kWp",
    desc: "PowMr Hybrid 3.600W. Starter untuk rumah kecil: lampu LED, TV, charger HP, kipas angin.",
    specs: "Kapasitas 1.3 kWp | Inverter Hybrid 1 Fase",
    panelCount: 2,
    inverterKey: "powmr3k6",
    tier: "silver",
    popular: false,
  },
  {
    name: "Paket 2.6 kWp",
    desc: "PowMr Hybrid 3.600W. Rumah kecil-menengah: lampu, TV, kipas angin, kulkas kecil.",
    specs: "Kapasitas 2.6 kWp | Inverter Hybrid 1 Fase",
    panelCount: 4,
    inverterKey: "powmr3k6",
    tier: "silver",
    popular: false,
  },
  {
    name: "Paket 3.25 kWp",
    desc: "PowMr Hybrid 3.600W. Rumah menengah: AC 1 unit, kulkas, mesin cuci.",
    specs: "Kapasitas 3.25 kWp | Inverter Hybrid 1 Fase",
    panelCount: 5,
    inverterKey: "powmr3k6",
    tier: "silver",
    popular: false,
  },
  {
    name: "Paket 5.2 kWp",
    desc: "PowMr Hybrid 6.000W. Rumah keluarga besar: AC 2 unit, water heater, dispenser.",
    specs: "Kapasitas 5.2 kWp | Inverter Hybrid 1 Fase",
    panelCount: 8,
    inverterKey: "powmr6k",
    tier: "silver",
    popular: true,
  },

  // ============================
  // Bisnis & UMKM (1 Fase)
  // ============================
  {
    name: "Paket 7.15 kWp",
    desc: "PowMr Hybrid 8.000W. Toko, ruko, kantor kecil, cold storage mini, bengkel.",
    specs: "Kapasitas 7.15 kWp | Inverter Hybrid 1 Fase",
    panelCount: 11,
    inverterKey: "powmr8k",
    tier: "gold",
    popular: false,
  },
  {
    name: "Paket 10.4 kWp",
    desc: "PowMr Hybrid 10.000W. Gudang, restoran, hotel kecil, minimarket, clinic.",
    specs: "Kapasitas 10.4 kWp | Inverter Hybrid 1 Fase",
    panelCount: 16,
    inverterKey: "powmr10k",
    tier: "gold",
    popular: true,
  },

  // ============================
  // Industri (3 Fase)
  // ============================
  {
    name: "Paket 11.7 kWp",
    desc: "Deye 10.000W 3-Fase Hybrid. Pabrik menengah, processing plant, warehouse besar.",
    specs: "Kapasitas 11.7 kWp | Inverter Hybrid 3 Fase",
    panelCount: 18,
    inverterKey: "deye10k3p",
    tier: "platinum",
    popular: true,
  },
  {
    name: "Paket 20.8 kWp",
    desc: "Deye 20.000W 3-Fase Hybrid. Mega proyek, industrial complex, pabrik besar, hotel bintang 4.",
    specs: "Kapasitas 20.8 kWp | Inverter Hybrid 3 Fase",
    panelCount: 32,
    inverterKey: "deye20k3p",
    tier: "platinum",
    popular: false,
  },
];

// --- LocalStorage Keys (v4 — migrated from v2/v3) ---

const LS_COMPONENT = "jmse_v5_component_prices";
const LS_INVERTER = "jmse_v5_inverter_prices";
const LS_SETTINGS = "jmse_v5_pricing_settings";
const LS_VERSION = "jmse_pricing_version";
const CURRENT_VERSION = 5;

// Legacy keys for migration (clear on v5 — inverter key names changed)
const LEGACY_KEYS: Record<number, string[]> = {
  2: ["jmse_v2_component_prices", "jmse_v2_inverter_prices", "jmse_v2_pricing_settings"],
  3: ["jmse_v3_component_prices", "jmse_v3_inverter_prices", "jmse_v3_pricing_settings"],
  4: ["jmse_v4_component_prices", "jmse_v4_inverter_prices", "jmse_v4_pricing_settings"],
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
    for (let v = 4; v >= 2; v--) {
      const legacy = LEGACY_KEYS[v];
      if (!legacy) continue;

      // v4 inverter keys changed (deye3k6→powmr3k6, growatt10k→powmr10k, etc.)
      // Only migrate component prices and settings — use fresh inverter defaults
      if (v === 4) {
        const oldComponent = localStorage.getItem(legacy[0]);
        const oldSettings = localStorage.getItem(legacy[2]);
        if (oldComponent) localStorage.setItem(LS_COMPONENT, oldComponent);
        if (oldSettings) localStorage.setItem(LS_SETTINGS, oldSettings);
        console.log(`[JMSE] Migrated v${v} component/settings to v${CURRENT_VERSION} (inverter keys reset)`);
        break;
      }

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

/** Check if an object contains any NaN or non-finite numeric values */
function hasNaN(obj: Record<string, unknown>): boolean {
  return Object.values(obj).some((v) => typeof v === "number" && !isFinite(v));
}

export function saveComponentPrices(prices: ComponentPrices): void {
  if (typeof window !== "undefined") {
    if (hasNaN(prices as unknown as Record<string, unknown>)) {
      console.warn("[pricing] Skipping save: ComponentPrices contains NaN");
      return;
    }
    localStorage.setItem(LS_COMPONENT, JSON.stringify(prices));
  }
}

export function loadComponentPrices(): ComponentPrices {
  if (typeof window === "undefined") return { ...defaultComponentPrices };
  try {
    migrateLocalStorage();
    const raw = localStorage.getItem(LS_COMPONENT);
    if (!raw) return { ...defaultComponentPrices };
    const parsed = JSON.parse(raw);
    if (hasNaN(parsed as unknown as Record<string, unknown>)) {
      console.warn("[pricing] Corrupted component prices detected (NaN), using defaults");
      localStorage.removeItem(LS_COMPONENT);
      return { ...defaultComponentPrices };
    }
    return { ...defaultComponentPrices, ...parsed };
  } catch {
    return { ...defaultComponentPrices };
  }
}

export function saveInverterPrices(prices: InverterPrices): void {
  if (typeof window !== "undefined") {
    if (hasNaN(prices as unknown as Record<string, unknown>)) {
      console.warn("[pricing] Skipping save: InverterPrices contains NaN");
      return;
    }
    localStorage.setItem(LS_INVERTER, JSON.stringify(prices));
  }
}

export function loadInverterPrices(): InverterPrices {
  if (typeof window === "undefined") return { ...defaultInverterPrices };
  try {
    migrateLocalStorage();
    const raw = localStorage.getItem(LS_INVERTER);
    if (!raw) return { ...defaultInverterPrices };
    const parsed = JSON.parse(raw);
    if (hasNaN(parsed as unknown as Record<string, unknown>)) {
      console.warn("[pricing] Corrupted inverter prices detected (NaN), using defaults");
      localStorage.removeItem(LS_INVERTER);
      return { ...defaultInverterPrices };
    }
    return { ...defaultInverterPrices, ...parsed };
  } catch {
    return { ...defaultInverterPrices };
  }
}

export function saveSettings(settings: PricingSettings): void {
  if (typeof window !== "undefined") {
    if (hasNaN(settings as unknown as Record<string, unknown>)) {
      console.warn("[pricing] Skipping save: PricingSettings contains NaN");
      return;
    }
    localStorage.setItem(LS_SETTINGS, JSON.stringify(settings));
  }
}

export function loadSettings(): PricingSettings {
  if (typeof window === "undefined") return { ...defaultSettings };
  try {
    migrateLocalStorage();
    const raw = localStorage.getItem(LS_SETTINGS);
    if (!raw) return { ...defaultSettings };
    const parsed = JSON.parse(raw);
    if (hasNaN(parsed as unknown as Record<string, unknown>)) {
      console.warn("[pricing] Corrupted pricing settings detected (NaN), using defaults");
      localStorage.removeItem(LS_SETTINGS);
      return { ...defaultSettings };
    }
    return { ...defaultSettings, ...parsed };
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

    // Savings estimation — range based on PLN tariff classes (no self-consumption reduction)
    // Low: Rp1,352/kWh (R-1 900VA) | High: Rp1,444.7/kWh (R-1 1300VA+)
    const PLN_TARIFF_LOW = 1352;
    const monthlySavingsLow = Math.round(dailyKwh * 30 * PLN_TARIFF_LOW);
    const monthlySavingsHigh = Math.round(dailyKwh * 30 * PLN_TARIFF_DEFAULT);

    const formatSavings = (val: number) => {
      if (val >= 1_000_000) {
        const jt = Math.round(val / 100_000) / 10;
        return `Rp ${jt % 1 === 0 ? jt.toFixed(0) : jt.toFixed(1)}jt`;
      }
      return `Rp ${Math.round(val / 1000)}rb`;
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
    // supply beban via pengaturan SBU/SUB/Mix di inverter.
    const batteryUnitCost = batteryCostPerKwh * BATTERY_UNIT_KWH;
    const batteryUnitPrice = batteryCostPerKwh > 0
      ? Math.round((batteryUnitCost * addonMultiplier) / 100_000) * 100_000
      : 0;

    // Max battery = kWp × PSH, rounded UP to nearest 4.8 kWh unit
    const dailyProdRaw = kWp * s.pshHours; // kWp × PSH (tanpa efficiency)
    const maxUnits = Math.max(1, Math.ceil(dailyProdRaw / BATTERY_UNIT_KWH));
    const maxKwh = parseFloat((maxUnits * BATTERY_UNIT_KWH).toFixed(1));

    // Generate battery options: 1 unit → maxUnits
    const batteryOptions: BatteryOption[] = [];
    for (let i = 1; i <= maxUnits; i++) {
      const kwh = i * BATTERY_UNIT_KWH;
      const totalPrice = i * batteryUnitPrice;
      batteryOptions.push({
        kwh: parseFloat(kwh.toFixed(1)),
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
      savingsRange: `${formatSavings(monthlySavingsLow)} - ${formatSavings(monthlySavingsHigh)}/bulan`,
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

export const PLN_TARIFF_DEFAULT = 1444.7; // Rp/kWh (R-1 1300VA+, non-subsidi)
export const SELF_CONSUMPTION_DEFAULT = 1.0; // 100% — full production counted as savings
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
    // Skip packages with invalid kWp (e.g. from corrupted localStorage)
    if (!pkg.kWp || !isFinite(pkg.kWp) || pkg.kWp <= 0) continue;

    const productionKwh = pkg.kWp * defaultSettings.pshHours * defaultSettings.efficiency * 30;
    const pct = (productionKwh / monthlyKwh) * 100;

    // Score: distance from 80% coverage (sweet spot)
    let score: number;
    if (!isFinite(pct)) continue; // skip NaN/Infinity
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

// --- Remote Pricing (Google Sheets sync) ---

import {
  fetchRemotePricing,
  pushRemotePricing,
  type RemotePricingData,
} from "./pricing-api";

/** Convert remote flat data to typed ComponentPrices */
function remoteToComponentPrices(d: RemotePricingData): ComponentPrices {
  return {
    panelWattage: Number(d.panelWattage) || defaultComponentPrices.panelWattage,
    panelPerUnit: Number(d.panelPerUnit) || defaultComponentPrices.panelPerUnit,
    mountingPerPanel: Number(d.mountingPerPanel) || defaultComponentPrices.mountingPerPanel,
    carportPerKwp: Number(d.carportPerKwp) || defaultComponentPrices.carportPerKwp,
    bosPerPanel: Number(d.bosPerPanel) || defaultComponentPrices.bosPerPanel,
    spdGroundingPerSystem: Number(d.spdGroundingPerSystem) || defaultComponentPrices.spdGroundingPerSystem,
    laborPerPanel: Number(d.laborPerPanel) || defaultComponentPrices.laborPerPanel,
    laborInverterPerUnit: Number(d.laborInverterPerUnit) || defaultComponentPrices.laborInverterPerUnit,
    laborBatteryPerKwh: Number(d.laborBatteryPerKwh) || defaultComponentPrices.laborBatteryPerKwh,
    batteryPerKwh: Number(d.batteryPerKwh) || defaultComponentPrices.batteryPerKwh,
    bosBatteryPerKwh: Number(d.bosBatteryPerKwh) || defaultComponentPrices.bosBatteryPerKwh,
    surveyDesignFee: Number(d.surveyDesignFee) || defaultComponentPrices.surveyDesignFee,
    commissioningFee: Number(d.commissioningFee) || defaultComponentPrices.commissioningFee,
    logisticsPerPanel: Number(d.logisticsPerPanel) || defaultComponentPrices.logisticsPerPanel,
    monitoringBasic: Number(d.monitoringBasic) || defaultComponentPrices.monitoringBasic,
    monitoringStandard: Number(d.monitoringStandard) || defaultComponentPrices.monitoringStandard,
    monitoringIndustrial: Number(d.monitoringIndustrial) || defaultComponentPrices.monitoringIndustrial,
  };
}

/** Convert remote flat data to typed InverterPrices */
function remoteToInverterPrices(d: RemotePricingData): InverterPrices {
  return {
    powmr3k6: Number(d.powmr3k6) || defaultInverterPrices.powmr3k6,
    powmr6k: Number(d.powmr6k) || defaultInverterPrices.powmr6k,
    powmr8k: Number(d.powmr8k) || defaultInverterPrices.powmr8k,
    powmr10k: Number(d.powmr10k) || defaultInverterPrices.powmr10k,
    deye10k3p: Number(d.deye10k3p) || defaultInverterPrices.deye10k3p,
    deye15k3p: Number(d.deye15k3p) || defaultInverterPrices.deye15k3p,
    deye20k3p: Number(d.deye20k3p) || defaultInverterPrices.deye20k3p,
  };
}

/** Convert remote flat data to typed PricingSettings */
function remoteToSettings(d: RemotePricingData): PricingSettings {
  return {
    marginPct: Number(d.marginPct) || defaultSettings.marginPct,
    ppnPct: Number(d.ppnPct) || defaultSettings.ppnPct,
    pshHours: Number(d.pshHours) || defaultSettings.pshHours,
    efficiency: Number(d.efficiency) || defaultSettings.efficiency,
  };
}

/**
 * Fetch pricing from Google Sheets via API.
 * Returns { components, inverters, settings } or null if API not configured / fails.
 * Client-side only — must be called from useEffect or event handler.
 */
export async function loadRemotePricing(): Promise<{
  components: ComponentPrices;
  inverters: InverterPrices;
  settings: PricingSettings;
} | null> {
  try {
    const remote = await fetchRemotePricing();
    if (!remote) return null;

    return {
      components: remoteToComponentPrices(remote),
      inverters: remoteToInverterPrices(remote),
      settings: remoteToSettings(remote),
    };
  } catch {
    return null;
  }
}

/**
 * Push pricing to Google Sheets via API.
 * Client-side only — call from kalibrasi-harga "Simpan" handler.
 * Returns true on success.
 */
export async function saveRemotePricing(
  components: ComponentPrices,
  inverters: InverterPrices,
  settings: PricingSettings
): Promise<boolean> {
  const flat: Record<string, number> = {
    ...components,
    ...inverters,
    marginPct: settings.marginPct,
    ppnPct: settings.ppnPct,
    pshHours: settings.pshHours,
    efficiency: settings.efficiency,
  };
  return pushRemotePricing(flat);
}
