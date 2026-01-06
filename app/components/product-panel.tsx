'use client'

import * as React from "react"
import { useMemo, useEffect, useState } from "react";
import { formatCurrency, formatShortCurrency } from "@/lib/products";
import { EMPTY_PRODUCT, NewProduct, newProductSchema, Product, productSchema } from "@/lib/validations";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";
import { Label } from "./label";
import { Input } from "./input";
import { cn } from "@/lib/utils"
import { CupSoda } from "lucide-react";
import { useOrderContext } from "@/hook/order-context"
import { Textarea } from "./text-area";
import { Button } from "./button";

export function AddProductCard({ 
    className, 
    ...props 
}: React.ComponentProps<"div">) {
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
                <CardTitle>Add Product</CardTitle>
                {/* <CardDescription>{formatCurrency(product.price)}</CardDescription> */}
            </CardHeader>
        </Card>
    )
}

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

    const addToOrder = (productId: number) => {
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
    onSave,
    className, 
    ...props 
}: React.ComponentProps<"div"> & {
    product?: Product;
    onSave?: (product: Product) => void;
}) {
    const [onEditProduct, setOnEditProduct] = useState<Product | NewProduct>(EMPTY_PRODUCT);
    const [isSaving, setIsSaving] = React.useState(false);

    useEffect(() => {
        setOnEditProduct(product ?? EMPTY_PRODUCT);
    }, [product]);
    
    const isNew = !product

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const { id, value } = e.target;
            setOnEditProduct(prev => ({
                ...prev,
                // Match input 'id' to schema keys
                [id]: id === 'price' ? (value === '' ? '' : Number(value)) : value
            }));
        };

    const handleProductSave = async () => {
        const schema = isNew ? newProductSchema : productSchema
        const onEditProductParsed = schema.safeParse(onEditProduct);

        if (!onEditProductParsed.success) {
            alert(onEditProductParsed.error.message);
            return;
        }

        const validProductData = onEditProductParsed.data
        setIsSaving(true);

        try {
            console.log(validProductData)
            const url = isNew
                ? "/api/products"
                : `/api/products/${product.id}`;
            const method = isNew
                ? "POST"
                : "PUT";
            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(validProductData)
            });
            
            const result = await response.json();
            if (result.success && onSave) {
                onSave(result.data);
            }
        } catch (error) {
            console.error("Failed to save product:", error);
        } finally {
            setIsSaving(false);
        }
    };

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
                <CardContent className="flex flex-col gap-5 h-full pl-6 pr-4 custom-scrollbar">
                    <div className="w-full aspect-square rounded-[1rem] border-1 border-border-muted">
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1">
                        <Label className="text-xs text-text-muted" htmlFor="name">Product Name</Label>
                        <Input 
                            className="border-border-muted" 
                            type="text" 
                            id="name" 
                            value={onEditProduct.name} 
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1">
                        <Label className="text-xs text-text-muted" htmlFor="price">Price</Label>
                        <Input 
                            className="border-border-muted" 
                            type="number" 
                            id="price" 
                            value={onEditProduct.price} 
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1">
                        <Label className="text-xs text-text-muted" htmlFor="category">Category</Label>
                        <Input 
                            className="border-border-muted" 
                            type="text" 
                            id="category" 
                            value={onEditProduct.category} 
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1">
                        <Label className="text-xs text-text-muted" htmlFor="description">Description</Label>
                        <Textarea 
                            className="border-border-muted" 
                            id="description" 
                            value={onEditProduct.description || ''} 
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mt-4 flex w-full gap-2">
                        <Button
                            // onClick={() => setOnEditProduct(product)}
                            variant="outline"
                            className="font-bold py-4 w-[50%] rounded-[1rem] border-border-muted"
                        >
                            <span>Discard</span>
                        </Button>
                        <Button
                            onClick={handleProductSave}
                            disabled={isSaving}
                            className="font-bold py-4 w-[50%] rounded-[1rem]"
                        >
                            <span>Save</span>
                        </Button>
                    </div>
                </CardContent>
                {/* <CardFooter className="flex flex-col">
                </CardFooter> */}
            </Card>
        </div>
    )
}