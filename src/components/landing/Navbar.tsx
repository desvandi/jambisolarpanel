"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import Image from "next/image";
import Link from "next/link";

interface NavChild {
  label: string;
  href: string;
}

interface NavItem {
  label: string;
  href?: string;
  children?: NavChild[];
}

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Layanan",
    children: [
      { label: "Panel Surya Rumah", href: "/solar-home" },
      { label: "Panel Surya Bisnis & Industri", href: "/solar-commercial" },
      { label: "PJUTS — Lampu Jalan Surya", href: "/pjuts" },
      { label: "Solar Pump — Pompa Air", href: "/solar-pump" },
      { label: "EV Charging", href: "/ev-charging" },
      { label: "Smart IoT & CCTV", href: "/smart-iot" },
      { label: "Maintenance", href: "/maintenance" },
    ],
  },
  { label: "Tender & Pengadaan", href: "/tender-procurement" },
  { label: "Kalkulator", href: "#kalkulator" },
  { label: "FAQ", href: "#faq" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavClick = useCallback((href: string) => {
    setMobileOpen(false);
    setOpenDropdown(null);
    // Check if it's an internal anchor
    if (href.startsWith("#")) {
      // If we're on the home page, scroll to section
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else {
        // Navigate to home first, then scroll
        window.location.href = "/" + href;
      }
    }
    // External links (href starting with /) are handled by Link component
  }, []);

  const handleDropdownEnter = useCallback((label: string) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setOpenDropdown(label);
  }, []);

  const handleDropdownLeave = useCallback(() => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  }, []);

  const waText = "Halo%20PT.%20Jaya%20Mandiri%20Smart%20Energy,%20saya%20tertarik%20konsultasi%20gratis%20(melalui%20tombol%20di%20navbar)";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass shadow-lg shadow-black/5" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-solar flex items-center justify-center shadow-lg shadow-solar/30">
              <Image
                src="/logo-jmse.png"
                alt="JMSE Logo"
                width={40}
                height={40}
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-bold text-navy dark:text-white leading-tight">
                Jambi Solar Panel
              </p>
              <p className="text-[10px] font-semibold text-solar tracking-wider">
                by PT. Jaya Mandiri Smart Energy
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1" ref={dropdownRef}>
            {navItems.map((item) => {
              if (item.children) {
                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => handleDropdownEnter(item.label)}
                    onMouseLeave={handleDropdownLeave}
                  >
                    <button
                      className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                        openDropdown === item.label
                          ? "text-solar dark:text-solar bg-solar/5"
                          : "text-navy/70 dark:text-white/70 hover:text-solar dark:hover:text-solar hover:bg-solar/5"
                      }`}
                    >
                      {item.label}
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          openDropdown === item.label ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Dropdown */}
                    {openDropdown === item.label && (
                      <div className="absolute top-full left-0 mt-1 w-72 py-2 rounded-xl glass border border-border shadow-xl animate-in fade-in-0 zoom-in-95 duration-200">
                        <div className="px-3 py-2">
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            Layanan Jambi Solar Panel
                          </p>
                        </div>
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="flex items-center px-3 py-2.5 text-sm text-navy/80 dark:text-white/80 hover:text-solar dark:hover:text-solar hover:bg-solar/5 transition-colors mx-1 rounded-lg"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              if (item.href?.startsWith("#")) {
                return (
                  <button
                    key={item.label}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href!);
                    }}
                    className="px-3 py-2 text-sm font-medium text-navy/70 dark:text-white/70 hover:text-solar dark:hover:text-solar transition-colors duration-200 rounded-lg hover:bg-solar/5"
                  >
                    {item.label}
                  </button>
                );
              }

              return (
                <Link
                  key={item.label}
                  href={item.href!}
                  onClick={() => setOpenDropdown(null)}
                  className="px-3 py-2 text-sm font-medium text-navy/70 dark:text-white/70 hover:text-solar dark:hover:text-solar transition-colors duration-200 rounded-lg hover:bg-solar/5"
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <ThemeToggle />

            {/* CTA Desktop */}
            <a
              href={`https://wa.me/6281328190707?text=${waText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 bg-solar hover:bg-solar-dark text-white text-sm font-semibold rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-solar/30 hover:scale-105"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Konsultasi Gratis
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-10 h-10 rounded-xl bg-white/10 dark:bg-white/10 flex items-center justify-center"
              aria-label="Menu"
            >
              {mobileOpen ? (
                <X className="w-5 h-5 text-navy dark:text-white" />
              ) : (
                <Menu className="w-5 h-5 text-navy dark:text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden transition-all duration-300 overflow-hidden ${
            mobileOpen ? "max-h-[600px] pb-6" : "max-h-0"
          }`}
        >
          <div className="glass rounded-2xl p-4 space-y-1">
            {navItems.map((item) => {
              if (item.children) {
                return (
                  <div key={item.label}>
                    <button
                      onClick={() =>
                        setMobileSubmenu(
                          mobileSubmenu === item.label ? null : item.label
                        )
                      }
                      className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-navy dark:text-white hover:bg-solar/10 hover:text-solar rounded-xl transition-all"
                    >
                      {item.label}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          mobileSubmenu === item.label ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {mobileSubmenu === item.label && (
                      <div className="ml-4 pl-4 border-l-2 border-solar/20 space-y-1 mt-1 mb-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setMobileOpen(false)}
                            className="block px-4 py-2.5 text-sm text-muted-foreground hover:text-solar hover:bg-solar/5 rounded-lg transition-all"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              if (item.href?.startsWith("#")) {
                return (
                  <button
                    key={item.label}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href!);
                    }}
                    className="block w-full text-left px-4 py-3 text-sm font-medium text-navy dark:text-white hover:bg-solar/10 hover:text-solar rounded-xl transition-all"
                  >
                    {item.label}
                  </button>
                );
              }

              return (
                <Link
                  key={item.label}
                  href={item.href!}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 text-sm font-medium text-navy dark:text-white hover:bg-solar/10 hover:text-solar rounded-xl transition-all"
                >
                  {item.label}
                </Link>
              );
            })}

            <a
              href={`https://wa.me/6281328190707?text=${waText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-3 mt-3 bg-solar text-white text-sm font-semibold rounded-xl"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chat WhatsApp Sekarang
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
