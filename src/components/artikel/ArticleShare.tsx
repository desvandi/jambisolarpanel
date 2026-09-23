"use client";

import { useState, useSyncExternalStore } from "react";
import { Share2, Link2, Check } from "lucide-react";

/**
 * Tombol berbagi artikel — WhatsApp, Facebook, X, Telegram, dan salin tautan.
 * URL dibaca via useSyncExternalStore (server snapshot = string kosong)
 * sehingga tidak ada hydration mismatch maupun setState di dalam effect.
 */
const emptySubscribe = () => () => {};

export function ArticleShare({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);
  const url = useSyncExternalStore(
    emptySubscribe,
    () => window.location.href,
    () => ""
  );

  const encoded = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const links = [
    {
      label: "WhatsApp",
      href: `https://wa.me/?text=${encodedTitle}%20${encoded}`,
      icon: (
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      ),
      className: "hover:bg-[#25D366] hover:border-[#25D366] hover:text-white",
    },
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encoded}`,
      icon: (
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
      className: "hover:bg-[#1877F2] hover:border-[#1877F2] hover:text-white",
    },
    {
      label: "X",
      href: `https://x.com/intent/tweet?text=${encodedTitle}&url=${encoded}`,
      icon: (
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      className: "hover:bg-black hover:border-black hover:text-white dark:hover:bg-white dark:hover:border-white dark:hover:text-black",
    },
    {
      label: "Telegram",
      href: `https://t.me/share/url?url=${encoded}&text=${encodedTitle}`,
      icon: (
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
          <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.205-.446-1.816-.87-1.006-.645-1.59-1.05-2.565-1.682-1.13-.727-.4-1.128.25-1.782.17-.172 3.117-2.854 3.175-3.099.007-.03.014-.142-.053-.2s-.169-.039-.24-.023c-.105.024-1.765 1.122-4.98 3.296-.47.32-.897.478-1.281.47-.42-.009-1.224-.236-1.822-.43-.734-.237-1.316-.363-1.26-.767.028-.21.309-.426.843-.647 3.306-1.432 5.51-2.377 6.612-2.834 3.143-1.3 3.795-1.526 4.221-1.532z" />
        </svg>
      ),
      className: "hover:bg-[#229ED9] hover:border-[#229ED9] hover:text-white",
    },
  ];

  const copyLink = async () => {
    if (!url) return;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback browser lama
      const input = document.createElement("input");
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy dark:text-white">
        <Share2 className="w-4 h-4 text-solar" />
        Bagikan artikel:
      </span>
      <div className="flex items-center gap-2">
        {links.map((link) => (
          <a
            key={link.label}
            href={url ? link.href : "#"}
            onClick={(e) => {
              if (!url) e.preventDefault();
            }}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Bagikan ke ${link.label}`}
            title={`Bagikan ke ${link.label}`}
            className={`w-9 h-9 rounded-lg border border-border bg-card text-muted-foreground flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-md ${link.className}`}
          >
            {link.icon}
          </a>
        ))}
        <button
          onClick={copyLink}
          aria-label="Salin tautan artikel"
          title="Salin tautan"
          className={`w-9 h-9 rounded-lg border flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-md ${
            copied
              ? "border-solar bg-solar text-white"
              : "border-border bg-card text-muted-foreground hover:border-solar hover:text-solar"
          }`}
        >
          {copied ? <Check className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}
        </button>
        <span
          aria-live="polite"
          className={`text-xs font-medium text-solar transition-opacity duration-300 ${
            copied ? "opacity-100" : "opacity-0"
          }`}
        >
          Tautan tersalin!
        </span>
      </div>
    </div>
  );
}
