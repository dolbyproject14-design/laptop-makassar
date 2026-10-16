"use client";

import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import { dummyProducts } from "@/lib/data/products";

const categories = [
  "Semua",
  "Gaming",
  "Ultrabook",
  "Business",
  "Office",
  "Laptop Entry-Level",
];
const sortOptions = [
  { value: "terbaru", label: "Terbaru" },
  { value: "harga-rendah", label: "Harga: Rendah → Tinggi" },
  { value: "harga-tinggi", label: "Harga: Tinggi → Rendah" },
  { value: "nama", label: "Nama A-Z" },
];

export default function CatalogSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [sortBy, setSortBy] = useState("terbaru");
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = [...dummyProducts];

  
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query) ||
          p.specs.cpu.toLowerCase().includes(query) ||
          p.specs.ram.toLowerCase().includes(query) ||
          p.specs.storage.toLowerCase().includes(query),
      );
    }

    if (activeCategory !== "Semua") {
      result = result.filter((p) => p.category === activeCategory);
    }

    switch (sortBy) {
      case "harga-rendah":
        result.sort((a, b) => a.price - b.price);
        break;
      case "harga-tinggi":
        result.sort((a, b) => b.price - a.price);
        break;
      case "nama":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return result;
  }, [searchQuery, activeCategory, sortBy]);

  return (
    <section id="katalog" className="bg-gray-50 py-16 scroll-mt-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-sm font-semibold text-brand-red uppercase tracking-wider mb-2">
            Katalog Lengkap
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-brand-onyx mb-3">
            Semua Laptop Tersedia
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {dummyProducts.length} produk tersedia · Pilih sesuai kebutuhan dan
            budget kamu. Klik produk → langsung chat WhatsApp.
          </p>
        </div>

        {/* Search + Filter + Sort */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-6 shadow-sm">
          <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari laptop (contoh: MacBook, Asus ROG, i7, 16GB)..."
                className="w-full pl-10 pr-10 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              )}
            </div>

            {/* Filter Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium border rounded-lg transition-colors ${
                showFilters
                  ? "bg-brand-red text-white border-brand-red"
                  : "border-gray-200 hover:bg-gray-50"
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filter
            </button>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red bg-white cursor-pointer"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Category Filters (expand) */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Kategori
              </p>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 text-sm font-medium rounded-lg border transition-colors ${
                      activeCategory === cat
                        ? "bg-brand-red text-white border-brand-red"
                        : "border-gray-200 hover:border-brand-red hover:text-brand-red"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Result Info */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-600">
            {filteredProducts.length > 0 ? (
              <>
                Menampilkan{" "}
                <span className="font-bold text-brand-onyx">
                  {filteredProducts.length}
                </span>{" "}
                produk
                {searchQuery && (
                  <>
                    {" "}
                    untuk{" "}
                    <span className="font-bold text-brand-red">
                      &ldquo;{searchQuery}&rdquo;
                    </span>
                  </>
                )}
                {activeCategory !== "Semua" && (
                  <>
                    {" "}
                    kategori{" "}
                    <span className="font-bold text-brand-red">
                      {activeCategory}
                    </span>
                  </>
                )}
              </>
            ) : (
              <span>Tidak ada produk ditemukan</span>
            )}
          </p>

          {(searchQuery || activeCategory !== "Semua") && (
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("Semua");
              }}
              className="text-sm text-brand-red hover:underline font-medium"
            >
              Reset filter
            </button>
          )}
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-brand-red" />
            </div>
            <h3 className="font-bold text-lg text-brand-onyx mb-2">
              Produk Tidak Ditemukan
            </h3>
            <p className="text-gray-600 text-sm mb-6">
              Coba kata kunci lain atau reset filter
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("Semua");
              }}
              className="bg-brand-red hover:bg-brand-red-dark text-white px-6 py-2.5 rounded-lg font-semibold text-sm transition-colors"
            >
              Reset Pencarian
            </button>
          </div>
        )}
      </div>
    </section>
  );
}