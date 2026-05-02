import { cn } from "@/lib/cn";
import * as React from "react";

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  /** Optional URL. If absent, we render a deterministic gradient initial. */
  src?: string | null;
  size?: number;
  ring?: string;
}

/**
 * Initials avatar with deterministic gradient based on the name.
 * No external image dependency by default — keeps the MVP self-contained.
 */
export function Avatar({
  name,
  src,
  size = 48,
  ring,
  className,
  style,
  ...props
}: AvatarProps) {
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]!.toUpperCase())
    .join("");

  const gradient = nameToGradient(name);

  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center rounded-full overflow-hidden font-semibold text-white shrink-0",
        className,
      )}
      style={{
        width: size,
        height: size,
        background: src ? undefined : gradient,
        boxShadow: ring
          ? `0 0 0 2px ${ring}, 0 0 0 4px rgba(0,0,0,0.4)`
          : "inset 0 0 0 1px rgba(255,255,255,0.12)",
        fontSize: Math.round(size * 0.38),
        ...style,
      }}
      {...props}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={name} className="h-full w-full object-cover" />
      ) : (
        <span className="drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)]">{initials}</span>
      )}
    </div>
  );
}

function nameToGradient(name: string): string {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  const h1 = h % 360;
  const h2 = (h1 + 60 + (h % 90)) % 360;
  return `linear-gradient(135deg, hsl(${h1} 70% 55%) 0%, hsl(${h2} 70% 45%) 100%)`;
}
