import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Ahmad Fauzi",
    role: "Mahasiswa Universitas Hasanuddin",
    text: "Beli laptop gaming di sini, harganya bersaing dan pelayanannya ramah. Laptopnya original, garansi resmi. Recommended!",
    initial: "A",
    rating: 5,
  },
  {
    name: "Siti Nurhaliza",
    role: "Content Creator",
    text: "Sewa laptop buat shooting konten, kondisinya bagus banget. Prosesnya cepat, bisa diantar ke lokasi. Puas!",
    initial: "S",
    rating: 5,
  },
  {
    name: "Budi Santoso",
    role: "Karyawan Swasta",
    text: "Dibantu pilih laptop sesuai budget dan kebutuhan. Gak dipaksa beli yang mahal. Mantap pokoknya!",
    initial: "B",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <p className="text-sm font-semibold text-brand-red uppercase tracking-wider mb-2">
          Testimoni
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-brand-onyx">
          Apa Kata Customer Kami
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="relative bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-shadow"
          >
            <Quote className="absolute top-4 right-4 w-8 h-8 text-brand-red/10" />

            <div className="flex gap-1 mb-4">
              {[...Array(t.rating)].map((_, j) => (
                <Star
                  key={j}
                  className="w-4 h-4 fill-brand-gold text-brand-gold"
                />
              ))}
            </div>

            <p className="text-gray-700 text-sm leading-relaxed mb-6">
              &ldquo;{t.text}&rdquo;
            </p>

            <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
              <div className="w-10 h-10 bg-brand-red rounded-full flex items-center justify-center text-white font-bold">
                {t.initial}
              </div>
              <div>
                <p className="font-bold text-brand-onyx text-sm">{t.name}</p>
                <p className="text-xs text-gray-500">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
