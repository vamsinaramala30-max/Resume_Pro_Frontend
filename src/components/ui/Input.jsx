import * as React from "react"
import { cn } from "./Button"

const Input = React.forwardRef(({ className, type, error, ...props }, ref) => {
  return (
    <div className="relative w-full">
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-surface px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-foreground/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
          error && "border-error focus-visible:ring-error",
          className
        )}
        ref={ref}
        {...props}
      />
      {error && (
        <span className="absolute -bottom-5 left-0 text-xs text-error">
          {error}
        </span>
      )}
    </div>
  )
})
Input.displayName = "Input"

export { Input }
