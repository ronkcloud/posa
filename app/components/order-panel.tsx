'use client'

import * as React from "react"
import { useState } from "react";
import { PRODUCTS, formatCurrency, formatShortCurrency } from "@/lib/products";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";
import { Button } from "./button";
import { Spinner } from "./spinner";
import { cn } from "@/lib/utils"
import { useOrderContext } from "@/hook/order-context"

export function OrderPanel({ className, ...props }: React.ComponentProps<"div">) {
    const { orderItems, setOrderItems } = useOrderContext();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const removeFromOrder = (productId: string) => {
        setOrderItems(orderItems.filter(item => item.productId !== productId));
    };

    const getTotalAmount = () => {
        return orderItems.reduce(
            (total, item) => total + item.totalPrice,
            0
        );
    };

    const handleSubmit = async () => {
        try {
            await fetch("/api/transactions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(orderItems)
            });
        } catch (error) {
            console.error("Error submitting order:", error);
        } finally {

        }

        console.log("Transaction submitted");
        setOrderItems([]);

    }

    return(
        <div 
            className={cn(
                "py-4",
                className
            )}
            {...props}
        >
            <Card className="w-full h-full">
                <CardHeader className="flex flex-row items-center justify-between pb-3">
                    <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="h-full overflow-y-auto">
                    {orderItems.map((item) => (
                        <div
                        key={item.productId}
                        className="flex items-center justify-between p-3 bg-muted rounded-lg"
                        >
                        <div>
                            <span className="font-medium">{item.productName}</span>
                            <span className="text-muted-foreground ml-2">
                            x {item.quantity}
                            </span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="font-semibold">
                            {formatCurrency(item.totalPrice)}
                            </span>
                            <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => removeFromOrder(item.productId)}
                            >
                                Remove
                            </Button>
                        </div>
                        </div>
                    ))}
                </CardContent>
                <CardFooter className="flex flex-col gap-3">
                    {/* <div className="flex items-center gap-2 w-full">
                    <Badge variant="outline" className="text-sm">
                        Payment: QRIS
                    </Badge>
                    </div> */}
                    <div className="border-t pt-3 mt-3 w-full">
                        <Button
                            onClick={handleSubmit}
                            disabled={orderItems.length === 0 || isSubmitting}
                            className="w-full text-lg font-bold h-12 rounded-[1rem]"
                            size="lg"
                        >
                            <div className="flex justify-between items-center w-full">
                                {isSubmitting 
                                ? (
                                    <>
                                        <div className="flex items-center gap-2">
                                            <Spinner className="size-4"/>
                                            <span>Submitting...</span>
                                        </div>
                                        <span>{formatCurrency(getTotalAmount())}</span>
                                    </>
                                )
                                : (
                                    <>
                                        <span>Submit</span>
                                        <span>{formatCurrency(getTotalAmount())}</span>
                                    </>
                                )}
                            </div>
                        </Button>
                    </div>
                    {/* {successMessage && (
                        <div className="w-full p-3 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 rounded-lg text-center">
                            {successMessage}
                        </div>
                    )} */}
                </CardFooter>
            </Card>
        </div>
    )
}