import { notFound } from "next/navigation";
import { ArrowLeft, BadgeCheck, MapPin, Calendar, Sparkles } from "lucide-react";
import Link from "next/link";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { TierBadge } from "@/components/ui/tier-badge";
import { PostCard } from "@/components/posts/post-card";
import { creatorByHandle, postsForCreator, CREATORS } from "@/data/mock";
import { TIERS, BADGES, nextTier } from "@/lib/tiers";
import { formatCurrency, formatNumber } from "@/lib/format";

interface PageProps {
  params: Promise<{ handle: string }>;
}

export async function generateStaticParams() {
  return CREATORS.map((c) => ({ handle: c.handle }));
}

export default async function CreatorPage({ params }: PageProps) {
  const { handle } = await params;
  const creator = creatorByHandle(handle);
  if (!creator) notFound();

  const posts = postsForCreator(creator.id, 9);
  const tier = TIERS.find((t) => t.id === creator.tier) ?? TIERS[0];
  const upgrade = nextTier(creator.tier);
  const progress = upgrade
    ? Math.min(
        1,
        (creator.subscribers - tier.minSubscribers) /
          (upgrade.minSubscribers - tier.minSubscribers),
      )
    : 1;

  const earnedBadges = BADGES.filter((b) => creator.badgeIds.includes(b.id));

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 pb-32 pt-8">
      <Link
        href="/"
        className="press inline-flex items-center gap-1.5 text-[12px] text-white/55 hover:text-white/85 mb-6"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back
      </Link>

      {/* ===== Cover ===== */}
      <div
        className="relative h-48 sm:h-64 rounded-[var(--radius-xl)] overflow-hidden border border-white/10"
        style={{
          background: `
            radial-gradient(60% 60% at 30% 30%, hsl(${(creator.id.charCodeAt(1) * 47) % 360} 70% 45%), transparent 65%),
            radial-gradient(50% 50% at 80% 70%, hsl(${(creator.id.charCodeAt(1) * 47 + 80) % 360} 70% 35%), transparent 65%),
            #0a0a10
          `,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-0)] via-transparent to-transparent" />
      </div>

      {/* ===== Identity ===== */}
      <div className="relative -mt-12 sm:-mt-16 px-1 sm:px-4 flex flex-col sm:flex-row sm:items-end gap-5">
        <Avatar
          name={creator.displayName}
          size={120}
          ring={tier.color}
          className="ring-4 ring-[var(--bg-0)]"
        />
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-[28px] sm:text-[32px] tracking-[-0.02em] font-semibold">
              {creator.displayName}
            </h1>
            <BadgeCheck className="h-5 w-5 text-[color:var(--accent-3)]" />
            <TierBadge tier={creator.tier} size="lg" />
          </div>
          <p className="text-white/55 text-[14px]">@{creator.handle}</p>
          <p className="mt-3 text-[15px] text-white/80 max-w-2xl text-pretty">
            {creator.bio}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] text-white/50">
            <span className="inline-flex items-center gap-1">
              <Sparkles className="h-3 w-3" /> {creator.category}
            </span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3 w-3" /> Worldwide
            </span>
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-3 w-3" /> Joined{" "}
              {new Date(creator.joinedAt).toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:flex-col sm:items-stretch sm:w-56">
          <Button size="lg" className="flex-1 sm:flex-none">
            Subscribe · {formatCurrency(creator.monthlyPrice, { compact: false })}/mo
          </Button>
          <Button size="lg" variant="secondary">
            Follow
          </Button>
        </div>
      </div>

      {/* ===== Stat strip ===== */}
      <GlassCard className="mt-8 grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/5 hairline">
        <Stat label="Subscribers" value={formatNumber(creator.subscribers)} />
        <Stat label="All-time" value={formatCurrency(creator.earnings)} />
        <Stat
          label="30-day growth"
          value={`${creator.growthPct >= 0 ? "+" : ""}${creator.growthPct.toFixed(1)}%`}
          tone={creator.growthPct >= 0 ? "good" : "bad"}
        />
        <Stat label="Posts" value={formatNumber(posts.length)} />
      </GlassCard>

      {/* ===== Tier progress ===== */}
      <GlassCard className="mt-6 p-5 sm:p-6">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <p className="text-[11px] uppercase tracking-[0.14em] text-white/45">
              Tier progression
            </p>
            <h3 className="text-[18px] font-semibold tracking-tight mt-0.5">
              {tier.name}
              {upgrade && (
                <span className="text-white/45 font-normal">
                  {" "}
                  → {upgrade.name}
                </span>
              )}
            </h3>
          </div>
          {upgrade && (
            <p className="text-[12px] text-white/55 tabular-nums">
              {formatNumber(upgrade.minSubscribers - creator.subscribers)} subs to {upgrade.name}
            </p>
          )}
        </div>

        <div className="mt-4 h-2 rounded-full bg-white/8 overflow-hidden">
          <div
            className="h-full rounded-full shimmer"
            style={{
              width: `${progress * 100}%`,
              background: tier.gradient,
            }}
          />
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2 text-[12px] text-white/65">
          <div>
            <span className="text-white/45">Current perk · </span>
            {tier.perk}
          </div>
          {upgrade && (
            <div className="text-right">
              <span className="text-white/45">Unlocks at {upgrade.name} · </span>
              {upgrade.perk}
            </div>
          )}
        </div>
      </GlassCard>

      {/* ===== Badges ===== */}
      <div className="mt-10">
        <h3 className="text-[18px] font-semibold tracking-tight">
          Earned badges
          <span className="text-white/45 font-normal text-[14px]">
            {" "}· {earnedBadges.length}
          </span>
        </h3>
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {earnedBadges.map((b) => (
            <GlassCard key={b.id} className="p-4">
              <div className="flex items-center gap-3">
                <div
                  className="h-10 w-10 rounded-full flex items-center justify-center text-white"
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
                  <Sparkles className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-[13px] font-semibold">{b.name}</p>
                  <p className="text-[11px] text-white/50 capitalize">{b.rarity}</p>
                </div>
              </div>
              <p className="mt-2 text-[12px] text-white/60">{b.description}</p>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* ===== Posts ===== */}
      <div className="mt-12">
        <h3 className="text-[18px] font-semibold tracking-tight">
          Recent posts
        </h3>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((p, i) => (
            <PostCard
              key={p.id}
              post={p}
              seed={i + creator.id.charCodeAt(1)}
              unlockPriceLabel={`${formatCurrency(creator.monthlyPrice, { compact: false })}/mo`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: "good" | "bad";
}) {
  return (
    <div className="px-4 sm:px-6 py-4">
      <div className="text-[10px] uppercase tracking-[0.12em] text-white/45">
        {label}
      </div>
      <div
        className="text-[20px] font-semibold tabular-nums tracking-tight mt-0.5"
        style={{
          color:
            tone === "good"
              ? "var(--accent-mint)"
              : tone === "bad"
              ? "var(--accent)"
              : undefined,
        }}
      >
        {value}
      </div>
    </div>
  );
}
