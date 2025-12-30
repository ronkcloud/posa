'use client'

import { useState, createContext, useContext } from "react";
import * as React from "react"
import { PanelLeft } from "lucide-react";
import { cn } from "@/lib/utils"

interface SidePanelContextType {
    isExpand: boolean;
    setIsExpand: (value: boolean) => void;
}

const SidePanelContext = createContext<SidePanelContextType | undefined>(undefined);

function useSidePanel() {
    const context = useContext(SidePanelContext);
    if (!context) {
        throw new Error("useSidePanel must be used within SidePanelProvider");
    }
    return context;
}

interface SidePanelItem {
    icon: React.ReactNode
    label: string
}

function Item({ className, children, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="sidepanel-item"
            className={cn(
                `
                flex items-center px-2 gap-2 
                bg-bg-light h-8 w-full 
                cursor-pointer rounded-lg 
                hover:bg-highlight transition-all 
                active:scale-95
                `,
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}

function SidePanelHeader() {
    const { isExpand, setIsExpand } = useSidePanel();
    
    return (
        <Item
            onClick={() => setIsExpand(!isExpand)}
            className="justify-center w-9 px-0 rounded-xl"
        >
            <PanelLeft size={20} />
        </Item>
    )
}

function SidePanelContent({ items }: { items: SidePanelItem[] }) {
    const { isExpand } = useSidePanel();

    return (
        <div>
            {items.map((item, index) => (
                <Item 
                    key={index} 
                >
                    {item.icon}
                    {isExpand && <p className="ml-2">{item.label}</p>}
                </Item>
            ))}
        </div>
    );
}

function SidePanelContainer({ children }: React.ComponentProps<"div">)  {
    const { isExpand } = useSidePanel();

    return (
        <div className={`bg-bg-light p-2 ${isExpand ? 'min-w-48': 'min-w-12'} transition-all`}>
            {children}
        </div>
    )
}

export function SidePanel({ items = [] }: { items?: SidePanelItem[]}) {
    const [isExpand, setIsExpand] = useState(false);

    return (
        <SidePanelContext.Provider value={{ isExpand, setIsExpand }}>
            <SidePanelContainer>
                <SidePanelHeader />
                <SidePanelContent items={items} />
            </SidePanelContainer>
        </SidePanelContext.Provider>
    );
}