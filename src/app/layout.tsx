import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  SITE_URL,
  SITE_NAME,
  BRAND_NAME,
  DEFAULT_OG_IMAGE,
  localBusinessJsonLd,
  webSiteJsonLd,
} from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * Metadata root — hanya fallback. Setiap route indexable mendefinisikan
 * metadata lengkapnya sendiri (title, description, canonical, OG) via
 * buildMetadata() di src/lib/seo.ts.
 *
 * CANONICAL DOMAIN: https://jambisolarpanel.vercel.app
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Jasa Pasang Panel Surya & PLTS Jambi | Jaya Mandiri Smart Energy",
  description:
    "Jasa pasang panel surya & instalasi PLTS di Jambi untuk rumah, bisnis, kebun, dan infrastruktur. Survei & konsultasi gratis, garansi resmi, layanan purna jual. Melayani Sumatera & Jawa Bagian Barat.",
  authors: [{ name: BRAND_NAME }],
  icons: {
    icon: "/logo-jmse.png",
    apple: "/logo-jmse.png",
  },
  openGraph: {
    title: "Jasa Pasang Panel Surya & PLTS Jambi | Jaya Mandiri Smart Energy",
    description:
      "Survei, desain, pengadaan, instalasi, dan maintenance sistem PLTS untuk rumah, bisnis, kebun, dan infrastruktur di Jambi, Sumatera & Jawa Barat.",
    url: "/",
    siteName: SITE_NAME,
    type: "website",
    locale: "id_ID",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1344,
        height: 768,
        alt: "Instalasi Panel Surya — Jambi Solar Panel by PT. Jaya Mandiri Smart Energy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jasa Pasang Panel Surya & PLTS Jambi",
    description:
      "Survei, desain, instalasi, dan maintenance PLTS untuk rumah, bisnis, kebun, dan infrastruktur di Jambi.",
    images: [DEFAULT_OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        {/* Facebook Pixel — loaded from env variable */}
        {process.env.NEXT_PUBLIC_FB_PIXEL_ID && (
          <>
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  !function(f,b,e,v,n,t,s)
                  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                  n.queue=[];t=b.createElement(e);t.async=!0;
                  t.src=v;s=b.getElementsByTagName(e)[0];
                  s.parentNode.insertBefore(t,s)}(window, document,'script',
                  'https://connect.facebook.net/en_US/fbevents.js');
                  fbq('init', '${process.env.NEXT_PUBLIC_FB_PIXEL_ID}');
                  fbq('track', 'PageView');
                `,
              }}
            />
            <noscript>
              <img
                height="1"
                width="1"
                style={{ display: "none" }}
                src={`https://www.facebook.com/tr?id=${process.env.NEXT_PUBLIC_FB_PIXEL_ID}&ev=PageView&noscript=1`}
                alt=""
              />
            </noscript>
          </>
        )}

        {/* Google Analytics — loaded from env variable */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
                `,
              }}
            />
          </>
        )}

        {/* Structured Data — LocalBusiness (NAP resmi, tanpa rating/review yang tidak terverifikasi) */}
        <JsonLd data={localBusinessJsonLd()} />
        {/* Structured Data — WebSite */}
        <JsonLd data={webSiteJsonLd()} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Skip link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-solar focus:text-white focus:rounded-lg focus:text-sm focus:font-semibold focus:outline-none focus:ring-2 focus:ring-solar/50"
        >
          Langsung ke konten utama
        </a>

        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  );
}
