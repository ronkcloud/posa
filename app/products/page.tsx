'use client'

import { useOrderContext } from "@/hook/order-context";
import { useState } from "react";
import { ProductCard, ProductEditPanel } from "../components/product-panel";
import { Product } from "@/lib/products";

export default function ProductsPage() {
    const { products } = useOrderContext();
    const [productOnEdit, setProductOnEdit] = useState<Product>(products[0]);
    
    return (
        <div className="flex gap-4 mx-auto">
            <div className="w-[360px] h-screen py-4">
                <ProductEditPanel 
                    product={productOnEdit}
                    className="w-full h-full" 
                    
                />
            </div>
            <div className="h-screen w-[calc((12rem+1rem)*4)] custom-scrollbar">
                {/* <ProductNavigation className="w-full"/>
                <ProductPanel className="w-full custom-scrollbar flex-1"/> */}

                <div className="grid grid-cols-[repeat(auto-fill,minmax(12rem,1fr))] gap-4 p-4">
                    {products.map(product => (
                        <ProductCard product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
};