import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outline' | 'accent' | 'danger' | 'warning';
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variants = {
    default: "bg-slate-700 text-slate-100",
    outline: "text-text border border-slate-600",
    accent: "bg-accent/20 text-accent border border-accent/50",
    danger: "bg-danger/20 text-danger border border-danger/50",
    warning: "bg-warning/20 text-warning border border-warning/50",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
        variants[variant],
        className
      )}
      {...props}
    />
  )
}

export { Badge }
