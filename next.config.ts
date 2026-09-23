import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /* Image optimization — kualitas yang digunakan komponen Image */
  images: {
    qualities: [75, 85],
    formats: ["image/avif", "image/webp"],
  },
  /* Security headers */
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  /* React StrictMode enabled for detecting side effects */
  reactStrictMode: true,
};

export default nextConfig;
