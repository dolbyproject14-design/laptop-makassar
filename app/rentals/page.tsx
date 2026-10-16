import Link from "next/link";
import { MessageCircle, Clock, Shield, Zap, ChevronRight } from "lucide-react";
import { rentalProducts } from "@/lib/data/rentals";
import { waRentalInquiry } from "@/lib/whatsapp";

const formatRupiah = (n: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(n);

export const metadata = {
  title: "Rental Laptop Makassar | Sewa Harian Mulai 100K",
  description:
    "Rental laptop harian di Makassar. MacBook, Asus ROG, Lenovo, Dell. Mulai Rp 100.000/hari. Siap pakai, antar jemput.",
};

export default function RentalsPage() {
  return (
    <div className="bg-brand-onyx min-h-screen">
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-grid" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-brand-red/10 rounded-full blur-[120px]" />

        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-white/40 mb-8">
            <Link href="/" className="hover:text-brand-red">
              Beranda
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white/70">Rental</span>
          </div>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 border border-brand-red/40 bg-brand-red/10 px-4 py-1.5 mb-6">
              <span className="w-1.5 h-1.5 bg-brand-red rounded-full animate-pulse" />
              <span className="label-uppercase text-brand-red">
                Rental Harian · Mingguan · Bulanan
              </span>
            </div>

            <h1 className="display-heading text-5xl md:text-7xl lg:text-8xl text-white mb-6">
              SEWA
              <br />
              <span className="text-brand-red">LAPTOP</span>
            </h1>

            <p className="text-base md:text-lg text-white/60 max-w-xl mb-8 leading-relaxed">
              Butuh laptop untuk event, seminar, training, atau proyek
              sementara? Semua siap pakai, kondisi prima, harga transparan.
            </p>

            <div className="flex flex-wrap gap-4">
              {[
                { icon: Zap, text: "Siap Pakai" },
                { icon: Clock, text: "Fleksibel" },
                { icon: Shield, text: "Bergaransi" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.text}
                    className="flex items-center gap-2 text-sm text-white/70"
                  >
                    <Icon className="w-4 h-4 text-brand-red" />
                    {item.text}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ===== PRICING INFO ===== */}
      <section className="border-b border-white/5 bg-brand-dark">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-brand-red/10 border border-brand-red/30 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-brand-red" />
              </div>
              <div>
                <p className="text-white font-bold text-sm mb-1">
                  Durasi Fleksibel
                </p>
                <p className="text-xs text-white/50">
                  Harian, mingguan, atau bulanan. Semakin lama semakin murah.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-brand-red/10 border border-brand-red/30 flex items-center justify-center shrink-0">
                <Shield className="w-5 h-5 text-brand-red" />
              </div>
              <div>
                <p className="text-white font-bold text-sm mb-1">
                  Kondisi Prima
                </p>
                <p className="text-xs text-white/50">
                  Semua laptop sudah di-quality check sebelum disewa.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-brand-red/10 border border-brand-red/30 flex items-center justify-center shrink-0">
                <Zap className="w-5 h-5 text-brand-red" />
              </div>
              <div>
                <p className="text-white font-bold text-sm mb-1">
                  Antar Jemput
                </p>
                <p className="text-xs text-white/50">
                  Bisa antar-jemput area Makassar (syarat berlaku).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== RENTAL LIST ===== */}
      <section className="container mx-auto px-4 py-16">
        <div className="mb-12">
          <p className="label-uppercase text-brand-red mb-3">
            Pilih Laptop
          </p>
          <h2 className="display-heading text-3xl md:text-5xl text-white">
            Tersedia
            <br />
            <span className="text-white/40">untuk Disewa</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {rentalProducts.map((rental) => (
            <div
              key={rental.id}
              className="group bg-brand-dark border border-white/5 hover:border-brand-red/40 transition-all duration-300 overflow-hidden flex flex-col"
            >
              {/* Image */}
              <div className="relative aspect-video overflow-hidden bg-black">
                <img
                  src={rental.imageUrl}
                  alt={rental.name}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />

                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                  <span className="text-[10px] font-black uppercase tracking-widest bg-brand-red text-white px-2.5 py-1">
                    {rental.category}
                  </span>
                </div>

                {/* Min Days Badge */}
                <div className="absolute bottom-3 right-3">
                  <span className="text-[10px] font-bold uppercase tracking-widest bg-black/80 backdrop-blur-sm text-white px-2.5 py-1 border border-white/20">
                    Min {rental.minDays} hari
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex-1 flex flex-col">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-2">
                  {rental.brand}
                </p>

                <h3 className="font-bold text-white text-lg mb-3 group-hover:text-brand-red transition-colors">
                  {rental.name}
                </h3>

                <p className="text-[11px] text-white/40 mb-5 leading-relaxed flex-1">
                  {rental.specs.cpu}
                  <br />
                  {rental.specs.ram} · {rental.specs.storage} · {rental.specs.gpu}
                </p>

                {/* Price */}
                <div className="pt-4 border-t border-white/5 mb-4">
                  <p className="text-[10px] uppercase tracking-widest text-white/30 mb-1">
                    Harga Sewa
                  </p>
                  <p className="text-xl font-black text-white">
                    {formatRupiah(rental.pricePerDay)}
                    <span className="text-sm font-bold text-white/40">
                      /hari
                    </span>
                  </p>
                </div>

                {/* CTA */}
                <a
                  href={waRentalInquiry(
                    rental.name,
                    rental.pricePerDay,
                    rental.minDays,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-brand-red hover:bg-brand-red-dark text-white px-4 py-3 text-xs font-black uppercase tracking-widest transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  Sewa Sekarang
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CTA BOTTOM ===== */}
      <section className="border-t border-white/5 bg-brand-dark">
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="display-heading text-3xl md:text-5xl text-white mb-4">
            Butuh Laptop Khusus?
          </h2>
          <p className="text-white/60 max-w-xl mx-auto mb-8">
            Kami bisa sediakan laptop sesuai spesifikasi yang kamu butuhkan.
            Chat dulu, kami cek ketersediaannya.
          </p>
          <a
            href={waRentalInquiry("Laptop Custom", 0, 0)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-brand-red hover:bg-brand-red-dark text-white px-8 py-4 text-sm font-black uppercase tracking-widest transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            Konsultasi via WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
}