'use client'

import * as React from "react"
import { PRODUCTS, formatCurrency, formatShortCurrency } from "@/lib/products";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";
import { cn } from "@/lib/utils"
import { useOrderContext } from "@/hook/order-context"

export function ProductPanel({ className, ...props }: React.ComponentProps<"div">) {
    const { orderItems, setOrderItems } = useOrderContext();

    const addToOrder = (productId: string) => {
        const product = PRODUCTS.find((p) => p.id === productId);
        if (!product) return;

        const qty = 1;

        const existingIndex = orderItems.findIndex(
        (item) => item.productId === productId
        );

        if (existingIndex >= 0) {
            const updated = orderItems.map((item, index) =>
                index === existingIndex
                    ? {
                        ...item,
                        quantity: item.quantity + qty,
                        totalPrice: (item.quantity + qty) * product.price,
                    }
                    : item
            );
            setOrderItems(updated);
        } else {
            setOrderItems([
                ...orderItems,
                {
                    productId: productId,
                    productName: product.name,
                    quantity: qty,
                    unitPrice: product.price,
                    totalPrice: qty * product.price,
                },
            ]);
        }
    };

    return(
        <div 
            className={cn(
                "grid grid-cols-[repeat(auto-fit,minmax(12rem,1fr))] gap-4 place-items-center py-4",
                className
            )}
            {...props}
        >
            {PRODUCTS.map((product) => (
                <Card key={product.id}
                onClick={() => addToOrder(product.id)}
                className="w-48 h-48 cursor-pointer transition-transform hover:shadow active:scale-95"
                >
                <CardContent />
                <CardHeader className="text-center">
                    <CardTitle>
                    {product.name}
                    </CardTitle>
                    {/* <CardDescription>{formatCurrency(product.price)}</CardDescription> */}
                </CardHeader>
                </Card>
            ))}
        </div>
    )
}