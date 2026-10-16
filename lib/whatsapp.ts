export const WA_NUMBER = "6282296497423"; // Ganti dengan nomor WA asli

export function waLink(message: string) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function waProductInquiry(productName: string, price?: number) {
  const priceText = price
    ? ` dengan harga Rp ${price.toLocaleString("id-ID")}`
    : "";
  return waLink(
    `Halo Laptop Makassar, saya tertarik dengan ${productName}${priceText}. Mohon info lebih lanjut tentang ketersediaan dan cara pembelian. Terima kasih!`
  );
}

export function waGeneralInquiry() {
  return waLink(
    "Halo Laptop Makassar, saya mau tanya-tanya soal laptop. Mohon dibantu ya!"
  );
}
export function waRentalInquiry(
  rentalName: string,
  pricePerDay: number,
  days: number = 1,
) {
  const total = pricePerDay * days;
  return waLink(
    `Halo Laptop Makassar, saya mau sewa *${rentalName}*.\n\n` +
      `Durasi: ${days} hari\n` +
      `Harga: Rp ${pricePerDay.toLocaleString("id-ID")}/hari\n` +
      `Total: Rp ${total.toLocaleString("id-ID")}\n\n` +
      `Mohon info ketersediaan & cara sewa. Terima kasih!`,
  );
}