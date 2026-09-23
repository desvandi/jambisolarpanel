import type { Metadata } from "next";

/**
 * Single source of truth untuk konfigurasi SEO situs.
 *
 * CANONICAL DOMAIN (keputusan final, dikonfirmasi owner):
 * https://jambisolarpanel.vercel.app
 *
 * Jangan pernah menambahkan domain lain (termasuk jayamandiri.co.id)
 * ke canonical, Open Graph, sitemap, robots, atau structured data.
 */

export const SITE_URL = "https://jambisolarpanel.vercel.app";
export const SITE_NAME = "Jambi Solar Panel — PT. Jaya Mandiri Smart Energy";
export const BRAND_NAME = "PT. Jaya Mandiri Smart Energy";
export const DEFAULT_OG_IMAGE = "/hero-solar.jpg";

/** NAP (Name, Address, Phone) — data resmi perusahaan, konsisten dengan footer & Google Business Profile. */
export const BUSINESS_NAP = {
  name: "Jambi Solar Panel",
  legalName: "PT. Jaya Mandiri Smart Energy",
  telephone: "+6281328190707",
  telephoneDisplay: "+62 813-2819-0707",
  streetAddress:
    "Tangkit Baru Residence Blok D15, Jl. H. Saing, RT.001/RW.001, Desa Tangkit Baru",
  addressLocality: "Kec. Sungai Gelam, Kab. Muaro Jambi",
  addressRegion: "Jambi",
  postalCode: "36373",
  addressCountry: "ID",
  openingHours: {
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "08:00",
    closes: "17:00",
  },
  sameAs: [
    "https://www.facebook.com/share/1EMi46VPVc/",
    "https://www.instagram.com/desvandi101",
  ],
} as const;

/** Wilayah layanan — konsisten dengan copy situs (Sumatera & Jawa Bagian Barat). */
export const SERVICE_AREAS = [
  "Jambi",
  "Riau",
  "Sumatera Selatan",
  "Sumatera Barat",
  "Lampung",
  "Kepulauan Bangka Belitung",
  "Jakarta",
  "Jawa Barat",
] as const;

export interface BuildMetadataOptions {
  /** Path route, contoh: "/solar-home". Gunakan "/" untuk homepage. */
  path: string;
  /** Title tag lengkap. */
  title: string;
  /** Meta description (≤160 karakter ideal). */
  description: string;
  /** Gambar OG (path relatif). */
  ogImage?: string;
  /** Alt text gambar OG. */
  ogImageAlt?: string;
  /** Tipe OG (website/article). */
  ogType?: "website" | "article";
  /** Set true untuk halaman admin/internal agar noindex. */
  noIndex?: boolean;
}

/**
 * Membangun metadata per-route dengan canonical self-referencing
 * yang selalu menunjuk ke https://jambisolarpanel.vercel.app.
 */
export function buildMetadata({
  path,
  title,
  description,
  ogImage = DEFAULT_OG_IMAGE,
  ogImageAlt,
  ogType = "website",
  noIndex = false,
}: BuildMetadataOptions): Metadata {
  const canonicalPath = path === "/" ? "/" : path;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title,
      description,
      url: canonicalPath,
      siteName: SITE_NAME,
      type: ogType,
      locale: "id_ID",
      images: [
        {
          url: ogImage,
          width: 1344,
          height: 768,
          alt: ogImageAlt || title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

/* ============================================================
   JSON-LD builders — hanya berisi klaim yang didukung konten
   nyata di situs. Tidak ada rating/review yang tidak terverifikasi.
   ============================================================ */

/** LocalBusiness / Organization — NAP lengkap & konsisten. */
export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#organization`,
    name: BUSINESS_NAP.name,
    legalName: BUSINESS_NAP.legalName,
    description:
      "Jasa pasang panel surya & instalasi PLTS (pembangkit listrik tenaga surya) untuk rumah, bisnis, kebun, dan infrastruktur di Jambi, Sumatera, dan Jawa Bagian Barat. Layanan: PLTS off-grid & hybrid, PJUTS, solar pump, EV charging, smart monitoring, dan maintenance.",
    url: `${SITE_URL}/`,
    telephone: BUSINESS_NAP.telephone,
    image: `${SITE_URL}/hero-solar.jpg`,
    logo: `${SITE_URL}/logo-jmse.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS_NAP.streetAddress,
      addressLocality: BUSINESS_NAP.addressLocality,
      addressRegion: BUSINESS_NAP.addressRegion,
      postalCode: BUSINESS_NAP.postalCode,
      addressCountry: BUSINESS_NAP.addressCountry,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [...BUSINESS_NAP.openingHours.days],
      opens: BUSINESS_NAP.openingHours.opens,
      closes: BUSINESS_NAP.openingHours.closes,
    },
    sameAs: [...BUSINESS_NAP.sameAs],
    areaServed: SERVICE_AREAS.map((area) => ({
      "@type": "AdministrativeArea",
      name: area,
    })),
    serviceType: [
      "Instalasi PLTS Off-Grid",
      "Instalasi PLTS Hybrid",
      "PJUTS - Penerangan Jalan Umum Tenaga Surya",
      "Solar Water Pump",
      "EV Charging Terintegrasi PLTS",
      "Smart Monitoring & Solar CCTV",
      "Maintenance PLTS",
      "Tender & Procurement Energi Terbarukan",
    ],
  };
}

/** BreadcrumbList dari daftar item. */
export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path === "/" ? "/" : item.path}`,
    })),
  };
}

/** Service schema untuk halaman layanan. */
export function serviceJsonLd({
  name,
  description,
  path,
  serviceType,
}: {
  name: string;
  description: string;
  path: string;
  serviceType: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    serviceType,
    url: `${SITE_URL}${path}`,
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
  };
}

/** Article schema untuk halaman artikel blog. */
export function articleJsonLd({
  title,
  description,
  path,
  datePublished,
  dateModified,
  image,
}: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image: image ? `${SITE_URL}${image}` : `${SITE_URL}${DEFAULT_OG_IMAGE}`,
    datePublished,
    dateModified: dateModified || datePublished,
    inLanguage: "id-ID",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}${path}`,
    },
    author: {
      "@type": "Organization",
      name: BRAND_NAME,
      url: `${SITE_URL}/tentang-kami`,
    },
    publisher: {
      "@type": "Organization",
      name: BUSINESS_NAP.name,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo-jmse.png`,
      },
    },
  };
}

/** FAQPage schema — HARUS dibangun dari sumber data yang sama dengan UI FAQ. */
export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };
}

/** WebSite schema untuk homepage. */
export function webSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    inLanguage: "id-ID",
    publisher: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: BRAND_NAME,
    },
  };
}
