import type { Metadata } from "next";
import SolarCommercialPage from "./SolarCommercialPage";
import { ServicePageLayout } from "@/components/landing/ServicePageLayout";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata, serviceJsonLd, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  path: "/solar-commercial",
  title: "PLTS Bisnis & Industri Jambi | Instalasi Solar Panel",
  description:
    "Paket PLTS komersial 7.15–20.8 kWp untuk kantor, gudang, dan pabrik di Jambi. ROI lebih cepat berkat skala ekonomi. Monitoring & kanopi carport add-on tersedia.",
  ogImageAlt: "Instalasi PLTS untuk bisnis dan industri — panel surya komersial Jambi",
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={serviceJsonLd({
          name: "PLTS Bisnis & Industri",
          description:
            "Instalasi panel surya untuk bisnis dan industri di Jambi. Paket PLTS 7.15–20.8 kWp, inverter hybrid 1 & 3 fase, add-on monitoring dan kanopi carport.",
          path: "/solar-commercial",
          serviceType: "Instalasi PLTS Bisnis & Industri",
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "PLTS Bisnis & Industri", path: "/solar-commercial" },
        ])}
      />
      <ServicePageLayout
      subBrand="Jambi Solar Commercial"
      currentPath="/solar-commercial"
      termIds={["plts", "kwp", "kwh", "on-grid", "hybrid", "roi", "tarif-pln", "bos", "smart-monitoring", "panel-monokristalin"]}
      title="PLTS Bisnis & Industri — Efisiensi Energi untuk Profit Maksimal"
      tagline="Pangkas biaya listrik operasional dengan energi surya — simulasi ROI tersedia."
      description="Sistem PLTS skala besar untuk kantor, gudang, pabrik, hotel, dan fasilitas bisnis lainnya. Kapasitas 6.5 kWp hingga 20 kWp + baterai dengan opsi smart monitoring dan carport solar."
      breadcrumbs={[{ label: "Solusi", href: "/" }, { label: "Commercial Solar" }]}
      >
        <SolarCommercialPage />
      </ServicePageLayout>
    </>
  );
}
