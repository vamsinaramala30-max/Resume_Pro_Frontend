import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Loader2 } from "lucide-react"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:brightness-110 shadow-elevation-1",
        destructive: "bg-error text-white hover:brightness-110 shadow-elevation-1",
        outline: "border border-input bg-surface hover:bg-surface-elevated hover:text-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:brightness-110",
        ghost: "hover:bg-surface-elevated hover:text-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        glass: "bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 text-foreground",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, isLoading = false, children, ...props }, ref) => {
    if (asChild) {
      if (React.Children.count(children) !== 1) {
        console.error(
          "Button with asChild requires exactly one React element child",
          children
        );
      }
      return (
        <Slot
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        >
          {children}
        </Slot>
      );
    }

    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </button>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
