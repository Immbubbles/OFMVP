"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ArrowDownRight, Minus, ChevronRight } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { GlassCard } from "@/components/ui/glass-card";
import { TierBadge } from "@/components/ui/tier-badge";
import { TIERS } from "@/lib/tiers";
import { formatCurrency, formatNumber } from "@/lib/format";
import { cn } from "@/lib/cn";
import { leaderboard } from "@/data/mock";
import type { LeaderboardKind, LeaderboardWindow } from "@/data/types";

const KINDS: { id: LeaderboardKind; label: string }[] = [
  { id: "earnings",    label: "Top earners" },
  { id: "subscribers", label: "Most subscribed" },
];

const WINDOWS: { id: LeaderboardWindow; label: string }[] = [
  { id: "day",   label: "24h" },
  { id: "week",  label: "Week" },
  { id: "month", label: "Month" },
  { id: "all",   label: "All-time" },
];

export function LeaderboardPreview() {
  const [kind, setKind] = useState<LeaderboardKind>("earnings");
  const [window, setWindow] = useState<LeaderboardWindow>("month");

  const rows = leaderboard(kind, window, 8);

  return (
    <GlassCard className="p-5 sm:p-6">
      <div className="flex flex-wrap items-center gap-3 justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-[0.14em] text-white/45">
            Live rankings
          </p>
          <h2 className="text-[22px] font-semibold tracking-tight">Leaderboard</h2>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Segmented
            options={KINDS}
            value={kind}
            onChange={(v) => setKind(v as LeaderboardKind)}
          />
          <Segmented
            options={WINDOWS}
            value={window}
            onChange={(v) => setWindow(v as LeaderboardWindow)}
          />
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-1.5">
        <AnimatePresence initial={false} mode="popLayout">
          {rows.map((row) => {
            const tier = TIERS.find((t) => t.id === row.creator.tier) ?? TIERS[0];
            return (
              <motion.div
                key={row.creator.id}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ type: "spring", stiffness: 320, damping: 28 }}
              >
                <Link
                  href={`/c/${row.creator.handle}`}
                  className="group flex items-center gap-3 px-3 py-2.5 rounded-[var(--radius-md)] hover:bg-white/5 transition-colors"
                >
                  <span
                    className={cn(
                      "tabular-nums w-7 text-right text-[13px] font-semibold",
                      row.rank === 1 && "text-[color:var(--tier-gold)]",
                      row.rank === 2 && "text-[color:var(--tier-silver)]",
                      row.rank === 3 && "text-[color:var(--tier-bronze)]",
                      row.rank > 3 && "text-white/45",
                    )}
                  >
                    {row.rank}
                  </span>

                  <Avatar
                    name={row.creator.displayName}
                    size={36}
                    ring={tier.color}
                  />

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium truncate">{row.creator.displayName}</span>
                      <TierBadge tier={row.creator.tier} size="sm" withLabel={false} />
                    </div>
                    <span className="text-[11px] text-white/45 truncate">
                      @{row.creator.handle} · {row.creator.category}
                    </span>
                  </div>

                  <div className="text-right">
                    <div className="text-[14px] font-semibold tabular-nums">
                      {kind === "earnings"
                        ? formatCurrency(row.value)
                        : formatNumber(row.value)}
                    </div>
                    <Delta delta={row.delta} />
                  </div>

                  <ChevronRight className="h-4 w-4 text-white/30 group-hover:text-white/70 transition-colors" />
                </Link>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <div className="mt-5 flex items-center justify-between border-t hairline pt-4">
        <p className="text-[12px] text-white/45">
          Updated continuously · Tier perks apply at month boundaries.
        </p>
        <Link
          href="/leaderboard"
          className="press inline-flex items-center gap-1 text-[13px] text-white/85 hover:text-white"
        >
          See full board
          <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </GlassCard>
  );
}

function Segmented<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { id: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="inline-flex items-center p-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl">
      {options.map((opt) => {
        const active = opt.id === value;
        return (
          <button
            key={opt.id}
            onClick={() => onChange(opt.id)}
            className={cn(
              "press relative h-7 px-3 rounded-full text-[12px] transition-colors",
              active ? "text-white" : "text-white/55 hover:text-white/85",
            )}
          >
            {active && (
              <motion.span
                layoutId="seg-bg"
                className="absolute inset-0 rounded-full bg-white/12 shadow-[inset_0_1px_0_rgba(255,255,255,0.10)]"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative">{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}

function Delta({ delta }: { delta: number }) {
  if (delta === 0) {
    return (
      <div className="text-[10px] text-white/45 inline-flex items-center gap-0.5">
        <Minus className="h-2.5 w-2.5" /> 0%
      </div>
    );
  }
  const up = delta > 0;
  const Icon = up ? ArrowUpRight : ArrowDownRight;
  return (
    <div
      className={cn(
        "text-[10px] inline-flex items-center gap-0.5 tabular-nums",
        up ? "text-[color:var(--accent-mint)]" : "text-[color:var(--accent)]",
      )}
    >
      <Icon className="h-2.5 w-2.5" />
      {Math.abs(delta).toFixed(1)}%
    </div>
  );
}
