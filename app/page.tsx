'use client'

import Image from "next/image";
import { useState } from "react";
import { ProductPanel } from "./components/product-panel";
import { OrderPanel } from "./components/order-panel";
import { OrderContext } from "@/hook/order-context";
import { OrderItem } from "@/types/order";

export default function Home() {
    const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

    return (
        <div className="flex flex-wrap gap-4 items-center mx-auto">
            <OrderContext.Provider value={{ orderItems, setOrderItems }}>
                <ProductPanel className="w-[calc((12rem+1rem)*4)] h-screen overflow-y-auto"/>
                <OrderPanel className="w-[320px] h-screen"/>
            </OrderContext.Provider>
        </div>
    )
}
