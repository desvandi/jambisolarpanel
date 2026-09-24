import type { Metadata } from "next";
import EVChargingPage from "./EVChargingPage";
import { ServicePageLayout } from "@/components/landing/ServicePageLayout";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata, serviceJsonLd, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  path: "/ev-charging",
  title: "EV Charging Solar Jambi | Charger Kendaraan Listrik + PLTS",
  description:
    "Charger AC 7.2kW terintegrasi PLTS untuk kendaraan listrik di Jambi. Isi daya EV dari energi matahari. Paket mulai Rp 25 juta (charger only) hingga paket solar lengkap.",
  ogImageAlt: "EV charging terintegrasi panel surya — charger kendaraan listrik di Jambi",
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={serviceJsonLd({
          name: "EV Charging Terintegrasi PLTS",
          description:
            "Instalasi EV charging terintegrasi panel surya untuk rumah dan bisnis di Jambi. Charger AC 7.2kW, paket mulai Rp 25 juta.",
          path: "/ev-charging",
          serviceType: "EV Charging Terintegrasi PLTS",
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "EV Charging", path: "/ev-charging" },
        ])}
      />
      <ServicePageLayout
      subBrand="Jambi Solar EV"
      currentPath="/ev-charging"
      termIds={["ev-charging", "plts", "on-grid", "kwh", "hybrid", "tarif-pln"]}
      title="EV Charging Terintegrasi PLTS"
      tagline="Isi daya kendaraan listrik Anda dengan energi surya — hemat & mandiri."
      description="Solusi EV Charging terintegrasi dengan PLTS. Charger AC 7.2kW yang kompatibel dengan semua kendaraan listrik di Indonesia. Pilih charger standalone atau paket terintegrasi dengan PLTS untuk penghematan maksimal."
      breadcrumbs={[{ label: "Solusi", href: "/" }, { label: "EV Charging" }]}
      waText="Halo PT. Jaya Mandiri Smart Energy, saya tertarik dengan EV Charging terintegrasi PLTS. Mohon informasi lebih lanjut."
      >
        <EVChargingPage />
      </ServicePageLayout>
    </>
  );
}
