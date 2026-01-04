'use client'

import * as React from "react";
import { useState } from "react";
import { formatCurrency, formatShortCurrency } from "@/lib/products";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";
import { Button } from "./button";
import { Spinner } from "./spinner";
import { Stepper } from "./stepper";
import { cn } from "@/lib/utils";
import { ListX, CircleArrowRight, CircleArrowLeft, QrCode, CreditCard } from "lucide-react";
import { useOrderContext } from "@/hook/order-context";
import { Tooltip } from "./tooltip";

export function OrderPanel({ className, onCheckout, ...props }: React.ComponentProps<"div"> & { onCheckout?: () => void }) {
    const { orderItems, setOrderItems } = useOrderContext();

    const totalAmount = React.useMemo(() => {
        return orderItems.reduce(
            (total, item) => total + item.totalPrice,
            0
        );
    }, [orderItems]);

    return(
        <div 
            className={cn(
                "",
                className
            )}
            {...props}
        >
            <Card className="w-full h-full rounded-[2rem] border-border-muted">
                <CardHeader className="flex flex-row items-center justify-between pb-3">
                    <CardTitle className="text-lg font-bold">Order</CardTitle>
                        {/* <Tooltip label="Clear Order" className="bg-highlight text-xs top-full right-1/10 my-2 -translate-x-2 rounded-md p-2"> */}
                            <div 
                                className="text-fg-dim cursor-pointer p-2 rounded-[1rem] hover:bg-highlight hover:text-fg active:scale-95"
                                onClick={() => {setOrderItems([])}}
                            >
                                <ListX />
                            </div>
                        {/* </Tooltip> */}
                </CardHeader>
                <CardContent className="h-full custom-scrollbar">
                    {orderItems.map((item) => (
                        <div
                        key={item.productId}
                        className="flex items-center justify-between py-2"
                        >
                        <div>
                            <span className="text-lg font-medium">{item.productName}</span>
                            <Stepper 
                                quantity={item.quantity}
                                productId={item.productId}
                            />
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-lg">
                            {formatCurrency(item.totalPrice)}
                            </span>
                        </div>
                        </div>
                    ))}
                </CardContent>
                <CardFooter className="flex flex-col">
                    {/* <div className="flex items-center gap-2 w-full">
                        Payment: QRIS
                        </div> */}
                    {/* <div className="border-t-[1px] border-border w-full" /> */}
                    <div className="flex justify-between w-full p-2 my-1 text-lg font-bold">
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
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export function PaymentPanel({ className, onBack, ...props }: React.ComponentProps<"div"> & { onBack?: () => void }) {
    const { orderItems, setOrderItems } = useOrderContext();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const TAX_RATE = 0.1;

    const subTotal = React.useMemo(() => {
        return orderItems.reduce(
            (total, item) => total + item.totalPrice,
            0
        );
    }, [orderItems]);

    const taxAmount = subTotal * TAX_RATE;
    const totalAmount = subTotal + taxAmount;
    
    const paymentMethods = [
        {
            label: "QRIS",
            icon: <QrCode className="size-5"/>,
            available: true
        },
        {
            label: "Cash",
            icon: undefined,
            available: true
        },
        {
            label: "Card",
            icon: <CreditCard className="size-5"/>,
            available: false
        }
    ]

    const handleSubmit = async () => {
        if (orderItems.length === 0) return;
        
        setIsSubmitting(true);
        try {
            const response = await fetch("/api/transactions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    paymentMethod: "cash",
                    orderItems
                })
            });

            if (!response.ok) {
                throw new Error("Failed to submit transaction");
            }

            console.log("Transaction submitted successfully");
            setOrderItems([]);
            if (onBack) onBack();
        } catch (error) {
            console.error("Error submitting order:", error);
            alert("Failed to submit order. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return(
        <div 
            className={cn(
                "",
                className
            )}
            {...props}
        >
            <Card className="w-full h-full rounded-[2rem] border-border-muted">
                <CardHeader className="flex flex-row items-center justify-between pb-3">
                    <div 
                        className="text-fg-dim cursor-pointer p-2 rounded-[1rem] hover:bg-highlight hover:text-fg active:scale-95"
                        onClick={onBack}
                    >
                        <CircleArrowLeft className="size-6"/>
                    </div>
                    <CardTitle className="text-lg font-bold">Payment</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col h-full">
                    <div className="border-t-[2px] border-dashed border-border w-full" />
                    <div className="w-full my-2 text-sm">
                        <div className="flex justify-between my-1">
                            <span>Sub Total</span>
                            <span>{formatCurrency(subTotal)}</span>
                        </div>
                        <div className="flex justify-between my-1">
                            <span>Tax: <em>10%</em></span>
                            <span>{formatCurrency(taxAmount)}</span>
                        </div>
                        <div className="flex justify-between text-lg mb-1 mt-3 font-bold">
                            <span>Total</span>
                            <span>{formatCurrency(totalAmount)}</span>
                        </div>
                    </div>
                    <div className="border-t-[2px] border-dashed mb-8 border-border w-full" />
                    <div className="grid grid-cols-2 gap-4">
                        {
                            paymentMethods.map((paymentMethod) => (
                                <Button 
                                    key={paymentMethod.label}
                                    variant="outline"
                                    disabled={!paymentMethod.available}
                                    className="flex gap-3 rounded-2xl h-16 border-border-muted hover:border-primary hover:bg-primary-dim/10"
                                >
                                    {paymentMethod.icon}
                                    <span className="text-lg font-medium">{paymentMethod.label}</span>
                                </Button>
                            ))
                        }
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col">
                    <Button
                        onClick={handleSubmit}
                        disabled={orderItems.length === 0 || isSubmitting}
                        className="font-bold text-lg py-6 w-[80%] rounded-[2rem]"
                    >
                        {isSubmitting ? (
                            <div className="flex items-center gap-2">
                                <Spinner className="size-4"/>
                                <span>Processing...</span>
                            </div>
                        ) : (
                            <span>Pay</span>
                        )}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}