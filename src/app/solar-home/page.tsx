import type { Metadata } from "next";
import SolarHomePage from "./SolarHomePage";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata, serviceJsonLd, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  path: "/solar-home",
  title: "Panel Surya Rumah Jambi | PLTS Hybrid & Off-Grid",
  description:
    "Paket panel surya rumah tangga 1.3–5.2 kWp dengan opsi baterai LiFePO4. Kurangi tagihan listrik & tetap nyala saat PLN padam. Survei gratis, garansi resmi, melayani Jambi & sekitarnya.",
  ogImageAlt: "Instalasi panel surya untuk rumah tangga di Jambi — PLTS hybrid & off-grid",
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={serviceJsonLd({
          name: "Panel Surya Rumah — PLTS Hybrid & Off-Grid",
          description:
            "Instalasi panel surya untuk rumah tangga di Jambi. Paket PLTS 1.3–5.2 kWp dengan inverter hybrid, opsi baterai LiFePO4, dan garansi resmi.",
          path: "/solar-home",
          serviceType: "Instalasi PLTS Rumah Tangga",
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Panel Surya Rumah", path: "/solar-home" },
        ])}
      />
      <SolarHomePage />
    </>
  );
}
