'use client'

import * as React from "react"
import { useMemo } from "react";
import { formatCurrency, formatShortCurrency } from "@/lib/products";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";
import { cn } from "@/lib/utils"
import { CupSoda } from "lucide-react";
import { useOrderContext } from "@/hook/order-context"

export function ProductPanel({ className, ...props }: React.ComponentProps<"div">) {
    const { orderItems, setOrderItems, products, setProducts, searchQuery, activeCategory } = useOrderContext();

    const addToOrder = (productId: string) => {
        const product = products.find((p) => p.id === productId);
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

    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            const matchesCategory = activeCategory === "all" || product.category === activeCategory;
            const matchesSearch = product.name.toLocaleLowerCase().includes(searchQuery);
            return matchesCategory && matchesSearch;
        });
    }, [products, searchQuery, activeCategory]);

    return(
        <div 
            className={cn(
                "grid grid-cols-[repeat(auto-fill,minmax(12rem,1fr))] gap-4 p-4",
                className
            )}
            {...props}
        >
            {filteredProducts.map((product) => (
                <Card key={product.id}
                onClick={() => addToOrder(product.id)}
                className={`
                    w-full rounded-[2rem] cursor-pointer transition-transform h-fit
                    shadow-[0_3px_10px_2px_var(--color-bg-shadow)] 
                    border-2 border-bg-light hover:border-border-muted active:scale-95`}
                >
                <CardContent className="h-40">
                    <div 
                        className={cn("border-1 rounded-[1rem] h-full flex items-center",
                            orderItems.some(item => item.productId === product.id)
                                ? "border-primary-dim border-3"
                                : "border-border-muted"
                        )}
                    >
                        <CupSoda 
                            className="text-bg-dark mx-auto"
                            size={108} 
                            strokeWidth={3}
                        />
                    </div>
                </CardContent>
                <CardHeader className="text-center">
                    <CardTitle>
                    {product.name}
                    </CardTitle>
                    <CardDescription>{formatCurrency(product.price)}</CardDescription>
                </CardHeader>
                </Card>
            ))}
        </div>
    )
}