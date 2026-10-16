import { ShieldCheck, Truck, Headphones, CreditCard, Award, Clock } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Garansi Resmi",
    desc: "Semua laptop bergaransi resmi distributor & toko",
  },
  {
    icon: Truck,
    title: "Gratis Ongkir",
    desc: "Pengiriman gratis untuk area Makassar & sekitarnya",
  },
  {
    icon: CreditCard,
    title: "Kredit 0%",
    desc: "Cicilan tanpa bunga hingga 12 bulan",
  },
  {
    icon: Headphones,
    title: "Konsultasi Gratis",
    desc: "Tim ahli siap bantu pilih laptop sesuai kebutuhan",
  },
  {
    icon: Award,
    title: "Produk Original",
    desc: "100% original, bukan rekondisi atau palsu",
  },
  {
    icon: Clock,
    title: "Pelayanan Cepat",
    desc: "Respon cepat via WhatsApp, jam kerja 7 hari",
  },
];

export default function WhyUs() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-brand-red uppercase tracking-wider mb-2">
            Kenapa Pilih Kami
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-brand-onyx">
            Alasan Ribuan Customer Percaya
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-brand-red hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-brand-red" />
                </div>
                <h3 className="font-bold text-brand-onyx mb-2">
                  {feat.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}