import { Sparkles, Ruler, Palette, Layers } from "lucide-react";
import type { Product } from "@/lib/data/products";
import { getDesignData } from "@/lib/data/products";

export default function DesignSection({ product }: { product: Product }) {
  const design = getDesignData(product);

  return (
    <section className="py-16 md:py-24 bg-brand-onyx text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <p className="text-sm font-semibold text-brand-gold uppercase tracking-wider mb-2">
            Desain
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
            Dibuat untuk <span className="text-brand-gold">Performa & Gaya</span>
          </h2>
          <p className="text-lg text-white/70">
            Setiap detail dirancang dengan presisi tinggi, memadukan estetika
            modern dan durabilitas militer-grade.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative">
            <div className="aspect-video bg-gradient-to-br from-gray-900 to-black rounded-3xl overflow-hidden p-8 border border-white/10">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
                <Layers className="w-6 h-6 text-brand-gold mb-2" />
                <p className="text-xs text-white/50 uppercase tracking-wider mb-1">
                  Material
                </p>
                <p className="font-semibold text-sm">{design.material}</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
                <Palette className="w-6 h-6 text-brand-gold mb-2" />
                <p className="text-xs text-white/50 uppercase tracking-wider mb-1">
                  Warna
                </p>
                <p className="font-semibold text-sm">{design.color}</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
                <Ruler className="w-6 h-6 text-brand-gold mb-2" />
                <p className="text-xs text-white/50 uppercase tracking-wider mb-1">
                  Berat
                </p>
                <p className="font-semibold text-sm">{design.weight}</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
                <Sparkles className="w-6 h-6 text-brand-gold mb-2" />
                <p className="text-xs text-white/50 uppercase tracking-wider mb-1">
                  Ketebalan
                </p>
                <p className="font-semibold text-sm">{design.thickness}</p>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-semibold text-brand-gold uppercase tracking-wider">
                Fitur Desain:
              </p>
              {design.features.map((feature, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 text-sm text-white/80"
                >
                  <div className="w-1.5 h-1.5 bg-brand-gold rounded-full shrink-0" />
                  {feature}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}