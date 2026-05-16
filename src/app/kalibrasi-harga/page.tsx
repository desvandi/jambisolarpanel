"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
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
  saveComponentPrices,
  saveInverterPrices,
  saveSettings,
  loadComponentPrices,
  loadInverterPrices,
  loadSettings,
  clearAllPricing,
  hasCustomPricing,
  packageSpecs,
} from "@/lib/pricing";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
} from "lucide-react";

// --- Number Input Component ---
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

  useEffect(() => {
    setDisplay(formatRp(value));
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
          value={display}
          onChange={(e) => {
            setDisplay(e.target.value);
            const num = parseRpToNumber(e.target.value);
            if (!isNaN(num)) onChange(num);
          }}
          onBlur={() => setDisplay(formatRp(value))}
          className="pl-10"
        />
      </div>
      {hint && (
        <p className="text-xs text-muted-foreground">{hint}</p>
      )}
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
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium text-navy dark:text-white">
        {label}
      </Label>
      <div className="relative">
        <Input
          type="number"
          value={value}
          onChange={(e) => onChange(Math.min(max, Math.max(min, parseFloat(e.target.value) || 0)))}
          min={min}
          max={max}
          step={0.5}
          className="pr-8"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
          %
        </span>
      </div>
      {hint && (
        <p className="text-xs text-muted-foreground">{hint}</p>
      )}
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
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium text-navy dark:text-white">
        {label}
      </Label>
      <div className="relative">
        <Input
          type="number"
          value={value}
          onChange={(e) => onChange(Math.min(max, Math.max(min, parseFloat(e.target.value) || 0)))}
          min={min}
          max={max}
          step={step}
          className={suffix ? "pr-12" : ""}
        />
        {suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
            {suffix}
          </span>
        )}
      </div>
      {hint && (
        <p className="text-xs text-muted-foreground">{hint}</p>
      )}
    </div>
  );
}

