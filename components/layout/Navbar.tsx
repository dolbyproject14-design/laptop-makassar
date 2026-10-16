"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Menu, X, MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "6282296497423"; // ⭐ satu sumber, gak dobel
const WHATSAPP_MESSAGE = "Assalamualaikum, saya mau tanya soal laptop";

const NAV_LINKS = [
  { name: "Beranda", href: "/" },
  { name: "Beli Laptop", href: "/products" },
  { name: "Rental", href: "/rentals" },
  { name: "Testimoni", href: "/#testimoni" },
  { name: "Kontak", href: "/#kontak" },
];

const WA_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE
)}`;

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const menuButton = menuButtonRef.current;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      menuButton?.focus();
    };
  }, [isOpen]);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-xl overflow-hidden border border-gray-100 shadow-sm group-hover:scale-105 transition-transform">
              <Image
                src="/images/logo.png"
                alt="Laptop Makassar"
                fill
                className="object-contain p-0.5"
                priority
                sizes="56px"
              />
            </div>
            <div className="block leading-tight min-w-0">
              <p className="font-extrabold text-brand-onyx text-[0.7rem] sm:text-base">
                Laptop<span className="text-brand-red">Makassar</span>
              </p>
              <p className="text-[9px] sm:text-[10px] text-gray-500 uppercase tracking-wider font-medium">
                Jual · Beli · Rental
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-brand-red hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-colors shadow-sm hover:shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              Chat WhatsApp
            </a>

            {/* Mobile Menu Button */}
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setIsOpen((open) => !open)}
              className="lg:hidden relative z-10 flex min-h-11 min-w-11 touch-manipulation select-none items-center justify-center rounded-lg hover:bg-gray-100 active:bg-gray-100"
              aria-label={isOpen ? "Tutup menu" : "Buka menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {isOpen && (
        <>
          <button
            type="button"
            aria-label="Tutup menu"
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
            onClick={() => setIsOpen(false)}
          />
          <aside
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Menu navigasi"
            className="fixed inset-y-0 right-0 z-50 flex h-dvh w-[min(85vw,22rem)] flex-col bg-white shadow-2xl lg:hidden"
          >
            <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
              <div>
                <p className="font-extrabold text-brand-onyx">
                  Laptop<span className="text-brand-red">Makassar</span>
                </p>
                <p className="text-[10px] font-medium uppercase tracking-wider text-gray-500">
                  Jual · Beli · Rental
                </p>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex min-h-11 min-w-11 items-center justify-center rounded-lg hover:bg-gray-100"
                aria-label="Tutup menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-4 py-5">
              <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
                pilihan menu
              </p>
              <div className="space-y-1">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block rounded-xl px-3 py-3 text-base font-medium text-gray-700 transition-colors hover:bg-red-50 hover:text-brand-red"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </nav>

            <div className="border-t border-gray-200 p-4">
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-green-500 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-600"
              >
                <MessageCircle className="h-4 w-4" />
                Chat WhatsApp
              </a>
            </div>
          </aside>
        </>
      )}
    </nav>
  );
}