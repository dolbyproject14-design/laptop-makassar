import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {getProductBySlug, getRelatedProducts, dummyProducts,} from "@/lib/data/products";
import { waProductInquiry } from "@/lib/whatsapp";
import ProductCard from "@/components/product/ProductCard";
import ProductHero from "@/components/product-detail/ProductHero";
import DesignSection from "@/components/product-detail/DesignSection";
import PerformanceSection from "@/components/product-detail/PerformanceSection";
import DisplaySection from "@/components/product-detail/DisplaySection";
import AudioSection from "@/components/product-detail/AudioSection";
import SpecsSection from "@/components/product-detail/SpecsSection";

export async function generateStaticParams() {
  return dummyProducts.map((p) => ({ slug: p.slug }));
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const related = getRelatedProducts(product, 4);

  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-500 flex-wrap">
            <Link href="/" className="hover:text-brand-red">
              Beranda
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/products" className="hover:text-brand-red">
              Katalog
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-brand-onyx font-medium truncate max-w-[200px]">
              {product.name}
            </span>
          </div>
        </div>
      </div>

      {/* Sections */}
      <ProductHero product={product} />
      <DesignSection product={product} />
      <PerformanceSection product={product} />
      <DisplaySection product={product} />
      <AudioSection product={product} />
      <SpecsSection product={product} />

      {/* CTA */}
      <section className="py-16 bg-brand-red text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Tertarik dengan {product.name}?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Dapatkan penawaran terbaik dan konsultasi gratis sekarang.
          </p>
          <a
            href={waProductInquiry(product.name, product.price)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              size="lg"
              className="bg-white text-brand-red hover:bg-gray-100 font-bold gap-2 h-14 px-8 text-base"
            >
              <MessageCircle className="w-5 h-5" />
              Beli via WhatsApp
            </Button>
          </a>
        </div>
      </section>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="text-sm font-semibold text-brand-red uppercase tracking-wider mb-1">
                  Produk Serupa
                </p>
                <h2 className="text-2xl md:text-3xl font-bold text-brand-onyx">
                  Laptop {product.category} Lainnya
                </h2>
              </div>
              <Link
                href="/products"
                className="text-sm text-brand-red font-semibold hover:underline"
              >
                Lihat Semua →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}