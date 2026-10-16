import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Laptop Makassar | Jual Beli & Rental Laptop Terpercaya",
  description:
    "Toko laptop jual beli & rental terpercaya di Makassar. Laptop baru, second berkualitas, garansi resmi. Chat WhatsApp untuk konsultasi gratis.",
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png", sizes: "any" },
    ],
    apple: "/icon.png",
    shortcut: "/icon.png",
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-brand-onyx">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}