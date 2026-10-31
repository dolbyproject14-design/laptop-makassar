import rentalsData from "@/public/images/data/rentals.json";

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

// Ambil data langsung dari JSON
export const rentalProducts: Rental[] = rentalsData as Rental[];