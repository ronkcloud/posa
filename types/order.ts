import { Product } from "@/lib/products"

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface OrderContextType {
    orderItems: OrderItem[];
    setOrderItems: React.Dispatch<React.SetStateAction<OrderItem[]>>;
    products: Product[];
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    activeCategory: string;
    setActiveCategory: (category: string) => void;
}