import type { Metadata } from "next";
import SolarPumpPage from "./SolarPumpPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata, serviceJsonLd, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  path: "/solar-pump",
  title: "Solar Pump Jambi | Pompa Air Tenaga Surya",
  description:
    "Pompa air tenaga surya (solar pump) untuk irigasi kebun sawit, pertanian, dan peternakan di Jambi. Tanpa listrik PLN, mulai Rp 18.000.000. Submersible pump tahan lama.",
  ogImageAlt: "Solar pump — pompa air tenaga surya untuk kebun dan pertanian di Jambi",
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={serviceJsonLd({
          name: "Solar Pump — Pompa Air Tenaga Surya",
          description:
            "Instalasi pompa air tenaga surya untuk irigasi kebun sawit, pertanian, dan peternakan di Jambi. Tanpa listrik PLN, mulai Rp 18.000.000.",
          path: "/solar-pump",
          serviceType: "Solar Water Pump",
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Solar Pump", path: "/solar-pump" },
        ])}
      />
      <SolarPumpPage />
    </>
  );
}
