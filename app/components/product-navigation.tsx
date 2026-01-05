'use client'

import * as React from "react";
import { useState } from "react";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { Input } from "./input";
import { useOrderContext } from "@/hook/order-context"

export function ProductNavigation({ className, ...props }: React.ComponentProps<"div">) {
    const { categories, activeCategory, setActiveCategory, setSearchQuery } = useOrderContext();

    const handleCategoryFilter = (category: string) => {
        setActiveCategory(category)
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value.toLowerCase());
    };

    return(
        <div 
            className={cn(
                "p-4 w-full",
                className
            )}
            {...props}
        >
            <div className="my-4 py-4 w-72 ml-auto">
                <Input 
                    className="border-border-muted rounded-[1rem]" 
                    placeholder="Search"
                    onChange={handleSearch}
                />
            </div>
            <div className="flex gap-4 overflow-x-auto w-full">
                <div className="flex items-center">
                    <Button 
                        className={cn(
                            "rounded-[2rem] px-6 py-4 text-md",
                            activeCategory === "all"
                                ? "text-primary"
                                : "border-border-muted"
                        )}
                        variant="outline"
                        onClick={() => handleCategoryFilter("all")}
                    >
                        All
                    </Button>
                </div>
                { categories.map((category) => (
                    <div 
                        key={category}
                        className="flex items-center"
                    >
                        <Button 
                            className={cn(
                                "rounded-[2rem] px-6 py-4 text-md",
                                activeCategory === category
                                    ? "text-primary"
                                    : "border-border-muted"
                            )}
                            variant="outline"
                            onClick={() => handleCategoryFilter(category)}
                        >
                            {category}
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    )
}