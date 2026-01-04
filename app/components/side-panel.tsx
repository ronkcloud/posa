'use client'

import { useState, createContext, useContext } from "react";
import * as React from "react"
import { PanelLeft, CircleUserRound } from "lucide-react";   
import { cn } from "@/lib/utils"
import { Tooltip } from "./tooltip";

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
                flex items-center px-2 py-6 my-2 
                text-fg-dim h-8 w-full 
                cursor-pointer rounded-[1rem]
                hover:bg-highlight transition-all 
                active:scale-95 hover:text-fg-light
                `,
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}

function SidePanelHeader( { className }: React.ComponentProps<"div">) {
    const { isExpand, setIsExpand } = useSidePanel();
    
    return (
        <Item
            onClick={() => setIsExpand(!isExpand)}
            className={cn("justify-center rounded-xl", className)}
        >
            <PanelLeft size={32} strokeWidth={1} />
        </Item>
    )
}

function SidePanelFooter( { className }: React.ComponentProps<"div">) {   
    return (
        <Item
            className={cn("justify-center rounded-xl", className)}
        >
            <CircleUserRound size={32} strokeWidth={1} />
        </Item>
    )
}

function SidePanelContent({ className, items }: React.ComponentProps<"div"> & { items: SidePanelItem[] }) {
    const { isExpand } = useSidePanel();

    return (
        <div
            className={cn("", className)}
        >
            {items.map((item, index) => (
                <Tooltip key={index} label={item.label} className="bg-highlight left-full translate-x-2">
                        <Item 
                            key={index} 
                        >
                            {item.icon}
                            {isExpand && <p className="ml-2">{item.label}</p>}
                        </Item>
                </Tooltip>
            ))}
        </div>
    );
}

function SidePanelContainer({ children, className }: React.ComponentProps<"div">)  {
    const { isExpand } = useSidePanel();

    return (
        <div className={cn(`bg-bg-light p-2 ${isExpand ? 'min-w-48': 'min-w-12'} transition-all`,
            className
        )}>
            {children}
        </div>
    )
}

export function SidePanel({ items = [] }: { items?: SidePanelItem[]}) {
    const [isExpand, setIsExpand] = useState(false);

    return (
        <SidePanelContext.Provider value={{ isExpand, setIsExpand }}>
            <SidePanelContainer className="flex flex-col gap-6">
                <SidePanelHeader className="shrink-0" />
                <SidePanelContent items={items} className="flex-1"/>
                <SidePanelFooter className="shrink-0" />
            </SidePanelContainer>
        </SidePanelContext.Provider>
    );
}