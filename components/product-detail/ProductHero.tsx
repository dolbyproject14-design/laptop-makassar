import Link from "next/link";
import { Check, ChevronRight, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/lib/data/products";

const formatRupiah = (n: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(n);

export default function ProductHero({ product }: { product: Product }) {
  return (
    <section className="relative bg-gradient-to-br from-brand-onyx to-brand-red-dark text-white overflow-hidden">
      {/* Decorative blur */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-red/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-gold/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* LEFT: Text */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5">
              <span className="text-sm font-semibold text-brand-gold uppercase tracking-wider">
                {product.brand} · {product.category}
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              {product.name}
            </h1>

            <p className="text-lg text-white/80 leading-relaxed">
              {product.description}
            </p>

            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-4xl md:text-5xl font-extrabold text-brand-gold">
                {formatRupiah(product.price)}
              </span>
              <Badge
                className={
                  product.condition === "Baru"
                    ? "bg-brand-red text-white text-sm px-3 py-1"
                    : "bg-brand-gold text-brand-onyx text-sm px-3 py-1"
                }
              >
                {product.condition}
              </Badge>
            </div>

            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2 text-sm text-green-400">
                <Check className="w-4 h-4" />
                <span className="font-medium">Tersedia · Siap Kirim</span>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-brand-gold text-brand-gold"
                  />
                ))}
                <span className="text-xs text-white/70 ml-1">(4.9)</span>
              </div>
            </div>

            {/* Quick highlights */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10">
              <div className="flex items-center gap-2 text-sm">
                <Check className="w-4 h-4 text-brand-gold shrink-0" />
                <span className="text-white/80">{product.specs.cpu}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Check className="w-4 h-4 text-brand-gold shrink-0" />
                <span className="text-white/80">{product.specs.ram}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Check className="w-4 h-4 text-brand-gold shrink-0" />
                <span className="text-white/80">{product.specs.gpu}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Check className="w-4 h-4 text-brand-gold shrink-0" />
                <span className="text-white/80">{product.specs.storage}</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Image */}
          <div className="relative">
            <div className="relative aspect-square bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden p-8">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-contain drop-shadow-2xl"
              />
            </div>

            {/* Floating badges */}
            <div className="absolute -top-4 -right-4 bg-brand-gold text-brand-onyx rounded-2xl px-4 py-3 shadow-2xl rotate-3">
              <p className="text-2xl font-extrabold leading-none">
                {product.category === "Gaming" ? "🎮" : product.category === "Ultrabook" ? "⚡" : "💼"}
              </p>
              <p className="text-[10px] font-bold mt-1">{product.category}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}