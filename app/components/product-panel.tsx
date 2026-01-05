'use client'

import * as React from "react"
import { useMemo } from "react";
import { formatCurrency, formatShortCurrency, Product } from "@/lib/products";
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

export function ProductCard({ 
    product, 
    className, 
    ...props 
}: React.ComponentProps<"div"> & {
    product: Product
}) {
    return (
        <Card
        className={cn("flex gap-0 rounded-[2rem] p-2 border-2 border-bg-light hover:border-border-muted",
            className
        )}
        {...props}
        >
            <CardContent className="h-48 p-2">
                <div className="border-1 border-border-muted rounded-[1rem] h-full flex items-center">
                    <CupSoda 
                        className="text-bg-dark mx-auto"
                        size={108} 
                        strokeWidth={3}
                    />
                </div>
            </CardContent>
            <CardHeader className="my-1 text-center">
                <CardTitle>{product.name}</CardTitle>
                <CardDescription>{formatCurrency(product.price)}</CardDescription>
            </CardHeader>
        </Card>
    )
}

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
                <div
                    key={product.id}
                    onClick={() => addToOrder(product.id)}
                    className={cn(
                        `rounded-[2.1rem] cursor-pointer
                        shadow-[0_3px_10px_2px_var(--color-bg-shadow)] 
                        transition-transform active:scale-95`,
                        orderItems.some((item) => item.productId === product.id) && 
                        `border-3 border-primary-dim`
                    )}
                >
                    <ProductCard 
                        product={product}
                    />
                </div>
            ))}
        </div>
    )
}

export function ProductEditPanel({ 
    product, 
    className, 
    ...props 
}: React.ComponentProps<"div"> & {
    product: Product
}) {
    return(
        <div 
            className={cn(
                className
            )}
            {...props}
        >
            <Card className="w-full h-full rounded-[2rem] border-border-muted">
                {/* <CardHeader className="flex flex-row items-center justify-between pb-3">
                    <CardTitle className="text-lg font-bold">{product.name}</CardTitle>
                </CardHeader> */}
                <CardContent className="h-full pl-6 pr-4 custom-scrollbar">
                    <div className="w-full h-10 border-1 border-border-muted">

                    </div>
                    <div className="w-full h-10 border-1 border-border-muted">
                        { product.name }
                    </div>
                    <div className="w-full h-10 border-1 border-border-muted">
                        { product.price }
                    </div>
                    <div className="w-full h-10 border-1 border-border-muted">
                        description
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col">
                    {/* <div className="flex justify-between w-full p-2 my-1 text-lg font-bold">
                        <span>Sub Total</span>
                        <span>{formatCurrency(totalAmount)}</span>
                    </div>
                    <div className="border-t-[2px] border-dashed mb-8 border-border w-full" />
                    <Button
                        onClick={onCheckout}
                        disabled={orderItems.length === 0}
                        className="font-bold text-lg py-6 w-[80%] rounded-[2rem]"
                    >
                        <span>Payment</span>
                        <CircleArrowRight className="size-6"/>
                    </Button> */}
                </CardFooter>
            </Card>
        </div>
    )
}