import productsData from "@/public/data/products.json";

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  imageUrl: string;
  price: number;
  condition: "Baru" | "Second";
  category: string;
  description: string;
  isSoldOut: boolean;
  design?: {
    material: string;
    color: string;
    weight: string;
    thickness: string;
  };
  specs: {
    cpu: string;
    ram: string;
    storage: string;
    gpu: string;
    screen: string;
    battery: string;
    weight: string;
    os: string;
  };
}
export const dummyProducts: Product[] = productsData as Product[];

export function getProductBySlug(slug: string): Product | undefined {
  return dummyProducts.find((p) => p.slug === slug);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return dummyProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, limit);
}

export function getLongDescription(product: Product): string[] {
  const conditionText =
    product.condition === "Baru"
      ? "unit baru bergaransi resmi"
      : "unit second berkualitas yang sudah melalui quality check ketat";

  const categoryText: Record<string, string> = {
    Gaming: "gaming dengan performa tinggi untuk main game AAA, esport, dan streaming",
    Ultrabook: "ultrabook tipis ringan untuk produktivitas mobile dan kerja profesional",
    Business: "laptop bisnis dengan keamanan dan durabilitas tingkat enterprise",
    Office: "laptop office untuk kerja harian, sekolah, dan tugas kantoran",
    Creator: "laptop creator untuk editing video, desain grafis, dan rendering 3D",
  };

  const usageText = categoryText[product.category] || "laptop serbaguna untuk kebutuhan sehari-hari";

  return [
    `${product.name} adalah ${usageText}. Ditenagai oleh ${product.specs.cpu} dipadukan dengan ${product.specs.ram}, laptop ini siap menangani berbagai tugas — dari multitasking, browsing, hingga aplikasi berat sekalipun.`,
    `Layar ${product.specs.screen} menghadirkan tampilan jernih dan nyaman untuk mata. Dengan storage ${product.specs.storage} dan grafis ${product.specs.gpu}, kamu bisa menyimpan banyak file dan menjalankan aplikasi grafis dengan lancar.`,
    `Bobot hanya ${product.specs.weight} dan baterai ${product.specs.battery} membuat laptop ini cocok untuk dibawa mobilitas tinggi. Sistem operasi ${product.specs.os} sudah terinstall original dan siap pakai.`,
    `Kami menyediakan ${conditionText} dari brand ${product.brand} terpercaya. Setiap pembelian dilengkapi garansi toko, konsultasi gratis, dan pelayanan after-sales yang ramah.`,
  ];
}

export function getHighlights(product: Product): string[] {
  const highlights: string[] = [];
  highlights.push(`Prosesor ${product.specs.cpu}`);
  highlights.push(`RAM ${product.specs.ram}`);
  highlights.push(`Storage ${product.specs.storage}`);
  highlights.push(`Grafis ${product.specs.gpu}`);
  highlights.push(`Layar ${product.specs.screen}`);
  highlights.push(product.condition === "Baru" ? "Garansi resmi distributor" : "Garansi toko 3 bulan");
  highlights.push("Gratis konsultasi & setup awal");
  return highlights;
}

export function getUseCases(product: Product): string[] {
  const map: Record<string, string[]> = {
    Gaming: ["Gamer casual & hardcore", "Streamer & content creator gaming", "Editor video dengan efek berat", "Mahasiswa teknik informatika / DKV"],
    Ultrabook: ["Profesional mobile & freelancer", "Mahasiswa & pelajar", "Content creator ringan", "Eksekutif & pekerja remote"],
    Business: ["Karyawan kantoran & manajer", "Pengusaha & profesional", "Konsultan & auditor", "Pengguna yang butuh keamanan data"],
    Office: ["Pelajar & mahasiswa", "Karyawan administrasi", "Ibu rumah tangga & pekerja WFH", "Pemula yang baru belajar komputer"],
    Creator: ["Video editor profesional", "Desainer grafis & 3D artist", "Fotografer & videografer", "Animator & motion designer"],
  };
  return map[product.category] || ["Pengguna umum", "Pelajar & mahasiswa", "Karyawan & profesional"];
}

export function getWhatsInBox(product: Product): string[] {
  const base = [`Unit ${product.brand} ${product.name}`, "Charger original", "Box & manual book", "Nota pembelian", "Kartu garansi"];
  if (product.condition === "Baru") {
    base.push("Bonus: Tas laptop + Mouse", "Bonus: Screen protector");
  } else {
    base.push("Bonus: Tas laptop", "Garansi toko 3 bulan");
  }
  return base;
}

