import { NextRequest, NextResponse } from "next/server";

const SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;
const API_KEY = process.env.GOOGLE_SCRIPT_API_KEY;

/**
 * GET /api/pricing — Fetch pricing data from Google Sheets.
 * Returns flat key-value pairs (ComponentPrices + InverterPrices + PricingSettings).
 *
 * Falls back gracefully if GOOGLE_SCRIPT_URL is not configured.
 */
export async function GET() {
  if (!SCRIPT_URL) {
    return NextResponse.json(
      {
        error: "GOOGLE_SCRIPT_URL not configured",
        hint: "Set GOOGLE_SCRIPT_URL and GOOGLE_SCRIPT_API_KEY in Vercel environment variables",
      },
      { status: 503 }
    );
  }

  try {
    const url = `${SCRIPT_URL}?key=${encodeURIComponent(API_KEY || "")}`;
    const res = await fetch(url, {
      cache: "no-store",
      signal: AbortSignal.timeout(15000),
    });

    if (!res.ok) {
      console.error("[api/pricing] GET failed:", res.status, await res.text());
      return NextResponse.json(
        { error: "Failed to fetch pricing from Google Sheets" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("[api/pricing] GET error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/pricing — Save pricing data to Google Sheets.
 * Body: { "data": { "panelWattage": 650, "panelPerUnit": 2500000, ... } }
 */
export async function POST(request: NextRequest) {
  if (!SCRIPT_URL) {
    return NextResponse.json(
      {
        error: "GOOGLE_SCRIPT_URL not configured",
        hint: "Set GOOGLE_SCRIPT_URL and GOOGLE_SCRIPT_API_KEY in Vercel environment variables",
      },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();

    const res = await fetch(
      `${SCRIPT_URL}?key=${encodeURIComponent(API_KEY || "")}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(15000),
      }
    );

    if (!res.ok) {
      console.error("[api/pricing] POST failed:", res.status, await res.text());
      return NextResponse.json(
        { error: "Failed to save pricing to Google Sheets" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("[api/pricing] POST error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 }
    );
  }
}
