import Link from "next/link";
import { ArrowRight, Laptop, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { dummyProducts } from "@/lib/data/products";

export default function ViewAllCTA() {
  const totalProducts = dummyProducts.length;

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="relative bg-gradient-to-br from-brand-onyx via-brand-red-dark to-brand-red rounded-3xl overflow-hidden p-8 md:p-16 text-center">
          {/* Decorative blur */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-red/30 rounded-full blur-3xl" />

          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.3) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6 text-white">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5">
              <Sparkles className="w-4 h-4 text-brand-gold" />
              <span className="text-sm font-medium">
                {totalProducts}+ produk pilihan
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl md:text-5xl font-extrabold leading-tight">
              Masih Banyak Pilihan
              <br />
              <span className="text-brand-gold">Laptop Lainnya</span>
            </h2>

            {/* Subheading */}
            <p className="text-lg text-white/80 max-w-xl mx-auto">
              Dari gaming high-end, ultrabook tipis, sampai laptop kantoran
              terjangkau — semua ada di katalog lengkap kami.
            </p>

            {/* CTA Button */}
            <div className="pt-4">
              <Link href="/products">
                <Button
                  size="lg"
                  className="bg-brand-gold hover:bg-yellow-400 text-brand-onyx font-bold gap-2 h-14 px-8 text-base shadow-2xl hover:scale-105 transition-transform"
                >
                  <Laptop className="w-5 h-5" />
                  Lihat Selengkapnya
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/10 max-w-lg mx-auto">
              <div>
                <p className="text-2xl md:text-3xl font-extrabold text-brand-gold">
                  {totalProducts}+
                </p>
                <p className="text-xs md:text-sm text-white/70 uppercase tracking-wider mt-1">
                  Produk
                </p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-extrabold text-brand-gold">
                  9+
                </p>
                <p className="text-xs md:text-sm text-white/70 uppercase tracking-wider mt-1">
                  Brand
                </p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-extrabold text-brand-gold">
                  24/7
                </p>
                <p className="text-xs md:text-sm text-white/70 uppercase tracking-wider mt-1">
                  Support
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}