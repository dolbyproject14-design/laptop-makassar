export interface Rental {
  id: string;
  name: string;
  brand: string;
  imageUrl: string;
  pricePerDay: number;
  category: string;
  specs: {
    cpu: string;
    ram: string;
    storage: string;
    gpu: string;
  };
  minDays: number;
}

const IMG = {
  laptop1: "images/products/06.jpg",
  laptop2: "images/products/17.jpg",
  laptop3: "images/products/60.jpg",
  laptop4: "images/products/37.jpg",
  laptop5: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80",
  laptop6: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&q=80",
  laptop7: "https://images.unsplash.com/photo-1618424181497-157f25b6ddd5?w=800&q=80",
  laptop8: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&q=80",
};

export const rentalProducts: Rental[] = [
  {
    id: "r1",
    name: "ASUS Vivobook Go 14 Flip TP1400KA",
    brand: "Apple",
    imageUrl: IMG.laptop1,
    pricePerDay: 250000,
    category: "Ultrabook",
    specs: { cpu: "Apple M2", ram: "8GB", storage: "256GB SSD", gpu: "Apple GPU" },
    minDays: 1,
  },
  {
    id: "r2",
    name: "ASUS VIVOBOOK E1404FA ",
    brand: "Apple",
    imageUrl: IMG.laptop2,
    pricePerDay: 250000,
    category: "Creator",
    specs: { cpu: "Apple M3 Pro", ram: "18GB", storage: "512GB SSD", gpu: "Apple 14-core" },
    minDays: 1,
  },
  {
    id: "r3",
    name: "Asus ROG Strix G16",
    brand: "Asus",
    imageUrl: IMG.laptop3,
    pricePerDay: 200000,
    category: "Gaming",
    specs: { cpu: "Intel Core i7", ram: "16GB", storage: "1TB SSD", gpu: "RTX 4060" },
    minDays: 2,
  },
  {
    id: "r4",
    name: "Lenovo ThinkPad X1 Carbon",
    brand: "Lenovo",
    imageUrl: IMG.laptop4,
    pricePerDay: 130000,
    category: "Business",
    specs: { cpu: "Intel Core i7", ram: "16GB", storage: "512GB SSD", gpu: "Intel Iris Xe" },
    minDays: 1,
  },
  {
    id: "r5",
    name: "Dell XPS 15 OLED",
    brand: "Dell",
    imageUrl: IMG.laptop5,
    pricePerDay: 220000,
    category: "Creator",
    specs: { cpu: "Intel Core i7", ram: "16GB", storage: "1TB SSD", gpu: "RTX 4050" },
    minDays: 1,
  },
  {
    id: "r6",
    name: "Acer Nitro V 15",
    brand: "Acer",
    imageUrl: IMG.laptop6,
    pricePerDay: 100000,
    category: "Gaming",
    specs: { cpu: "Intel Core i5", ram: "8GB", storage: "512GB SSD", gpu: "RTX 2050" },
    minDays: 1,
  },
  {
    id: "r7",
    name: "MSI Katana 15",
    brand: "MSI",
    imageUrl: IMG.laptop7,
    pricePerDay: 150000,
    category: "Gaming",
    specs: { cpu: "Intel Core i7", ram: "16GB", storage: "512GB SSD", gpu: "RTX 4060" },
    minDays: 2,
  },
  {
    id: "r8",
    name: "HP Victus 16",
    brand: "HP",
    imageUrl: IMG.laptop5,
    pricePerDay: 120000,
    category: "Gaming",
    specs: { cpu: "AMD Ryzen 7", ram: "16GB", storage: "512GB SSD", gpu: "RTX 4050" },
    minDays: 1,
  },
];