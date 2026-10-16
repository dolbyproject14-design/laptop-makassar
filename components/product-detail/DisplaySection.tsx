import { Monitor, Sun, RefreshCw, Eye } from "lucide-react";
import type { Product } from "@/lib/data/products";
import { getDisplayData } from "@/lib/data/products";

export default function DisplaySection({ product }: { product: Product }) {
  const display = getDisplayData(product);

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <p className="text-sm font-semibold text-brand-red uppercase tracking-wider mb-2">
            Layar
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-brand-onyx mb-4">
            Visual <span className="text-brand-red">Memukau</span>
          </h2>
          <p className="text-lg text-gray-600">
            {display.panelType} {display.size} dengan {display.refreshRate} —
            nikmati setiap detail dengan warna akurat dan kontras tinggi.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div className="relative">
            <div className="aspect-video bg-gradient-to-br from-gray-900 to-black rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover opacity-80"
              />
              {/* Simulasi display */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white text-center p-8">
                  <p className="text-sm text-white/60 uppercase tracking-wider mb-2">
                    {display.panelType} Display
                  </p>
                  <p className="text-3xl md:text-5xl font-extrabold text-brand-gold">
                    {display.size}
                  </p>
                  <p className="text-sm text-white/80 mt-2">
                    {display.resolution} · {display.refreshRate}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                <Monitor className="w-6 h-6 text-brand-red mb-2" />
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                  Tipe Panel
                </p>
                <p className="font-bold text-brand-onyx">{display.panelType}</p>
              </div>
              <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                <Eye className="w-6 h-6 text-brand-red mb-2" />
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                  Resolusi
                </p>
                <p className="font-bold text-brand-onyx">
                  {display.resolution}
                </p>
              </div>
              <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                <RefreshCw className="w-6 h-6 text-brand-red mb-2" />
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                  Refresh Rate
                </p>
                <p className="font-bold text-brand-onyx">
                  {display.refreshRate}
                </p>
              </div>
              <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                <Sun className="w-6 h-6 text-brand-red mb-2" />
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                  Kecerahan
                </p>
                <p className="font-bold text-brand-onyx">
                  {display.brightness}
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-brand-onyx to-brand-red-dark rounded-2xl p-6 text-white">
              <p className="text-sm font-semibold text-brand-gold uppercase tracking-wider mb-3">
                Fitur Layar:
              </p>
              <ul className="space-y-2">
                {display.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-brand-gold rounded-full shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}