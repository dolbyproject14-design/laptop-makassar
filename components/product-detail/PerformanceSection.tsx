import { Cpu, Zap, MemoryStick, HardDrive } from "lucide-react";
import type { Product } from "@/lib/data/products";
import { getPerformanceData } from "@/lib/data/products";

export default function PerformanceSection({ product }: { product: Product }) {
  const perf = getPerformanceData(product);

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <p className="text-sm font-semibold text-brand-red uppercase tracking-wider mb-2">
            Performa
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-brand-onyx mb-4">
            Performa <span className="text-brand-red">Kelas {perf.tier}</span>
          </h2>
         <p className="text-lg text-gray-600">
            {perf.tier === "Flagship" && `Skor performa ${perf.totalScore}/100 — siap untuk tugas paling berat: gaming AAA, rendering 3D, dan editing video 4K.`}
           {perf.tier === "High-End" && `Skor performa ${perf.totalScore}/100 — siap untuk gaming high-end, editing video, dan multitasking berat.`}
          {perf.tier === "Mid-Range" && `Skor performa ${perf.totalScore}/100 — cocok untuk kerja, multitasking, dan aplikasi produktivitas harian.`}
         {perf.tier === "Entry-Level" && `Skor performa ${perf.totalScore}/100 — ideal untuk tugas ringan seperti browsing, office, dan multimedia.`}
         </p>
        </div>

        {/* Score utama */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-gradient-to-br from-brand-onyx to-brand-red-dark rounded-3xl p-8 md:p-12 text-white text-center">
            <p className="text-sm text-white/60 uppercase tracking-wider mb-3">
              Total Performance Score
            </p>
            <p className="text-7xl md:text-8xl font-extrabold text-brand-gold mb-4">
              {perf.totalScore}
              <span className="text-4xl text-white/40">/100</span>
            </p>
            <p className="text-lg font-bold uppercase tracking-widest text-brand-gold">
              {perf.tier}
            </p>
          </div>
        </div>

        {/* Component scores */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <Cpu className="w-8 h-8 text-brand-red mb-3" />
            <p className="text-sm text-gray-500 mb-1">Prosesor</p>
            <p className="text-3xl font-extrabold text-brand-onyx mb-3">
              {perf.cpuScore}
              <span className="text-base text-gray-400">/100</span>
            </p>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-brand-red rounded-full"
                style={{ width: `${perf.cpuScore}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-3">{product.specs.cpu}</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <Zap className="w-8 h-8 text-brand-red mb-3" />
            <p className="text-sm text-gray-500 mb-1">Grafis</p>
            <p className="text-3xl font-extrabold text-brand-onyx mb-3">
              {perf.gpuScore}
              <span className="text-base text-gray-400">/100</span>
            </p>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-brand-red rounded-full"
                style={{ width: `${perf.gpuScore}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-3">{product.specs.gpu}</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <MemoryStick className="w-8 h-8 text-brand-red mb-3" />
            <p className="text-sm text-gray-500 mb-1">Memori</p>
            <p className="text-3xl font-extrabold text-brand-onyx mb-3">
              {perf.ramScore}
              <span className="text-base text-gray-400">/100</span>
            </p>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-brand-red rounded-full"
                style={{ width: `${perf.ramScore}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-3">{product.specs.ram}</p>
          </div>
        </div>

        {/* Benchmarks */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm">
          <h3 className="font-bold text-xl text-brand-onyx mb-6">
            Benchmark Real-World
          </h3>
          <div className="space-y-5">
            {perf.benchmarks.map((b) => (
              <div key={b.label}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    {b.label}
                  </span>
                  <span className="text-sm font-bold text-brand-onyx">
                    {b.value}/100
                  </span>
                </div>
                <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-brand-red to-brand-gold rounded-full transition-all duration-1000"
                    style={{ width: `${b.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}