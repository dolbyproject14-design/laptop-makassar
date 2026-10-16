import Link from "next/link";
import { Clock, Calendar, Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function RentalPromo() {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="relative bg-gradient-to-br from-brand-onyx to-brand-red-dark rounded-3xl overflow-hidden">
        {/* Decorative */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-red/20 rounded-full blur-3xl" />

        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 p-8 md:p-16 items-center">
          {/* Left */}
          <div className="text-white space-y-6">
            <div className="inline-flex items-center gap-2 bg-brand-gold/20 border border-brand-gold/40 rounded-full px-4 py-1.5">
              <Zap className="w-4 h-4 text-brand-gold" />
              <span className="text-brand-gold text-sm font-semibold">
                Rental Laptop
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl font-extrabold leading-tight">
              Sewa Laptop <span className="text-brand-gold">Mulai 50K</span>
              <br />
              Per Hari
            </h2>

            <p className="text-white/80 max-w-lg">
              Cocok untuk event, seminar, training, atau kebutuhan
              sementara. Laptop berkualitas, siap pakai, tanpa ribet.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-sm">Sewa Fleksibel</p>
                  <p className="text-xs text-white/60">Harian / Mingguan / Bulanan</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-sm">Siap Pakai</p>
                  <p className="text-xs text-white/60">Sudah terinstall software dasar</p>
                </div>
              </div>
            </div>

            <Link href="/rentals" className="inline-block pt-2">
              <Button
                size="lg"
                className="bg-brand-gold hover:bg-yellow-400 text-brand-onyx font-bold gap-2"
              >
                Lihat Semua Rental
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>

          {/* Right: Mockup */}
          <div className="hidden lg:block">
            <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <p className="text-white font-bold">Laptop Rental Populer</p>
                <p className="text-brand-gold text-sm">Best Seller</p>
              </div>

              {[
                { name: "MacBook Air M2", price: "Rp 150K/hari" },
                { name: "Asus ROG Strix", price: "Rp 200K/hari" },
                { name: "Lenovo ThinkPad", price: "Rp 100K/hari" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-3 border-b border-white/5 last:border-0"
                >
                  <div>
                    <p className="text-white text-sm font-semibold">
                      {item.name}
                    </p>
                    <p className="text-white/60 text-xs">Tersedia 5 unit</p>
                  </div>
                  <p className="text-brand-gold font-bold text-sm">
                    {item.price}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}