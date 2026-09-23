import type { Metadata } from "next";
import PJUTSPage from "./PJUTSPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata, serviceJsonLd, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  path: "/pjuts",
  title: "PJUTS Jambi | Lampu Jalan Tenaga Surya",
  description:
    "Paket PJUTS (Penerangan Jalan Umum Tenaga Surya) 30W-150W untuk jalan desa, perkebunan, dan kawasan industri di Jambi. Tanpa kabel PLN, auto on/off, garansi 3 tahun. Mulai Rp 4.500.000.",
  ogImageAlt: "PJUTS — lampu jalan tenaga surya untuk jalan desa dan perkebunan Jambi",
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={serviceJsonLd({
          name: "PJUTS — Penerangan Jalan Umum Tenaga Surya",
          description:
            "Instalasi PJUTS 30W-150W untuk jalan desa, perkebunan, dan kawasan industri di Jambi. Tanpa kabel PLN, auto on/off, garansi 3 tahun.",
          path: "/pjuts",
          serviceType: "PJUTS - Penerangan Jalan Umum Tenaga Surya",
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "PJUTS", path: "/pjuts" },
        ])}
      />
      <PJUTSPage />
    </>
  );
}
