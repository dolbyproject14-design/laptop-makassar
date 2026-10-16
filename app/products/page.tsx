import CatalogSection from "@/components/home/CatalogSection";

export const metadata = {
  title: "Katalog Laptop | Laptop Makassar",
  description:
    "Jual laptop baru & second berkualitas di Makassar. Gaming, Ultrabook, Business, Office. Harga bersaing, garansi resmi.",
};

export default function ProductsPage() {
  return (
    <div>
      <div className="bg-gradient-to-br from-brand-onyx to-brand-red-dark text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center gap-2 text-sm text-white/70 mb-3">
            <span>Beranda</span>
            <span>/</span>
            <span className="text-white font-medium">Katalog Laptop</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-3">
            Katalog Laptop
          </h1>
          <p className="text-white/80 max-w-2xl">
            Temukan laptop yang tepat untuk kebutuhanmu. Filter berdasarkan
            kategori, cari berdasarkan spesifikasi, dan pesan langsung via
            WhatsApp.
          </p>
        </div>
      </div>

      <CatalogSection />
    </div>
  );
}
