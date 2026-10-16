import nextAppLoader from "next/dist/build/webpack/loaders/next-app-loader";

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

const U = "https://images.unsplash.com/photo-";

const IMG = {
  p01: "/images/products/01.jpg", 
  p02: "/images/products/02.jpg", 
  p03: "/images/products/03.jpg",
  p04: "/images/products/04.jpg", 
  p05: "/images/products/05.jpg", 
  p06: "/images/products/06.jpg", 
  p07: "/images/products/07.jpg", 
  p08: "/images/products/08.jpg",  
  p09: "/images/products/09.jpg",  
  p10: "/images/products/10.jpg", 
  p11: "/images/products/11.jpg", 
  p12: "/images/products/12.jpg", 
  p13: "/images/products/13.jpg",
  p14: "/images/products/14.jpg",
  p16: "/images/products/16.jpg",
  p17: "/images/products/17.jpg",
  p18: "/images/products/18.jpg",
  p19: "/images/products/19.jpg",
  p20: "/images/products/20.jpg",
  p21: "/images/products/21.jpg",
  p22: "/images/products/22.jpg",
  p23: "/images/products/23.jpg",
  p24: "/images/products/24.jpg",
  p25: "/images/products/25.jpg",
  p26: "/images/products/26.jpg",
  p27: "/images/products/27.jpg",
  p28: "/images/products/28.jpg",
  p29: "/images/products/29.jpg",
  p30: "/images/products/30.jpg",
  p31: "/images/products/31.jpg",
  p32: "/images/products/32.jpg",
  p33: "/images/products/33.jpg",
  p34: "/images/products/34.jpg",
  p35: "/images/products/35.jpg",
  p36: "/images/products/36.jpg",
  p37: "/images/products/37.jpg",
  p38: "/images/products/38.jpg",
  p39: "/images/products/39.jpg",
  p40: "/images/products/40.jpg",
  p41: "/images/products/41.jpg",
  p42: "/images/products/42.jpg",
  p43: "/images/products/43.jpg",
  p44: "/images/products/44.jpg",
  p45: "/images/products/45.jpg",
  p46: "/images/products/46.jpg",
  p47: "/images/products/47.jpg",
  p48: "/images/products/48.jpg",
  p49: "/images/products/49.jpg",
  p50: "/images/products/50.jpg",
  p51: "/images/products/51.jpg",
  p52: "/images/products/52.jpg",
  p53: "/images/products/53.jpg",
  p54: "/images/products/54.jpg",
  p55: "/images/products/55.jpg",
  p56: "/images/products/56.jpg",
  p57: "/images/products/57.jpg",
  p58: "/images/products/58.jpg",
  p59: "/images/products/59.jpg",
  p60: "/images/products/60.jpg",
  p61: "/images/products/61.jpg",
  p62: "/images/products/62.jpg",
  p63: "/images/products/63.jpg",
  p64: "/images/products/64.jpg",
  p65: "/images/products/65.jpg",
  p66: "/images/products/66.jpg",
  p67: "/images/products/67.jpg",
  p68: "/images/products/68.jpg",
  p69: "/images/products/69.jpg",
  p70: "/images/products/70.jpg",
  p71: "/images/products/71.jpg",
};
function makeProduct(
  id: number,
  brand: string,
  name: string,
  category: string,
  condition: "Baru" | "Second",
  price: number,
  image: string,
  cpu: string,
  ram: string,
  storage: string,
  gpu: string,
  screen: string,
): Product {
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return {
    id: String(id),
    slug,
    name,
    brand,
    imageUrl: image,
    price,
    condition,
    category,
    description: `${name} — laptop ${category} berkualitas dari ${brand}. Cocok untuk kebutuhan ${category.toLowerCase()} harian, kerja, dan produktivitas. Bergaransi resmi, siap kirim ke seluruh Indonesia.`,
    specs: {
      cpu,
      ram,
      storage,
      gpu,
      screen,
      battery: "Hingga 8 jam",
      weight: "1.5 - 2.4 kg",
      os: brand === "Apple" ? "macOS Sonoma" : "Windows 11",
    },
  };
}

