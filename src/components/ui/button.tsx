import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const button = cva(
  [
    "press inline-flex items-center justify-center gap-2 select-none",
    "rounded-full font-medium tracking-tight",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40",
    "disabled:opacity-50 disabled:pointer-events-none",
    "whitespace-nowrap",
  ],
  {
    variants: {
      variant: {
        primary: [
          "text-white",
          "bg-[linear-gradient(135deg,#ff375f_0%,#af52de_100%)]",
          "shadow-[0_8px_24px_-8px_rgba(255,55,95,0.55),inset_0_1px_0_rgba(255,255,255,0.25)]",
          "hover:brightness-110",
        ],
        secondary: [
          "text-white",
          "bg-white/10 hover:bg-white/15",
          "backdrop-blur-xl border border-white/15",
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.10)]",
        ],
        ghost: [
          "text-white/85 hover:text-white",
          "hover:bg-white/8",
        ],
        outline: [
          "text-white",
          "border border-white/20 hover:border-white/40 hover:bg-white/5",
        ],
      },
      size: {
        sm: "h-8 px-3 text-[13px]",
        md: "h-10 px-5 text-[14px]",
        lg: "h-12 px-7 text-[15px]",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof button>;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button({ className, variant, size, ...props }, ref) {
    return (
      <button
        ref={ref}
        className={cn(button({ variant, size }), className)}
        {...props}
      />
    );
  },
);

export { button as buttonVariants };
