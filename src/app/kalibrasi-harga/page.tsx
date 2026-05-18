"use client";

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import {
  type ComponentPrices,
  type InverterPrices,
  type PricingSettings,
  type CalculatedPackage,
  defaultComponentPrices,
  defaultInverterPrices,
  defaultSettings,
  calculatePackages,
  formatRp,
  parseRpToNumber,
  inverterDisplayNames,
  inverterMeta,
  saveComponentPrices,
  saveInverterPrices,
  saveSettings,
  clearAllPricing,
  packageSpecs,
} from "@/lib/pricing";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Save,
  RotateCcw,
  Calculator,
  Sun,
  Battery,
  Zap,
  Wrench,
  DollarSign,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  ArrowLeft,
  TrendingUp,
  Package,
  Shield,
  HardHat,
  Monitor,
  Settings,
} from "lucide-react";

// --- Detailed State Types ---

interface PanelDetail {
  brand: string;
  cellType: string;
  wattage: number;
  pricePerPanel: number;
  warrantyPerformance: number;
  warrantyProduct: number;
}

interface MountingDetail {
  material: string;
  bracketPerPanel: number;
  hardwarePerPanel: number;
  laborPerPanel: number;
  carportPerKwp: number;
}

interface InverterDetailItem {
  brand: string;
  model: string;
  capacity: number;
  phase: string;
  type: string;
  price: number;
  warranty: number;
}

type InverterDetailMap = Record<keyof InverterPrices, InverterDetailItem>;

interface BatteryDetail {
  brand: string;
  type: string;
  capacityPerUnit: number;
  dod: number;
  pricePerKwh: number;
  laborPerKwh: number;
  bosPerKwh: number;
  warrantyCycles: number;
  warrantyYears: number;
}

interface BOSDetail {
  solarCablePerM: number;
  acCablePerM: number;
  mc4PerPair: number;
  dcBreakerPerUnit: number;
  acBreakerPerUnit: number;
  avgCableLenPerPanel: number;
  spd: number;
  grounding: number;
  lightningArrester: number;
}

interface ServicesDetail {
  laborPanel: number;
  laborInverter: number;
  surveyFee: number;
  designFee: number;
  commissioningFee: number;
  logisticsPerPanel: number;
}

interface MonitoringDetail {
  basic: { description: string; price: number };
  standard: { description: string; price: number };
  industrial: { description: string; price: number };
}

interface SettingsDetail {
  psh: number;
  efficiency: number;
  margin: number;
  ppn: number;
}

interface DetailedState {
  panel: PanelDetail;
  mounting: MountingDetail;
  inverters: InverterDetailMap;
  battery: BatteryDetail;
  bos: BOSDetail;
  services: ServicesDetail;
  monitoring: MonitoringDetail;
  settings: SettingsDetail;
}

// --- Default Detailed State ---

function getBrandFromKey(key: string): string {
  if (key.startsWith("growatt")) return "GROWATT";
  if (key.startsWith("deye")) return "DEYE";
  return "OTHER";
}

const defaultDetailedState: DetailedState = {
  panel: {
    brand: "Tier-1 (LONGi/Trina/JA)",
    cellType: "Mono PERC",
    wattage: 630,
    pricePerPanel: 2_500_000,
    warrantyPerformance: 25,
    warrantyProduct: 12,
  },
  mounting: {
    material: "Aluminium",
    bracketPerPanel: 200_000,
    hardwarePerPanel: 100_000,
    laborPerPanel: 100_000,
    carportPerKwp: 5_000_000,
  },
  inverters: (Object.keys(inverterMeta) as (keyof InverterPrices)[]).reduce(
    (acc, key) => {
      const meta = inverterMeta[key];
      acc[key] = {
        brand: getBrandFromKey(key),
        model: inverterDisplayNames[key],
        capacity: meta.capacity,
        phase: meta.phase,
        type: meta.type,
        price: defaultInverterPrices[key],
        warranty: 5,
      };
      return acc;
    },
    {} as InverterDetailMap
  ),
  battery: {
    brand: "LiFePO4 (PYLON/BYD)",
    type: "LiFePO4",
    capacityPerUnit: 5,
    dod: 80,
    pricePerKwh: 2_000_000,
    laborPerKwh: 250_000,
    bosPerKwh: 350_000,
    warrantyCycles: 6000,
    warrantyYears: 10,
  },
  bos: {
    solarCablePerM: 25_000,
    acCablePerM: 15_000,
    mc4PerPair: 15_000,
    dcBreakerPerUnit: 150_000,
    acBreakerPerUnit: 85_000,
    avgCableLenPerPanel: 5,
    spd: 500_000,
    grounding: 750_000,
    lightningArrester: 250_000,
  },
  services: {
    laborPanel: 600_000,
    laborInverter: 1_500_000,
    surveyFee: 750_000,
    designFee: 750_000,
    commissioningFee: 1_000_000,
    logisticsPerPanel: 200_000,
  },
  monitoring: {
    basic: {
      description: "WiFi monitoring app, real-time production data",
      price: 3_000_000,
    },
    standard: {
      description: "WiFi + 4G, cloud dashboard, email alerts",
      price: 8_000_000,
    },
    industrial: {
      description: "Full SCADA, multi-site, API integration, alarm system",
      price: 25_000_000,
    },
  },
  settings: {
    psh: 3.75,
    efficiency: 80,
    margin: 35,
    ppn: 11,
  },
};

// --- localStorage helpers for detailed state ---

const LS_DETAILED = "jmse_v2_detailed";

function saveDetailedState(state: DetailedState): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(LS_DETAILED, JSON.stringify(state));
  }
}

function loadDetailedState(): DetailedState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(LS_DETAILED);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as DetailedState;
    // Merge with defaults to handle missing keys from older saves
    return {
      ...defaultDetailedState,
      ...parsed,
      inverters: {
        ...defaultDetailedState.inverters,
        ...parsed.inverters,
      },
      monitoring: {
        basic: { ...defaultDetailedState.monitoring.basic, ...parsed.monitoring?.basic },
        standard: { ...defaultDetailedState.monitoring.standard, ...parsed.monitoring?.standard },
        industrial: { ...defaultDetailedState.monitoring.industrial, ...parsed.monitoring?.industrial },
      },
    };
  } catch {
    return null;
  }
}

// --- Computation: Detailed State → ComponentPrices + InverterPrices + Settings ---