export const dummyProducts: Product[] = [
 
  {
    id: "1",
    slug: "asus-tuf-gaming-fa608um",
    name: "Asus TUF Gaming FA608UM",
    brand: "Asus",
    imageUrl: IMG.p01,
    price: 28999000,
    condition: "Baru",
    category: "Gaming",
    description: "Asus TUF Gaming FA608UM dengan AMD Ryzen 7 260 dan NVIDIA RTX 5060 8GB — performa flagship untuk gaming AAA, streaming, dan produktivitas berat.",
    specs: {
      cpu: "AMD Ryzen 7 260",
      ram: "16GB DDR5",
      storage: "512GB NVMe SSD",
      gpu: "NVIDIA RTX 5060 8GB",
      screen: '16" 2.5K WQXGA 165Hz 100% sRGB',
      battery: "8 jam",
      weight: "2.5 kg",
      os: "Windows 11",
    },
  },
  {
    id: "2",
    slug: "asus-rog-flow-z13",
    name: "Asus ROG Flow Z13",
    brand: "Asus",
    imageUrl: IMG.p02,
    price: 15500000, 
    condition: "Baru",
    category: "Gaming", 
    description: "Asus ROG Flow Z13 — tablet gaming 2-in-1 dengan Intel Core i5 Gen 12 dan layar sentuh 13 inci yang bisa dilipat.",
    specs: {
      cpu: "Intel Core i5 Gen 12",
      ram: "16GB",
      storage: "512GB SSD",
      gpu: "Intel Iris Xe Graphics",
      screen: '13.4" FHD+ Touch 120Hz 2-in-1',
      battery: "Hingga 8 jam",
      weight: "1.1 kg",
      os: "Windows 11",
    },
  },
  {
    id: "3",
    slug: "asus-a416j-i5-1035g1",
    name: "ASUS A416J",
    brand: "Asus",
    imageUrl: IMG.p03,
    price: 5000000, //[cite: 1]
    condition: "Baru",
    category: "Laptop Everyday / Office",
    description: "ASUS A416J hadir dengan prosesor Intel Core i5 Generasi ke-10, cocok untuk kebutuhan kerja harian, sekolah, dan multitasking ringan.", //[cite: 1]
    specs: {
      cpu: "Intel Core i5-1035G1", //[cite: 1]
      ram: "4GB DDR4", 
      storage: "256GB SSD", //[cite: 1]
      gpu: "Intel UHD Graphics",
      screen: '14.0" FHD (1920x1080) Anti-Glare',
      battery: "Hingga 5 jam",
      weight: "1.6 kg",
      os: "Windows 10 / 11",
    },
  },
  {
    id: "4",
    slug: "asus-a409ja-i3-1005g1",
    name: "ASUS A409JA",
    brand: "Asus",
    imageUrl: IMG.p04,
    price: 3800000, //[cite: 1]
    condition: "Baru",
    category: "Laptop Everyday / Office",
    description: "ASUS A409JA ditenagai Intel Core i3 dengan kapasitas penyimpanan HDD 1TB yang sangat luas untuk menyimpan dokumen dan media.", //[cite: 1]
    specs: {
      cpu: "Intel Core i3-1005G1", //[cite: 1]
      ram: "4GB DDR4", //[cite: 1]
      storage: "1TB HDD", //[cite: 1]
      gpu: "Intel UHD Graphics",
      screen: '14.0" HD Anti-Glare',
      battery: "Hingga 5 jam",
      weight: "1.6 kg",
      os: "Windows 10 / 11",
    },
  },
  {
    id: "5",
    slug: "asus-vivobook-a1402za-i7-1260p",
    name: "ASUS Vivobook A1402ZA",
    brand: "Asus",
    imageUrl: IMG.p05,
    price: 8500000, //[cite: 1]
    condition: "Baru",
    category: "Laptop Mid-Range / Premium",
    description: "ASUS Vivobook A1402ZA dibekali prosesor Intel Core i7 Gen 12 performa tinggi dengan tampilan warna Icelight Silver yang elegan.", //[cite: 1]
    specs: {
      cpu: "Intel Core i7-1260P", //[cite: 1]
      ram: "8GB DDR4", //[cite: 1]
      storage: "512GB SSD NVMe", //[cite: 1]
      gpu: "Intel Iris Xe Graphics",
      screen: '14.0" FHD Icelight Silver', //[cite: 1]
      battery: "Hingga 6 jam",
      weight: "1.5 kg",
      os: "DOS", //[cite: 1]
    },
  },
  {
    id: "6",
    slug: "asus-vivobook-go-14-flip-tp1400ka",
    name: "ASUS Vivobook Go 14 Flip TP1400KA",
    brand: "Asus",
    imageUrl: IMG.p06,
    price: 5000000, //[cite: 1]
    condition: "Baru",
    category: "2-in-1 / Touchscreen",
    description: "Laptop convertible 2-in-1 yang bisa dilipat 360 derajat dengan layar sentuh (touchscreen), sangat praktis untuk fleksibilitas tinggi.", //[cite: 1]
    specs: {
      cpu: "Intel Celeron N4500", //[cite: 1]
      ram: "4GB LPDDR4X", //[cite: 1]
      storage: "256GB SSD", //[cite: 1]
      gpu: "Intel UHD Graphics",
      screen: '14.0" Touchscreen 360° Flip', //[cite: 1]
      battery: "Hingga 7 jam",
      weight: "1.45 kg",
      os: "Windows 11",
    },
  },
  {
    id: "7",
    slug: "asus-zenbook-duo-ux8406ma",
    name: "ASUS Zenbook Duo UX8406MA",
    brand: "Asus",
    imageUrl: IMG.p07,
    price: 29000000, //[cite: 1]
    condition: "Baru",
    category: "Flagship / Dual Screen",
    description: "Laptop flagship super premium dengan dua layar OLED 3K, ditenagai prosesor terkuat Intel Core Ultra 9 EVO dan RAM jumbo 32GB.", //[cite: 1]
    specs: {
      cpu: "Intel Core Ultra 9-185H EVO", //[cite: 1]
      ram: "32GB LPDDR5X", //[cite: 1]
      storage: "2TB SSD NVMe PCIe 4.0", //[cite: 1]
      gpu: "Intel Arc Graphics",
      screen: 'Dual 14.0" 3K OLED Touchscreen 120Hz', //[cite: 1]
      battery: "Hingga 8 jam",
      weight: "1.65 kg",
      os: "Windows 11",
    },
  },
  {
    id: "8",
    slug: "asus-vivobook-m1605ya",
    name: "ASUS VIVOBOOK M1605YA",
    brand: "Asus",
    imageUrl: IMG.p08,
    price: 7000000, //[cite: 1]
    condition: "Baru",
    category: "Laptop Office / Kreatif",
    description: "ASUS Vivobook M1605YA ditenagai prosesor AMD Ryzen 5 dengan layar 16 inci yang luas dan nyaman untuk bekerja.", //[cite: 1]
    specs: {
      cpu: "AMD Ryzen 5-5625U", //[cite: 1]
      ram: "8GB", //[cite: 1]
      storage: "512GB SSD", // Disesuaikan dari foto (8/512 GB)[cite: 1]
      gpu: "AMD Radeon Graphics",
      screen: '16.0" Silver', //[cite: 1]
      battery: "Hingga 6 jam",
      weight: "1.7 kg",
      os: "Windows 11",
    },
  },
  {
    id: "9",
    slug: "asus-x416ma",
    name: "ASUS X416MA",
    brand: "Asus",
    imageUrl: IMG.p09,
    price: 4500000, //[cite: 1]
    condition: "Baru",
    category: "Laptop Entry-Level",
    description: "ASUS X416MA dengan prosesor Celeron cocok untuk pelajar dan penggunaan ringan sehari-hari.", //[cite: 1]
    specs: {
      cpu: "Intel Celeron N4020", //[cite: 1]
      ram: "8GB", //[cite: 1]
      storage: "256GB SSD", //[cite: 1]
      gpu: "Intel UHD Graphics",
      screen: '14.0" Gray', //[cite: 1]
      battery: "Hingga 5 jam",
      weight: "1.5 kg",
      os: "Windows 11",
    },
  },
  {
    id: "10",
    slug: "asus-zenbook-pro-14-duo-ux8402za",
    name: "ASUS ZENBOOK PRO 14 DUO UX8402ZA",
    brand: "Asus",
    imageUrl: IMG.p10,
    price: 19000000, //[cite: 1]
    condition: "Baru",
    category: "Laptop Creator / Dual Screen",
    description: "ASUS Zenbook Pro 14 Duo dengan prosesor Intel Core i7 Gen 12, layar sentuh OLED, dan desain dual screen untuk produktivitas profesional.", //[cite: 1]
    specs: {
      cpu: "Intel Core i7-12700H EVO", //[cite: 1]
      ram: "16GB", //[cite: 1]
      storage: "512GB SSD", //[cite: 1]
      gpu: "Intel Iris Xe Graphics",
      screen: '14.0" Touchscreen OLED (Garansi 11/27)', //[cite: 1]
      battery: "Hingga 6 jam",
      weight: "1.75 kg",
      os: "Windows 11",
    },
  },
  {
    id: "11",
    slug: "asus-vivobook-a1504vap",
    name: "ASUS VIVOBOOK A1504VAP",
    brand: "Asus",
    imageUrl: IMG.p11,
    price: 9000000, //[cite: 1]
    condition: "Baru",
    category: "Laptop Office / Multimedia",
    description: "ASUS Vivobook A1504VAP dibekali prosesor Intel Core i5 generasi terbaru dengan layar sentuh (touchscreen) berukuran 15 inci berwarna Navy.", //[cite: 1]
    specs: {
      cpu: "Intel Core i5-120U", //[cite: 1]
      ram: "16GB", //[cite: 1]
      storage: "512GB SSD", //[cite: 1]
      gpu: "Intel Graphics",
      screen: '15.0" Touchscreen Navy', //[cite: 1]
      battery: "Hingga 6 jam",
      weight: "1.7 kg",
      os: "Windows 11",
    },
  },
  {
    id: "12",
    slug: "asus-vivobook-14x-m1403qa",
    name: "ASUS VIVOBOOK 14X M1403QA",
    brand: "Asus",
    imageUrl: IMG.p12,
    price: 7000000, //[cite: 1]
    condition: "Baru",
    category: "Laptop Performance",
    description: "ASUS Vivobook 14X M1403QA mengandalkan ketangguhan prosesor AMD Ryzen 5 seri H yang bertenaga untuk bekerja maupun hiburan.", //[cite: 1]
    specs: {
      cpu: "AMD Ryzen 5-5600H", //[cite: 1]
      ram: "8GB", //[cite: 1]
      storage: "512GB SSD", //[cite: 1]
      gpu: "AMD Radeon Graphics",
      screen: '14.0" Silver + DOS', //[cite: 1]
      battery: "Hingga 6 jam",
      weight: "1.6 kg",
      os: "DOS", //[cite: 1]
    },
  },
  {
    id: "13",
    slug: "asus-vivobook-14-oled-k3400ph",
    name: "ASUS VIVOBOOK 14 OLED K3400PH",
    brand: "Asus",
    imageUrl: IMG.p13,
    price: 12500000, //[cite: 1]
    condition: "Baru",
    category: "Laptop Office / Creator",
    description: "ASUS Vivobook 14 OLED dengan kartu grafis diskrit NVIDIA GTX 1650 serta layar OLED tajam untuk visual yang memukau.", //[cite: 1]
    specs: {
      cpu: "Intel Core i7-11370H", //[cite: 1]
      ram: "16GB", //[cite: 1]
      storage: "512GB SSD", //[cite: 1]
      gpu: "NVIDIA GeForce GTX 1650 4GB", //[cite: 1]
      screen: '14.0" OLED Navy + DOS', //[cite: 1]
      battery: "Hingga 5 jam",
      weight: "1.4 kg",
      os: "DOS", //[cite: 1]
    },
  },
  {
    id: "14",
    slug: "asus-vivobook-15-oled-k513ea",
    name: "ASUS VIVOBOOK 15 OLED K513EA",
    brand: "Asus",
    imageUrl: IMG.p14,
    price: 7000000, //[cite: 1]
    condition: "Baru",
    category: "Laptop Multimedia / Office",
    description: "ASUS Vivobook 15 OLED K513EA menawarkan kualitas visual yang jernih dengan layar OLED berukuran 15 inci dan prosesor Intel Core i5.", //[cite: 1]
    specs: {
      cpu: "Intel Core i5-1135G7", //[cite: 1]
      ram: "8GB", //[cite: 1]
      storage: "256GB SSD", //[cite: 1]
      gpu: "Intel Iris Xe Graphics",
      screen: '15.0" OLED Silver', //[cite: 1]
      battery: "Hingga 6 jam",
      weight: "1.7 kg",
      os: "Windows 11",
    },
  },
  {
    id: "15",
    slug: "asus-zenbook-pro-14-duo-oled-ux8402za",
    name: "ASUS ZENBOOK PRO 14 DUO OLED UX8402ZA",
    brand: "Asus",
    imageUrl: IMG.p10,
    price: 19000000, //[cite: 1]
    condition: "Baru",
    category: "Laptop Creator / Dual Screen",
    description: "ASUS Zenbook Pro 14 Duo OLED fullset dengan prosesor Intel Core i7 Gen 12 dan layar sentuh ganda untuk produktivitas profesional kelas atas.", //[cite: 1]
    specs: {
      cpu: "Intel Core i7-12700H", //[cite: 1]
      ram: "16GB", //[cite: 1]
      storage: "512GB SSD", //[cite: 1]
      gpu: "Intel Iris Xe Graphics",
      screen: '14.0" Touchscreen OLED Fullset', //[cite: 1]
      battery: "Hingga 6 jam",
      weight: "1.75 kg",
      os: "Windows 11",
    },
  },
  {
    id: "16",
    slug: "asus-vivobook-e1504fa",
    name: "ASUS VIVOBOOK E1504FA",
    brand: "Asus",
    imageUrl: IMG.p16,
    price: 7000000, //[cite: 1]
    condition: "Baru",
    category: "Laptop Office / Student",
    description: "ASUS Vivobook E1504FA dibekali AMD Ryzen 3 dan RAM 16GB dengan warna Greengrey yang unik.", //[cite: 1]
    specs: {
      cpu: "AMD Ryzen 3-7320U", //[cite: 1]
      ram: "16GB", //[cite: 1]
      storage: "512GB SSD", //[cite: 1]
      gpu: "AMD Radeon Graphics",
      screen: '15.0" Greengrey + DOS', //[cite: 1]
      battery: "Hingga 7 jam",
      weight: "1.63 kg",
      os: "DOS", //[cite: 1]
    },
  },
  {
    id: "17",
    slug: "asus-vivobook-e1404fa",
    name: "ASUS VIVOBOOK E1404FA",
    brand: "Asus",
    imageUrl: IMG.p17,
    price: 4500000, //[cite: 1]
    condition: "Baru",
    category: "Laptop Office / Student",
    description: "ASUS Vivobook E1404FA mengandalkan performa kencang AMD Ryzen 5 dan RAM 16GB untuk komputasi harian.", //[cite: 1]
    specs: {
      cpu: "AMD Ryzen 5-7520U", //[cite: 1]
      ram: "16GB", //[cite: 1]
      storage: "512GB SSD", //[cite: 1]
      gpu: "AMD Radeon Graphics",
      screen: '14.0" Hitam + DOS', //[cite: 1]
      battery: "Hingga 7 jam",
      weight: "1.38 kg",
      os: "DOS", //[cite: 1]
    },
  },

  {
    id: "18",
    slug: "hp-chromebook-11-g4",
    name: "HP CHROMEBOOK 11 G4 Celeron N2840 4/256 GB HITAM",
    brand: "HP",
    imageUrl: IMG.p18,
    price: 2500000,
    condition: "Baru",
    category: "Laptop Office / Student",
    description: "HP Chromebook 11 G4 Celeron N2840 ringkas untuk belajar.",
    specs: {
      cpu: "Intel Celeron N2840",
      ram: "4GB",
      storage: "256GB SSD",
      gpu: "Intel HD Graphics",
      screen: '11.6" Hitam',
      battery: "Hingga 7 jam",
      weight: "1.4 kg",
      os: "ChromeOS",
    },
  },
  {
    id: "19",
    slug: "hp-elitebook-840-g8-16gb",
    name: "HP ELITEBOOK 840 G8 i5-1135G7 16/512 GB",
    brand: "HP",
    imageUrl: IMG.p19,
    price: 7000000,
    condition: "Baru",
    category: "Laptop Bisnis / Premium",
    description: "HP EliteBook 840 G8 dengan prosesor Intel Core i5 dan RAM 16GB.",
    specs: {
      cpu: "Intel Core i5-1135G7",
      ram: "16GB",
      storage: "512GB SSD",
      gpu: "Intel Iris Xe Graphics",
      screen: '14.0"',
      battery: "Hingga 7 jam",
      weight: "1.4 kg",
      os: "Windows 11 Pro",
    },
  },
  {
    id: "20",
    slug: "hp-elitebook-840-g8-8gb",
    name: "HP ELITEBOOK 840 G8 i5-1135G7 8/512 GB",
    brand: "HP",
    imageUrl: IMG.p20,
    price: 7000000,
    condition: "Baru",
    category: "Laptop Bisnis / Premium",
    description: "HP EliteBook 840 G8 seri bisnis berbalut bodi metal yang elegan.",
    specs: {
      cpu: "Intel Core i5-1135G7",
      ram: "8GB",
      storage: "512GB SSD",
      gpu: "Intel Iris Xe Graphics",
      screen: '14.0"',
      battery: "Hingga 7 jam",
      weight: "1.4 kg",
      os: "Windows 11 Pro",
    },
  },
  {
    id: "21",
    slug: "hp-probook-430-g8",
    name: "HP PROBOOK 430 G8 i5-1135G7 16/512 GB SILVER",
    brand: "HP",
    imageUrl: IMG.p21,
    price: 7000000,
    condition: "Baru",
    category: "Laptop Office / Student",
    description: "HP ProBook 430 G8 Silver ukuran 13.3 inci yang ringkas dan portabel.",
    specs: {
      cpu: "Intel Core i5-1135G7",
      ram: "16GB",
      storage: "512GB SSD",
      gpu: "Intel Iris Xe Graphics",
      screen: '13.3" Silver',
      battery: "Hingga 7 jam",
      weight: "1.4 kg",
      os: "Windows 11",
    },
  },
  {
    id: "22",
    slug: "hp-elitebook-845-g8",
    name: "HP ELITEBOOK 845 G8 Ryzen 5-5650U PRO 8/256 GB SILVER",
    brand: "HP",
    imageUrl: IMG.p22,
    price: 7000000,
    condition: "Baru",
    category: "Laptop Bisnis / Premium",
    description: "HP EliteBook 845 G8 bertenaga AMD Ryzen Pro.",
    specs: {
      cpu: "AMD Ryzen 5-5650U Pro",
      ram: "8GB",
      storage: "256GB SSD",
      gpu: "AMD Radeon Graphics",
      screen: '14.0" Silver',
      battery: "Hingga 7 jam",
      weight: "1.4 kg",
      os: "Windows 11 Pro",
    },
  },
  {
    id: "23",
    slug: "hp-elitebook-745-g5",
    name: "HP ELITEBOOK 745 G5 Ryzen 7 Pro-2700U 16/256 GB SILVER",
    brand: "HP",
    imageUrl: IMG.p23,
    price: 7000000,
    condition: "Baru",
    category: "Laptop Bisnis / Premium",
    description: "HP EliteBook 745 G5 Ryzen 7 Pro dengan RAM 16GB.",
    specs: {
      cpu: "AMD Ryzen 7 Pro-2700U",
      ram: "16GB",
      storage: "256GB SSD",
      gpu: "AMD Radeon RX Vega 10",
      screen: '14.0" Silver',
      battery: "Hingga 7 jam",
      weight: "1.4 kg",
      os: "Windows 11",
    },
  },
  {
    id: "24",
    slug: "hp-14s-dq5155tu",
    name: "HP 14s-dq5155TU i7-1255U 8/512 GB Garansi 12/26 SILVER FULLSET",
    brand: "HP",
    imageUrl: IMG.p24,
    price: 9000000,
    condition: "Baru",
    category: "Laptop Office / Student",
    description: "HP 14s Core i7 gen 12 lengkap fullset dengan masa garansi.",
    specs: {
      cpu: "Intel Core i7-1255U",
      ram: "8GB",
      storage: "512GB SSD",
      gpu: "Intel Iris Xe Graphics",
      screen: '14.0" Silver Fullset',
      battery: "Hingga 7 jam",
      weight: "1.4 kg",
      os: "Windows 11",
    },
  },
  {
    id: "25",
    slug: "hp-245-g10",
    name: "HP 245 G10 Ryzen 5-7520U 8/512 GB SILVER",
    brand: "HP",
    imageUrl: IMG.p25,
    price: 7000000,
    condition: "Baru",
    category: "Laptop Office / Student",
    description: "HP 245 G10 dengan prosesor modern Ryzen 5.",
    specs: {
      cpu: "AMD Ryzen 5-7520U",
      ram: "8GB",
      storage: "512GB SSD",
      gpu: "AMD Radeon Graphics",
      screen: '14.0" Silver',
      battery: "Hingga 7 jam",
      weight: "1.4 kg",
      os: "Windows 11",
    },
  },
  {
    id: "26",
    slug: "hp-elitebook-x360-1030-g7",
    name: "HP ELITEBOOK X360 1030 G7 i5-10310U 16/512 GB TOUCHSCREEN SILVER",
    brand: "HP",
    imageUrl: IMG.p26,
    price: 7000000,
    condition: "Baru",
    category: "Laptop Bisnis / Premium",
    description: "HP EliteBook X360 1030 G7 laptop konvertibel layar sentuh premium.",
    specs: {
      cpu: "Intel Core i5-10310U",
      ram: "16GB",
      storage: "512GB SSD",
      gpu: "Intel UHD Graphics",
      screen: '13.3" Touchscreen Silver',
      battery: "Hingga 7 jam",
      weight: "1.4 kg",
      os: "Windows 11 Pro",
    },
  },
  {
    id: "27",
    slug: "hp-spectre-x360-convertible",
    name: "HP SPECTRE X360 CONVERTIBLE i7-8565U 16/512 GB TOUCH HIJAU TOSKA",
    brand: "HP",
    imageUrl: IMG.p27,
    price: 7500000,
    condition: "Baru",
    category: "Laptop Bisnis / Premium",
    description: "HP Spectre X360 edisi warna Hijau Toska yang mewah.",
    specs: {
      cpu: "Intel Core i7-8565U",
      ram: "16GB",
      storage: "512GB SSD",
      gpu: "Intel UHD Graphics 620",
      screen: '13.3" Touch Hijau Toska',
      battery: "Hingga 7 jam",
      weight: "1.4 kg",
      os: "Windows 11 Pro",
    },
  },
  {
    id: "28",
    slug: "hp-14s-dq3109tu",
    name: "HP 14s dq3109TU Celeron N4500 8/256 GB SILVER + DOS",
    brand: "HP",
    imageUrl: IMG.p28,
    price: 4500000,
    condition: "Baru",
    category: "Laptop Office / Student",
    description: "HP 14s entry-level handal untuk tugas harian.",
    specs: {
      cpu: "Intel Celeron N4500",
      ram: "8GB",
      storage: "256GB SSD",
      gpu: "Intel UHD Graphics",
      screen: '14.0" Silver + DOS',
      battery: "Hingga 7 jam",
      weight: "1.4 kg",
      os: "DOS",
    },
  },
  {
    id: "29",
    slug: "hp-elitebook-x360-i5-1245u",
    name: "HP ELITEBOOK X360 i5-1245U 16/256 GB 13 INCI TOUCHSCREEN SILVER",
    brand: "HP",
    imageUrl: IMG.p29,
    price: 10000000,
    condition: "Baru",
    category: "Laptop Bisnis / Premium",
    description: "HP EliteBook X360 dengan performa kencang i5 generasi ke-12.",
    specs: {
      cpu: "Intel Core i5-1245U",
      ram: "16GB",
      storage: "256GB SSD",
      gpu: "Intel Iris Xe Graphics",
      screen: '13.0" Touchscreen Silver',
      battery: "Hingga 7 jam",
      weight: "1.4 kg",
      os: "Windows 11 Pro",
    },
  },

  {
    id: "30",
    slug: "hp-elitebook-840-g8-i5-1145g7",
    name: "HP ELITEBOOK 840 G8 i5-1145G7 16/512 GB",
    brand: "HP",
    imageUrl: IMG.p30,
    price: 7000000,
    condition: "Baru",
    category: "Laptop Bisnis / Premium",
    description: "HP EliteBook 840 G8 varian prosesor i5-1145G7.",
    specs: {
      cpu: "Intel Core i5-1145G7",
      ram: "16GB",
      storage: "512GB SSD",
      gpu: "Intel Iris Xe Graphics",
      screen: '14.0"',
      battery: "Hingga 7 jam",
      weight: "1.4 kg",
      os: "Windows 11 Pro",
    },
  },
  // --- STOK LAINNYA (ID 31 - 33) ---
  {
    id: "31",
    slug: "samsung-watch-fit-3",
    name: "SAMSUNG WATCH FIT 3",
    brand: "Samsung",
    imageUrl: IMG.p31,
    price: 600000,
    condition: "Baru",
    category: "Aksesoris",
    description: "Samsung Watch Fit 3 pintar untuk memantau kesehatan.",
    specs: {
      cpu: "-",
      ram: "-",
      storage: "-",
      gpu: "-",
      screen: "AMOLED Display",
      battery: "Hingga 7 jam",
      weight: "1.4 kg",
      os: "RTOS",
    },
  },
  {
    id: "32",
    slug: "xiaomi-pad-6",
    name: "XIAOMI PAD 6 SNAPDRAGON 870 8/256 GB + DOS 2024",
    brand: "Xiaomi",
    imageUrl: IMG.p32,
    price: 3800000,
    condition: "Baru",
    category: "Tablet",
    description: "Tablet Xiaomi Pad 6 dengan chipset Snapdragon 870.",
    specs: {
      cpu: "Snapdragon 870",
      ram: "8GB",
      storage: "256GB",
      gpu: "Adreno 650",
      screen: '11.0" 144Hz + DOS',
      battery: "Hingga 7 jam",
      weight: "1.4 kg",
      os: "Android",
    },
  },
  {
    id: "33",
    slug: "cnast-yogabook-n100",
    name: "CNAST YOGABOOK N100 8/512 GB DUAL SCREEN FULLSET",
    brand: "Cnast",
    imageUrl: IMG.p33,
    price: 6000000,
    condition: "Baru",
    category: "Laptop Inovatif",
    description: "Cnast Yogabook N100 dengan fitur dual screen canggih.",
    specs: {
      cpu: "Intel N100",
      ram: "8GB",
      storage: "512GB SSD",
      gpu: "Intel UHD Graphics",
      screen: "Dual Screen Fullset",
      battery: "Hingga 7 jam",
      weight: "1.4 kg",
      os: "Windows 11",
    },
  },

  // --- LENOVO (ID 34 - 47) ---
  {
    id: "34",
    slug: "lenovo-300e-chromebook-2nd",
    name: "LENOVO 300E CHROMBOOK 2ND Celeron N4020 4/32 +128 GB MMC TOUCHSCREEN DUAL CAMERA HITAM",
    brand: "Lenovo",
    imageUrl: IMG.p34,
    price: 2300000,
    condition: "Baru",
    category: "Laptop Office / Student",
    description: "Lenovo 300e Chromebook touchscreen tangguh.",
    specs: {
      cpu: "Intel Celeron N4020",
      ram: "4GB",
      storage: "32GB + 128GB MMC",
      gpu: "Intel UHD Graphics",
      screen: "Touchscreen Hitam",
      battery: "Hingga 7 jam",
      weight: "1.4 kg",
      os: "ChromeOS",
    },
  },
  {
    id: "35",
    slug: "lenovo-ideapad-flex-5-14itl05",
    name: "LENOVO IDEAPAD FLEX 5 14ITL05 i3-1115G4 8/512 GB BIRU",
    brand: "Lenovo",
    imageUrl: IMG.p35,
    price: 7500000,
    condition: "Baru",
    category: "Laptop Office / Student",
    description: "Lenovo Ideapad Flex 5 warna biru elegan layar lipat.",
    specs: {
      cpu: "Intel Core i3-1115G4",
      ram: "8GB",
      storage: "512GB SSD",
      gpu: "Intel UHD Graphics",
      screen: '14.0" Touchscreen Biru',
      battery: "Hingga 7 jam",
      weight: "1.4 kg",
      os: "Windows 11",
    },
  },
  {
    id: "36",
    slug: "lenovo-thinkpad-x1-carbon-gen-8",
    name: "LENOVO THINKPAD X1 CARBON GEN 8 i5-10210U 8/256 GB HITAM",
    brand: "Lenovo",
    imageUrl: IMG.p36,
    price: 7500000,
    condition: "Baru",
    category: "Laptop Bisnis / Premium",
    description: "ThinkPad X1 Carbon Gen 8 ultrabook premium super ringan.",
    specs: {
      cpu: "Intel Core i5-10210U",
      ram: "8GB",
      storage: "256GB SSD",
      gpu: "Intel UHD Graphics",
      screen: '14.0" Hitam',
      battery: "Hingga 7 jam",
      weight: "1.4 kg",
      os: "Windows 11 Pro",
    },
  },
  {
    id: "37",
    slug: "lenovo-thinkpad-x1-yoga-gen-8",
    name: "LENOVO THINKPAD X1 YOGA GEN 8 i5-1345U 16/256 GB TOUCHSCREEN Garansi 11/26 ALUMINIUM GREY",
    brand: "Lenovo",
    imageUrl: IMG.p37,
    price: 11000000,
    condition: "Baru",
    category: "Laptop Bisnis / Premium",
    description: "ThinkPad X1 Yoga Gen 8 bodi aluminium garansi aktif.",
    specs: {
      cpu: "Intel Core i5-1345U",
      ram: "16GB",
      storage: "256GB SSD",
      gpu: "Intel Iris Xe Graphics",
      screen: '14.0" Touchscreen Grey',
      battery: "Hingga 7 jam",
      weight: "1.4 kg",
      os: "Windows 11 Pro",
    },
  },
  {
    id: "38",
    slug: "lenovo-thinkbook-13s-iml",
    name: "LENOVO THINKBOOK 13s-IML i5-10210U 8/256 GB GREY",
    brand: "Lenovo",
    imageUrl: IMG.p38,
    price: 8500000,
    condition: "Baru",
    category: "Laptop Office / Student",
    description: "Lenovo ThinkBook 13s-IML bergaya stylish profesional.",
    specs: {
      cpu: "Intel Core i5-10210U",
      ram: "8GB",
      storage: "256GB SSD",
      gpu: "Intel UHD Graphics",
      screen: '13.3" Grey',
      battery: "Hingga 7 jam",
      weight: "1.4 kg",
      os: "Windows 11",
    },
  },
  {
    id: "39",
    slug: "lenovo-thinkbook-14s-iml",
    name: "LENOVO THINKBOOK 14s-IML i5-10210U 8/256 GB GREY",
    brand: "Lenovo",
    imageUrl: IMG.p39,
    price: 8500000,
    condition: "Baru",
    category: "Laptop Office / Student",
    description: "Lenovo ThinkBook 14s-IML layar 14 inci.",
    specs: {
      cpu: "Intel Core i5-10210U",
      ram: "8GB",
      storage: "256GB SSD",
      gpu: "Intel UHD Graphics",
      screen: '14.0" Grey',
      battery: "Hingga 7 jam",
      weight: "1.4 kg",
      os: "Windows 11",
    },
  },
  {
    id: "40",
    slug: "lenovo-ideapad-slim-3-14iau7",
    name: "LENOVO IDEAPAD SLIM 3 14IAU7 i5-1235U 8/512 GB GREY",
    brand: "Lenovo",
    imageUrl: IMG.p40,
    price: 7000000,
    condition: "Baru",
    category: "Laptop Office / Student",
    description: "Lenovo Ideapad Slim 3 i5 gen 12.",
    specs: {
      cpu: "Intel Core i5-1235U",
      ram: "8GB",
      storage: "512GB SSD",
      gpu: "Intel Iris Xe Graphics",
      screen: '14.0" Grey',
      battery: "Hingga 7 jam",
      weight: "1.4 kg",
      os: "Windows 11",
    },
  },
  {
    id: "41",
    slug: "lenovo-thinkpad-l14-gen-1-16gb",
    name: "LENOVO THINKPAD L14 GEN 1 Ryzen 5-4500U 16/256 GB",
    brand: "Lenovo",
    imageUrl: IMG.p41,
    price: 6000000,
    condition: "Baru",
    category: "Laptop Office / Student",
    description: "ThinkPad L14 Gen 1 Ryzen 5 dan RAM 16GB.",
    specs: {
      cpu: "AMD Ryzen 5-4500U",
      ram: "16GB",
      storage: "256GB SSD",
      gpu: "AMD Radeon Graphics",
      screen: '14.0"',
      battery: "Hingga 7 jam",
      weight: "1.4 kg",
      os: "Windows 11 Pro",
    },
  },
  {
    id: "42",
    slug: "lenovo-thinkpad-l14-gen-1-8gb",
    name: "LENOVO THINKPAD L14 GEN 1 Ryzen 5-4500U 8/256 GB",
    brand: "Lenovo",
    imageUrl: IMG.p42,
    price: 5800000,
    condition: "Baru",
    category: "Laptop Office / Student",
    description: "ThinkPad L14 Gen 1 RAM 8GB.",
    specs: {
      cpu: "AMD Ryzen 5-4500U",
      ram: "8GB",
      storage: "256GB SSD",
      gpu: "AMD Radeon Graphics",
      screen: '14.0"',
      battery: "Hingga 7 jam",
      weight: "1.4 kg",
      os: "Windows 11 Pro",
    },
  },
  {
    id: "43",
    slug: "lenovo-ideapad-slim-3-14amn8",
    name: "LENOVO IDEAPAD SLIM 3 14AMN8 Ryzen 5-7520U 8/512 GB GREY",
    brand: "Lenovo",
    imageUrl: IMG.p43,
    price: 7000000,
    condition: "Baru",
    category: "Laptop Office / Student",
    description: "Lenovo Ideapad Slim 3 efisiensi daya tinggi.",
    specs: {
      cpu: "AMD Ryzen 5-7520U",
      ram: "8GB",
      storage: "512GB SSD",
      gpu: "AMD Radeon Graphics",
      screen: '14.0" Grey',
      battery: "Hingga 7 jam",
      weight: "1.4 kg",
      os: "Windows 11",
    },
  },
  {
    id: "44",
    slug: "lenovo-thinkpad-l13-yoga",
    name: "LENOVO THINKPAD L13 YOGA i5-10310U 16/256 GB TOUCHSCREEN HITAM",
    brand: "Lenovo",
    imageUrl: IMG.p44,
    price: 6500000,
    condition: "Baru",
    category: "Laptop Office / Student",
    description: "ThinkPad L13 Yoga fleksibel touchscreen RAM 16GB.",
    specs: {
      cpu: "Intel Core i5-10310U",
      ram: "16GB",
      storage: "256GB SSD",
      gpu: "Intel UHD Graphics",
      screen: '13.3" Touchscreen Hitam',
      battery: "Hingga 7 jam",
      weight: "1.4 kg",
      os: "Windows 11 Pro",
    },
  },
  {
    id: "45",
    slug: "lenovo-v14-g4-amn",
    name: "LENOVO V14 G4 AMN Athlon Silver-7120U 8/256 GB Garansi 12/27 GREY",
    brand: "Lenovo",
    imageUrl: IMG.p45,
    price: 4500000,
    condition: "Baru",
    category: "Laptop Office / Student",
    description: "Lenovo V14 G4 garansi panjang akhir 2027.",
    specs: {
      cpu: "AMD Athlon Silver-7120U",
      ram: "8GB",
      storage: "256GB SSD",
      gpu: "AMD Radeon Graphics",
      screen: '14.0" Grey',
      battery: "Hingga 7 jam",
      weight: "1.4 kg",
      os: "Windows 11",
    },
  },
  {
    id: "46",
    slug: "lenovo-ideapad-slim-3-14ada05",
    name: "LENOVO IDEAPAD SLIM 3-14ADA05 AMD Athlon-3020e 4/256 GB NAVY",
    brand: "Lenovo",
    imageUrl: IMG.p46,
    price: 3800000,
    condition: "Baru",
    category: "Laptop Office / Student",
    description: "Lenovo Ideapad Slim 3 Navy ramah di kantong.",
    specs: {
      cpu: "AMD Athlon-3020e",
      ram: "4GB",
      storage: "256GB SSD",
      gpu: "AMD Radeon Graphics",
      screen: '14.0" Navy',
      battery: "Hingga 7 jam",
      weight: "1.4 kg",
      os: "Windows 11",
    },
  },
  {
    id: "47",
    slug: "lenovo-thinkpad-x395",
    name: "LENOVO THINKPAD X395 AMD RYZEN 7 PRO-3700U 8/256 GB TOUCHSCREEN HITAM",
    brand: "Lenovo",
    imageUrl: IMG.p47,
    price: 5000000,
    condition: "Baru",
    category: "Laptop Bisnis / Premium",
    description: "ThinkPad X395 Ryzen 7 Pro layar sentuh.",
    specs: {
      cpu: "AMD Ryzen 7 PRO-3700U",
      ram: "8GB",
      storage: "256GB SSD",
      gpu: "AMD Radeon RX Vega 10",
      screen: '13.3" Touchscreen Hitam',
      battery: "Hingga 7 jam",
      weight: "1.4 kg",
      os: "Windows 11 Pro",
    },
  },
// --- MACBOOK (ID 48 - 54) ---
  {
    id: "48",
    slug: "macbook-pro-retina-core-i5",
    name: "MACBOOK PRO RETINA CORE I5 8/256 GB GREY",
    brand: "Apple",
    imageUrl: IMG.p48,
    price: 8000000,
    condition: "Baru",
    category: "MacBook",
    description: "MacBook Pro Retina display Grey.",
    specs: {
      cpu: "Intel Core i5",
      ram: "8GB",
      storage: "256GB SSD",
      gpu: "Intel Iris Graphics",
      screen: '13.3" Retina Grey',
      battery: "Hingga 7 jam",
      weight: "1.4 kg",
      os: "macOS",
    },
  },
  {
    id: "49",
    slug: "macbook-air-core-i5-2020",
    name: "MACBOOK AIR CORE I5 16/512 GB ROSEGOLD PINK 2020",
    brand: "Apple",
    imageUrl: IMG.p49,
    price: 5800000,
    condition: "Baru",
    category: "MacBook",
    description: "MacBook Air 2020 RAM 16GB SSD 512GB Rosegold.",
    specs: {
      cpu: "Intel Core i5",
      ram: "16GB",
      storage: "512GB SSD",
      gpu: "Intel Iris Plus Graphics",
      screen: '13.3" Retina Rosegold',
      battery: "Hingga 7 jam",
      weight: "1.4 kg",
      os: "macOS",
    },
  },
  {
    id: "50",
    slug: "macbook-neo-a18pro",
    name: "MACBOOK NEO A18Pro 8/256 GB CC 2 BH 100% Garansi 07/27 SILVER + DOS",
    brand: "Apple",
    imageUrl: IMG.p50,
    price: 11500000,
    condition: "Baru",
    category: "MacBook",
    description: "MacBook baterai 100% lengkap dos.",
    specs: {
      cpu: "Apple Silicon",
      ram: "8GB",
      storage: "256GB SSD",
      gpu: "Apple GPU",
      screen: '13.3" Retina Silver + DOS',
      battery: "Hingga 7 jam",
      weight: "1.4 kg",
      os: "macOS",
    },
  },
  {
    id: "51",
    slug: "macbook-neo-2026-a18pro",
    name: "MACBOOK NEO 2026 A18Pro 8/256 GB CC 9 BH 100% Garansi 08/27 SILVER",
    brand: "Apple",
    imageUrl: IMG.p51,
    price: 11500000,
    condition: "Baru",
    category: "MacBook",
    description: "MacBook edisi terbaru baterai 100% cc rendah.",
    specs: {
      cpu: "Apple Silicon",
      ram: "8GB",
      storage: "256GB SSD",
      gpu: "Apple GPU",
      screen: '13.3" Retina Silver',
      battery: "Hingga 7 jam",
      weight: "1.4 kg",
      os: "macOS",
    },
  },
  {
    id: "52",
    slug: "macbook-air-2018",
    name: "MACBOOK AIR 2018 i5 8/256 GB CC 466 GREY",
    brand: "Apple",
    imageUrl: IMG.p52,
    price: 8500000,
    condition: "Baru",
    category: "MacBook",
    description: "MacBook Air 2018 handal.",
    specs: {
      cpu: "Intel Core i5",
      ram: "8GB",
      storage: "256GB SSD",
      gpu: "Intel UHD Graphics 617",
      screen: '13.3" Retina Grey',
      battery: "Hingga 7 jam",
      weight: "1.4 kg",
      os: "macOS",
    },
  },
  {
    id: "53",
    slug: "macbook-pro-m1",
    name: "MACBOOK Pro M1 16/512 GB BH 83% CC 222 SILVER",
    brand: "Apple",
    imageUrl: IMG.p53,
    price: 17000000,
    condition: "Baru",
    category: "MacBook",
    description: "MacBook Pro Chip M1 RAM 16GB SSD 512GB.",
    specs: {
      cpu: "Apple M1",
      ram: "16GB",
      storage: "512GB SSD",
      gpu: "Apple 8-core GPU",
      screen: '13.3" Retina Silver',
      battery: "Hingga 7 jam",
      weight: "1.4 kg",
      os: "macOS",
    },
  },
  {
    id: "54",
    slug: "macbook-air-2019",
    name: "MACBOOK AIR 2019 CORE i5 8/256 GB BH 74% CC 223 ROSEGOLD",
    brand: "Apple",
    imageUrl: IMG.p54,
    price: 8500000,
    condition: "Baru",
    category: "MacBook",
    description: "MacBook Air 2019 Rosegold.",
    specs: {
      cpu: "Intel Core i5",
      ram: "8GB",
      storage: "256GB SSD",
      gpu: "Intel UHD Graphics 617",
      screen: '13.3" Retina Rosegold',
      battery: "Hingga 7 jam",
      weight: "1.4 kg",
      os: "macOS",
    },
  },

  // --- LAPTOP GAMING (ID 55 - 71) ---
  {
    id: "55",
    slug: "asus-tuf-a15-fa507",
    name: "ASUS TUF A15 FA507 Ryzen 7-7435HS 16/1 TB RTX 4060-8GB Garansi 04/27",
    brand: "ASUS",
    imageUrl: IMG.p55,
    price: 18500000,
    condition: "Baru",
    category: "Laptop Gaming",
    description: "ASUS TUF RTX 4060 SSD 1 TB.",
    specs: {
      cpu: "AMD Ryzen 7-7435HS",
      ram: "16GB",
      storage: "1 TB SSD",
      gpu: "NVIDIA RTX 4060 8GB",
      screen: '15.6" 144Hz',
      battery: "Hingga 7 jam",
      weight: "1.4 kg",
      os: "Windows 11",
    },
  },
  {
    id: "56",
    slug: "acer-nitro-v15",
    name: "ACER NITRO V15 i9-13620H 16/512 GB RTX 5050-8GB",
    brand: "Acer",
    imageUrl: IMG.p56,
    price: 20000000,
    condition: "Baru",
    category: "Laptop Gaming",
    description: "Acer Nitro V15 Core i9.",
    specs: {
      cpu: "Intel Core i9-13620H",
      ram: "16GB",
      storage: "512GB SSD",
      gpu: "NVIDIA RTX 5050 8GB",
      screen: '15.6"',
      battery: "Hingga 7 jam",
      weight: "1.4 kg",
      os: "Windows 11",
    },
  },
  {
    id: "57",
    slug: "lenovo-legion-5-15irx10",
    name: "LENOVO LEGION 5 15IRX10 i7-14700HX 16/512 GB RTX 5060-8GB OLED Garansi 10/28 FULLSET",
    brand: "Lenovo",
    imageUrl: IMG.p57,
    price: 28000000,
    condition: "Baru",
    category: "Laptop Gaming",
    description: "Lenovo Legion 5 OLED RTX 5060.",
    specs: {
      cpu: "Intel Core i7-14700HX",
      ram: "16GB",
      storage: "512GB SSD",
      gpu: "NVIDIA RTX 5060 8GB",
      screen: "OLED Display Fullset",
      battery: "Hingga 7 jam",
      weight: "1.4 kg",
      os: "Windows 11 Pro",
    },
  },
  {
    id: "58",
    slug: "lenovo-loq-15ahp9",
    name: "LENOVO LOQ 15AHP9 Ryzen 5-8645HS 8/512 GB RTX 4050-6GB FULLSET",
    brand: "Lenovo",
    imageUrl: IMG.p58,
    price: 16000000,
    condition: "Baru",
    category: "Laptop Gaming",
    description: "Lenovo LOQ AI RTX 4050.",
    specs: {
      cpu: "AMD Ryzen 5-8645HS",
      ram: "8GB",
      storage: "512GB SSD",
      gpu: "NVIDIA RTX 4050 6GB",
      screen: '15.6" Fullset',
      battery: "Hingga 7 jam",
      weight: "1.4 kg",
      os: "Windows 11",
    },
  },
  {
    id: "59",
    slug: "lenovo-loq-15irx9",
    name: "LENOVO LOQ 15IRX9 i7-13645HX 16/512 GB RTX 4050-6GB Garansi 09/28 FULLSET",
    brand: "Lenovo",
    imageUrl: IMG.p59,
    price: 20000000,
    condition: "Baru",
    category: "Laptop Gaming",
    description: "Lenovo LOQ i7 HX RTX 4050.",
    specs: {
      cpu: "Intel Core i7-13645HX",
      ram: "16GB",
      storage: "512GB SSD",
      gpu: "NVIDIA RTX 4050 6GB",
      screen: '15.6" Fullset',
      battery: "Hingga 7 jam",
      weight: "1.4 kg",
      os: "Windows 11",
    },
  },
  {
    id: "60",
    slug: "asus-rog-strix-gl553ve",
    name: "ASUS ROG STRIX GL553VE i7-7700HQ 16/256 GB + HDD 1 TB GTX 1050Ti-4GB",
    brand: "ASUS",
    imageUrl: IMG.p60,
    price: 7000000,
    condition: "Baru",
    category: "Laptop Gaming",
    description: "ASUS ROG Strix dual storage.",
    specs: {
      cpu: "Intel Core i7-7700HQ",
      ram: "16GB",
      storage: "256GB SSD + 1 TB HDD",
      gpu: "NVIDIA GTX 1050Ti 4GB",
      screen: '15.6"',
      battery: "Hingga 7 jam",
      weight: "1.4 kg",
      os: "Windows 11",
    },
  },
  {
    id: "61",
    slug: "asus-tuf-a16-fa608um",
    name: "ASUS TUF A16 FA608UM Ryzen 7-260 16/512 GB RTX 5060-8GB Garansi 08/27 FULLSET",
    brand: "ASUS",
    imageUrl: IMG.p61,
    price: 25000000,
    condition: "Baru",
    category: "Laptop Gaming",
    description: "ASUS TUF A16 RTX 5060.",
    specs: {
      cpu: "AMD Ryzen 7",
      ram: "16GB",
      storage: "512GB SSD",
      gpu: "NVIDIA RTX 5060 8GB",
      screen: '16.0" Fullset',
      battery: "Hingga 7 jam",
      weight: "1.4 kg",
      os: "Windows 11",
    },
  },
  {
    id: "62",
    slug: "asus-rog-strix-gl553vd",
    name: "ASUS ROG STRIX GL553VD i7-7700HQ 16/128 GB + HDD 1 TB GTX 1050-4GB",
    brand: "ASUS",
    imageUrl: IMG.p62,
    price: 7000000,
    condition: "Baru",
    category: "Laptop Gaming",
    description: "ASUS ROG Strix GTX 1050.",
    specs: {
      cpu: "Intel Core i7-7700HQ",
      ram: "16GB",
      storage: "128GB SSD + 1 TB HDD",
      gpu: "NVIDIA GTX 1050 4GB",
      screen: '15.6"',
      battery: "Hingga 7 jam",
      weight: "1.4 kg",
      os: "Windows 11",
    },
  },
  {
    id: "63",
    slug: "msi-bravo-15b7ed",
    name: "MSI BRAVO 15B7ED Ryzen 5-7535HS 8/512 GB",
    brand: "MSI",
    imageUrl: IMG.p63,
    price: 10000000,
    condition: "Baru",
    category: "Laptop Gaming",
    description: "MSI Bravo 15 AMD platform.",
    specs: {
      cpu: "AMD Ryzen 5-7535HS",
      ram: "8GB",
      storage: "512GB SSD",
      gpu: "AMD Radeon Graphics",
      screen: '15.6" 144Hz',
      battery: "Hingga 7 jam",
      weight: "1.4 kg",
      os: "Windows 11",
    },
  },
  {
    id: "64",
    slug: "msi-katana-a15-ai-b8vf",
    name: "MSI KATANA A15 AI B8VF Ryzen 7-8845HS 16/512 RTX 4060-8GB",
    brand: "MSI",
    imageUrl: IMG.p64,
    price: 15000000,
    condition: "Baru",
    category: "Laptop Gaming",
    description: "MSI Katana AI RTX 4060.",
    specs: {
      cpu: "AMD Ryzen 7-8845HS",
      ram: "16GB",
      storage: "512GB SSD",
      gpu: "NVIDIA RTX 4060 8GB",
      screen: '15.6"',
      battery: "Hingga 7 jam",
      weight: "1.4 kg",
      os: "Windows 11",
    },
  },
  {
    id: "65",
    slug: "msi-gf63-thin-11uc",
    name: "MSI GF63 THIN 11UC i5-11400H 16/512 GB RTX 3050-4GB + DOS",
    brand: "MSI",
    imageUrl: IMG.p65,
    price: 9000000,
    condition: "Baru",
    category: "Laptop Gaming",
    description: "MSI GF63 Thin RTX 3050.",
    specs: {
      cpu: "Intel Core i5-11400H",
      ram: "16GB",
      storage: "512GB SSD",
      gpu: "NVIDIA RTX 3050 4GB",
      screen: '15.6" + DOS',
      battery: "Hingga 7 jam",
      weight: "1.4 kg",
      os: "DOS",
    },
  },
  {
    id: "66",
    slug: "asus-rog-zephyrus-ga502iv",
    name: "ASUS ROG ZEPHYRUS GA502IV Ryzen 9-4900HS 16/1 TB RTX 2060-6GB",
    brand: "ASUS",
    imageUrl: IMG.p66,
    price: 13000000,
    condition: "Baru",
    category: "Gaming",
    description: "ASUS ROG Zephyrus tipis Ryzen 9.",
    specs: {
      cpu: "AMD Ryzen 9-4900HS",
      ram: "16GB",
      storage: "1 TB SSD",
      gpu: "NVIDIA RTX 2060 6GB",
      screen: '15.6"',
      battery: "Hingga 7 jam",
      weight: "1.4 kg",
      os: "Windows 11",
    },
  },
  {
    id: "67",
    slug: "asus-tuf-a15-fa507nur",
    name: "ASUS TUF A15 FA507NUR Ryzen 7-7435HS 16/512 GB RTX 4050-6GB Garansi 12/26",
    brand: "ASUS",
    imageUrl: IMG.p67,
    price: 17500000,
    condition: "Baru",
    category: "Gaming",
    description: "ASUS TUF A15 RTX 4050.",
    specs: {
      cpu: "AMD Ryzen 7-7435HS",
      ram: "16GB",
      storage: "512GB SSD",
      gpu: "NVIDIA RTX 4050 6GB",
      screen: '15.6"',
      battery: "Hingga 7 jam",
      weight: "1.4 kg",
      os: "Windows 11",
    },
  },
  {
    id: "68",
    slug: "asus-rog-strix-g513ic",
    name: "ASUS ROG STRIX G513IC Ryzen 7-4800H 8/512 GB RTX 3050-4GB",
    brand: "ASUS",
    imageUrl: IMG.p68,
    price: 15000000,
    condition: "Baru",
    category: "Laptop Gaming",
    description: "ASUS ROG Strix G15 RTX 3050.",
    specs: {
      cpu: "AMD Ryzen 7-4800H",
      ram: "8GB",
      storage: "512GB SSD",
      gpu: "NVIDIA RTX 3050 4GB",
      screen: '15.6" 144Hz',
      battery: "Hingga 7 jam",
      weight: "1.4 kg",
      os: "Windows 11",
    },
  },
  {
    id: "69",
    slug: "asus-tuf-a15-fx506iv",
    name: "ASUS TUF A15 FX506IV Ryzen 9-4900H 8/512 GB RTX 2060-6GB",
    brand: "ASUS",
    imageUrl: IMG.p69,
    price: 12000000,
    condition: "Baru",
    category: "Laptop Gaming",
    description: "ASUS TUF A15 Ryzen 9.",
    specs: {
      cpu: "AMD Ryzen 9-4900H",
      ram: "8GB",
      storage: "512GB SSD",
      gpu: "NVIDIA RTX 2060 6GB",
      screen: '15.6"',
      battery: "Hingga 7 jam",
      weight: "1.4 kg",
      os: "Windows 11",
    },
  },
  {
    id: "70",
    slug: "asus-rog-strix-g513rc",
    name: "ASUS ROG STRIX G513RC Ryzen 7-6800HS 8/512 GB RTX 3050-4GB + TAS",
    brand: "ASUS",
    imageUrl: IMG.p70,
    price: 15000000,
    condition: "Baru",
    category: "Laptop Gaming",
    description: "ASUS ROG Strix G513RC + tas.",
    specs: {
      cpu: "AMD Ryzen 7-6800HS",
      ram: "8GB",
      storage: "512GB SSD",
      gpu: "NVIDIA RTX 3050 4GB",
      screen: '15.6" + Tas',
      battery: "Hingga 7 jam",
      weight: "1.4 kg",
      os: "Windows 11",
    },
  },
  {
    id: "71",
    slug: "asus-tuf-a15-fa506ncg",
    name: "ASUS TUF A15 FA506NCG Ryzen 7-7445HS 16/512 GB RTX 3050-4GB Garansi 11/27",
    brand: "ASUS",
    imageUrl: IMG.p71,
    price: 14500000,
    condition: "Baru",
    category: "Laptop Gaming",
    description: "ASUS TUF A15 garansi panjang.",
    specs: {
      cpu: "AMD Ryzen 7-7445HS",
      ram: "16GB",
      storage: "512GB SSD",
      gpu: "NVIDIA RTX 3050 4GB",
      screen: '15.6" 144Hz',
      battery: "Hingga 7 jam",
      weight: "1.4 kg",
      os: "Windows 11",
    },
  },
];

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
    Gaming:
      "gaming dengan performa tinggi untuk main game AAA, esport, dan streaming",
    Ultrabook:
      "ultrabook tipis ringan untuk produktivitas mobile dan kerja profesional",
    Business:
      "laptop bisnis dengan keamanan dan durabilitas tingkat enterprise",
    Office:
      "laptop office untuk kerja harian, sekolah, dan tugas kantoran",
    Creator:
      "laptop creator untuk editing video, desain grafis, dan rendering 3D",
  };

  const usageText =
    categoryText[product.category] ||
    "laptop serbaguna untuk kebutuhan sehari-hari";

  return [
    `${product.name} adalah ${usageText}. Ditenagai oleh ${product.specs.cpu} dipadukan dengan ${product.specs.ram}, laptop ini siap menangani berbagai tugas — dari multitasking, browsing, hingga aplikasi berat sekalipun.`,
    `Layar ${product.specs.screen} menghadirkan tampilan jernih dan nyaman untuk mata. Dengan storage ${product.specs.storage} dan grafis ${product.specs.gpu}, kamu bisa menyimpan banyak file dan menjalankan aplikasi grafis dengan lancar.`,
    `Bobot hanya ${product.specs.weight} dan baterai ${product.specs.battery} membuat laptop ini cocok untuk dibawa mobilitas tinggi. Sistem operasi ${product.specs.os} sudah terinstall original dan siap pakai.`,
    `Kami menyediakan ${conditionText} dari brand ${product.brand} terpercaya. Setiap pembelian dilengkapi garansi toko, konsultasi gratis, dan pelayanan after-sales yang ramah.`,
  ];
}

