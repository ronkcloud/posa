'use client'

import Image from "next/image";
import { useEffect, useState } from "react";
import { ProductPanel } from "./components/product-panel";
import { ProductNavigation } from "./components/product-navigation";
import { OrderPanel, PaymentPanel } from "./components/order-panel";
import { OrderContext } from "@/hook/order-context";
import { OrderItem } from "@/types/order";
import { Product } from "@/lib/products";

export default function Home() {
    const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("all");
    const [view, setView] = useState<'order' | 'payment'>('order');

    useEffect(() => {
        fetch('/api/products')
            .then(res => res.json())
            .then(data => setProducts(data.data))
    }, []);

    return (
        <div className="flex flex-wrap gap-4 mx-auto">
            <OrderContext.Provider value={{ 
                orderItems, setOrderItems, 
                products, setProducts,
                searchQuery, setSearchQuery,
                activeCategory, setActiveCategory
                }}
            >
                <div className="h-screen flex flex-col w-[calc((12rem+1rem)*4)]">
                    <ProductNavigation className="w-full"/>
                    <ProductPanel className="w-full custom-scrollbar flex-1"/>
                </div>
                <div className="w-[360px] h-screen py-4">
                    {view === 'order' ? (
                        <OrderPanel 
                            className="w-full h-full" 
                            onCheckout={() => setView('payment')}
                        />
                    ) : (
                        <PaymentPanel 
                            className="w-full h-full" 
                            onBack={() => setView('order')}
                        />
                    )}
                </div>
            </OrderContext.Provider>
        </div>
    )
}
