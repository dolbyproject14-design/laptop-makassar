import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Mail,
  UsersRound,
  Camera,
  CirclePlay,
  MessageCircle,
} from "lucide-react";
import { waGeneralInquiry, WA_NUMBER } from "@/lib/whatsapp";

const footerLinks = {
  belanja: [
    { name: "Laptop Gaming", href: "/products" },
    { name: "Laptop Ultrabook", href: "/products" },
    { name: "Laptop Business", href: "/products" },
    { name: "Laptop Office", href: "/products" },
    { name: "Rental Laptop", href: "/products" },
    { name: "Semua Katalog", href: "/products" },
  ],
  layanan: [
    { name: "Tentang Kami", href: "/#tentang" },
    { name: "Cara Pemesanan", href: "/#faq" },
    { name: "Garansi & Retur", href: "/#faq" },
    { name: "Kredit 0%", href: "/#faq" },
    { name: "Konsultasi Gratis", href: "/#kontak" },
    { name: "FAQ", href: "/#faq" },
  ],
  akun: [
    { name: "Cek Produk Terbaru", href: "/products" },
    { name: "Lacak Pesanan", href: waGeneralInquiry() },
    { name: "Hubungi Admin", href: waGeneralInquiry() },
    { name: "Request Laptop", href: waGeneralInquiry() },
    { name: "Kerjasama Bisnis", href: waGeneralInquiry() },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-brand-onyx text-gray-300 mt-20">
      <div className="container mx-auto px-4 py-12 md:py-16">
        {/* Top: Brand + Payment */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 mb-8 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 bg-white rounded-xl p-1 shrink-0">
              <Image
                src="/images/logo.png"
                alt="Laptop Makassar"
                fill
                className="object-contain"
                sizes="48px"
              />
            </div>
            <div>
              <p className="font-extrabold text-white text-lg">
                Laptop<span className="text-brand-red">Makassar</span>
              </p>
              <p className="text-xs text-gray-400 uppercase tracking-wider">
                Jual · Beli · Rental
              </p>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-xs text-gray-500 uppercase tracking-wider">
              Pembayaran:
            </span>
            <div className="flex items-center gap-2 flex-wrap">
              {["BCA", "Mandiri", "BNI", "BRI", "OVO", "DANA", "GoPay"].map(
                (method) => (
                  <span
                    key={method}
                    className="px-2.5 py-1 bg-white/5 border border-white/10 rounded text-[10px] font-semibold text-gray-300"
                  >
                    {method}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {/* Hubungi Kami */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">
              Hubungi Kami
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2">
                <MapPin className="w-4 h-4 text-brand-red shrink-0 mt-0.5" />
                <span className="text-gray-400">
                  Jl. Mangka DG. Bombong, Paccinongang, Kec. Somba Opu,
                  Kabupaten Gowa, Sulawesi Selatan 92111
                </span>
              </li>
              <li className="flex gap-2">
                <Phone className="w-4 h-4 text-brand-red shrink-0 mt-0.5" />
                <a
                  href={`tel:+${WA_NUMBER}`}
                  className="text-gray-400 hover:text-brand-gold transition-colors"
                >
                  +{WA_NUMBER}
                </a>
              </li>
              <li className="flex gap-2">
                <Mail className="w-4 h-4 text-brand-red shrink-0 mt-0.5" />
                <a
                  href="mailto:info@laptopmakassar.id"
                  className="text-gray-400 hover:text-brand-gold transition-colors"
                >
                  info@laptopmakassar.id
                </a>
              </li>
              <li className="text-gray-400 text-xs pt-2 border-t border-white/10">
                Senin - Sabtu: 09.00 - 18.00
                <br />
                Minggu: Tutup
              </li>
            </ul>
          </div>

          {/* Belanja Produk */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">
              Belanja Produk
            </h4>
            <ul className="space-y-2 text-sm">
              {footerLinks.belanja.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-brand-gold transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Layanan */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">
              Layanan
            </h4>
            <ul className="space-y-2 text-sm">
              {footerLinks.layanan.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-brand-gold transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Akun & Bantuan */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">
              Akun & Bantuan
            </h4>
            <ul className="space-y-2 text-sm">
              {footerLinks.akun.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      link.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="text-gray-400 hover:text-brand-gold transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Tetap Terhubung */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">
              Tetap Terhubung
            </h4>
            <p className="text-gray-400 text-sm mb-4">
              Ikuti kami untuk info promo & produk terbaru
            </p>
            <div className="flex gap-3 mb-4">
              <a
                href="https://www.facebook.com/share/1GtPetUZzN/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 bg-white/5 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors"
              >
                <UsersRound className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/laptop_makassar/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 bg-white/5 hover:bg-pink-600 rounded-lg flex items-center justify-center transition-colors"
              >
                <Camera className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-10 h-10 bg-white/5 hover:bg-red-600 rounded-lg flex items-center justify-center transition-colors"
              >
                <CirclePlay className="w-5 h-5" />
              </a>
            </div>

            <a
              href={waGeneralInquiry()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors w-full justify-center"
            >
              <MessageCircle className="w-4 h-4" />
              Chat WhatsApp
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>
            &copy; 2026 Laptop Makassar. All rights reserved.
          </p>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <Link href="/#faq" className="hover:text-brand-gold">
              Syarat & Ketentuan
            </Link>
            <Link href="/#faq" className="hover:text-brand-gold">
              Kebijakan Privasi
            </Link>
            <span>Dibuat dengan ❤️ di Makassar</span>
          </div>
        </div>
      </div>
    </footer>
  );
}