// Helper: Keunggulan utama (auto-generate)
export function getHighlights(product: Product): string[] {
  const highlights: string[] = [];

  highlights.push(`Prosesor ${product.specs.cpu}`);
  highlights.push(`RAM ${product.specs.ram}`);
  highlights.push(`Storage ${product.specs.storage}`);
  highlights.push(`Grafis ${product.specs.gpu}`);
  highlights.push(`Layar ${product.specs.screen}`);
  highlights.push(
    product.condition === "Baru"
      ? "Garansi resmi distributor"
      : "Garansi toko 3 bulan",
  );
  highlights.push("Gratis konsultasi & setup awal");

  return highlights;
}

// Helper: Cocok untuk
export function getUseCases(product: Product): string[] {
  const map: Record<string, string[]> = {
    Gaming: [
      "Gamer casual & hardcore",
      "Streamer & content creator gaming",
      "Editor video dengan efek berat",
      "Mahasiswa teknik informatika / DKV",
    ],
    Ultrabook: [
      "Profesional mobile & freelancer",
      "Mahasiswa & pelajar",
      "Content creator ringan",
      "Eksekutif & pekerja remote",
    ],
    Business: [
      "Karyawan kantoran & manajer",
      "Pengusaha & profesional",
      "Konsultan & auditor",
      "Pengguna yang butuh keamanan data",
    ],
    Office: [
      "Pelajar & mahasiswa",
      "Karyawan administrasi",
      "Ibu rumah tangga & pekerja WFH",
      "Pemula yang baru belajar komputer",
    ],
    Creator: [
      "Video editor profesional",
      "Desainer grafis & 3D artist",
      "Fotografer & videografer",
      "Animator & motion designer",
    ],
  };

  return map[product.category] || [
    "Pengguna umum",
    "Pelajar & mahasiswa",
    "Karyawan & profesional",
  ];
}