function computeAggregated(d: DetailedState): {
  components: ComponentPrices;
  inverters: InverterPrices;
  settings: PricingSettings;
} {
  // Mounting per panel = bracket + hardware + labor
  const mountingPerPanel =
    d.mounting.bracketPerPanel + d.mounting.hardwarePerPanel + d.mounting.laborPerPanel;

  // BOS per panel = cable estimate + MC4 + DC breaker + AC breaker
  const bosPerPanel =
    d.bos.avgCableLenPerPanel * d.bos.solarCablePerM +
    d.bos.avgCableLenPerPanel * 0.5 * d.bos.acCablePerM +
    d.bos.mc4PerPair +
    d.bos.dcBreakerPerUnit +
    d.bos.acBreakerPerUnit;

  // Protection per system
  const spdGroundingPerSystem = d.bos.spd + d.bos.grounding + d.bos.lightningArrester;

  // Survey + Design combined
  const surveyDesignFee = d.services.surveyFee + d.services.designFee;

  const components: ComponentPrices = {
    panelWattage: d.panel.wattage,
    panelPerUnit: d.panel.pricePerPanel,
    mountingPerPanel,
    carportPerKwp: d.mounting.carportPerKwp,
    bosPerPanel,
    spdGroundingPerSystem,
    laborPerPanel: d.services.laborPanel,
    laborInverterPerUnit: d.services.laborInverter,
    laborBatteryPerKwh: d.battery.laborPerKwh,
    batteryPerKwh: d.battery.pricePerKwh,
    bosBatteryPerKwh: d.battery.bosPerKwh,
    surveyDesignFee,
    commissioningFee: d.services.commissioningFee,
    logisticsPerPanel: d.services.logisticsPerPanel,
    monitoringBasic: d.monitoring.basic.price,
    monitoringStandard: d.monitoring.standard.price,
    monitoringIndustrial: d.monitoring.industrial.price,
  };

  const inverters: InverterPrices = (Object.keys(d.inverters) as (keyof InverterPrices)[]).reduce(
    (acc, key) => {
      acc[key] = d.inverters[key].price;
      return acc;
    },
    {} as InverterPrices
  );

  const settings: PricingSettings = {
    marginPct: d.settings.margin,
    ppnPct: d.settings.ppn,
    pshHours: d.settings.psh,
    efficiency: d.settings.efficiency / 100,
  };

  return { components, inverters, settings };
}

// --- Helper Input Components ---

