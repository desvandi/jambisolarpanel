/**
 * Pricing API Client — communicates with Google Sheets via /api/pricing
 *
 * All calls are proxied through Next.js API route to keep the
 * Google Apps Script API key secret (server-side only).
 */

const API_BASE = "/api/pricing";

export interface RemotePricingData {
  // Komponen
  panelWattage: number;
  panelPerUnit: number;
  mountingPerPanel: number;
  carportPerKwp: number;
  bosPerPanel: number;
  spdGroundingPerSystem: number;
  laborPerPanel: number;
  laborInverterPerUnit: number;
  laborBatteryPerKwh: number;
  batteryPerKwh: number;
  bosBatteryPerKwh: number;
  surveyDesignFee: number;
  commissioningFee: number;
  logisticsPerPanel: number;
  monitoringBasic: number;
  monitoringStandard: number;
  monitoringIndustrial: number;
  // Inverter
  powmr3k6: number;
  powmr6k: number;
  powmr8k: number;
  powmr10k: number;
  deye10k3p: number;
  deye15k3p: number;
  deye20k3p: number;
  // Pengaturan
  marginPct: number;
  ppnPct: number;
  pshHours: number;
  efficiency: number;
}

/**
 * Fetch pricing data from Google Sheets via /api/pricing proxy.
 * Returns null if API not configured or request fails.
 */
export async function fetchRemotePricing(): Promise<RemotePricingData | null> {
  try {
    const res = await fetch(API_BASE, {
      cache: "no-store",
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) return null;

    const json = await res.json();
    if (!json.success || !json.data) return null;

    return json.data as RemotePricingData;
  } catch {
    // Network error, timeout, or API not configured — fall back gracefully
    return null;
  }
}

/**
 * Push pricing data to Google Sheets via /api/pricing proxy.
 * Returns true on success, false on failure.
 */
export async function pushRemotePricing(
  data: Record<string, number>
): Promise<boolean> {
  try {
    const res = await fetch(API_BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data }),
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) return false;

    const json = await res.json();
    return json.success === true;
  } catch {
    return false;
  }
}
