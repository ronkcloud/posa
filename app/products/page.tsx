'use client'

import { useOrderContext } from "@/hook/order-context";
import { useState, useEffect } from "react";
import { AddProductCard, ProductCard, ProductEditPanel } from "../components/product-panel";
import { Product } from "@/lib/validations";
import { cn } from "@/lib/utils";

export default function ProductsPage() {
    const { products, refreshProducts } = useOrderContext();
    const [selectedProductId, setSelectedProductId] = useState<number | undefined>();

    const productOnEdit = selectedProductId === undefined
        ? undefined
        : products.find(p => p.id === selectedProductId);

    const handleAddProduct = () => {
        setSelectedProductId(undefined);
    };

    const handleOnSave = async (savedProduct: Product) => {
        await refreshProducts();
        setSelectedProductId(savedProduct.id)
    }
    
    return (
        <div className="flex gap-4 mx-auto">
            <div className="w-[360px] h-screen py-4">
                <ProductEditPanel 
                    product={productOnEdit}
                    onSave={(savedProduct) => handleOnSave(savedProduct)}
                    className="w-full h-full" 
                />
            </div>
            <div className="h-screen w-[calc((12rem+1rem)*4)] custom-scrollbar">
                {/* <ProductNavigation className="w-full"/>
                <ProductPanel className="w-full custom-scrollbar flex-1"/> */}

                <div className="grid grid-cols-[repeat(auto-fill,minmax(12rem,1fr))] gap-4 p-4">
                    <div
                        className={cn(
                            "cursor-pointer border-1 rounded-[2.1rem] border-border-muted border transition-all",
                            // selectedProductId === product.id && "border-primary border-2 shadow-lg"
                        )}
                    >
                        <AddProductCard
                            onClick={handleAddProduct}
                            className="scale-95"
                        />
                    </div>
                    {products.map(product => (
                        <div
                            key={product.id}
                            onClick={() => setSelectedProductId(product.id)}
                            className={cn(
                                "cursor-pointer border-1 rounded-[2.1rem] border-border-muted border transition-all",
                                // selectedProductId === product.id && "border-primary border-2 shadow-lg"
                            )}
                        >
                            <ProductCard 
                                product={product}
                                className="scale-95"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};