import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import { dummyProducts } from "@/lib/data/products";

export default function FeaturedProducts() {
  const featured = dummyProducts.slice(0, 9);

  return (
    <section className="bg-brand-dark py-20 md:py-28 border-t border-white/5">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <p className="label-uppercase text-brand-red mb-3">
              Terlaris
            </p>
            <h2 className="display-heading text-4xl md:text-6xl text-white">
              Laptop
              <br />
              <span className="text-white/40">Pilihan Kami</span>
            </h2>
          </div>
          <Link
            href="/products"
            className="hidden md:inline-flex items-center gap-2 border border-white/20 hover:border-brand-red hover:bg-brand-red text-white px-6 py-3 text-xs font-bold uppercase tracking-widest transition-colors"
          >
            Semua Produk
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-3 bg-brand-red hover:bg-brand-red-dark text-white px-8 py-4 text-sm font-black uppercase tracking-widest transition-colors"
          >
            Lihat Semua Produk disini
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}