export function getPerformanceScore(product: Product): number {
  let score = 50;
  const cpu = product.specs.cpu.toLowerCase();
  if (cpu.includes("i9") || cpu.includes("m3 pro") || cpu.includes("m3 max") || cpu.includes("ryzen 9")) score += 25;
  else if (cpu.includes("i7") || cpu.includes("m2 pro") || cpu.includes("ryzen 7")) score += 15;
  else if (cpu.includes("i5") || cpu.includes("m2") || cpu.includes("m3") || cpu.includes("ryzen 5")) score += 5;

  const ram = parseInt(product.specs.ram) || 8;
  if (ram >= 32) score += 15;
  else if (ram >= 16) score += 10;
  else if (ram >= 8) score += 3;

  const gpu = product.specs.gpu.toLowerCase();
  if (gpu.includes("rtx 40") || gpu.includes("rtx a")) score += 15;
  else if (gpu.includes("rtx 30")) score += 10;
  else if (gpu.includes("rtx")) score += 5;

  return Math.min(score, 100);
}

export function getDesignData(product: Product) {
  const materialMap: Record<string, string> = {
    Apple: "Aluminium unibody aerospace-grade", Asus: product.category === "Gaming" ? "Magnesium alloy + aluminium" : "Aluminium alloy premium",
    Lenovo: "Carbon fiber + magnesium alloy", HP: "Aluminium + plastik high-grade", Dell: "Aluminium + carbon fiber",
    Acer: "Aluminium + polycarbonate", MSI: "Aluminium + plastik ABS", Samsung: "Aluminium alloy premium",
    Huawei: "Aluminium alloy + karbon", Razer: "Aluminium CNC unibody",
  };
  const colorMap: Record<string, string> = {
    Apple: "Space Gray / Silver", Asus: product.category === "Gaming" ? "Eclipse Gray / Volt Green" : "Ponder Blue / Foggy Silver",
    Lenovo: "Deep Black / Storm Gray", HP: product.category === "Gaming" ? "Mica Silver" : "Natural Silver",
    Dell: "Platinum Silver / Graphite", Acer: "Obsidian Black", MSI: "Core Black",
    Samsung: "Graphite / Beige", Huawei: "Space Gray / Mystic Silver", Razer: "Matte Black",
  };
  return {
    material: materialMap[product.brand] || "Aluminium alloy",
    color: colorMap[product.brand] || "Black",
    weight: product.specs.weight,
    thickness: product.category === "Gaming" ? "22-25 mm" : "15-18 mm",
    features: ["Desain presisi CNC", "Sudut ergonomis 180 derajat", "Finishing anti-fingerprint", "Logo brand embossed"],
  };
}

export function getPerformanceData(product: Product) {
  const cpu = product.specs.cpu.toLowerCase();
  const gpu = product.specs.gpu.toLowerCase();
  const ram = parseInt(product.specs.ram) || 8;

  let cpuScore = 60;
  if (cpu.includes("i9") || cpu.includes("ryzen 9") || cpu.includes("m3 max") || cpu.includes("m3 pro")) cpuScore = 95;
  else if (cpu.includes("i7") || cpu.includes("ryzen 7") || cpu.includes("m2 pro")) cpuScore = 85;
  else if (cpu.includes("i5") || cpu.includes("ryzen 5") || cpu.includes("m3") || cpu.includes("m2")) cpuScore = 75;

  let gpuScore = 40;
  if (gpu.includes("rtx 5090")) gpuScore = 100;
  else if (gpu.includes("rtx 5080")) gpuScore = 96;
  else if (gpu.includes("rtx 5070")) gpuScore = 88;
  else if (gpu.includes("rtx 5060")) gpuScore = 80;
  else if (gpu.includes("rtx 5050")) gpuScore = 70;
  else if (gpu.includes("rtx 4080") || gpu.includes("rtx 4090")) gpuScore = 98;
  else if (gpu.includes("rtx 4070")) gpuScore = 90;
  else if (gpu.includes("rtx 4060")) gpuScore = 82;
  else if (gpu.includes("rtx 4050")) gpuScore = 72;
  else if (gpu.includes("rtx 30")) gpuScore = 65;
  else if (gpu.includes("rtx a")) gpuScore = 78;
  else if (gpu.includes("apple") || gpu.includes("iris xe") || gpu.includes("radeon")) gpuScore = 50;

  let ramScore = 50;
  if (ram >= 32) ramScore = 95;
  else if (ram >= 16) ramScore = 80;
  else if (ram >= 8) ramScore = 60;

  const totalScore = Math.round((cpuScore + gpuScore + ramScore) / 3);
  const tier = totalScore >= 85 ? "Flagship" : totalScore >= 70 ? "High-End" : totalScore >= 55 ? "Mid-Range" : "Entry-Level";

  return {
    cpuScore, gpuScore, ramScore, totalScore, tier,
    benchmarks: [
      { label: "Gaming 1080p", value: Math.min(gpuScore + 5, 100) },
      { label: "Gaming 1440p", value: Math.max(gpuScore - 15, 30) },
      { label: "Video Editing", value: Math.min(cpuScore + 5, 100) },
      { label: "3D Rendering", value: Math.min(Math.round((cpuScore + gpuScore) / 2) + 5, 100) },
      { label: "Multitasking", value: Math.min(Math.round((cpuScore + ramScore) / 2) + 5, 100) },
    ],
  };
}

