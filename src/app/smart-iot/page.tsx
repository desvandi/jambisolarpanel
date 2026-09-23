import type { Metadata } from "next";
import SmartIoTPage from "./SmartIoTPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata, serviceJsonLd, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  path: "/smart-iot",
  title: "Monitoring PLTS & Solar CCTV Jambi | Smart IoT",
  description:
    "Monitoring real-time performa PLTS dan CCTV tenaga surya tanpa kabel untuk lokasi kebun, tambak, dan proyek di Jambi. Paket Basic, Standard, Industrial mulai Rp 4.600.000.",
  ogImageAlt: "Smart IoT monitoring PLTS dan solar CCTV — Jambi Solar Panel",
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={serviceJsonLd({
          name: "Smart IoT Monitoring & Solar CCTV",
          description:
            "Monitoring real-time performa PLTS dan CCTV tenaga surya tanpa kabel. Paket Basic, Standard, dan Industrial mulai Rp 4.600.000.",
          path: "/smart-iot",
          serviceType: "Smart Monitoring & Solar CCTV",
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Smart IoT & CCTV", path: "/smart-iot" },
        ])}
      />
      <SmartIoTPage />
    </>
  );
}
