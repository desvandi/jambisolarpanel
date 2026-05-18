import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Middleware untuk proteksi halaman admin dan rate limiting API.
 *
 * - /kalibrasi-harga: dilindungi dengan basic auth menggunakan
 *   env variable ADMIN_PASSWORD (default: "jmse2026")
 * - /api/: rate limiting sederhana berdasarkan IP
 */

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "jmse2026";

// Simple in-memory rate limiter (per IP)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60_000; // 1 minute
const RATE_LIMIT_MAX = 30; // 30 requests per minute

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return false;
  }

  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

// Clean up old rate limit entries periodically
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of rateLimitMap.entries()) {
      if (now > entry.resetTime) {
        rateLimitMap.delete(key);
      }
    }
  }, 60_000);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Rate limiting for API routes
  if (pathname.startsWith("/api/")) {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Terlalu banyak permintaan. Silakan coba lagi dalam 1 menit." },
        { status: 429 }
      );
    }
  }

  // Basic auth for /kalibrasi-harga
  if (pathname.startsWith("/kalibrasi-harga")) {
    const authHeader = request.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Basic ")) {
      return new NextResponse("Authentication required", {
        status: 401,
        headers: {
          "WWW-Authenticate": 'Basic realm="Admin - Kalibrasi Harga JMSE"',
        },
      });
    }

    const base64Credentials = authHeader.slice(6);
    let decoded: string;
    try {
      decoded = atob(base64Credentials);
    } catch {
      return new NextResponse("Invalid credentials", { status: 401 });
    }

    const [username, password] = decoded.split(":");

    // Accept any username, only check password
    if (password !== ADMIN_PASSWORD) {
      return new NextResponse("Invalid credentials", { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/kalibrasi-harga/:path*", "/api/:path*"],
};
