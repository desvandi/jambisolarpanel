"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Building2,
  Sun,
  Droplets,
  Car,
  Cpu,
  Wrench,
  FileText,
  CalendarCheck,
  Tag,
  FolderKanban,
  ArrowRight,
} from "lucide-react";

/**
 * Internal linking antar halaman layanan.
 * Muncul di semua service page — membantu Google memahami relasi
 * antar halaman dan menyebar authority internal.
 */
const allLinks = [
  { label: "Panel Surya Rumah", href: "/solar-home", icon: Home },
  { label: "PLTS Bisnis & Industri", href: "/solar-commercial", icon: Building2 },
  { label: "PJUTS — Lampu Jalan Surya", href: "/pjuts", icon: Sun },
  { label: "Solar Pump — Pompa Air", href: "/solar-pump", icon: Droplets },
  { label: "EV Charging", href: "/ev-charging", icon: Car },
  { label: "Smart IoT & CCTV", href: "/smart-iot", icon: Cpu },
  { label: "Maintenance PLTS", href: "/maintenance", icon: Wrench },
  { label: "Tender & Pengadaan", href: "/tender-procurement", icon: FileText },
  { label: "Sewa PLTS Bayar Bulanan", href: "/sewa-plts", icon: CalendarCheck },
  { label: "Harga Panel Surya Jambi", href: "/harga-panel-surya-jambi", icon: Tag },
  { label: "Proyek & Studi Kasus", href: "/proyek", icon: FolderKanban },
];

export function RelatedServices() {
  const pathname = usePathname();
  const links = allLinks.filter((l) => l.href !== pathname).slice(0, 8);

  return (
    <section className="py-14 md:py-16 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl sm:text-2xl font-bold text-navy dark:text-white mb-6">
          Layanan &amp; Halaman Terkait
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group flex items-center gap-3 p-4 rounded-xl bg-card border border-border hover:border-solar/30 hover:shadow-md transition-all duration-200"
            >
              <div className="w-10 h-10 rounded-lg bg-solar/10 flex items-center justify-center flex-shrink-0 group-hover:bg-solar transition-colors">
                <link.icon className="w-5 h-5 text-solar group-hover:text-white transition-colors" />
              </div>
              <span className="text-sm font-semibold text-navy dark:text-white group-hover:text-solar transition-colors flex-1">
                {link.label}
              </span>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-solar group-hover:translate-x-1 transition-all flex-shrink-0" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
