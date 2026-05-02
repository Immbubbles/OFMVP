/**
 * Creator tier system. XP-style thresholds backed by mock data, but the shape
 * is the real thing: when we wire up Postgres, the API just needs to return
 * a `tier` matching one of these IDs and the UI keeps working.
 */

export type TierId = "bronze" | "silver" | "gold" | "platinum" | "diamond";

export interface Tier {
  id: TierId;
  name: string;
  /** Subscriber count required to unlock. */
  minSubscribers: number;
  /** Tailwind-friendly accent applied to badges, rings, glows. */
  color: string;
  gradient: string;
  /** What perk the creator unlocks at this tier. */
  perk: string;
}

export const TIERS: readonly Tier[] = [
  {
    id: "bronze",
    name: "Bronze",
    minSubscribers: 0,
    color: "var(--tier-bronze)",
    gradient: "linear-gradient(135deg, #b16a2a 0%, #cd7f32 50%, #f0b070 100%)",
    perk: "Profile customization",
  },
  {
    id: "silver",
    name: "Silver",
    minSubscribers: 250,
    color: "var(--tier-silver)",
    gradient: "linear-gradient(135deg, #8e8e94 0%, #c0c0c8 50%, #f0f0f5 100%)",
    perk: "Lower platform fee (15%)",
  },
  {
    id: "gold",
    name: "Gold",
    minSubscribers: 1_000,
    color: "var(--tier-gold)",
    gradient: "linear-gradient(135deg, #b58900 0%, #ffd60a 50%, #fff3a8 100%)",
    perk: "Featured discovery slots",
  },
  {
    id: "platinum",
    name: "Platinum",
    minSubscribers: 5_000,
    color: "var(--tier-platinum)",
    gradient: "linear-gradient(135deg, #7d7da3 0%, #c5c5e8 50%, #ffffff 100%)",
    perk: "Direct messaging boost · 10% fee",
  },
  {
    id: "diamond",
    name: "Diamond",
    minSubscribers: 25_000,
    color: "var(--tier-diamond)",
    gradient: "linear-gradient(135deg, #0a84ff 0%, #5ac8fa 50%, #b3eaff 100%)",
    perk: "Concierge support · 5% fee",
  },
] as const;

export function tierFromSubscribers(subs: number): Tier {
  let current = TIERS[0];
  for (const t of TIERS) {
    if (subs >= t.minSubscribers) current = t;
  }
  return current;
}

export function nextTier(current: TierId): Tier | null {
  const idx = TIERS.findIndex((t) => t.id === current);
  if (idx === -1 || idx === TIERS.length - 1) return null;
  return TIERS[idx + 1];
}

/** Achievement badges decoupled from tiers — earned via behavior. */
export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string; // lucide icon name
  rarity: "common" | "rare" | "epic" | "legendary";
}

export const BADGES: readonly Badge[] = [
  { id: "first-post", name: "First Light",   description: "Published your first post",        icon: "Sparkles",   rarity: "common"    },
  { id: "streak-7",   name: "Week Streak",   description: "Posted 7 days in a row",            icon: "Flame",      rarity: "common"    },
  { id: "streak-30",  name: "Monthly Devotion", description: "Posted 30 days in a row",        icon: "Flame",      rarity: "rare"      },
  { id: "100-subs",   name: "Centurion",     description: "Reached 100 subscribers",           icon: "Users",      rarity: "common"    },
  { id: "1k-subs",    name: "Quad Digit",    description: "Reached 1,000 subscribers",         icon: "TrendingUp", rarity: "rare"      },
  { id: "10k-subs",   name: "Tastemaker",    description: "Reached 10,000 subscribers",        icon: "Crown",      rarity: "epic"      },
  { id: "top-10",     name: "Top 10",        description: "Hit the global top 10 leaderboard", icon: "Trophy",     rarity: "legendary" },
  { id: "viral",      name: "Viral Hit",     description: "A post crossed 100k engagements",   icon: "Zap",        rarity: "epic"      },
] as const;
