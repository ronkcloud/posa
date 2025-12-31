export interface Product {
  id: string;
  name: string;
  price: number; // in IDR
}

export const PRODUCTS: Product[] = [
  { id: "americano", name: "Americano", price: 15000 },
  { id: "latte", name: "Latte", price: 20000 },
  { id: "v60", name: "Latte", price: 20000 },
  { id: "long black", name: "Latte", price: 20000 },
  { id: "frape", name: "Latte", price: 20000 },
  { id: "americano1", name: "Americano", price: 15000 },
  { id: "latte1", name: "Latte", price: 20000 },
  { id: "v601", name: "Latte", price: 20000 },
  { id: "long black1", name: "Latte", price: 20000 },
  { id: "frape1", name: "Latte", price: 20000 },
];

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatShortCurrency(amount: number): string {
  if (amount >= 1000) {
    return `${amount / 1000}k`;
  }
  return amount.toString();
}