// --- Main Page ---
export default function KalibrasiHargaPage() {
  const [components, setComponents] = useState<ComponentPrices>(() => loadComponentPrices());
  const [inverters, setInverters] = useState<InverterPrices>(() => loadInverterPrices());
  const [settings, setSettings] = useState<PricingSettings>(() => loadSettings());
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("components");

  // Derive results from inputs (no effect needed)
  const results = useMemo(
    () => calculatePackages(components, inverters, settings),
    [components, inverters, settings]
  );

  const handleSave = () => {
    saveComponentPrices(components);
    saveInverterPrices(inverters);
    saveSettings(settings);
    // Notify other tabs and same-tab listeners
    window.dispatchEvent(new Event("jmse-pricing-updated"));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleReset = () => {
    setComponents({ ...defaultComponentPrices });
    setInverters({ ...defaultInverterPrices });
    setSettings({ ...defaultSettings });
    clearAllPricing();
    setSaved(false);
  };

  const [copiedCode, setCopiedCode] = useState(false);

  const handleCopyJSON = () => {
    const exportData = { components, inverters, settings, calculatedAt: new Date().toISOString() };
    navigator.clipboard.writeText(JSON.stringify(exportData, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGenerateCode = () => {
    const lines: string[] = [];
    lines.push(`// Generated by Kalibrasi Harga on ${new Date().toLocaleString("id-ID")}`);
    lines.push(`// Prices include PPN ${settings.ppnPct}% and ${settings.marginPct}% margin`);
    lines.push(`// PSH: ${settings.pshHours}h | Efficiency: ${(settings.efficiency * 100).toFixed(0)}%`);
    lines.push(``);
    results.forEach((pkg) => {
      lines.push(`// ${pkg.name}`);
      lines.push(`// HPP: ${formatRp(pkg.hpp)} | Margin: ${formatRp(pkg.subtotal - pkg.hpp)} | PPN: ${formatRp(pkg.ppn)}`);
      lines.push(`// Produksi: ${pkg.dailyProduction} | Hemat: ${pkg.savingsRange}`);
      lines.push(`// price: "${pkg.priceFormatted}",`);
      lines.push(``);
    });
    lines.push(`// --- Full JSON Data ---`);
    lines.push(JSON.stringify(results.map(({ name, priceFormatted, dailyProduction, savingsRange, hpp, ppn }) => ({ name, priceFormatted, dailyProduction, savingsRange, hpp, ppn })), null, 2));
    navigator.clipboard.writeText(lines.join("\n"));
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 3000);
  };

  const updateComponent = (key: keyof ComponentPrices, val: number) => {
    setComponents((prev) => ({ ...prev, [key]: val }));
    setSaved(false);
  };

  const updateInverter = (key: keyof InverterPrices, val: number) => {
    setInverters((prev) => ({ ...prev, [key]: val }));
    setSaved(false);
  };

  const updateSetting = (key: keyof PricingSettings, val: number) => {
    setSettings((prev) => ({ ...prev, [key]: val }));
    setSaved(false);
  };

  // Stats
  const totalHPP = results.reduce((sum, r) => sum + r.hpp, 0);
  const totalPpn = results.reduce((sum, r) => sum + r.ppn, 0);
  const avgMargin = results.length > 0
    ? ((results.reduce((sum, r) => sum + (r.price - r.hpp - r.ppn), 0) / results.length) / 1000000).toFixed(0) + "jt"
    : "0jt";

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                  PT. Jaya Mandiri Smart Energy
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {saved && (
                <Badge variant="outline" className="text-emerald-600 border-emerald-300 bg-emerald-50 gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Tersimpan
                </Badge>
              )}
              <Button variant="outline" size="sm" onClick={() => window.location.href = "/"} className="gap-1.5">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Landing Page</span>
              </Button>
              <Button variant="outline" size="sm" onClick={handleReset} className="gap-1.5 text-red-600 hover:text-red-700 hover:bg-red-50">
                <RotateCcw className="w-3.5 h-3.5" />
                Reset
              </Button>
              <Button size="sm" onClick={handleSave} className="gap-1.5 bg-solar hover:bg-solar-dark">
                <Save className="w-3.5 h-3.5" />
                Simpan
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
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
              {(totalHPP / 1000000).toFixed(0)}jt
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
              <Zap className="w-4 h-4 text-blue-500" />
              <p className="text-xs font-medium text-muted-foreground">PSH Jambi</p>
            </div>
            <p className="text-2xl font-bold text-navy dark:text-white">{settings.pshHours} jam</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Input Tabs */}
          <div className="lg:col-span-1 space-y-4">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="components" className="text-xs gap-1">
                  <Package className="w-3 h-3 hidden sm:block" />
                  Panel
                </TabsTrigger>
                <TabsTrigger value="inverters" className="text-xs gap-1">
                  <Zap className="w-3 h-3 hidden sm:block" />
                  Inverter
                </TabsTrigger>
                <TabsTrigger value="settings" className="text-xs gap-1">
                  <Wrench className="w-3 h-3 hidden sm:block" />
                  Setting
                </TabsTrigger>
              </TabsList>

              <TabsContent value="components" className="mt-4 space-y-4">
                <div className="p-4 rounded-xl bg-card border space-y-4">
                  <div className="flex items-center gap-2">
                    <Sun className="w-4 h-4 text-solar" />
                    <h3 className="text-sm font-bold text-navy dark:text-white">Harga Panel & BOS</h3>
                  </div>
                  <RupiahInput
                    label="Harga Panel (630Wp)"
                    value={components.panelPerUnit}
                    onChange={(v) => updateComponent("panelPerUnit", v)}
                    hint="Harga beli 1 lembar panel surya 630Wp dari supplier"
                  />
                  <RupiahInput
                    label="Mounting Aluminium / Panel"
                    value={components.mountingPerPanel}
                    onChange={(v) => updateComponent("mountingPerPanel", v)}
                    hint="Rangka mounting, bracket, baut per panel"
                  />
                  <RupiahInput
                    label="BOS / Panel (Kabel, MC4, CB)"
                    value={components.bosPerPanel}
                    onChange={(v) => updateComponent("bosPerPanel", v)}
                    hint="Balance of System: kabel solar, MC4, circuit breaker per panel"
                  />
                  <Separator />
                  <div className="flex items-center gap-2">
                    <Wrench className="w-4 h-4 text-orange-500" />
                    <h3 className="text-sm font-bold text-navy dark:text-white">Tenaga Kerja</h3>
                  </div>
                  <RupiahInput
                    label="Tukang Pasang Panel / Panel"
                    value={components.laborPerPanel}
                    onChange={(v) => updateComponent("laborPerPanel", v)}
                    hint="Biaya tenaga kerja instalasi panel + mounting per panel"
                  />
                  <Separator />
                  <div className="flex items-center gap-2">
                    <Battery className="w-4 h-4 text-gold" />
                    <h3 className="text-sm font-bold text-navy dark:text-white">Baterai LiFePO4</h3>
                  </div>
                  <RupiahInput
                    label="Harga Baterai / kWh"
                    value={components.batteryPerKwh}
                    onChange={(v) => updateComponent("batteryPerKwh", v)}
                    hint="Harga beli baterai LiFePO4 per kWh dari supplier"
                  />
                  <RupiahInput
                    label="Labor Integrasi Baterai / kWh"
                    value={components.laborBatteryPerKwh}
                    onChange={(v) => updateComponent("laborBatteryPerKwh", v)}
                    hint="Biaya tenaga kerja pemasangan & wiring baterai per kWh"
                  />
                  <RupiahInput
                    label="BOS Baterai / kWh"
                    value={components.bosBatteryPerKwh}
                    onChange={(v) => updateComponent("bosBatteryPerKwh", v)}
                    hint="Kabel baterai, fuse, protective device per kWh"
                  />
                </div>
              </TabsContent>

              <TabsContent value="inverters" className="mt-4 space-y-4">
                <div className="p-4 rounded-xl bg-card border space-y-4">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-solar" />
                    <h3 className="text-sm font-bold text-navy dark:text-white">Harga Inverter</h3>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Masukkan harga beli inverter dari supplier (belum termasuk margin & pajak)
                  </p>
                  {(Object.entries(inverterDisplayNames) as [keyof InverterPrices, string][]).map(
                    ([key, displayName]) => (
                      <RupiahInput
                        key={key}
                        label={displayName}
                        value={inverters[key]}
                        onChange={(v) => updateInverter(key, v)}
                      />
                    )
                  )}
                </div>
              </TabsContent>

              <TabsContent value="settings" className="mt-4 space-y-4">
                <div className="p-4 rounded-xl bg-card border space-y-4">
                  <div className="flex items-center gap-2">
                    <Wrench className="w-4 h-4 text-solar" />
                    <h3 className="text-sm font-bold text-navy dark:text-white">Pengaturan Perhitungan</h3>
                  </div>
                  <NumberInput
                    label="PSH (Peak Sun Hours)"
                    value={settings.pshHours}
                    onChange={(v) => updateSetting("pshHours", v)}
                    hint="Durasi matahari efektif di lokasi instalasi"
                    suffix="jam/hari"
                    min={2}
                    max={7}
                    step={0.25}
                  />
                  <NumberInput
                    label="Efisiensi Sistem"
                    value={settings.efficiency * 100}
                    onChange={(v) => updateSetting("efficiency", v / 100)}
                    hint="Faktor sistem: inverter, cable loss, temperature, soiling"
                    suffix="%"
                    min={60}
                    max={95}
                    step={1}
                  />
                  <Separator />
                  <PercentInput
                    label="Profit Margin"
                    value={settings.marginPct}
                    onChange={(v) => updateSetting("marginPct", v)}
                    hint="Target margin keuntungan (30–40%)"
                    min={10}
                    max={60}
                  />
                  <PercentInput
                    label="PPN (Pajak Pertambahan Nilai)"
                    value={settings.ppnPct}
                    onChange={(v) => updateSetting("ppnPct", v)}
                    hint="Sesuai regulasi perpajakan Indonesia (11%)"
                    min={0}
                    max={15}
                  />
                  <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/30">
                    <p className="text-xs text-amber-700 dark:text-amber-400 leading-relaxed">
                      <strong>PPh:</strong> Tidak menambah harga jual. PPh dipotong oleh pihak pembeli (wajib pajak)
                      sesuai ketentuan PPh 23 (jasa) atau PPh 4(2) (konstruksi).
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
                    Generate & Salin Harga ke Landing Page
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Right: Calculation Results Table */}
          <div className="lg:col-span-2">
            <div className="rounded-xl border overflow-hidden">
              <div className="p-4 bg-card border-b flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-solar" />
                  <h3 className="text-sm font-bold text-navy dark:text-white">
                    Hasil Kalkulasi Harga Jual
                  </h3>
                </div>
                <Badge variant="outline" className="text-xs">
                  Harga sudah termasuk PPN {settings.ppnPct}% & Margin {settings.marginPct}%
                </Badge>
              </div>

              {/* Mobile Cards */}
              <div className="block lg:hidden divide-y">
                {results.map((pkg) => (
                  <div key={pkg.name} className="p-4 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-bold text-navy dark:text-white">{pkg.name}</p>
                        {pkg.popular && (
                          <Badge className="mt-1 bg-gold text-navy text-[10px]">POPULER</Badge>
                        )}
                      </div>
                      <p className="text-lg font-extrabold text-solar whitespace-nowrap">
                        {pkg.priceFormatted}
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground">{pkg.specs}</p>
                    <div className="grid grid-cols-3 gap-2 text-center">
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
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop Table */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted/50 text-left">
                      <th className="p-3 font-semibold text-navy dark:text-white text-xs">Paket</th>
                      <th className="p-3 font-semibold text-navy dark:text-white text-xs text-center">Panel</th>
                      <th className="p-3 font-semibold text-navy dark:text-white text-xs text-center">Inverter</th>
                      <th className="p-3 font-semibold text-navy dark:text-white text-xs text-center">Baterai</th>
                      <th className="p-3 font-semibold text-navy dark:text-white text-xs text-right">HPP</th>
                      <th className="p-3 font-semibold text-navy dark:text-white text-xs text-right">PPN</th>
                      <th className="p-3 font-semibold text-navy dark:text-white text-xs text-right">
                        <span className="bg-solar/10 text-solar px-2 py-0.5 rounded-full">
                          Harga Jual
                        </span>
                      </th>
                      <th className="p-3 font-semibold text-navy dark:text-white text-xs text-center">Produksi</th>
                      <th className="p-3 font-semibold text-navy dark:text-white text-xs text-center">Hemat/bln</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {results.map((pkg) => (
                      <tr
                        key={pkg.name}
                        className={`hover:bg-muted/30 transition-colors ${pkg.popular ? "bg-solar/5" : ""}`}
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
                        <td className="p-3 text-center text-xs">{inverterDisplayNames[pkg.inverterKey].split(" ")[0]}</td>
                        <td className="p-3 text-center text-xs">
                          {pkg.batteryKwh > 0 ? `${pkg.batteryKwh} kWh` : "—"}
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
                Rasio optimal: 26–40% dari produksi harian PV. Di bawah 26% = baterai terlalu kecil.
                Di atas 40% = baterai terlalu besar (over-sizing, boros).
              </p>
              <div className="space-y-2">
                {results
                  .filter((r) => r.batteryKwh > 0)
                  .map((pkg) => {
                    const kWp = (pkg.panelCount * 630) / 1000;
                    const dailyKwh = kWp * settings.pshHours * settings.efficiency;
                    const ratio = (pkg.batteryKwh / dailyKwh) * 100;
                    const isOk = ratio >= 26 && ratio <= 40;
                    return (
                      <div
                        key={pkg.name}
                        className={`flex items-center justify-between p-2.5 rounded-lg text-xs ${
                          isOk
                            ? "bg-emerald-50 dark:bg-emerald-900/10 text-emerald-700 dark:text-emerald-400"
                            : "bg-red-50 dark:bg-red-900/10 text-red-700 dark:text-red-400"
                        }`}
                      >
                        <span className="font-medium">{pkg.name}</span>
                        <div className="flex items-center gap-2">
                          <span>
                            {pkg.batteryKwh} kWh / {dailyKwh.toFixed(1)} kWh = {ratio.toFixed(0)}%
                          </span>
                          {isOk ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                          ) : (
                            <AlertCircle className="w-3.5 h-3.5 text-red-500" />
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
