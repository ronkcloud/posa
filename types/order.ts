export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface OrderContextType {
    orderItems: OrderItem[];
    setOrderItems: (items: OrderItem[] | ((prev: OrderItem[]) => OrderItem[])) => void;
}