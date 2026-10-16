import Link from "next/link";
import { Home, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-7xl md:text-9xl font-extrabold text-brand-red mb-4">
          404
        </h1>
        <h2 className="text-2xl font-bold text-brand-onyx mb-3">
          Halaman Tidak Ditemukan
        </h2>
        <p className="text-gray-600 mb-8">
          Halaman yang kamu cari tidak tersedia atau sudah dipindahkan.
        </p>
        <div className="flex gap-3 justify-center">
          <Link href="/">
            <Button className="bg-brand-red hover:bg-brand-red-dark text-white gap-2">
              <Home className="w-4 h-4" />
              Ke Beranda
            </Button>
          </Link>
          <Link href="/products">
            <Button variant="outline" className="gap-2">
              <Search className="w-4 h-4" />
              Lihat Katalog
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}