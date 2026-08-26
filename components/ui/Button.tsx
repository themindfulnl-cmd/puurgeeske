import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                default: "bg-primary text-primary-foreground hover:bg-primary/90",
                destructive:
                    "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                outline:
                    "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
                secondary:
                    "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                ghost: "hover:bg-accent hover:text-accent-foreground",
                link: "text-primary underline-offset-4 hover:underline",
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

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    /** Render the child element instead of a <button>, keeping the styles.
     *  Use for links — a nested <a> inside <button> is invalid HTML. */
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, children, ...props }, ref) => {
        const classes = cn(buttonVariants({ variant, size, className }))

        // asChild renders the child (usually an <a>) with the button's styles.
        // The ref is typed for a <button> and the child is not one, so it is
        // deliberately not forwarded here.
        if (asChild && React.isValidElement<{ className?: string }>(children)) {
            return React.cloneElement(children, {
                ...props,
                className: cn(classes, children.props.className),
            } as React.HTMLAttributes<HTMLElement>)
        }

        return (
            <button className={classes} ref={ref} {...props}>
                {children}
            </button>
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }
