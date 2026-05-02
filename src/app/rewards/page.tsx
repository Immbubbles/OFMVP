import { Sparkles } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { TIERS, BADGES } from "@/lib/tiers";

export const metadata = {
  title: "Rewards · Lumen",
};

export default function RewardsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-12 pb-32">
      <div className="float-in max-w-2xl">
        <p className="text-[11px] uppercase tracking-[0.16em] text-white/45">
          Reward system
        </p>
        <h1 className="mt-2 text-[clamp(34px,5vw,52px)] tracking-[-0.025em] font-semibold text-balance">
          Tiers, badges, and perks.
        </h1>
        <p className="mt-3 text-white/65 text-[15px] text-pretty">
          Lumen rewards consistency. Climb tiers as your audience grows; collect
          badges by showing up. Every step compounds your perks.
        </p>
      </div>

      <section className="mt-12">
        <h2 className="text-[20px] font-semibold tracking-tight">Tiers</h2>
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
          {TIERS.map((t, i) => (
            <GlassCard key={t.id} className="p-5 float-in" style={{ animationDelay: `${i * 70}ms` }}>
              <div
                className="h-12 w-12 rounded-full mb-4 shimmer"
                style={{ background: t.gradient }}
              />
              <div
                className="text-[18px] font-semibold tracking-tight"
                style={{ color: t.color }}
              >
                {t.name}
              </div>
              <p className="text-[11px] text-white/45 tabular-nums mt-0.5">
                {t.minSubscribers === 0 ? "Starter tier" : `${t.minSubscribers.toLocaleString()}+ subscribers`}
              </p>
              <p className="mt-4 text-[13px] text-white/75 leading-relaxed">
                {t.perk}
              </p>
            </GlassCard>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-[20px] font-semibold tracking-tight">Badges</h2>
        <p className="mt-1 text-white/55 text-[14px]">
          Earned through behavior, not stats. Display them anywhere on your profile.
        </p>
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {BADGES.map((b) => (
            <GlassCard key={b.id} className="p-4">
              <div className="flex items-center gap-3">
                <div
                  className="h-10 w-10 rounded-full flex items-center justify-center"
                  style={{
                    background:
                      b.rarity === "legendary"
                        ? "linear-gradient(135deg, #ffd60a, #ff375f, #af52de)"
                        : b.rarity === "epic"
                        ? "linear-gradient(135deg, #af52de, #0a84ff)"
                        : b.rarity === "rare"
                        ? "linear-gradient(135deg, #0a84ff, #5ac8fa)"
                        : "linear-gradient(135deg, #5a5a60, #8e8e93)",
                  }}
                >
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <div className="min-w-0">
                  <p className="text-[13px] font-semibold truncate">{b.name}</p>
                  <p className="text-[11px] text-white/50 capitalize">{b.rarity}</p>
                </div>
              </div>
              <p className="mt-2 text-[12px] text-white/65 line-clamp-2">{b.description}</p>
            </GlassCard>
          ))}
        </div>
      </section>
    </div>
  );
}
