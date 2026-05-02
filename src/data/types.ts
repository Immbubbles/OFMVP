import type { TierId } from "@/lib/tiers";

export interface Creator {
  id: string;
  handle: string;       // @handle, no leading @
  displayName: string;
  bio: string;
  category: string;
  /** Subscriber count drives tier. */
  subscribers: number;
  /** All-time gross earnings in USD (mocked). */
  earnings: number;
  /** Earnings change over the last 30 days as a percentage. */
  growthPct: number;
  /** Monthly subscription price in USD. */
  monthlyPrice: number;
  /** ISO timestamp the creator joined. */
  joinedAt: string;
  /** Optional cover/avatar; left empty in MVP — components fall back to gradients. */
  avatarUrl?: string | null;
  coverUrl?: string | null;
  /** Achievement badge IDs from `BADGES`. */
  badgeIds: string[];
  /** Tier is derived but stored for display speed. */
  tier: TierId;
}

export interface Post {
  id: string;
  creatorId: string;
  caption: string;
  /** When `locked` is true, the UI shows a blurred/locked preview. */
  locked: boolean;
  postedAt: string;
  likes: number;
  comments: number;
  /** Aspect ratio for skeleton sizing. */
  aspect: "square" | "portrait" | "landscape";
}

export type LeaderboardKind = "earnings" | "subscribers";
export type LeaderboardWindow = "day" | "week" | "month" | "all";

export interface LeaderboardEntry {
  rank: number;
  creator: Creator;
  /** Value used to rank — interpretation depends on `kind`. */
  value: number;
  /** Movement vs. previous window snapshot (positive = climbed). */
  delta: number;
}
