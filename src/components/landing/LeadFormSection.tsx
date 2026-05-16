"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, User, MapPin, Zap, Phone } from "lucide-react";

const WA_LINK = "https://wa.me/6281328190707";

export function LeadFormSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [form, setForm] = useState({
    name: "",
    location: "",
    need: "",
    phone: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Halo PT. Jaya Mandiri Smart Energy,%0A%0ASaya ingin konsultasi panel surya:%0ANama: ${form.name}%0ALokasi: ${form.location}%0AKebutuhan: ${form.need}%0ANo. WA: ${form.phone}`;
    window.open(`${WA_LINK}?text=${message}`, "_blank");
    setSubmitted(true);
  };

  return (
    <section className="py-20 md:py-28 bg-background" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold text-solar bg-solar/10 rounded-full">
              Hubungi Kami
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy dark:text-white mb-6 leading-tight">
              Siap Beralih ke{" "}
              <span className="gradient-text">Energi Surya?</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Isi form di samping atau langsung hubungi kami via WhatsApp.
              Tim profesional kami siap membantu Anda dari konsultasi awal
              hingga instalasi selesai.
            </p>

            <div className="space-y-4">
              {[
                {
                  icon: User,
                  title: "Desvandi - Founder",
                  desc: "Pengawasan langsung setiap proyek",
                },
                {
                  icon: Phone,
                  title: "0813-2819-0707",
                  desc: "WhatsApp & Telepon",
                },
                {
                  icon: MapPin,
                  title: "Jambi, Indonesia",
                  desc: "Melayani seluruh Indonesia",
                },
                {
                  icon: Zap,
                  title: "Respon Cepat",
                  desc: "Balas dalam 15 menit pada jam kerja",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex items-start gap-4 p-4 rounded-xl bg-muted/50 border border-border"
                >
                  <div className="w-10 h-10 rounded-lg bg-solar/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-solar" />
                  </div>
                  <div>
                    <p className="font-semibold text-navy dark:text-white text-sm">
                      {item.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="p-6 sm:p-8 rounded-2xl bg-card border border-border shadow-xl">
              <h3 className="text-xl font-bold text-navy dark:text-white mb-2">
                Konsultasi Gratis
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                Isi data Anda dan tim kami akan menghubungi segera.
              </p>

              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-solar/10 flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-solar" />
                  </div>
                  <h4 className="text-lg font-bold text-navy dark:text-white mb-2">
                    Terima kasih!
                  </h4>
                  <p className="text-muted-foreground">
                    Pesan Anda sedang dikirim via WhatsApp. Tim kami akan segera
                    merespons.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-navy dark:text-white mb-1.5">
                      Nama Lengkap
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                        placeholder="Masukkan nama Anda"
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-solar/50 focus:border-solar transition-all text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-navy dark:text-white mb-1.5">
                      Lokasi / Kota
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type="text"
                        required
                        value={form.location}
                        onChange={(e) =>
                          setForm({ ...form, location: e.target.value })
                        }
                        placeholder="Contoh: Jambi, Palembang"
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-solar/50 focus:border-solar transition-all text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-navy dark:text-white mb-1.5">
                      Kebutuhan Listrik
                    </label>
                    <div className="relative">
                      <Zap className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <select
                        required
                        value={form.need}
                        onChange={(e) =>
                          setForm({ ...form, need: e.target.value })
                        }
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-solar/50 focus:border-solar transition-all text-sm appearance-none"
                      >
                        <option value="">Pilih kebutuhan</option>
                        <option value="Rumah Tangga (1-5 kWp)">
                          Rumah Tangga (1-5 kWp)
                        </option>
                        <option value="Bisnis/UMKM (10-50 kWp)">
                          Bisnis / UMKM (10-50 kWp)
                        </option>
                        <option value="Industri (100+ kWp)">
                          Industri (100+ kWp)
                        </option>
                        <option value="Kebun/Perkebunan Off-Grid">
                          Kebun / Perkebunan (Off-Grid)
                        </option>
                        <option value="Instansi/Institusi">
                          Instansi / Institusi
                        </option>
                        <option value="Custom/Lainnya">Custom / Lainnya</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-navy dark:text-white mb-1.5">
                      Nomor WhatsApp
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(e) =>
                          setForm({ ...form, phone: e.target.value })
                        }
                        placeholder="08xxxxxxxxxx"
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-solar/50 focus:border-solar transition-all text-sm"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-4 bg-solar hover:bg-solar-dark text-white font-bold text-base rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-solar/30"
                  >
                    <Send className="w-5 h-5" />
                    Kirim via WhatsApp
                  </button>

                  <p className="text-xs text-center text-muted-foreground">
                    Data Anda aman dan tidak akan disebarluaskan. Kami menghormati
                    privasi Anda.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
