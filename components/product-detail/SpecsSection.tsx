import {
  Cpu,
  Zap,
  HardDrive,
  Monitor,
  Battery,
  Weight,
  Wifi,
  Package,
  Volume2,
  AppWindow,
} from "lucide-react";
import type { Product } from "@/lib/data/products";
import {
  getConnectivityData,
  getSoftwareData,
} from "@/lib/data/products";

export default function SpecsSection({ product }: { product: Product }) {
  const connectivity = getConnectivityData(product);
  const software = getSoftwareData(product);

  const specs = [
    { icon: Cpu, label: "Prosesor", value: product.specs.cpu },
    { icon: Zap, label: "Grafis", value: product.specs.gpu },
    { icon: HardDrive, label: "Penyimpanan", value: product.specs.storage },
    { icon: Battery, label: "Baterai", value: product.specs.battery },
    { icon: Monitor, label: "Layar", value: product.specs.screen },
    { icon: Weight, label: "Berat", value: product.specs.weight },
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <p className="text-sm font-semibold text-brand-red uppercase tracking-wider mb-2">
            Spesifikasi
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-brand-onyx mb-4">
            Detail <span className="text-brand-red">Lengkap</span>
          </h2>
        </div>

        <div className="max-w-5xl mx-auto space-y-8">
          {/* Specs Utama */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {specs.map((spec) => {
              const Icon = spec.icon;
              return (
                <div
                  key={spec.label}
                  className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:border-brand-red hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-brand-red" />
                    </div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      {spec.label}
                    </p>
                  </div>
                  <p className="font-semibold text-brand-onyx text-sm">
                    {spec.value}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Connectivity */}
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <Wifi className="w-6 h-6 text-brand-red" />
              <h3 className="font-bold text-xl text-brand-onyx">
                Konektivitas
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  Port
                </p>
                <ul className="space-y-2">
                  {connectivity.ports.map((port, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                      <div className="w-1.5 h-1.5 bg-brand-red rounded-full" />
                      {port}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  Wireless
                </p>
                <ul className="space-y-2">
                  {connectivity.wireless.map((w, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                      <div className="w-1.5 h-1.5 bg-brand-red rounded-full" />
                      {w}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Software */}
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <AppWindow className="w-6 h-6 text-brand-red" />
              <h3 className="font-bold text-xl text-brand-onyx">
                Sistem & Software
              </h3>
            </div>
            <p className="text-sm text-gray-700 mb-4">
              <strong>OS:</strong> {software.os}
            </p>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Pre-installed Aplikasi:
            </p>
            <div className="flex flex-wrap gap-2">
              {software.features.map((f, i) => (
                <span
                  key={i}
                  className="bg-gray-100 text-gray-700 rounded-full px-3 py-1.5 text-xs font-medium"
                >
                  {f}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}