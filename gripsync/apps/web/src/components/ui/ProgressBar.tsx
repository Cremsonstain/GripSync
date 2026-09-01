import * as React from "react"
import { cn } from "@/lib/utils"

interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  showLabel?: boolean;
  indicatorColor?: string;
}

export function ProgressBar({ 
  value, 
  max = 100, 
  showLabel = true,
  indicatorColor = "bg-primary",
  className, 
  ...props 
}: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  
  return (
    <div className={cn("w-full", className)} {...props}>
      <div className="flex justify-between mb-1">
        {showLabel && (
          <span className="text-sm font-medium text-slate-300">{Math.round(percentage)}%</span>
        )}
      </div>
      <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
        <div 
          className={cn("h-2.5 rounded-full transition-all duration-500 ease-out", indicatorColor)} 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  )
}