export function getWhatsInBox(product: Product): string[] {
  const base = [
    `Unit ${product.brand} ${product.name}`,
    "Charger original",
    "Box & manual book",
    "Nota pembelian",
    "Kartu garansi",
  ];
  if (product.condition === "Baru") {
    base.push("Bonus: Tas laptop + Mouse");
    base.push("Bonus: Screen protector");
  } else {
    base.push("Bonus: Tas laptop");
    base.push("Garansi toko 3 bulan");
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
    Apple: "Aluminium unibody aerospace-grade",
    Asus: product.category === "Gaming" ? "Magnesium alloy + aluminium" : "Aluminium alloy premium",
    Lenovo: "Carbon fiber + magnesium alloy",
    HP: "Aluminium + plastik high-grade",
    Dell: "Aluminium + carbon fiber",
    Acer: "Aluminium + polycarbonate",
    MSI: "Aluminium + plastik ABS",
    Samsung: "Aluminium alloy premium",
    Huawei: "Aluminium alloy + karbon",
    Razer: "Aluminium CNC unibody",
  };
  const colorMap: Record<string, string> = {
    Apple: "Space Gray / Silver",
    Asus: product.category === "Gaming" ? "Eclipse Gray / Volt Green" : "Ponder Blue / Foggy Silver",
    Lenovo: "Deep Black / Storm Gray",
    HP: product.category === "Gaming" ? "Mica Silver" : "Natural Silver",
    Dell: "Platinum Silver / Graphite",
    Acer: "Obsidian Black",
    MSI: "Core Black",
    Samsung: "Graphite / Beige",
    Huawei: "Space Gray / Mystic Silver",
    Razer: "Matte Black",
  };
  return {
    material: materialMap[product.brand] || "Aluminium alloy",
    color: colorMap[product.brand] || "Black",
    weight: product.specs.weight,
    thickness: product.category === "Gaming" ? "22-25 mm" : "15-18 mm",
    features: [
      "Desain presisi CNC",
      "Sudut ergonomis 180 derajat",
      "Finishing anti-fingerprint",
      "Logo brand embossed",
    ],
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
    cpuScore,
    gpuScore,
    ramScore,
    totalScore,
    tier,
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
    size: `${size}"`,
    resolution,
    refreshRate,
    panelType,
    brightness: isOLED ? "600 nits HDR" : isRetina ? "500 nits" : "300 nits",
    features: [
      isOLED ? "100% DCI-P3 color gamut" : "Anti-glare coating",
      "Wide viewing angle 178 derajat",
      "Low blue light certified",
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
    ports.push("Thunderbolt 4");
    ports.push("RJ-45 Ethernet");
    ports.push("microSD card reader");
  } else {
    ports.push("USB 2.0");
  }
  return {
    ports,
    wireless: ["Wi-Fi 6E (802.11ax)", "Bluetooth 5.2"],
  };
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
    features: [
      ...(appMap[product.brand] || ["Brand utilities"]),
      "Pre-installed Microsoft Office (trial)",
      "Windows Defender / macOS Security",
    ],
  };
}