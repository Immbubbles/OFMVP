import { tierFromSubscribers } from "@/lib/tiers";
import type { Creator, LeaderboardEntry, LeaderboardKind, LeaderboardWindow, Post } from "./types";

/**
 * Deterministic mock data. All numbers/handles are made up. When we replace
 * this with a real API later, the call sites only care about the shapes
 * exported from `./types`.
 */

const mk = (
  id: string,
  handle: string,
  displayName: string,
  category: string,
  subscribers: number,
  earnings: number,
  growthPct: number,
  monthlyPrice: number,
  badgeIds: string[],
  bio: string,
): Creator => ({
  id,
  handle,
  displayName,
  category,
  subscribers,
  earnings,
  growthPct,
  monthlyPrice,
  badgeIds,
  bio,
  joinedAt: "2024-01-01T00:00:00.000Z",
  avatarUrl: null,
  coverUrl: null,
  tier: tierFromSubscribers(subscribers).id,
});

export const CREATORS: Creator[] = [
  mk("c1", "ariawolfe",     "Aria Wolfe",        "Art & Design",    48_210, 1_240_000, 12.4, 14.99, ["10k-subs","top-10","streak-30","viral"], "Mixed media artist. New series every Friday."),
  mk("c2", "kaisermoon",    "Kaiser Moon",       "Music",           36_450,   980_000,  8.7, 12.99, ["10k-subs","streak-30","viral"],          "Producer · synth, ambient, late-night sets."),
  mk("c3", "novaluxe",      "Nova Luxe",         "Lifestyle",       29_870,   860_000, 22.1,  9.99, ["10k-subs","streak-7","viral"],           "Travel + style. Currently in Lisbon."),
  mk("c4", "zenithpark",    "Zenith Park",       "Fitness",         18_240,   612_000, 15.2, 19.99, ["10k-subs","streak-30"],                  "Strength coach. Daily programs, weekly Q&As."),
  mk("c5", "lyriccode",     "Lyric Code",        "Tech",            14_500,   480_000, -3.4,  9.99, ["10k-subs","streak-7"],                   "Indie devs deserve nice things. Building in public."),
  mk("c6", "indigoset",     "Indigo Set",        "Fashion",         12_900,   430_000, 18.6, 11.99, ["10k-subs"],                              "Editorial photographer. Behind-the-scenes weekly."),
  mk("c7", "marleystorm",   "Marley Storm",      "Music",            8_300,   240_000,  4.2,  7.99, ["1k-subs","streak-7"],                    "Singer-songwriter. Demo cuts before they're polished."),
  mk("c8", "atlasbloom",    "Atlas Bloom",       "Wellness",         6_700,   195_000, 31.8,  8.99, ["1k-subs","streak-30"],                   "Breathwork, mobility, calm. Sundays are sacred."),
  mk("c9", "rubyvex",       "Ruby Vex",          "Gaming",           5_100,   148_000,  6.1,  6.99, ["1k-subs"],                               "Speedrunner. Weekly trial-and-error VODs."),
  mk("c10","prismadi",      "Prism Adi",         "Art & Design",     3_400,   102_000, 11.0,  8.99, ["1k-subs","streak-7"],                    "Generative art, plotter prints, process notes."),
  mk("c11","silverbough",   "Silver Bough",      "Lifestyle",        2_950,    78_500,  9.4,  6.99, ["1k-subs"],                               "Slow living from a converted barn in Vermont."),
  mk("c12","elioncast",     "Elion Cast",        "Music",            2_100,    52_000, 14.7,  5.99, ["1k-subs"],                               "Cellist. Film scores in progress, raw stems shared."),
  mk("c13","verdantfox",    "Verdant Fox",       "Fitness",          1_400,    34_200,  2.3,  9.99, ["1k-subs"],                               "Trail running plans. From 5k to 50k."),
  mk("c14","mariahalcyon",  "Mariah Halcyon",    "Wellness",           980,    21_400, 26.5,  6.99, ["100-subs","streak-7"],                   "Sleep stories and sound baths. Recorded weekly."),
  mk("c15","kestrelsoft",   "Kestrel Soft",      "Tech",               610,    14_800,  5.1,  4.99, ["100-subs"],                              "Vintage Mac collector. Restoration logs and shop tours."),
  mk("c16","nightowlclub",  "Nightowl Club",     "Gaming",             430,     9_700, 41.0,  4.99, ["100-subs","streak-7"],                   "Late-night co-op streams archived for members."),
  mk("c17","junesolstice",  "June Solstice",     "Fashion",            210,     5_200, 18.0,  5.99, ["100-subs"],                              "Vintage finds, mended and styled."),
  mk("c18","cobaltdream",   "Cobalt Dream",      "Art & Design",       150,     3_400, 12.5,  3.99, ["first-post"],                            "Watercolor ocean studies. New pieces every Sunday."),
];

