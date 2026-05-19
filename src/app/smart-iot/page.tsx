import { Metadata } from "next";
import SmartIoTPage from "./SmartIoTPage";

export const metadata: Metadata = {
  title: "Smart IoT Monitoring & Solar CCTV | PT. Jaya Mandiri Smart Energy",
  description: "Monitoring real-time performa PLTS + CCTV tenaga surya tanpa kabel. Basic, Standard, Industrial. Mulai dari Rp 4.600.000.",
};

export default function Page() {
  return <SmartIoTPage />;
}