export function getDisplayData(product: Product) {
  const screen = product.specs.screen;
  const sizeMatch = screen.match(/(\d+\.?\d*)"/);
  const size = sizeMatch ? sizeMatch[1] : "14";
  const resolutionMatch = screen.match(/(FHD|QHD|4K|WUXGA|WQXGA|3K|2\.8K|3\.2K|3\.5K|Retina|Liquid Retina|OLED)/i);
  const resolution = resolutionMatch ? resolutionMatch[1] : "FHD";
  const refreshMatch = screen.match(/(\d+)Hz/);
  const refreshRate = refreshMatch ? `${refreshMatch[1]}Hz` : "60Hz";
  const isOLED = screen.toLowerCase().includes("oled");
  const isRetina = screen.toLowerCase().includes("retina");
  const panelType = isOLED ? "OLED" : isRetina ? "Liquid Retina" : "IPS";

  return {
    size: `${size}"`, resolution, refreshRate, panelType,
    brightness: isOLED ? "600 nits HDR" : isRetina ? "500 nits" : "300 nits",
    features: [
      isOLED ? "100% DCI-P3 color gamut" : "Anti-glare coating",
      "Wide viewing angle 178 derajat", "Low blue light certified",
      refreshRate !== "60Hz" ? "G-Sync compatible" : "Flicker-free",
    ],
  };
}

export function getAudioData(product: Product) {
  const map: Record<string, { speakers: string; features: string[] }> = {
    Apple: { speakers: "6-speaker system dengan Spatial Audio", features: ["Dolby Atmos", "Force-cancelling woofers", "Studio-quality 3-mic array"] },
    Asus: { speakers: product.category === "Gaming" ? "2x Smart Amp speakers" : "Harman Kardon certified", features: ["Dolby Atmos", "AI Noise Cancellation", "Hi-Res Audio certified"] },
    Lenovo: { speakers: "Dolby Atmos speaker system", features: ["Dolby Voice", "AI Noise Cancellation", "Harman certified"] },
    HP: { speakers: product.category === "Gaming" ? "Bang & Olufsen" : "B&O Play", features: ["DTS:X Ultra", "HP Audio Boost", "Dual array mics"] },
    Dell: { speakers: "Waves MaxxAudio Pro", features: ["Waves Nx 3D Audio", "Smart Amp", "Dual mics"] },
    Acer: { speakers: "DTS:X Ultra speakers", features: ["Acer TrueHarmony", "AI Noise Reduction", "Purified Voice"] },
    MSI: { speakers: "Hi-Res Audio certified speakers", features: ["Nahimic 3 Audio", "Audio Boost", "AI Noise Cancel"] },
    Samsung: { speakers: "AKG stereo speakers", features: ["Dolby Atmos", "Smart Amp", "Studio-quality mics"] },
    Huawei: { speakers: "Huawei Sound stereo", features: ["Devialet tuned", "AI Noise Cancel", "Hi-Res Audio"] },
    Razer: { speakers: "THX Spatial Audio", features: ["Dolby Atmos", "7.1 Surround Sound", "Smart Amp"] },
  };
  return map[product.brand] || { speakers: "Stereo speaker system", features: ["Dolby Audio", "AI Noise Cancellation"] };
}

export function getConnectivityData(product: Product) {
  const isHighEnd = product.price > 15000000;
  const isGaming = product.category === "Gaming";
  const ports = ["USB-C (power delivery)", "USB-A 3.2", "HDMI 2.1", "3.5mm Audio Jack"];
  if (isHighEnd || isGaming) {
    ports.push("Thunderbolt 4", "RJ-45 Ethernet", "microSD card reader");
  } else {
    ports.push("USB 2.0");
  }
  return { ports, wireless: ["Wi-Fi 6E (802.11ax)", "Bluetooth 5.2"] };
}

export function getSoftwareData(product: Product) {
  const appMap: Record<string, string[]> = {
    Apple: ["Final Cut Pro (30-day trial)", "Logic Pro (30-day trial)", "Pages, Numbers, Keynote"],
    Asus: ["MyASUS", "Armoury Crate", "ASUS Zenbook Creator Hub"],
    Lenovo: ["Lenovo Vantage", "Lenovo Smart Appearance", "Lenovo Voice"],
    HP: ["HP Support Assistant", "OMEN Gaming Hub", "HP Audio Switch"],
    Dell: ["Dell SupportAssist", "Dell Mobile Connect", "Alienware Command Center"],
    Acer: ["Acer Care Center", "Predator Sense", "Acer Quick Access"],
    MSI: ["MSI Center", "MSI App Player", "Nahimic Companion"],
    Samsung: ["Samsung Settings", "Samsung Studio Plus", "Galaxy Book Experience"],
    Huawei: ["Huawei PC Manager", "Huawei Share", "Multi-Screen Collaboration"],
    Razer: ["Razer Synapse 3", "Razer Cortex", "THX Spatial Audio"],
  };
  return {
    os: product.specs.os,
    features: [...(appMap[product.brand] || ["Brand utilities"]), "Pre-installed Microsoft Office (trial)", "Windows Defender / macOS Security"],
  };
}