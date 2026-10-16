import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Zap } from "lucide-react";
import { dummyProducts } from "@/lib/data/products";

export default function HeroSection() {
  const flagship =
    dummyProducts.find((p) => p.slug === "asus-rog-strix-g16") ||
    dummyProducts[0];

  return (
    <section className="relative bg-brand-onyx text-white overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-brand-red/10 rounded-full blur-[120px]" />

      {/* Red accent lines */}
      <div className="absolute top-0 left-[15%] w-px h-full bg-gradient-to-b from-transparent via-brand-red/50 to-transparent" />
      <div className="absolute top-0 right-[15%] w-px h-full bg-gradient-to-b from-transparent via-brand-red/30 to-transparent" />

      <div className="container mx-auto px-4 pt-16 md:pt-24 pb-20 relative z-10">
        {/* Top Label */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 border border-brand-red/40 bg-brand-red/10 px-4 py-1.5">
            <span className="w-1.5 h-1.5 bg-brand-red rounded-full animate-pulse" />
            <span className="label-uppercase text-brand-red">
              Authorized Dealer · Makassar
            </span>
          </div>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-5xl mx-auto">
          <h1 className="display-heading text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] mb-6">
            <span className="block">LAPTOP</span>
            <span className="block text-brand-red">MAKASSAR</span>
          </h1>

          <p className="text-base md:text-lg text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
            Laptop gaming, ultrabook, dan laptop bisnis kelas atas.
            <br className="hidden md:block" />
            Semua brand resmi, semua original. Harga bersaing di Makassar.
          </p>

          {/* CTA */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
            <Link
              href="/products"
              className="group inline-flex items-center gap-3 bg-brand-red hover:bg-brand-red-dark text-white px-8 py-4 text-sm font-black uppercase tracking-widest transition-colors"
            >
              Jelajahi Katalog
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="https://wa.me/6282296497423?text=Assalamualaikum,%20saya%20mau%20konsultasi%20laptop%20berikan%20informasi%20lebih%20lanjut."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 border border-white/20 hover:border-white/40 hover:bg-white/5 text-white px-8 py-4 text-sm font-black uppercase tracking-widest transition-colors"
            >
              <Zap className="w-4 h-4" />
              Konsultasi Gratis
            </a>
          </div>
        </div>

        {/* Featured Product — Cinematic */}
        <div className="relative max-w-6xl mx-auto">
          <Link
            href={`/products/${flagship.slug}`}
            className="group block relative"
          >
            {/* Product Image */}
            <div className="relative aspect-[16/10] md:aspect-[16/8] overflow-hidden">
              <Image
                src={flagship.imageUrl}
                alt={flagship.name}
                fill
                className="object-cover opacity-70 group-hover:opacity-90 group-hover:scale-[1.02] transition-all duration-700"
                priority
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-onyx via-brand-onyx/40 to-transparent" />
            </div>

            {/* Product Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
              <div className="flex items-end justify-between gap-4 flex-wrap">
                <div>
                  <p className="label-uppercase text-brand-red mb-2">
                    Featured Product
                  </p>
                  <h2 className="display-heading text-3xl md:text-5xl text-white mb-2">
                    {flagship.name}
                  </h2>
                  <p className="text-sm text-white/60 max-w-xl">
                    {flagship.specs.cpu} · {flagship.specs.ram} ·{" "}
                    {flagship.specs.gpu}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-xs uppercase tracking-widest text-white/40 mb-1">
                    Mulai dari
                  </p>
                  <p className="text-2xl md:text-3xl font-black text-brand-red">
                    Rp {flagship.price.toLocaleString("id-ID")}
                  </p>
                </div>
              </div>
            </div>
          </Link>

          {/* Corner Brackets */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-brand-red/60 pointer-events-none" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-brand-red/60 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-brand-red/60 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-brand-red/60 pointer-events-none" />
        </div>

        {/* Bottom Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {[
            { value: "64+", label: "Laptop Tersedia" },
            { value: "10+", label: "Brand Resmi" },
            { value: "2.5K+", label: "Customer Puas" },
            { value: "5 Thn", label: "Pengalaman" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl md:text-4xl font-black text-white mb-1">
                {stat.value}
              </p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}