import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jayamandiri.co.id"),
  title: "Jambi Solar Panel | Sistem Energi Mandiri Off-Grid & Hybrid",
  description:
    "Hemat tagihan listrik hingga 90% dengan instalasi PLTS Off-Grid & Hybrid dari Jambi Solar Panel — PT. Jaya Mandiri Smart Energy. Solusi untuk rumah, bisnis, kebun & infrastruktur. Garansi 25 tahun, konsultasi gratis.",
  keywords: [
    "panel surya Jambi",
    "PLTS off grid",
    "PLTS hybrid",
    "sistem energi mandiri",
    "paket panel surya rumah",
    "solar panel kebun",
    "PJUTS",
    "solar pump",
    "EV charging solar",
    "instalasi panel surya industri",
    "PT. Jaya Mandiri Smart Energy",
    "jasa pasang solar panel Indonesia",
    "hemat listrik solar panel",
    "EPC panel surya",
    "solar panel Sumatera",
  ],
  authors: [{ name: "PT. Jaya Mandiri Smart Energy" }],
  icons: {
    icon: "/logo-jmse.png",
    apple: "/logo-jmse.png",
  },
  openGraph: {
    title: "Solusi Energi Mandiri Off-Grid & Hybrid | Jambi Solar Panel",
    description:
      "Instalasi PLTS Off-Grid & Hybrid profesional untuk rumah, bisnis, kebun & infrastruktur. Hemat hingga 90%, backup 24 jam, garansi 25 tahun.",
    url: "https://jayamandiri.co.id",
    siteName: "Jambi Solar Panel — PT. Jaya Mandiri Smart Energy",
    type: "website",
    locale: "id_ID",
    images: [
      {
        url: "/hero-solar.jpg",
        width: 1344,
        height: 768,
        alt: "Instalasi Panel Surya PT. Jaya Mandiri Smart Energy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Solusi Energi Mandiri Off-Grid & Hybrid | Jambi Solar Panel",
    description:
      "Instalasi PLTS profesional untuk rumah, bisnis, kebun & infrastruktur.",
    images: ["/hero-solar.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://jayamandiri.co.id",
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
        {/* Facebook Pixel */}
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
              fbq('init', 'YOUR_PIXEL_ID'); // TODO: Ganti dengan Pixel ID asli dari Meta Business Manager
              fbq('track', 'PageView');
              // Conversion API (Server-Side) — hubungkan ke backend saat Pixel ID sudah aktif
              // fbq('track', 'ViewContent');
              // fbq('track', 'Lead');
              // fbq('track', 'Contact');
            `,
          }}
        />
        <noscript>
          {/* TODO: Ganti YOUR_PIXEL_ID dengan Pixel ID asli */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=YOUR_PIXEL_ID&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>

        {/* Google Analytics — TODO: Ganti G-YOUR_GA_ID dengan GA Tracking ID asli */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-YOUR_GA_ID"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-YOUR_GA_ID');
            `,
          }}
        />

        {/* Schema Markup - Local Business */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Jambi Solar Panel",
              legalName: "PT. Jaya Mandiri Smart Energy",
              description:
                "Provider solusi energi surya profesional — Sistem Mandiri Off-Grid & Hybrid untuk Rumah, Bisnis, Kebun, dan Infrastruktur. Coverage Sumatera & Jawa Bagian Barat.",
              url: "https://jayamandiri.co.id",
              telephone: "+6281328190707",
              image: "/hero-solar.jpg",
              logo: "/logo-jmse.png",
              priceRange: "$$",
              address: {
                "@type": "PostalAddress",
                addressCountry: "ID",
                addressRegion: "Jambi",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: -1.61,
                longitude: 103.61,
              },
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                ],
                opens: "08:00",
                closes: "17:00",
              },
              sameAs: [
                "https://www.facebook.com/share/1EMi46VPVc/",
                "https://www.instagram.com/desvandi101",
              ],
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                reviewCount: "127",
              },
              areaServed: {
                "@type": "Country",
                name: "Indonesia",
              },
              serviceType: [
                "Instalasi PLTS Off-Grid",
                "Instalasi PLTS Hybrid",
                "PJUTS - Penerangan Jalan Umum Tenaga Surya",
                "Solar Water Pump",
                "EV Charging Terintegrasi PLTS",
                "Smart Monitoring & Solar CCTV",
                "Tender & Procurement Energi Terbarukan",
              ],
            }),
          }}
        />

        {/* Schema Markup - FAQ */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "Berapa biaya pasang panel surya?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Biaya instalasi PLTS Off-Grid & Hybrid bervariasi tergantung kapasitas dan kebutuhan. Untuk rumah tangga, paket mulai dari Powmr 1.3 kWp (tanpa baterai) hingga Powmr 5.2 kWp. Untuk bisnis dan industri, paket mulai dari Powmr 7.15 kWp. Konsultasikan kebutuhan Anda secara GRATIS dengan tim kami.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Berapa lama balik modal?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Untuk rumah tangga (paket Powmr 2.6-5.2 kWp), ROI realistis tercapai dalam 8-9 tahun. Untuk bisnis dan industri (paket Powmr 7.15-20.8 kWp), ROI tercapai dalam 5-7 tahun. Perhitungan ini memperhitungkan kenaikan tarif PLN rata-rata 6% per tahun. Total keuntungan bersih dalam 25 tahun mencapai 5-7 kali lipat dari investasi awal.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Apakah bisa tanpa PLN?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Ya! Sistem PLTS Off-Grid dirancang khusus untuk area tanpa jangkauan PLN. Sistem ini dilengkapi baterai penyimpanan sehingga Anda bisa mendapatkan listrik 24 jam.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Bagaimana saat hujan?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Panel surya modern tetap menghasilkan energi meskipun saat mendung atau hujan, meskipun kapasitasnya berkurang. Sistem hybrid dan off-grid dilengkapi baterai untuk memastikan pasokan listrik tetap stabil.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Garansi berapa lama?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Kami memberikan garansi panel surya 25 tahun performa, garansi inverter 5-10 tahun, dan garansi instalasi serta baterai sesuai paket. Semua garansi didukung langsung oleh PT. Jaya Mandiri Smart Energy.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Bisa cicilan?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Ya, kami menyediakan opsi cicilan untuk memudahkan Anda. Hubungi tim kami untuk informasi lebih lanjut mengenai skema pembayaran dan cicilan yang tersedia.",
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
