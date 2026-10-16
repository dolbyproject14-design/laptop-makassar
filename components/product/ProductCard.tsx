import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { waProductInquiry } from "@/lib/whatsapp";
import type { Product } from "@/lib/data/products";

const formatRupiah = (n: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(n);

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block bg-brand-onyx border border-white/5 hover:border-brand-red/40 transition-all duration-300 overflow-hidden"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-black">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
        />

        {/* Condition Badge */}
        <div className="absolute top-3 left-3">
          <span
            className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 ${
              product.condition === "Baru"
                ? "bg-brand-red text-white"
                : "bg-brand-gold text-brand-onyx"
            }`}
          >
            {product.condition}
          </span>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-onyx via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Info */}
      <div className="p-5">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-2">
          {product.brand}
        </p>

        <h3 className="font-bold text-white text-sm leading-snug mb-3 line-clamp-2 min-h-[2.5rem] group-hover:text-brand-red transition-colors">
          {product.name}
        </h3>

        <p className="text-[11px] text-white/40 mb-4 leading-relaxed">
          {product.specs.cpu}
          <br />
          {product.specs.ram} · {product.specs.storage}
        </p>

        <div className="pt-4 border-t border-white/5 flex items-end justify-between gap-2">
          <div>
            <p className="text-[9px] uppercase tracking-widest text-white/30 mb-0.5">
              Harga
            </p>
            <p className="text-base font-black text-white">
              {formatRupiah(product.price)}
            </p>
          </div>
          <div className="w-8 h-8 bg-white/5 group-hover:bg-brand-red border border-white/10 group-hover:border-brand-red flex items-center justify-center transition-colors">
            <ArrowRight className="w-3.5 h-3.5 text-white" />
          </div>
        </div>
      </div>
    </Link>
  );
}