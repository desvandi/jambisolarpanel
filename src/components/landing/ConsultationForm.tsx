"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Send } from "lucide-react";

const kebutuhanOptions = [
  "PLTS Rumah",
  "PLTS Bisnis",
  "PJUTS",
  "Solar Pump",
  "EV Charging",
  "Smart IoT",
  "Tender & Procurement",
  "Maintenance",
  "Lainnya",
];

export function ConsultationForm() {
  const [form, setForm] = useState({
    nama: "",
    email: "",
    hp: "",
    kebutuhan: "PLTS Rumah",
    pesan: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Halo PT. Jaya Mandiri Smart Energy,

Saya ingin konsultasi tentang layanan Anda.

* Nama: ${form.nama}
* Email: ${form.email}
* No. HP: ${form.hp}
* Kebutuhan: ${form.kebutuhan}
* Pesan: ${form.pesan}

Mohon informasi lebih lanjut. Terima kasih.`;

    window.open(
      `https://wa.me/6281328190707?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="glass rounded-2xl p-6 sm:p-8"
    >
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-solar/10 mb-4">
          <MessageCircle className="w-6 h-6 text-solar" />
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-navy dark:text-white mb-2">
          Konsultasi Gratis
        </h3>
        <p className="text-muted-foreground">
          Isi form di bawah dan tim kami akan menghubungi Anda via WhatsApp
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-navy dark:text-white mb-1.5">
              Nama Lengkap
            </label>
            <input
              type="text"
              required
              value={form.nama}
              onChange={(e) => setForm({ ...form, nama: e.target.value })}
              placeholder="Masukkan nama Anda"
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-solar focus:border-transparent outline-none transition-all text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy dark:text-white mb-1.5">
              Email
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="email@contoh.com"
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-solar focus:border-transparent outline-none transition-all text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-navy dark:text-white mb-1.5">
              No. HP / WhatsApp
            </label>
            <input
              type="tel"
              required
              value={form.hp}
              onChange={(e) => setForm({ ...form, hp: e.target.value })}
              placeholder="08xxxxxxxxxx"
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-solar focus:border-transparent outline-none transition-all text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy dark:text-white mb-1.5">
              Kebutuhan
            </label>
            <select
              value={form.kebutuhan}
              onChange={(e) => setForm({ ...form, kebutuhan: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-solar focus:border-transparent outline-none transition-all text-sm"
            >
              {kebutuhanOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-navy dark:text-white mb-1.5">
            Pesan (Opsional)
          </label>
          <textarea
            rows={3}
            value={form.pesan}
            onChange={(e) => setForm({ ...form, pesan: e.target.value })}
            placeholder="Jelaskan kebutuhan Anda secara singkat..."
            className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-solar focus:border-transparent outline-none transition-all text-sm resize-none"
          />
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-solar hover:bg-solar-dark text-white font-bold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-solar/30 hover:scale-[1.02]"
        >
          <Send className="w-4 h-4" />
          Kirim via WhatsApp
        </button>
      </form>
    </motion.div>
  );
}
