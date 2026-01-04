import * as React from "react"
import { Button } from "./button"
import { cn } from "@/lib/utils"
import { CirclePlus, CircleMinus } from "lucide-react"
import { useOrderContext } from "@/hook/order-context"

export function Stepper({ 
  className, 
  productId, 
  quantity, 
  ...props 
}: React.ComponentProps<"div"> & {quantity: number, productId: string}) 
{
  const { orderItems, setOrderItems } = useOrderContext();  

  const handleIncrease = () => {
    const updated = orderItems.map((item) =>
      { 
        return (
          item.productId === productId
          ? { 
              ...item, 
              quantity: item.quantity + 1,
              totalPrice: (item.quantity + 1) * item.unitPrice,
            } 
          : item
        )
      }
    );
    setOrderItems(updated);
  };

  const handleDecrease = () => {
    const updated = orderItems.map((item) =>
      { 
        return (
          item.productId === productId
          ? { 
              ...item, 
              quantity: item.quantity - 1,
              totalPrice: (item.quantity - 1) * item.unitPrice,
            } 
          : item
        )
      }
    ).filter(item => item.quantity > 0);
    setOrderItems(updated);
  }

  return (
    <div
      data-slot="stepper"
      className={cn(
        "flex items-center",
        className
      )}
      {...props}
    >
        <Button className="size-6 transition-scale active:scale-110" variant="ghost" onClick={handleDecrease}>
            <CircleMinus size={1} className="text-text-muted"/>
        </Button>
        <div className="px-2">
            { quantity }
        </div>
        <Button className="size-6 transition-scale active:scale-110" variant="ghost" onClick={handleIncrease}>
            <CirclePlus size={1} className="text-text-muted"/>
        </Button>
    </div>
  )
}