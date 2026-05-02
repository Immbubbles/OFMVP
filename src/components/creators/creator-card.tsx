"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { GlassCard } from "@/components/ui/glass-card";
import { TierBadge } from "@/components/ui/tier-badge";
import { TIERS } from "@/lib/tiers";
import { formatNumber, formatCurrency } from "@/lib/format";
import type { Creator } from "@/data/types";

interface CreatorCardProps {
  creator: Creator;
}

export function CreatorCard({ creator }: CreatorCardProps) {
  const tier = TIERS.find((t) => t.id === creator.tier) ?? TIERS[0];

  return (
    <Link href={`/c/${creator.handle}`} className="group block">
      <motion.div
        whileHover={{ y: -3 }}
        transition={{ type: "spring", stiffness: 320, damping: 26 }}
      >
        <GlassCard className="p-4 h-full">
          {/* Cover preview — gradient teaser, simulates a locked post */}
          <div
            className="relative h-36 rounded-[var(--radius-md)] overflow-hidden mb-4"
            style={{
              background: `linear-gradient(135deg, hsl(${
                (creator.id.charCodeAt(1) * 47) % 360
              } 70% 35%) 0%, hsl(${
                (creator.id.charCodeAt(1) * 47 + 70) % 360
              } 70% 22%) 100%)`,
            }}
          >
            <div className="absolute inset-0 locked-blur opacity-90"
              style={{
                background: `radial-gradient(circle at 30% 40%, rgba(255,255,255,0.18), transparent 50%), radial-gradient(circle at 70% 70%, rgba(255,255,255,0.12), transparent 55%)`,
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.12em] text-white/85 px-3 h-7 rounded-full glass">
                <Lock className="h-3 w-3" /> {formatCurrency(creator.monthlyPrice, { compact: false })}/mo
              </span>
            </div>
            <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/60 to-transparent" />
          </div>

          <div className="flex items-start gap-3">
            <Avatar
              name={creator.displayName}
              size={44}
              ring={tier.color}
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-[15px] truncate">{creator.displayName}</h3>
                <TierBadge tier={creator.tier} size="sm" withLabel={false} />
              </div>
              <p className="text-[12px] text-white/55 truncate">@{creator.handle} · {creator.category}</p>
            </div>
          </div>

          <p className="mt-3 text-[13px] text-white/70 line-clamp-2 text-pretty">{creator.bio}</p>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <Stat label="Subscribers" value={formatNumber(creator.subscribers)} />
            <Stat label="Earnings" value={formatCurrency(creator.earnings)} />
          </div>
        </GlassCard>
      </motion.div>
    </Link>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[var(--radius-sm)] border border-white/8 bg-white/3 px-2.5 py-1.5">
      <div className="text-[10px] uppercase tracking-[0.1em] text-white/45">{label}</div>
      <div className="text-[14px] font-semibold tabular-nums">{value}</div>
    </div>
  );
}
