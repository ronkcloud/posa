'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { OrderContextType, OrderItem } from "@/types/order"
import { Product } from "@/lib/products";

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
    const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("all");

    useEffect(() => {
        fetch('/api/products')
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setProducts(data.data.products);
                    setCategories(data.data.categories);
                }
            })
    }, []);

    return (
        <OrderContext.Provider value={{ 
            orderItems, setOrderItems, 
            products, setProducts,
            categories, setCategories,
            searchQuery, setSearchQuery,
            activeCategory, setActiveCategory
        }}>
            {children}
        </OrderContext.Provider>
    );
}

export function useOrderContext() {
    const context = useContext(OrderContext);
    if (!context) {
        throw new Error("useOrderContext must be used within OrderProvider");
    }
    return context;
}