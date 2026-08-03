import type { Metadata } from "next";
import SewaPltsPage from "./SewaPltsPage";
import { rentalPackages, rentalFaqs } from "@/lib/rentalPackages";

const PAGE_URL = "https://jambisolarpanel.vercel.app/sewa-plts";

export const metadata: Metadata = {
  title:
    "Sewa PLTS Hybrid Jambi — Bayar Bulanan, Tanpa Investasi | Jambi Solar Panel",
  description:
    "Program Sewa PLTS Hybrid Off-Grid di Jambi. Nikmati listrik tenaga surya tanpa investasi puluhan juta rupiah. Mulai Rp 650.000/bulan, sudah termasuk instalasi & maintenance. Konsultasi gratis.",
  keywords: [
    "Sewa PLTS",
    "Sewa Panel Surya",
    "Rental Solar Panel",
    "PLTS Jambi",
    "Solar Panel Jambi",
    "Panel Surya Jambi",
    "PLTS Rumah",
    "Hybrid Offgrid",
    "Solar as a Service",
    "Bayar bulanan panel surya",
    "PLTS tanpa investasi",
    "Sewa PLTS Jambi",
  ],
  authors: [{ name: "PT. Jaya Mandiri Smart Energy" }],
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title:
      "Sewa PLTS Hybrid Jambi — Bayar Bulanan, Tanpa Investasi | Jambi Solar Panel",
    description:
      "Nikmati listrik tenaga surya tanpa investasi puluhan juta rupiah. Mulai Rp 650.000/bulan, sudah termasuk instalasi & maintenance.",
    url: PAGE_URL,
    siteName: "Jambi Solar Panel — PT. Jaya Mandiri Smart Energy",
    type: "website",
    locale: "id_ID",
    images: [
      {
        url: "/hero-solar.jpg",
        width: 1344,
        height: 768,
        alt: "Sewa PLTS Hybrid Off-Grid — Jambi Solar Panel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sewa PLTS Jambi — Bayar Bulanan, Tanpa Investasi",
    description:
      "Nikmati listrik tenaga surya tanpa investasi puluhan juta rupiah. Mulai Rp 650.000/bulan.",
    images: ["/hero-solar.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

/** JSON-LD structured data untuk SEO. */
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: rentalFaqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.answer,
    },
  })),
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Sewa PLTS Hybrid Off-Grid — Solar as a Service",
  serviceType: "Sewa PLTS Hybrid Off-Grid",
  provider: {
    "@type": "LocalBusiness",
    name: "Jambi Solar Panel",
    legalName: "PT. Jaya Mandiri Smart Energy",
    telephone: "+6281328190707",
    url: "https://jambisolarpanel.vercel.app",
    address: {
      "@type": "PostalAddress",
      addressCountry: "ID",
      addressRegion: "Jambi",
      addressLocality: "Muaro Jambi",
    },
  },
  areaServed: {
    "@type": "Country",
    name: "Indonesia",
  },
  description:
    "Program Sewa PLTS Hybrid Off-Grid. Nikmati listrik tenaga surya tanpa investasi awal. Mulai Rp 650.000/bulan, sudah termasuk instalasi, baterai, dan maintenance.",
  offers: rentalPackages
    .filter((p) => p.active)
    .map((p) => ({
      "@type": "Offer",
      name: `Sewa PLTS ${p.name} — ${p.kWp} kWp + ${p.storageKwh} kWh`,
      price: p.monthlyPrice,
      priceCurrency: "IDR",
      description: p.description,
      url: PAGE_URL,
    })),
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://jambisolarpanel.vercel.app",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Sewa PLTS",
      item: PAGE_URL,
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <SewaPltsPage />
    </>
  );
}
