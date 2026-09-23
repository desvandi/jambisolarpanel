import type { Metadata } from "next";
import MaintenancePage from "./MaintenancePage";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata, serviceJsonLd, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  path: "/maintenance",
  title: "Maintenance Panel Surya Jambi | Servis PLTS",
  description:
    "Layanan maintenance & servis PLTS profesional di Jambi: perawatan rutin, tahunan, emergency repair, dan audit sistem. Melayani Jambi, Sumatera & Jawa Bagian Barat.",
  ogImageAlt: "Teknisi melakukan maintenance panel surya — servis PLTS Jambi",
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={serviceJsonLd({
          name: "Maintenance PLTS — Servis Panel Surya",
          description:
            "Layanan maintenance PLTS: perawatan rutin, tahunan, emergency repair, dan audit sistem. Melayani Jambi, Sumatera & Jawa Bagian Barat.",
          path: "/maintenance",
          serviceType: "Maintenance PLTS",
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Maintenance", path: "/maintenance" },
        ])}
      />
      <MaintenancePage />
    </>
  );
}
