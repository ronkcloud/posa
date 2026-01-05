'use client'

import { useState } from "react";
import { ProductPanel } from "./components/product-panel";
import { ProductNavigation } from "./components/product-navigation";
import { OrderPanel, PaymentPanel } from "./components/order-panel";
import { useOrderContext } from "@/hook/order-context";

export default function Home() {
    const { orderItems } = useOrderContext();
    const [view, setView] = useState<'order' | 'payment'>('order');

    return (
        <div className="flex gap-4 mx-auto">
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
        </div>
    )
}