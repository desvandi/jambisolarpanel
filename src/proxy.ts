import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Proxy (middleware Next.js 16)
 *
 * 1. /api/: rate limiting sederhana berdasarkan IP
 * 2. /kalibrasi-harga: Basic Auth (ADMIN_PASSWORD) + X-Robots-Tag noindex
 *    (halaman admin/internal tidak boleh menjadi sumber indexable content)
 */

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

/** Validasi Authorization: Basic (username apa pun, password = ADMIN_PASSWORD). */
function isAuthorized(request: NextRequest, adminPassword: string): boolean {
  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Basic ")) {
    return false;
  }
  try {
    const decoded = Buffer.from(authHeader.slice(6), "base64").toString("utf-8");
    const sepIndex = decoded.indexOf(":");
    if (sepIndex === -1) return false;
    const password = decoded.slice(sepIndex + 1);
    return password === adminPassword;
  } catch {
    return false;
  }
}

function unauthorizedResponse() {
  return new NextResponse("Akses ditolak. Halaman ini memerlukan autentikasi admin.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Kalibrasi Harga — Admin", charset="UTF-8"',
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}

export function proxy(request: NextRequest) {
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
    return NextResponse.next();
  }

  // Protect internal admin page /kalibrasi-harga
  if (pathname === "/kalibrasi-harga" || pathname.startsWith("/kalibrasi-harga/")) {
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      // Tanpa ADMIN_PASSWORD: hanya boleh diakses di development.
      if (process.env.NODE_ENV === "production") {
        return new NextResponse(
          "Kalibrasi Harga dinonaktifkan. Set ADMIN_PASSWORD pada environment variables untuk mengaktifkan akses admin.",
          { status: 403, headers: { "X-Robots-Tag": "noindex, nofollow" } }
        );
      }
      // Dev: izinkan, tapi tetap kirim X-Robots-Tag sebagai defense-in-depth.
      const res = NextResponse.next();
      res.headers.set("X-Robots-Tag", "noindex, nofollow");
      return res;
    }

    if (!isAuthorized(request, adminPassword)) {
      return unauthorizedResponse();
    }

    const res = NextResponse.next();
    res.headers.set("X-Robots-Tag", "noindex, nofollow");
    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*", "/kalibrasi-harga", "/kalibrasi-harga/:path*"],
};
