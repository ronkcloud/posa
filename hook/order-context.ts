import { createContext, useContext } from "react";
import { OrderContextType } from "@/types/order"

const OrderContext = createContext<OrderContextType | undefined>(undefined);

function useOrderContext() {
    const context = useContext(OrderContext);
    if (!context) {
        throw new Error("useOrderContext must be used within OrderContextProvider");
    }
    return context;
}

export {
    OrderContext,
    useOrderContext
}