function RupiahInput({
  label,
  value,
  onChange,
  hint,
}: {
  label: string;
  value: number;
  onChange: (val: number) => void;
  hint?: string;
}) {
  const [display, setDisplay] = useState(formatRp(value));
  const focusedRef = useRef(false);

  // Sync dari parent value HANYA saat tidak fokus (biar user bisa mengetik dengan tenang)
  useEffect(() => {
    if (!focusedRef.current) {
      setDisplay(formatRp(value));
    }
  }, [value]);

  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium text-navy dark:text-white">
        {label}
      </Label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground font-medium">
          Rp
        </span>
        <Input
          type="text"
          inputMode="numeric"
          value={display}
          onFocus={() => { focusedRef.current = true; }}
          onChange={(e) => {
            const raw = e.target.value;
            setDisplay(raw);
            const num = parseRpToNumber(raw);
            if (!isNaN(num)) onChange(num);
          }}
          onBlur={() => {
            focusedRef.current = false;
            // Format hanya saat blur, biar user bisa mengetik dengan bebas saat fokus
            const num = parseRpToNumber(display);
            const finalNum = isNaN(num) ? value : num;
            setDisplay(formatRp(finalNum));
            onChange(finalNum);
          }}
          className="pl-10"
        />
      </div>
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

function PercentInput({
  label,
  value,
  onChange,
  hint,
  min = 0,
  max = 100,
}: {
  label: string;
  value: number;
  onChange: (val: number) => void;
  hint?: string;
  min?: number;
  max?: number;
}) {
  const [local, setLocal] = useState(String(value));
  const focusedRef = useRef(false);

  useEffect(() => {
    if (!focusedRef.current) setLocal(String(value));
  }, [value]);

  const clamp = (n: number) => Math.min(max, Math.max(min, Math.round(n)));

  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium text-navy dark:text-white">{label}</Label>
      <div className="relative">
        <Input
          type="number"
          inputMode="numeric"
          value={local}
          onFocus={() => { focusedRef.current = true; }}
          onChange={(e) => {
            setLocal(e.target.value);
            const parsed = parseFloat(e.target.value);
            if (!isNaN(parsed)) onChange(clamp(parsed));
          }}
          onBlur={() => {
            focusedRef.current = false;
            const parsed = parseFloat(local);
            if (isNaN(parsed)) {
              setLocal(String(value));
            } else {
              const clamped = clamp(parsed);
              setLocal(String(clamped));
              onChange(clamped);
            }
          }}
          min={min}
          max={max}
          step={1}
          className="pr-8"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
          %
        </span>
      </div>
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

function NumberInput({
  label,
  value,
  onChange,
  hint,
  suffix,
  min = 0,
  max = 10,
  step = 0.25,
}: {
  label: string;
  value: number;
  onChange: (val: number) => void;
  hint?: string;
  suffix?: string;
  min?: number;
  max?: number;
  step?: number;
}) {
  const [local, setLocal] = useState(String(value));
  const focusedRef = useRef(false);

  // Sync dari parent HANYA saat tidak fokus
  useEffect(() => {
    if (!focusedRef.current) setLocal(String(value));
  }, [value]);

  const clamp = (n: number) => Math.min(max, Math.max(min, n));

  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium text-navy dark:text-white">{label}</Label>
      <div className="relative">
        <Input
          type="number"
          inputMode="decimal"
          value={local}
          onFocus={() => { focusedRef.current = true; }}
          onChange={(e) => {
            setLocal(e.target.value);
            const parsed = parseFloat(e.target.value);
            if (!isNaN(parsed)) onChange(clamp(parsed));
            // Jika NaN (field kosong), jangan update parent — biarkan user mengetik dulu
          }}
          onBlur={() => {
            focusedRef.current = false;
            const parsed = parseFloat(local);
            if (isNaN(parsed)) {
              // Field kosong → kembalikan ke value parent
              setLocal(String(value));
            } else {
              const clamped = clamp(parsed);
              setLocal(String(clamped));
              onChange(clamped);
            }
          }}
          min={min}
          max={max}
          step={step}
          className={suffix ? "pr-16" : ""}
        />
        {suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground whitespace-nowrap">
            {suffix}
          </span>
        )}
      </div>
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

function TextInput({
  label,
  value,
  onChange,
  hint,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  hint?: string;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium text-navy dark:text-white">{label}</Label>
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

// --- Computed Display Value ---

function DisplayValue({
  label,
  value,
  prefix = "Rp",
  suffix,
}: {
  label: string;
  value: number | string;
  prefix?: string;
  suffix?: string;
}) {
  const display =
    typeof value === "number" ? formatRp(value) : value;
  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/60 border border-dashed">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <span className="text-sm font-bold text-navy dark:text-white">
        {prefix} {display}
        {suffix && <span className="ml-1 text-xs text-muted-foreground">{suffix}</span>}
      </span>
    </div>
  );
}

// --- Section Header ---

function SectionHeader({
  icon: Icon,
  title,
  color = "text-solar",
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  color?: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <Icon className={`w-4 h-4 ${color}`} />
      <h3 className="text-sm font-bold text-navy dark:text-white">{title}</h3>
    </div>
  );
}

// --- Inverter Tab: Table Row ---

function InverterRow({
  label,
  detail,
  onChange,
}: {
  label: string;
  detail: InverterDetailItem;
  onChange: (updated: InverterDetailItem) => void;
}) {
  return (
    <div className="p-4 rounded-xl bg-card border space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap className="w-3.5 h-3.5 text-solar" />
          <p className="text-sm font-bold text-navy dark:text-white">{label}</p>
        </div>
        <div className="flex gap-1.5">
          <Badge variant="outline" className="text-[10px] px-1.5 py-0">
            {detail.phase}
          </Badge>
          <Badge variant="outline" className="text-[10px] px-1.5 py-0">
            {detail.type}
          </Badge>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <TextInput
          label="Brand"
          value={detail.brand}
          onChange={(v) => onChange({ ...detail, brand: v })}
        />
        <TextInput
          label="Model"
          value={detail.model}
          onChange={(v) => onChange({ ...detail, model: v })}
        />
        <NumberInput
          label="Kapasitas"
          value={detail.capacity}
          onChange={(v) => onChange({ ...detail, capacity: v })}
          suffix="kW"
          min={0}
          max={50}
          step={0.1}
        />
        <NumberInput
          label="Garansi"
          value={detail.warranty}
          onChange={(v) => onChange({ ...detail, warranty: v })}
          suffix="tahun"
          min={0}
          max={20}
          step={1}
        />
      </div>
      <RupiahInput
        label="Harga (HPP/Beli)"
        value={detail.price}
        onChange={(v) => onChange({ ...detail, price: v })}
      />
    </div>
  );
}

// --- Main Page Component ---

export default function KalibrasiHargaPage() {
  // Load detailed state from localStorage or use defaults
  const [detailed, setDetailed] = useState<DetailedState>(() => {
    const saved = loadDetailedState();
    return saved || { ...defaultDetailedState, inverters: { ...defaultDetailedState.inverters } };
  });
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [activeTab, setActiveTab] = useState("panel");

  // Compute aggregated values from detailed state
  const { components, inverters, settings } = useMemo(
    () => computeAggregated(detailed),
    [detailed]
  );

  // Compute results using the shared calculation function
  const results = useMemo(
    () => calculatePackages(components, inverters, settings),
    [components, inverters, settings]
  );

  // Computed display values
  const computedMountingPerPanel =
    detailed.mounting.bracketPerPanel +
    detailed.mounting.hardwarePerPanel +
    detailed.mounting.laborPerPanel;

  const computedBOSPerPanel =
    detailed.bos.avgCableLenPerPanel * detailed.bos.solarCablePerM +
    detailed.bos.avgCableLenPerPanel * 0.5 * detailed.bos.acCablePerM +
    detailed.bos.mc4PerPair +
    detailed.bos.dcBreakerPerUnit;

  const computedProtectionPerSystem =
    detailed.bos.spd + detailed.bos.grounding + detailed.bos.lightningArrester;

  const computedSurveyDesign =
    detailed.services.surveyFee + detailed.services.designFee;

  // Save handler
  const handleSave = useCallback(() => {
    saveDetailedState(detailed);
    saveComponentPrices(components);
    saveInverterPrices(inverters);
    saveSettings(settings);
    window.dispatchEvent(new Event("jmse-pricing-updated"));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }, [detailed, components, inverters, settings]);

  // Reset handler
  const handleReset = useCallback(() => {
    const fresh = {
      ...defaultDetailedState,
      inverters: { ...defaultDetailedState.inverters },
      monitoring: {
        basic: { ...defaultDetailedState.monitoring.basic },
        standard: { ...defaultDetailedState.monitoring.standard },
        industrial: { ...defaultDetailedState.monitoring.industrial },
      },
    };
    setDetailed(fresh);
    clearAllPricing();
    if (typeof window !== "undefined") {
      localStorage.removeItem(LS_DETAILED);
    }
    setSaved(false);
  }, []);

  // Export JSON
  const handleCopyJSON = useCallback(() => {
    const agg = computeAggregated(detailed);
    const exportData = {
      detailed,
      aggregated: agg,
      calculatedResults: results.map((r) => ({
        name: r.name,
        hpp: r.hpp,
        ppn: r.ppn,
        price: r.price,
        priceFormatted: r.priceFormatted,
        dailyProduction: r.dailyProduction,
        savingsRange: r.savingsRange,
      })),
      calculatedAt: new Date().toISOString(),
    };
    navigator.clipboard.writeText(JSON.stringify(exportData, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [detailed, results]);

  // Export formatted price list
  const handleGenerateCode = useCallback(() => {
    const lines: string[] = [];
    lines.push(
      `Daftar Harga PLTS — PT. Jaya Mandiri Smart Energy`
    );
    lines.push(
      `Generated: ${new Date().toLocaleString("id-ID")}`
    );
    lines.push(
      `PSH: ${settings.pshHours}h | Efficiency: ${(settings.efficiency * 100).toFixed(0)}% | Margin: ${settings.marginPct}% | PPN: ${settings.ppnPct}%`
    );
    lines.push("");
    results.forEach((pkg) => {
      lines.push(`${pkg.name}`);
      lines.push(`  Harga Jual: ${pkg.priceFormatted}`);
      lines.push(`  HPP: ${formatRp(pkg.hpp)} | PPN: ${formatRp(pkg.ppn)}`);
      lines.push(`  Produksi: ${pkg.dailyProduction} | Hemat: ${pkg.savingsRange}`);
      lines.push(`  ${pkg.specs}`);
      if (pkg.batteryNote) lines.push(`  ⚡ ${pkg.batteryNote}`);
      lines.push("");
    });
    navigator.clipboard.writeText(lines.join("\n"));
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 3000);
  }, [results, settings]);

  // Update helpers
  const updatePanel = <K extends keyof PanelDetail>(key: K, val: PanelDetail[K]) => {
    setDetailed((prev) => ({
      ...prev,
      panel: { ...prev.panel, [key]: val },
    }));
    setSaved(false);
  };

  const updateMounting = <K extends keyof MountingDetail>(key: K, val: MountingDetail[K]) => {
    setDetailed((prev) => ({
      ...prev,
      mounting: { ...prev.mounting, [key]: val },
    }));
    setSaved(false);
  };

  const updateInverter = (key: keyof InverterPrices, updated: InverterDetailItem) => {
    setDetailed((prev) => ({
      ...prev,
      inverters: { ...prev.inverters, [key]: updated },
    }));
    setSaved(false);
  };

  const updateBattery = <K extends keyof BatteryDetail>(key: K, val: BatteryDetail[K]) => {
    setDetailed((prev) => ({
      ...prev,
      battery: { ...prev.battery, [key]: val },
    }));
    setSaved(false);
  };

  const updateBOS = <K extends keyof BOSDetail>(key: K, val: BOSDetail[K]) => {
    setDetailed((prev) => ({
      ...prev,
      bos: { ...prev.bos, [key]: val },
    }));
    setSaved(false);
  };

  const updateServices = <K extends keyof ServicesDetail>(key: K, val: ServicesDetail[K]) => {
    setDetailed((prev) => ({
      ...prev,
      services: { ...prev.services, [key]: val },
    }));
    setSaved(false);
  };

  const updateMonitoring = (
    level: "basic" | "standard" | "industrial",
    field: "description" | "price",
    val: string | number
  ) => {
    setDetailed((prev) => ({
      ...prev,
      monitoring: {
        ...prev.monitoring,
        [level]: { ...prev.monitoring[level], [field]: val },
      },
    }));
    setSaved(false);
  };

  const updateSettingsDetail = <K extends keyof SettingsDetail>(key: K, val: SettingsDetail[K]) => {
    setDetailed((prev) => ({
      ...prev,
      settings: { ...prev.settings, [key]: val },
    }));
    setSaved(false);
  };

  // Stats
  const totalHPP = results.reduce((sum, r) => sum + r.hpp, 0);
  const totalPpn = results.reduce((sum, r) => sum + r.ppn, 0);
  const avgMargin =
    results.length > 0
      ? (
          results.reduce((sum, r) => sum + (r.price - r.hpp - r.ppn), 0) /
          results.length /
          1_000_000
        ).toFixed(0) + "jt"
      : "0jt";

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-solar flex items-center justify-center">
                <Calculator className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-base font-bold text-navy dark:text-white">
                  Kalibrasi Harga
                </h1>
                <p className="text-xs text-muted-foreground hidden sm:block">
                  PT. Jaya Mandiri Smart Energy — Detail Admin
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {saved && (
                <Badge
                  variant="outline"
                  className="text-emerald-600 border-emerald-300 bg-emerald-50 gap-1 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800"
                >
                  <CheckCircle2 className="w-3 h-3" />
                  Tersimpan
                </Badge>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() => (window.location.href = "/")}
                className="gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Landing Page</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
                className="gap-1.5 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Reset</span>
              </Button>
              <Button
                size="sm"
                onClick={handleSave}
                className="gap-1.5 bg-solar hover:bg-solar-dark"
              >
                <Save className="w-3.5 h-3.5" />
                Simpan
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="p-4 rounded-xl bg-card border">
            <div className="flex items-center gap-2 mb-2">
              <Package className="w-4 h-4 text-solar" />
              <p className="text-xs font-medium text-muted-foreground">Total Paket</p>
            </div>
            <p className="text-2xl font-bold text-navy dark:text-white">{results.length}</p>
          </div>
          <div className="p-4 rounded-xl bg-card border">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-4 h-4 text-solar" />
              <p className="text-xs font-medium text-muted-foreground">Total HPP</p>
            </div>
            <p className="text-2xl font-bold text-navy dark:text-white">
              {(totalHPP / 1_000_000).toFixed(0)}jt
            </p>
          </div>
          <div className="p-4 rounded-xl bg-card border">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-gold" />
              <p className="text-xs font-medium text-muted-foreground">Avg Margin/Paket</p>
            </div>
            <p className="text-2xl font-bold text-navy dark:text-white">{avgMargin}</p>
          </div>
          <div className="p-4 rounded-xl bg-card border">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-amber-500" />
              <p className="text-xs font-medium text-muted-foreground">PSH Jambi</p>
            </div>
            <p className="text-2xl font-bold text-navy dark:text-white">
              {detailed.settings.psh} jam
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Input Tabs */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-4">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="w-full flex flex-wrap h-auto gap-1 bg-muted/50 p-1">
                <TabsTrigger value="panel" className="text-xs gap-1 flex-1 min-w-0">
                  <Sun className="w-3 h-3 hidden sm:block shrink-0" />
                  <span className="truncate">Panel</span>
                </TabsTrigger>
                <TabsTrigger value="mounting" className="text-xs gap-1 flex-1 min-w-0">
                  <Wrench className="w-3 h-3 hidden sm:block shrink-0" />
                  <span className="truncate">Mounting</span>
                </TabsTrigger>
                <TabsTrigger value="inverter" className="text-xs gap-1 flex-1 min-w-0">
                  <Zap className="w-3 h-3 hidden sm:block shrink-0" />
                  <span className="truncate">Inverter</span>
                </TabsTrigger>
                <TabsTrigger value="battery" className="text-xs gap-1 flex-1 min-w-0">
                  <Battery className="w-3 h-3 hidden sm:block shrink-0" />
                  <span className="truncate">Baterai</span>
                </TabsTrigger>
                <TabsTrigger value="bos" className="text-xs gap-1 flex-1 min-w-0">
                  <Shield className="w-3 h-3 hidden sm:block shrink-0" />
                  <span className="truncate">BOS</span>
                </TabsTrigger>
                <TabsTrigger value="services" className="text-xs gap-1 flex-1 min-w-0">
                  <HardHat className="w-3 h-3 hidden sm:block shrink-0" />
                  <span className="truncate">Jasa</span>
                </TabsTrigger>
                <TabsTrigger value="monitoring" className="text-xs gap-1 flex-1 min-w-0">
                  <Monitor className="w-3 h-3 hidden sm:block shrink-0" />
                  <span className="truncate">Monitor</span>
                </TabsTrigger>
                <TabsTrigger value="settings" className="text-xs gap-1 flex-1 min-w-0">
                  <Settings className="w-3 h-3 hidden sm:block shrink-0" />
                  <span className="truncate">Setting</span>
                </TabsTrigger>
              </TabsList>

              {/* ============ TAB 1: Panel Surya ============ */}
              <TabsContent value="panel" className="mt-4 space-y-4">
                <div className="p-4 rounded-xl bg-card border space-y-4">
                  <SectionHeader icon={Sun} title="Panel Surya" />

                  <TextInput
                    label="Brand / Merk"
                    value={detailed.panel.brand}
                    onChange={(v) => updatePanel("brand", v)}
                    hint="Merek panel surya yang digunakan"
                  />

                  <div className="space-y-1.5">
                    <Label className="text-sm font-medium text-navy dark:text-white">
                      Tipe Sel
                    </Label>
                    <Select
                      value={detailed.panel.cellType}
                      onValueChange={(v) => updatePanel("cellType", v)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih tipe sel" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Mono PERC">Mono PERC</SelectItem>
                        <SelectItem value="TOPCon">TOPCon</SelectItem>
                        <SelectItem value="HJT">HJT</SelectItem>
                        <SelectItem value="Mono PERC Dual">Mono PERC Dual</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      Teknologi sel surya (TOPCon lebih efisien untuk iklim tropis)
                    </p>
                  </div>

                  <NumberInput
                    label="Wattase per Panel"
                    value={detailed.panel.wattage}
                    onChange={(v) => updatePanel("wattage", v)}
                    suffix="Wp"
                    min={100}
                    max={800}
                    step={10}
                    hint="Kapasitas daya 1 lembar panel surya"
                  />

                  <RupiahInput
                    label="Harga per Panel"
                    value={detailed.panel.pricePerPanel}
                    onChange={(v) => updatePanel("pricePerPanel", v)}
                    hint="Harga beli 1 panel dari supplier (belum termasuk margin & pajak)"
                  />

                  <Separator />

                  <div className="grid grid-cols-2 gap-3">
                    <NumberInput
                      label="Garansi Performa"
                      value={detailed.panel.warrantyPerformance}
                      onChange={(v) => updatePanel("warrantyPerformance", v)}
                      suffix="tahun"
                      min={5}
                      max={30}
                      step={1}
                      hint="Jaminan output minimal (linear warranty)"
                    />
                    <NumberInput
                      label="Garansi Produk"
                      value={detailed.panel.warrantyProduct}
                      onChange={(v) => updatePanel("warrantyProduct", v)}
                      suffix="tahun"
                      min={5}
                      max={25}
                      step={1}
                      hint="Garansi bebas cacat produk"
                    />
                  </div>
                </div>
              </TabsContent>

              {/* ============ TAB 2: Mounting & Struktur ============ */}
              <TabsContent value="mounting" className="mt-4 space-y-4">
                <div className="p-4 rounded-xl bg-card border space-y-4">
                  <SectionHeader icon={Wrench} title="Mounting & Struktur" />

                  <div className="space-y-1.5">
                    <Label className="text-sm font-medium text-navy dark:text-white">
                      Material Mounting
                    </Label>
                    <Select
                      value={detailed.mounting.material}
                      onValueChange={(v) => updateMounting("material", v)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih material" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Aluminium">Aluminium</SelectItem>
                        <SelectItem value="Galvanis">Galvanis</SelectItem>
                        <SelectItem value="Stainless Steel">
                          Stainless Steel
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      Material rangka mounting (aluminium lebih ringan, tahan karat)
                    </p>
                  </div>

                  <RupiahInput
                    label="Bracket / Rangka per Panel"
                    value={detailed.mounting.bracketPerPanel}
                    onChange={(v) => updateMounting("bracketPerPanel", v)}
                    hint="Harga rangka aluminium + mid clamp + end clamp per panel"
                  />

                  <RupiahInput
                    label="Hardware per Panel"
                    value={detailed.mounting.hardwarePerPanel}
                    onChange={(v) => updateMounting("hardwarePerPanel", v)}
                    hint="Baut, dynabolt, sealant, dan aksesoris pemasangan per panel"
                  />

                  <RupiahInput
                    label="Labor Pasang Mounting per Panel"
                    value={detailed.mounting.laborPerPanel}
                    onChange={(v) => updateMounting("laborPerPanel", v)}
                    hint="Biaya tukang pasang rangka mounting per panel"
                  />

                  <DisplayValue
                    label="Total Mounting per Panel"
                    value={computedMountingPerPanel}
                  />

                  <Separator />

                  <SectionHeader
                    icon={Wrench}
                    title="Kanopi Carport (Add-on)"
                    color="text-gold"
                  />

                  <RupiahInput
                    label="Harga Kanopi Carport per kWp"
                    value={detailed.mounting.carportPerKwp}
                    onChange={(v) => updateMounting("carportPerKwp", v)}
                    hint="Acuan pasar 2026: Rp3.500.000 - Rp7.000.000/kWp"
                  />
                </div>
              </TabsContent>

              {/* ============ TAB 3: Inverter ============ */}
              <TabsContent value="inverter" className="mt-4 space-y-4">
                <div className="p-4 rounded-xl bg-card border space-y-3">
                  <SectionHeader icon={Zap} title="Inverter" />
                  <p className="text-xs text-muted-foreground">
                    Masukkan harga beli inverter dari supplier (belum termasuk margin &amp; pajak).
                    Semua model adalah Hybrid (on-grid + off-grid + baterai).
                  </p>
                </div>

                <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
                  {(Object.keys(inverterMeta) as (keyof InverterPrices)[]).map((key) => (
                    <InverterRow
                      key={key}
                      label={inverterDisplayNames[key]}
                      detail={detailed.inverters[key]}
                      onChange={(updated) => updateInverter(key, updated)}
                    />
                  ))}
                </div>
              </TabsContent>

              {/* ============ TAB 4: Baterai LiFePO4 ============ */}
              <TabsContent value="battery" className="mt-4 space-y-4">
                <div className="p-4 rounded-xl bg-card border space-y-4">
                  <SectionHeader icon={Battery} title="Baterai LiFePO4" color="text-gold" />

                  <TextInput
                    label="Brand"
                    value={detailed.battery.brand}
                    onChange={(v) => updateBattery("brand", v)}
                    hint="Merek baterai yang digunakan"
                  />

                  <TextInput
                    label="Tipe"
                    value={detailed.battery.type}
                    onChange={(v) => updateBattery("type", v)}
                    hint="Kimia baterai (LiFePO4 untuk keamanan & umur panjang)"
                  />

                  <NumberInput
                    label="Kapasitas Nominal per Unit"
                    value={detailed.battery.capacityPerUnit}
                    onChange={(v) => updateBattery("capacityPerUnit", v)}
                    suffix="kWh"
                    min={1}
                    max={50}
                    step={0.5}
                    hint="Kapasitas 1 modul baterai"
                  />

                  <NumberInput
                    label="DoD — Depth of Discharge"
                    value={detailed.battery.dod}
                    onChange={(v) => updateBattery("dod", v)}
                    suffix="%"
                    min={50}
                    max={100}
                    step={1}
                    hint="Persentase kapasitas yang boleh digunakan (LiFePO4: 80-90%)"
                  />

                  <Separator />

                  <RupiahInput
                    label="Harga per kWh"
                    value={detailed.battery.pricePerKwh}
                    onChange={(v) => updateBattery("pricePerKwh", v)}
                    hint="Harga beli baterai per kWh dari supplier"
                  />

                  <RupiahInput
                    label="Labor Integrasi per kWh"
                    value={detailed.battery.laborPerKwh}
                    onChange={(v) => updateBattery("laborPerKwh", v)}
                    hint="Biaya tenaga kerja pemasangan & wiring baterai per kWh"
                  />

                  <RupiahInput
                    label="BOS Baterai per kWh"
                    value={detailed.battery.bosPerKwh}
                    onChange={(v) => updateBattery("bosPerKwh", v)}
                    hint="Kabel baterai, fuse, protective device per kWh"
                  />

                  <DisplayValue
                    label="Total Biaya Baterai per kWh"
                    value={
                      detailed.battery.pricePerKwh +
                      detailed.battery.laborPerKwh +
                      detailed.battery.bosPerKwh
                    }
                  />

                  <Separator />

                  <div className="grid grid-cols-2 gap-3">
                    <NumberInput
                      label="Garansi Siklus"
                      value={detailed.battery.warrantyCycles}
                      onChange={(v) => updateBattery("warrantyCycles", v)}
                      suffix="siklus"
                      min={1000}
                      max={10000}
                      step={100}
                      hint="Jumlah siklus charge-discharge"
                    />
                    <NumberInput
                      label="Garansi Tahun"
                      value={detailed.battery.warrantyYears}
                      onChange={(v) => updateBattery("warrantyYears", v)}
                      suffix="tahun"
                      min={3}
                      max={15}
                      step={1}
                      hint="Garansi produk dalam tahun"
                    />
                  </div>
                </div>
              </TabsContent>

              {/* ============ TAB 5: BOS & Proteksi ============ */}
              <TabsContent value="bos" className="mt-4 space-y-4">
                <div className="p-4 rounded-xl bg-card border space-y-4">
                  <SectionHeader icon={Shield} title="BOS & Proteksi" color="text-orange-500" />

                  {/* BOS Components */}
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Balance of System
                  </p>

                  <RupiahInput
                    label="Kabel Solar per Meter"
                    value={detailed.bos.solarCablePerM}
                    onChange={(v) => updateBOS("solarCablePerM", v)}
                    hint="Kabel DC PV (4mm² / 6mm² UV resistant)"
                  />

                  <RupiahInput
                    label="Kabel AC per Meter"
                    value={detailed.bos.acCablePerM}
                    onChange={(v) => updateBOS("acCablePerM", v)}
                    hint="Kabel AC inverter ke panel MCB (NYA/NYM 2.5mm²)"
                  />

                  <div className="grid grid-cols-2 gap-3">
                    <RupiahInput
                      label="MC4 Connector per Pair"
                      value={detailed.bos.mc4PerPair}
                      onChange={(v) => updateBOS("mc4PerPair", v)}
                      hint="1 pasang male + female"
                    />
                    <RupiahInput
                      label="DC Breaker per Unit"
                      value={detailed.bos.dcBreakerPerUnit}
                      onChange={(v) => updateBOS("dcBreakerPerUnit", v)}
                      hint="PV string fuse / breaker"
                    />
                  </div>

                  <RupiahInput
                    label="AC Breaker per Unit"
                    value={detailed.bos.acBreakerPerUnit}
                    onChange={(v) => updateBOS("acBreakerPerUnit", v)}
                    hint="MCB di sisi AC inverter"
                  />

                  <NumberInput
                    label="Panjang Kabel rata-rata per Panel"
                    value={detailed.bos.avgCableLenPerPanel}
                    onChange={(v) => updateBOS("avgCableLenPerPanel", v)}
                    suffix="meter"
                    min={1}
                    max={20}
                    step={0.5}
                    hint="Estimasi panjang kabel DC dari panel ke combiner box"
                  />

                  <DisplayValue
                    label="Estimasi BOS per Panel"
                    value={computedBOSPerPanel}
                  />

                  <Separator />

                  {/* Protection */}
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Proteksi Sistem (per Instalasi)
                  </p>

                  <RupiahInput
                    label="SPD (Surge Protection Device)"
                    value={detailed.bos.spd}
                    onChange={(v) => updateBOS("spd", v)}
                    hint="Type 2 SPD DC + AC, melindungi dari sambaran surya"
                  />

                  <RupiahInput
                    label="Grounding System"
                    value={detailed.bos.grounding}
                    onChange={(v) => updateBOS("grounding", v)}
                    hint="Sistem pentanahan (rod, kabel, bonding) lump sum"
                  />

                  <RupiahInput
                    label="Lightning Arrester"
                    value={detailed.bos.lightningArrester}
                    onChange={(v) => updateBOS("lightningArrester", v)}
                    hint="Penangkal petir (ESE / franklin rod)"
                  />

                  <DisplayValue
                    label="Total Proteksi per Sistem"
                    value={computedProtectionPerSystem}
                  />
                </div>
              </TabsContent>

              {/* ============ TAB 6: Jasa & Instalasi ============ */}
              <TabsContent value="services" className="mt-4 space-y-4">
                <div className="p-4 rounded-xl bg-card border space-y-4">
                  <SectionHeader
                    icon={HardHat}
                    title="Jasa & Instalasi"
                    color="text-sky-600"
                  />

                  <RupiahInput
                    label="Labor Pasang Panel per Panel"
                    value={detailed.services.laborPanel}
                    onChange={(v) => updateServices("laborPanel", v)}
                    hint="Biaya tukang pasang panel surya + mounting per panel"
                  />

                  <RupiahInput
                    label="Labor Pasang Inverter per Unit"
                    value={detailed.services.laborInverter}
                    onChange={(v) => updateServices("laborInverter", v)}
                    hint="Biaya tukang pasang + wiring inverter per unit"
                  />

                  <Separator />

                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Biaya Profesional
                  </p>

                  <RupiahInput
                    label="Biaya Survei"
                    value={detailed.services.surveyFee}
                    onChange={(v) => updateServices("surveyFee", v)}
                    hint="Survei lokasi, pengukuran, analisis beban listrik (lump sum)"
                  />

                  <RupiahInput
                    label="Biaya Desain"
                    value={detailed.services.designFee}
                    onChange={(v) => updateServices("designFee", v)}
                    hint="Desain sistem single line diagram, layout panel (lump sum)"
                  />

                  <DisplayValue
                    label="Total Survei + Desain"
                    value={computedSurveyDesign}
                  />

                  <RupiahInput
                    label="Biaya Commissioning / Testing"
                    value={detailed.services.commissioningFee}
                    onChange={(v) => updateServices("commissioningFee", v)}
                    hint="Testing, commissioning, dan serah terima proyek (lump sum)"
                  />

                  <Separator />

                  <RupiahInput
                    label="Logistics / Pengiriman per Panel"
                    value={detailed.services.logisticsPerPanel}
                    onChange={(v) => updateServices("logisticsPerPanel", v)}
                    hint="Biaya pengiriman panel dari gudang ke lokasi proyek"
                  />
                </div>
              </TabsContent>

              {/* ============ TAB 7: Smart Monitoring ============ */}
              <TabsContent value="monitoring" className="mt-4 space-y-4">
                <div className="p-4 rounded-xl bg-card border space-y-3">
                  <SectionHeader
                    icon={Monitor}
                    title="Smart Monitoring (Add-on)"
                    color="text-violet-600"
                  />
                  <p className="text-xs text-muted-foreground">
                    Sistem monitoring produksi dan performa PLTS. Harga belum termasuk margin &amp;
                    PPN. Customer dapat memilih level monitoring saat konsultasi.
                  </p>
                </div>

                {/* Basic */}
                <div className="p-4 rounded-xl bg-card border space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Monitor className="w-4 h-4 text-emerald-500" />
                      <p className="text-sm font-bold text-navy dark:text-white">Basic</p>
                    </div>
                    <Badge
                      variant="outline"
                      className="text-[10px] bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800"
                    >
                      Starter
                    </Badge>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium text-muted-foreground">
                      Deskripsi
                    </Label>
                    <Textarea
                      value={detailed.monitoring.basic.description}
                      onChange={(e) =>
                        updateMonitoring("basic", "description", e.target.value)
                      }
                      className="text-sm min-h-[60px] resize-none"
                    />
                  </div>
                  <RupiahInput
                    label="Harga"
                    value={detailed.monitoring.basic.price}
                    onChange={(v) => updateMonitoring("basic", "price", v)}
                  />
                </div>

                {/* Standard */}
                <div className="p-4 rounded-xl bg-card border space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Monitor className="w-4 h-4 text-blue-500" />
                      <p className="text-sm font-bold text-navy dark:text-white">Standard</p>
                    </div>
                    <Badge
                      variant="outline"
                      className="text-[10px] bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800"
                    >
                      Bisnis
                    </Badge>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium text-muted-foreground">
                      Deskripsi
                    </Label>
                    <Textarea
                      value={detailed.monitoring.standard.description}
                      onChange={(e) =>
                        updateMonitoring("standard", "description", e.target.value)
                      }
                      className="text-sm min-h-[60px] resize-none"
                    />
                  </div>
                  <RupiahInput
                    label="Harga"
                    value={detailed.monitoring.standard.price}
                    onChange={(v) => updateMonitoring("standard", "price", v)}
                  />
                </div>

                {/* Industrial */}
                <div className="p-4 rounded-xl bg-card border space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Monitor className="w-4 h-4 text-violet-500" />
                      <p className="text-sm font-bold text-navy dark:text-white">
                        Industrial
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className="text-[10px] bg-violet-50 text-violet-600 border-violet-200 dark:bg-violet-900/20 dark:text-violet-400 dark:border-violet-800"
                    >
                      Enterprise
                    </Badge>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium text-muted-foreground">
                      Deskripsi
                    </Label>
                    <Textarea
                      value={detailed.monitoring.industrial.description}
                      onChange={(e) =>
                        updateMonitoring("industrial", "description", e.target.value)
                      }
                      className="text-sm min-h-[60px] resize-none"
                    />
                  </div>
                  <RupiahInput
                    label="Harga"
                    value={detailed.monitoring.industrial.price}
                    onChange={(v) => updateMonitoring("industrial", "price", v)}
                  />
                </div>
              </TabsContent>

              {/* ============ TAB 8: Pengaturan ============ */}
              <TabsContent value="settings" className="mt-4 space-y-4">
                <div className="p-4 rounded-xl bg-card border space-y-4">
                  <SectionHeader icon={Settings} title="Pengaturan Perhitungan" />

                  <NumberInput
                    label="PSH — Peak Sun Hours"
                    value={detailed.settings.psh}
                    onChange={(v) => updateSettingsDetail("psh", v)}
                    hint="Durasi matahari efektif di lokasi instalasi (Jambi: 3.75 jam)"
                    suffix="jam/hari"
                    min={2}
                    max={7}
                    step={0.25}
                  />

                  <NumberInput
                    label="Efisiensi Sistem"
                    value={detailed.settings.efficiency}
                    onChange={(v) => updateSettingsDetail("efficiency", v)}
                    hint="Faktor: inverter efficiency, cable loss, temperature, soiling"
                    suffix="%"
                    min={60}
                    max={95}
                    step={1}
                  />

                  <Separator />

                  <PercentInput
                    label="Profit Margin"
                    value={detailed.settings.margin}
                    onChange={(v) => updateSettingsDetail("margin", v)}
                    hint="Target margin keuntungan per proyek (umumnya 30-40%)"
                    min={10}
                    max={60}
                  />

                  <PercentInput
                    label="PPN (Pajak Pertambahan Nilai)"
                    value={detailed.settings.ppn}
                    onChange={(v) => updateSettingsDetail("ppn", v)}
                    hint="Sesuai regulasi perpajakan Indonesia (11%)"
                    min={0}
                    max={15}
                  />

                  <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/30">
                    <p className="text-xs text-amber-700 dark:text-amber-400 leading-relaxed">
                      <strong>PPh:</strong> Tidak menambah harga jual. PPh dipotong oleh pihak
                      pembeli (wajib pajak) sesuai ketentuan PPh 23 (jasa) atau PPh 4(2)
                      (konstruksi).
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            {/* Export Buttons */}
            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full gap-2"
                onClick={handleCopyJSON}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-500" />
                    Disalin ke Clipboard
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Salin Konfigurasi (JSON)
                  </>
                )}
              </Button>
              <Button
                className="w-full gap-2 bg-solar hover:bg-solar-dark text-white"
                onClick={handleGenerateCode}
              >
                {copiedCode ? (
                  <>
                    <Check className="w-4 h-4" />
                    Kode Berhasil Disalin!
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Generate &amp; Salin Harga ke Landing Page
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Right: Calculation Results Table */}
          <div className="lg:col-span-7 xl:col-span-8">
            <div className="rounded-xl border overflow-hidden">
              <div className="p-4 bg-card border-b flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-solar" />
                  <h3 className="text-sm font-bold text-navy dark:text-white">
                    Hasil Kalkulasi Harga Jual
                  </h3>
                </div>
                <Badge variant="outline" className="text-xs w-fit">
                  PPN {settings.ppnPct}% &amp; Margin {settings.marginPct}%
                </Badge>
              </div>

              {/* Mobile Cards */}
              <div className="block lg:hidden divide-y">
                {results.map((pkg) => (
                  <div key={pkg.name} className="p-4 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-bold text-navy dark:text-white">
                          {pkg.name}
                        </p>
                        {pkg.popular && (
                          <Badge className="mt-1 bg-gold text-navy text-[10px]">
                            POPULER
                          </Badge>
                        )}
                      </div>
                      <p className="text-lg font-extrabold text-solar whitespace-nowrap">
                        {pkg.priceFormatted}
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground">{pkg.specs}</p>
                    <div className="grid grid-cols-2 gap-2 text-center">
                      <div className="p-2 rounded-lg bg-muted/50">
                        <p className="text-[10px] text-muted-foreground">HPP</p>
                        <p className="text-xs font-semibold">{formatRp(pkg.hpp)}</p>
                      </div>
                      <div className="p-2 rounded-lg bg-muted/50">
                        <p className="text-[10px] text-muted-foreground">PPN</p>
                        <p className="text-xs font-semibold">{formatRp(pkg.ppn)}</p>
                      </div>
                      <div className="p-2 rounded-lg bg-muted/50">
                        <p className="text-[10px] text-muted-foreground">Produksi</p>
                        <p className="text-xs font-semibold">{pkg.dailyProduction}</p>
                      </div>
                      <div className="p-2 rounded-lg bg-muted/50">
                        <p className="text-[10px] text-muted-foreground">Hemat/bln</p>
                        <p className="text-xs font-semibold text-solar">
                          {pkg.savingsRange}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop Table */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted/50 text-left">
                      <th className="p-3 font-semibold text-navy dark:text-white text-xs">
                        Paket
                      </th>
                      <th className="p-3 font-semibold text-navy dark:text-white text-xs text-center">
                        Panel
                      </th>
                      <th className="p-3 font-semibold text-navy dark:text-white text-xs text-center">
                        Inverter
                      </th>
                      <th className="p-3 font-semibold text-navy dark:text-white text-xs text-center">
                        Baterai
                      </th>
                      <th className="p-3 font-semibold text-navy dark:text-white text-xs text-right">
                        HPP
                      </th>
                      <th className="p-3 font-semibold text-navy dark:text-white text-xs text-right">
                        PPN
                      </th>
                      <th className="p-3 font-semibold text-navy dark:text-white text-xs text-right">
                        <span className="bg-solar/10 text-solar px-2 py-0.5 rounded-full">
                          Harga Jual
                        </span>
                      </th>
                      <th className="p-3 font-semibold text-navy dark:text-white text-xs text-center">
                        Produksi
                      </th>
                      <th className="p-3 font-semibold text-navy dark:text-white text-xs text-center">
                        Hemat/bln
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {results.map((pkg) => (
                      <tr
                        key={pkg.name}
                        className={`hover:bg-muted/30 transition-colors ${
                          pkg.popular ? "bg-solar/5" : ""
                        }`}
                      >
                        <td className="p-3">
                          <div>
                            <p className="font-semibold text-navy dark:text-white text-xs">
                              {pkg.name}
                              {pkg.popular && (
                                <span className="ml-1.5 px-1.5 py-0.5 text-[9px] font-bold bg-gold text-navy rounded">
                                  POPULER
                                </span>
                              )}
                            </p>
                          </div>
                        </td>
                        <td className="p-3 text-center text-xs">{pkg.panelCount}×</td>
                        <td className="p-3 text-center text-xs">
                          {inverterDisplayNames[pkg.inverterKey].split(" ")[0]}
                        </td>
                        <td className="p-3 text-center text-xs">
                          Add-on: {pkg.batteryRecKwhActual} kWh
                        </td>
                        <td className="p-3 text-right text-xs text-muted-foreground font-mono">
                          {formatRp(pkg.hpp)}
                        </td>
                        <td className="p-3 text-right text-xs text-muted-foreground font-mono">
                          {formatRp(pkg.ppn)}
                        </td>
                        <td className="p-3 text-right">
                          <span className="font-extrabold text-solar text-sm">
                            {pkg.priceFormatted}
                          </span>
                        </td>
                        <td className="p-3 text-center text-xs text-muted-foreground">
                          {pkg.dailyProduction}
                        </td>
                        <td className="p-3 text-center text-xs text-solar font-medium">
                          {pkg.savingsRange}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-muted/50 font-semibold">
                      <td colSpan={4} className="p-3 text-xs text-navy dark:text-white">
                        TOTAL
                      </td>
                      <td className="p-3 text-right text-xs text-navy dark:text-white font-mono">
                        {formatRp(totalHPP)}
                      </td>
                      <td className="p-3 text-right text-xs text-navy dark:text-white font-mono">
                        {formatRp(totalPpn)}
                      </td>
                      <td className="p-3 text-right text-xs text-solar font-extrabold">
                        {formatRp(results.reduce((s, r) => s + r.price, 0))}
                      </td>
                      <td colSpan={2}></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* Battery Ratio Check */}
            <div className="mt-6 p-4 rounded-xl bg-card border">
              <div className="flex items-center gap-2 mb-3">
                <Battery className="w-4 h-4 text-gold" />
                <h3 className="text-sm font-bold text-navy dark:text-white">
                  Validasi Rasio Baterai
                </h3>
              </div>
              <p className="text-xs text-muted-foreground mb-3">
                Baterai tersedia sebagai add-on opsional (unit 4,8 kWh LiFePO4). Kapasitas rekomendasi = kWp x PSH.
                Saat baterai penuh &amp; tidak ada pemadaman PLN, sinar matahari langsung supply beban via pengaturan SBU/SUB/Mix di inverter.
              </p>
              <div className="space-y-2">
                {results.map((pkg) => {
                  const kWp = (pkg.panelCount * detailed.panel.wattage) / 1000;
                  const dailyKwh = kWp * settings.pshHours * settings.efficiency;
                  const ratio = (pkg.batteryRecKwhActual / dailyKwh) * 100;
                  return (
                    <div
                      key={pkg.name}
                      className="flex items-center justify-between p-2.5 rounded-lg text-xs bg-blue-50 dark:bg-blue-900/10 text-blue-700 dark:text-blue-400"
                    >
                      <span className="font-medium">{pkg.name}</span>
                      <span>
                        Rekomendasi: {pkg.batteryRecKwhActual} kWh ({ratio.toFixed(0)}% produksi harian) — dari Rp {pkg.batteryPricePerUnitFormatted}/unit
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Computed Aggregated Breakdown */}
            <div className="mt-6 p-4 rounded-xl bg-card border">
              <div className="flex items-center gap-2 mb-3">
                <Calculator className="w-4 h-4 text-solar" />
                <h3 className="text-sm font-bold text-navy dark:text-white">
                  Ringkasan Agregat (yang Disimpan)
                </h3>
              </div>
              <p className="text-xs text-muted-foreground mb-3">
                Nilai-nilai berikut dihitung otomatis dari input detail di atas dan disimpan ke
                localStorage untuk digunakan oleh landing page.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <DisplayValue label="Mounting per Panel" value={computedMountingPerPanel} />
                <DisplayValue label="BOS per Panel" value={computedBOSPerPanel} />
                <DisplayValue label="Proteksi per Sistem" value={computedProtectionPerSystem} />
                <DisplayValue label="Survei + Desain" value={computedSurveyDesign} />
                <DisplayValue label="Panel Wp" value={`${components.panelWattage} Wp`} prefix="" />
                <DisplayValue
                  label="Labor Baterai/kWh"
                  value={components.laborBatteryPerKwh}
                />
                <DisplayValue label="BOS Baterai/kWh" value={components.bosBatteryPerKwh} />
                <DisplayValue label="Logistics/Panel" value={components.logisticsPerPanel} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
