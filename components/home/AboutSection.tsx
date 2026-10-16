import Link from "next/link";
import {
  Store,
  ShieldCheck,
  Users,
  Award,
  TrendingUp,
  Heart,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { isHmrRefresh } from "next/dist/server/app-render/work-unit-async-storage.external";
import { url } from "node:inspector/promises";

const stats = [
  { icon: Store, value: "5+", label: "Tahun Pengalaman" },
  { icon: Users, value: "2.500+", label: "Customer Puas" },
  { icon: ShieldCheck, value: "100%", label: "Produk Original" },
  { icon: Award, value: "9+", label: "Brand Resmi" },
];

const values = [
  {
    icon: ShieldCheck,
    title: "Terpercaya",
    desc: "Semua produk bergaransi resmi. Tidak ada barang rekondisi atau palsu.",
  },
  {
    icon: Heart,
    title: "Pelayanan Ramah",
    desc: "Kami bantu pilih laptop sesuai kebutuhan & budget, tanpa paksaan.",
  },
  {
    icon: TrendingUp,
    title: "Harga Bersaing",
    desc: "Harga transparan, bisa nego halus, dan tersedia opsi kredit 0%.",
  },
];

export default function AboutSection() {
  return (
    <section id="tentang" className="bg-gray-50 py-16 md:py-24 scroll-mt-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-sm font-semibold text-brand-red uppercase tracking-wider mb-2">
            Tentang Kami
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-brand-onyx mb-4">
            Toko Laptop Terpercaya di Makassar
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            <strong>Laptop Makassar</strong> adalah toko laptop spesialis jual
            beli & rental yang sudah melayani ribuan customer di Sulawesi
            Selatan sejak 2020. Kami menyediakan laptop baru, second
            berkualitas, dan layanan rental harian untuk berbagai kebutuhan —
            dari gaming, kerja, kuliah, hingga bisnis.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="bg-white rounded-2xl p-6 border border-gray-100 text-center hover:border-brand-red hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-6 h-6 text-brand-red" />
                </div>
                <p className="text-3xl md:text-4xl font-extrabold text-brand-onyx mb-1">
                  {stat.value}
                </p>
                <p className="text-xs md:text-sm text-gray-500 uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {values.map((value) => {
            const Icon = value.icon;
            return (
              <div
                key={value.title}
                className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition-all"
              >
                <div className="w-14 h-14 bg-brand-red rounded-2xl flex items-center justify-center mb-5">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-xl text-brand-onyx mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {value.desc}
                </p>
              </div>
            );
          })}
        </div>

        <div className="bg-gradient-to-br from-brand-onyx via-brand-red-dark to-brand-red rounded-3xl overflow-hidden p-8 md:p-12 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-2xl md:text-3xl font-bold">
                Kenapa Ribuan Customer Percaya Kami?
              </h3>
              <p className="text-white/80 leading-relaxed">
                Kami bukan sekadar toko. Kami adalah partner yang akan bantu
                kamu memilih laptop yang tepat, dengan harga jujur, dan
                pelayanan yang ramah. Setiap pembelian mendapat{" "}
                <strong className="text-brand-gold">garansi resmi</strong> +
                konsultasi gratis via WhatsApp sebelum & sesudah pembelian.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link href="/products">
                  <Button className="bg-brand-gold hover:bg-yellow-400 text-brand-onyx font-bold gap-2">
                    Lihat Katalog
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="#kontak">
                  <Button
                    variant="outline"
                    className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-brand-red font-bold"
                  >
                    Hubungi Kami
                  </Button>
                </Link>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center">
              <p className="text-5xl font-extrabold text-brand-gold mb-2">
                4.9
              </p>
              <div className="flex justify-center gap-0.5 mb-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-brand-gold text-xl">
                    ★
                  </span>
                ))}
              </div>
              <p className="text-sm text-white/80">
                Rating Kepuasan Customer
                <br />
                dari 800+ ulasan
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
