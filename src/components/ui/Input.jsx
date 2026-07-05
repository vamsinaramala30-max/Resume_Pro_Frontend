import * as React from "react"
import { cn } from "./Button"

const Input = React.forwardRef(({ className, type, error, ...props }, ref) => {
  return (
    <div className="relative w-full">
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-xl border border-input bg-surface/50 px-4 py-2.5 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-foreground/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200",
          error && "border-error focus-visible:ring-error",
          className
        )}
        ref={ref}
        {...props}
      />
      {error && (
        <span className="absolute -bottom-5 left-0 text-xs text-error transition-all duration-200">
          {error}
        </span>
      )}
    </div>
  )
})
Input.displayName = "Input"

export { Input }
