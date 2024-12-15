import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { clsx } from "clsx"
import { Spinner } from "./spinner"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-purple-500 disabled:pointer-events-none disabled:opacity-50 whitespace-nowrap",
  {
    variants: {
      variant: {
        default: `
          relative overflow-hidden
          bg-gradient-to-r from-purple-600 to-purple-500
          text-white 
          shadow-md
          hover:from-purple-700 hover:to-purple-600
          active:shadow-inner
          after:absolute
          after:inset-0
          after:bg-white/10
          after:opacity-0
          after:transition-opacity
          hover:after:opacity-100
          before:absolute
          before:inset-0
          before:bg-gradient-to-r
          before:from-purple-500/0
          before:to-purple-600/20
          before:opacity-0
          before:transition-opacity
          hover:before:opacity-100
          [&>span]:relative
          [&>span]:z-10
        `,
        secondary: "bg-purple-100 text-purple-900 hover:bg-purple-200",
        ghost: "hover:bg-gray-100",
        link: "text-purple-600 underline-offset-4 hover:underline",
        destructive: "bg-red-600 text-white hover:bg-red-700",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, children, disabled, ...props }, ref) => {
    // For icon buttons, don't wrap in extra spans
    if (size === 'icon') {
      return (
        <button
          className={clsx(
            buttonVariants({ variant, size, className }),
            loading && 'relative cursor-wait'
          )}
          ref={ref}
          disabled={disabled || loading}
          {...props}
        >
          {loading ? (
            <Spinner size="sm" className="animate__animated animate__fadeIn animate__faster" />
          ) : (
            children
          )}
        </button>
      );
    }

    // For regular buttons with text/icons
    return (
      <button
        className={clsx(
          buttonVariants({ variant, size, className }),
          loading && 'relative cursor-wait'
        )}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <span className="animate__animated animate__fadeIn animate__faster">
            <Spinner size={size === 'sm' ? 'sm' : 'default'} />
          </span>
        ) : (
          <span className="inline-flex items-center gap-2 whitespace-nowrap">
            {children}
          </span>
        )}
      </button>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }