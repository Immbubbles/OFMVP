import { cn } from "@/lib/cn";
import { TIERS, type TierId } from "@/lib/tiers";

interface TierBadgeProps {
  tier: TierId;
  size?: "sm" | "md" | "lg";
  withLabel?: boolean;
  className?: string;
}

export function TierBadge({
  tier,
  size = "md",
  withLabel = true,
  className,
}: TierBadgeProps) {
  const t = TIERS.find((x) => x.id === tier) ?? TIERS[0];

  const sizes = {
    sm: { pill: "h-5 px-2 text-[10px] gap-1", dot: "h-2 w-2" },
    md: { pill: "h-6 px-2.5 text-[11px] gap-1.5", dot: "h-2.5 w-2.5" },
    lg: { pill: "h-7 px-3 text-[12px] gap-2", dot: "h-3 w-3" },
  }[size];

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-medium uppercase tracking-[0.08em]",
        "border border-white/15 bg-white/5 backdrop-blur-md",
        sizes.pill,
        className,
      )}
      title={`${t.name} tier · ${t.perk}`}
    >
      <span
        className={cn("rounded-full shimmer", sizes.dot)}
        style={{ background: t.gradient }}
      />
      {withLabel && (
        <span style={{ color: t.color }} className="drop-shadow-[0_0_6px_currentColor]">
          {t.name}
        </span>
      )}
    </span>
  );
}
