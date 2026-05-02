import Link from "next/link";
import { ArrowRight, Sparkles, Trophy, ShieldCheck, Medal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { CreatorCard } from "@/components/creators/creator-card";
import { LeaderboardPreview } from "@/components/leaderboard/leaderboard-preview";
import { TIERS } from "@/lib/tiers";
import { CREATORS } from "@/data/mock";

export default function HomePage() {
  const featured = [...CREATORS]
    .sort((a, b) => b.subscribers - a.subscribers)
    .slice(0, 6);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 pb-32">
      {/* ========== HERO ========== */}
      <section className="relative pt-16 sm:pt-24 pb-12">
        <div className="float-in max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 h-8 rounded-full glass text-[12px] text-white/85">
            <Sparkles className="h-3.5 w-3.5 text-[color:var(--accent-warm)]" />
            Now in private beta
            <span className="mx-1 text-white/25">·</span>
            <span className="text-white/55">v0.1</span>
          </div>

          <h1 className="mt-6 text-[clamp(44px,7vw,84px)] leading-[0.95] tracking-[-0.03em] font-semibold text-balance">
            Where creators
            <br />
            <span className="font-display italic font-normal text-gradient">
              rise.
            </span>
          </h1>

          <p className="mt-6 text-[18px] sm:text-[20px] leading-relaxed text-white/65 text-pretty max-w-2xl">
            Lumen is a premium subscription platform for independent creators.
            Beautifully designed feeds, transparent leaderboards, and a tier
            system that rewards consistency — not luck.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button size="lg">
              Start creating
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="secondary">
              Explore creators
            </Button>
          </div>

          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl">
            <Pill icon={ShieldCheck} label="OAuth-ready" />
            <Pill icon={Trophy}     label="Live leaderboards" />
            <Pill icon={Medal}      label="Tiered rewards" />
            <Pill icon={Sparkles}   label="Crypto-friendly soon" />
          </div>
        </div>

        {/* Floating decorative orbs */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-16 right-0 h-72 w-72 rounded-full blur-3xl opacity-60"
          style={{ background: "radial-gradient(circle, rgba(255,55,95,0.45), transparent 60%)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute top-32 right-32 h-56 w-56 rounded-full blur-3xl opacity-50"
          style={{ background: "radial-gradient(circle, rgba(10,132,255,0.45), transparent 60%)" }}
        />
      </section>

      {/* ========== TIER SHOWCASE ========== */}
      <section className="mt-4">
        <SectionHeader
          eyebrow="Reward system"
          title="Five tiers. Real perks."
          description="Every creator climbs through the same five tiers. Subscribers fuel the climb; perks compound at every step."
        />
        <div className="mt-8 grid grid-cols-2 md:grid-cols-5 gap-3">
          {TIERS.map((t, i) => (
            <GlassCard key={t.id} className="p-4 float-in" style={{ animationDelay: `${i * 60}ms` }}>
              <div
                className="h-10 w-10 rounded-full mb-3 shimmer"
                style={{ background: t.gradient }}
              />
              <div
                className="text-[15px] font-semibold tracking-tight"
                style={{ color: t.color }}
              >
                {t.name}
              </div>
              <div className="text-[11px] text-white/45 tabular-nums">
                {t.minSubscribers === 0
                  ? "Starter"
                  : `${t.minSubscribers.toLocaleString()}+ subs`}
              </div>
              <p className="mt-3 text-[12px] text-white/70 leading-relaxed">
                {t.perk}
              </p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* ========== LEADERBOARD ========== */}
      <section className="mt-20">
        <SectionHeader
          eyebrow="Top of the moment"
          title="Live leaderboards"
          description="Top earners and most subscribed creators, updated across daily, weekly, monthly, and all-time windows."
        />
        <div className="mt-8">
          <LeaderboardPreview />
        </div>
      </section>

      {/* ========== FEATURED CREATORS ========== */}
      <section className="mt-20">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <SectionHeader
            eyebrow="Featured this week"
            title="Discover creators"
            description="A curated cross-section, refreshed weekly. Subscribe directly or follow for free."
            compact
          />
          <Link
            href="/leaderboard"
            className="press inline-flex items-center gap-1 text-[13px] text-white/85 hover:text-white"
          >
            View all
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featured.map((c) => (
            <CreatorCard key={c.id} creator={c} />
          ))}
        </div>
      </section>

      {/* ========== CTA ========== */}
      <section className="mt-24">
        <GlassCard variant="strong" className="p-8 sm:p-12 text-center relative overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              background:
                "radial-gradient(600px 200px at 50% 0%, rgba(255,55,95,0.45), transparent 70%), radial-gradient(800px 240px at 50% 100%, rgba(10,132,255,0.35), transparent 70%)",
            }}
          />
          <div className="relative">
            <h2 className="text-[clamp(28px,4vw,44px)] tracking-[-0.025em] font-semibold text-balance">
              Built for the next generation of creators.
            </h2>
            <p className="mt-3 text-white/65 max-w-xl mx-auto text-pretty">
              Sign up early, claim your handle, and reserve a Bronze tier slot
              before public launch.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <Button size="lg">
                Reserve your handle
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="ghost">
                Read the manifesto
              </Button>
            </div>
          </div>
        </GlassCard>
      </section>
    </div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  description,
  compact = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  compact?: boolean;
}) {
  return (
    <div className={compact ? "max-w-xl" : "max-w-2xl"}>
      <p className="text-[11px] uppercase tracking-[0.16em] text-white/45">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-[clamp(26px,3.4vw,40px)] tracking-[-0.025em] font-semibold text-balance">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-white/60 text-[15px] leading-relaxed text-pretty">
          {description}
        </p>
      )}
    </div>
  );
}

function Pill({
  icon: Icon,
  label,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <div className="inline-flex items-center gap-2 px-3 h-9 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl text-[12px] text-white/75">
      <Icon className="h-3.5 w-3.5 text-white/85" />
      {label}
    </div>
  );
}
