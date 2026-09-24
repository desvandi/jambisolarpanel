import type { Metadata } from "next";
import SewaPltsPage from "./SewaPltsPage";
import { rentalPackages, rentalFaqs } from "@/lib/rentalPackages";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  SITE_URL,
  SERVICE_AREAS,
  BUSINESS_NAP,
  buildMetadata,
  faqJsonLd,
  breadcrumbJsonLd,
} from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  path: "/sewa-plts",
  title: "Sewa PLTS Jambi | Panel Surya Bayar Bulanan",
  description:
    "Program Sewa PLTS Hybrid Off-Grid di Jambi — listrik tenaga surya tanpa investasi puluhan juta rupiah. Mulai Rp 875.000/bulan, sudah termasuk instalasi & maintenance. Konsultasi gratis.",
  ogImageAlt: "Sewa PLTS Hybrid Off-Grid di Jambi — panel surya bayar bulanan",
});

/** JSON-LD structured data untuk SEO. */
const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Sewa PLTS Hybrid Off-Grid — Solar as a Service",
  serviceType: "Sewa PLTS Hybrid Off-Grid",
  provider: {
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#organization`,
    name: BUSINESS_NAP.name,
    legalName: BUSINESS_NAP.legalName,
    telephone: BUSINESS_NAP.telephone,
    url: `${SITE_URL}/`,
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS_NAP.streetAddress,
      addressLocality: BUSINESS_NAP.addressLocality,
      addressRegion: BUSINESS_NAP.addressRegion,
      postalCode: BUSINESS_NAP.postalCode,
      addressCountry: BUSINESS_NAP.addressCountry,
    },
  },
  areaServed: SERVICE_AREAS.map((area) => ({
    "@type": "AdministrativeArea",
    name: area,
  })),
  description:
    "Program Sewa PLTS Hybrid Off-Grid. Nikmati listrik tenaga surya tanpa investasi awal. Mulai Rp 875.000/bulan, sudah termasuk instalasi, baterai, dan maintenance.",
  offers: rentalPackages
    .filter((p) => p.active)
    .map((p) => ({
      "@type": "Offer",
      name: `Sewa PLTS ${p.name} — ${p.kWp} kWp + ${p.storageKwh} kWh`,
      price: p.monthlyPrice,
      priceCurrency: "IDR",
      description: p.description,
      url: `${SITE_URL}/sewa-plts`,
    })),
};

export default function Page() {
  return (
    <>
      <JsonLd data={serviceJsonLd} />
      <JsonLd
        data={faqJsonLd(
          rentalFaqs.map((f) => ({ q: f.question, a: f.answer }))
        )}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Sewa PLTS", path: "/sewa-plts" },
        ])}
      />
      <SewaPltsPage />
    </>
  );
}
