import * as React from "react"
import { cn } from "@/lib/utils"

export function Tooltip({ children, className, label }: React.ComponentProps<"div"> & {label: string }) {
  return (
    // 'group' allows us to trigger the child when the parent is hovered
    <div className="group relative flex items-center">
        {children}
      
      {/* The Tooltip Box */}
      <div className={cn(
        `absolute ml-2 p-2 rounded-[1rem] opacity-0 
         pointer-events-none whitespace-nowrap z-50 
         transition-all duration-200 group-hover:opacity-100 
         group-hover:translate-x-0 bg-text`,
        className
      )}>
        {label}
        {/* The Little Arrow */}
        {/* <div className="absolute top-1/2 -left-1 -translate-y-1/2 border-y-4 border-y-transparent border-r-4 border-r-slate-900" /> */}
      </div>
    </div>
  )
}