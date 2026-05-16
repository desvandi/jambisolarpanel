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
  title: "PT. Jaya Mandiri Smart Energy | Solusi Panel Surya Profesional #1 Indonesia",
  description:
    "Hemat tagihan listrik hingga 90% dengan instalasi PLTS Off-Grid, Hybrid & On-Grid dari PT. Jaya Mandiri Smart Energy. Garansi sistem, konsultasi gratis, support seluruh Indonesia. Hubungi sekarang!",
  keywords: [
    "panel surya Jambi",
    "jasa pasang solar panel Indonesia",
    "PLTS off grid",
    "paket panel surya rumah",
    "solar panel kebun",
    "instalasi panel surya industri",
    "PT Jaya Mandiri Smart Energy",
    "sistem energi surya",
    "hemat listrik solar panel",
    "EPC panel surya",
  ],
  authors: [{ name: "PT. Jaya Mandiri Smart Energy" }],
  icons: {
    icon: "/logo-jmse.png",
    apple: "/logo-jmse.png",
  },
  openGraph: {
    title: "Hemat Listrik Hingga 90% | PT. Jaya Mandiri Smart Energy",
    description:
      "Instalasi PLTS profesional untuk rumah, bisnis, kebun & industri. Garansi sistem, desain custom, support seluruh Indonesia.",
    url: "https://jayamandiri.co.id",
    siteName: "PT. Jaya Mandiri Smart Energy",
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
    title: "Hemat Listrik Hingga 90% | PT. Jaya Mandiri Smart Energy",
    description:
      "Instalasi PLTS profesional untuk rumah, bisnis, kebun & industri.",
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
              fbq('init', 'YOUR_PIXEL_ID');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=YOUR_PIXEL_ID&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>

        {/* Google Analytics */}
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
              name: "PT. Jaya Mandiri Smart Energy",
              description:
                "Provider solusi energi surya profesional - PLTS Off-Grid, Hybrid, dan On-Grid untuk rumah, bisnis, kebun, dan industri di seluruh Indonesia.",
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
              sameAs: [],
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
                "Instalasi PLTS On-Grid",
                "Solar Panel Installation",
                "Sistem Energi Surya",
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
                    text: "Biaya instalasi panel surya bervariasi tergantung kapasitas dan kebutuhan. Untuk rumah tangga mulai dari puluhan juta rupiah. Konsultasikan kebutuhan Anda secara GRATIS dengan tim kami.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Berapa lama balik modal?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Rata-rata balik modal terjadi dalam 3-5 tahun tergantung penggunaan listrik dan kapasitas sistem yang dipasang. Setelah itu, Anda menikmati listrik gratis selama 20-25 tahun.",
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
