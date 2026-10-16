import { Volume2, Mic } from "lucide-react";
import type { Product } from "@/lib/data/products";
import { getAudioData } from "@/lib/data/products";

export default function AudioSection({ product }: { product: Product }) {
  const audio = getAudioData(product);

  return (
    <section className="py-16 md:py-24 bg-brand-onyx text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <p className="text-sm font-semibold text-brand-gold uppercase tracking-wider mb-2">
            Audio
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
            Suara <span className="text-brand-gold">Imersif</span>
          </h2>
          <p className="text-lg text-white/70">
            Rasakan pengalaman audio yang lebih dalam dengan teknologi terkini.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12 text-center">
            <div className="w-20 h-20 bg-brand-red rounded-full flex items-center justify-center mx-auto mb-6">
              <Volume2 className="w-10 h-10 text-white" />
            </div>

            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              {audio.speakers}
            </h3>

            <div className="flex flex-wrap justify-center gap-3 mt-8">
              {audio.features.map((feature, i) => (
                <span
                  key={i}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm font-medium"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}