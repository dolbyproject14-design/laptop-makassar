import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const categories = [
  {
    name: "Gaming",
    desc: "Performa tinggi untuk game AAA & esport",
    count: 25,
    href: "/products",
    gradient: "from-red-900/40 to-red-950/60",
    accent: "#e31e24",
  },
  {
    name: "Ultrabook",
    desc: "Tipis, ringan, mobilitas tanpa batas",
    count: 18,
    href: "/products",
    gradient: "from-zinc-800/40 to-zinc-900/60",
    accent: "#a1a1aa",
  },
  {
    name: "Business",
    desc: "Aman & andal untuk profesional",
    count: 12,
    href: "/products",
    gradient: "from-slate-800/40 to-slate-900/60",
    accent: "#94a3b8",
  },
  {
    name: "Creator",
    desc: "Untuk editing, desain, & rendering",
    count: 9,
    href: "/products",
    gradient: "from-amber-900/30 to-amber-950/50",
    accent: "#fbbf24",
  },
];

export default function CategorySection() {
  return (
    <section className="bg-brand-onyx py-20 md:py-28 border-t border-white/5">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <p className="label-uppercase text-brand-red mb-3">
              Kategori
            </p>
            <h2 className="display-heading text-4xl md:text-6xl text-white">
              Cari Sesuai
              <br />
              <span className="text-white/40">Kebutuhan</span>
            </h2>
          </div>
          <p className="text-sm text-white/50 max-w-sm">
            Pilih kategori yang sesuai dengan kebutuhanmu — dari gaming
            hardcore hingga kerja profesional.
          </p>
        </div>

        {/* Grid Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat, idx) => (
            <Link
              key={cat.name}
              href={cat.href}
              className={`group relative bg-gradient-to-br ${cat.gradient} border border-white/5 hover:border-white/20 p-6 md:p-8 transition-all duration-300 overflow-hidden min-h-[240px] flex flex-col justify-between`}
            >
              {/* Big number background */}
              <div className="absolute -top-4 -right-2 text-[6rem] md:text-[8rem] font-black text-white/[0.03] leading-none select-none">
                0{idx + 1}
              </div>

              {/* Red accent line top */}
              <div
                className="absolute top-0 left-0 h-0.5 w-12 group-hover:w-full transition-all duration-500"
                style={{ background: cat.accent }}
              />

              <div className="relative z-10">
                <p className="label-uppercase text-white/40 mb-2">
                  {cat.count} Produk
                </p>
                <h3 className="display-heading text-3xl md:text-4xl text-white mb-2 group-hover:text-brand-red transition-colors">
                  {cat.name}
                </h3>
              </div>

              <div className="relative z-10">
                <p className="text-sm text-white/50 mb-6 leading-relaxed">
                  {cat.desc}
                </p>

                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/60 group-hover:text-brand-red transition-colors">
                  Lihat
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}