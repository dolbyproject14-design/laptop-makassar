import { Marquee } from "@/components/ui/marquee";

const brands = [
  { name: "Apple", slug: "apple", color: "000000" },
  { name: "Asus", slug: "asus", color: "00539B" },
  { name: "Lenovo", slug: "lenovo", color: "E2231A" },
  { name: "HP", slug: "hp", color: "0096D6" },
  { name: "Dell", slug: "dell", color: "007DB8" },
  { name: "Acer", slug: "acer", color: "83B81A" },
  { name: "MSI", slug: "msi", color: "FF0000" },
  { name: "Samsung", slug: "samsung", color: "1428A0" },
  { name: "Sony", slug: "sony", color: "000000" },
  { name: "Xiaomi", slug: "xiaomi", color: "FF6900" },
];

export default function BrandMarquee() {
  return (
    <section className="bg-white border-y border-gray-100 py-12 overflow-hidden">
      <div className="container mx-auto px-4 mb-8">
        <p className="text-center text-sm font-semibold text-gray-500 uppercase tracking-wider">
          Brand Resmi yang Kami Sediakan
        </p>
      </div>

      <div className="relative">
        {/* Gradient fade kiri-kanan */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <Marquee pauseOnHover speed={20}>
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="mx-8 md:mx-12 flex items-center justify-center shrink-0 group"
            >
              <img
                src={`https://cdn.simpleicons.org/${brand.slug}/${brand.color}`}
                alt={brand.name}
                className="h-10 md:h-14 w-auto opacity-60 group-hover:opacity-100 transition-all duration-300 grayscale group-hover:grayscale-0 group-hover:scale-110"
              />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}