import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
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
  /* Note: Once TypeScript errors are resolved, remove ignoreBuildErrors */
  typescript: {
    ignoreBuildErrors: true,
  },
  /* React StrictMode enabled for detecting side effects */
  reactStrictMode: true,
};

export default nextConfig;
