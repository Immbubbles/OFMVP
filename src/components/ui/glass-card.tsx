import { cn } from "@/lib/cn";
import * as React from "react";

type GlassCardProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: "default" | "strong";
  as?: keyof React.JSX.IntrinsicElements;
};

export function GlassCard({
  className,
  variant = "default",
  as: Tag = "div",
  ...props
}: GlassCardProps) {
  const Comp = Tag as React.ElementType;
  return (
    <Comp
      className={cn(
        "relative overflow-hidden rounded-[var(--radius-lg)]",
        variant === "strong" ? "glass-strong" : "glass",
        className,
      )}
      {...props}
    />
  );
}