export function creatorByHandle(handle: string): Creator | undefined {
  return CREATORS.find((c) => c.handle.toLowerCase() === handle.toLowerCase());
}

export function creatorById(id: string): Creator | undefined {
  return CREATORS.find((c) => c.id === id);
}

/* ---------- Posts ---------- */

const ASPECTS: Post["aspect"][] = ["square", "portrait", "landscape"];

const seedRand = (seed: number) => {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 0xffffffff;
  };
};

export function postsForCreator(creatorId: string, count = 9): Post[] {
  const idx = CREATORS.findIndex((c) => c.id === creatorId);
  const rand = seedRand(idx + 1);
  const now = Date.now();
  return Array.from({ length: count }, (_, i) => {
    const locked = i % 3 !== 0; // 2/3 of posts paywalled
    const aspect = ASPECTS[Math.floor(rand() * ASPECTS.length)];
    const likes = Math.floor(rand() * 12_000) + 200;
    const comments = Math.floor(rand() * 800) + 8;
    return {
      id: `${creatorId}-p${i}`,
      creatorId,
      locked,
      aspect,
      likes,
      comments,
      caption: pickCaption(rand),
      postedAt: new Date(now - i * 86_400_000 * (1 + rand())).toISOString(),
    };
  });
}

function pickCaption(rand: () => number) {
  const captions = [
    "Working on something I've been sitting with for a while.",
    "Behind-the-scenes from this week. Members get the raw cut.",
    "Quiet morning. New piece coming together.",
    "Subscribers — a little something for you tonight.",
    "Three takes, picked the second one. Here's why.",
    "Long format drop later this week. Preview inside.",
  ];
  return captions[Math.floor(rand() * captions.length)];
}

/* ---------- Leaderboards ---------- */

const WINDOW_FACTOR: Record<LeaderboardWindow, number> = {
  day: 0.04,
  week: 0.22,
  month: 0.85,
  all: 1,
};

export function leaderboard(
  kind: LeaderboardKind,
  window: LeaderboardWindow,
  limit = 10,
): LeaderboardEntry[] {
  const factor = WINDOW_FACTOR[window];
  const sorted = [...CREATORS].sort((a, b) => {
    const va = kind === "earnings" ? a.earnings : a.subscribers;
    const vb = kind === "earnings" ? b.earnings : b.subscribers;
    return vb - va;
  });

  // Slight reshuffling for shorter windows so it doesn't look identical.
  if (window !== "all") {
    sorted.sort((a, b) => {
      const va = (kind === "earnings" ? a.earnings : a.subscribers) * factor + a.growthPct * 200;
      const vb = (kind === "earnings" ? b.earnings : b.subscribers) * factor + b.growthPct * 200;
      return vb - va;
    });
  }

  return sorted.slice(0, limit).map((creator, i) => ({
    rank: i + 1,
    creator,
    value: Math.round(
      (kind === "earnings" ? creator.earnings : creator.subscribers) * factor,
    ),
    delta: Math.round(creator.growthPct * (window === "day" ? 0.2 : window === "week" ? 0.6 : 1)),
  }));
}
