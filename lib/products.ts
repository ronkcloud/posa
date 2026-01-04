export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
}

export const PRODUCTS: Product[] = [
  { id: "americano", name: "Americano", price: 15000, category: "Coffee" },
  { id: "latte", name: "Latte", price: 20000, category: "Milk Based" },
  { id: "v60", name: "V60", price: 20000, category: "Manual Brew" },
  { id: "long-black", name: "Long Black", price: 20000, category: "Coffee" },
  { id: "frape", name: "Frape", price: 20000, category: "Non Coffee" },
  { id: "dirty-latte", name: "Dirty Latte", price: 15000, category: "Milk Based" },
  { id: "vietnam-drip", name: "Vietnam Drip", price: 20000, category: "Manual Brew" },
  { id: "cold-brew", name: "Cold Brew", price: 20000, category: "Manual Brew" },
  { id: "espresso", name: "Espresso", price: 20000, category: "Coffee" },
  { id: "matcha", name: "Matcha", price: 20000, category: "Non Coffee" },
];

export const CATEGORIES: string[] = [
  ...new Set(PRODUCTS.map((item) => item.category)),
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
