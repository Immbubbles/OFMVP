# Lumen — Creator Platform MVP

A premium subscription platform for independent creators. Apple-inspired
iOS / visionOS aesthetic with deep neutrals, layered glass surfaces, and
spring-driven motion.

> **Status:** v0.1 minimal scaffold — design system + 3 sample pages, all
> mock-data driven. Ready to grow into a full product.

---

## Stack

| Concern        | Choice                                    | Why                                             |
| -------------- | ----------------------------------------- | ----------------------------------------------- |
| Framework      | **Next.js 16** (App Router) + React 19    | Full-stack, server components, edge-ready       |
| Language       | TypeScript (strict)                       | Lock down API shapes early                      |
| Styling        | Tailwind CSS v4                           | Co-located, fast iteration                      |
| Animation      | Framer Motion                             | iOS-style springs, layout transitions           |
| Icons          | Lucide                                    | Consistent, tree-shakeable                      |
| Class merging  | `clsx` + `tailwind-merge` + `cva`         | Variant-driven components                       |

---

## Run it

```bash
cd ofmvp-app
npm install        # already done if you scaffolded with us
npm run dev        # http://localhost:3000
```

Other scripts:

```bash
npm run build      # production build
npm run start      # serve the production build
npm run lint       # eslint
```

---

## Routes

| Path            | Purpose                                                               |
| --------------- | --------------------------------------------------------------------- |
| `/`             | Landing — hero, tier showcase, leaderboard preview, featured creators |
| `/leaderboard`  | Full leaderboard (top earners + most subscribed)                      |
| `/rewards`      | Tier + badge documentation                                            |
| `/c/[handle]`   | Creator profile — cover, stats, tier progress, badges, locked posts   |

---

## Project layout

```
src/
├─ app/                     # Next App Router routes
│  ├─ layout.tsx            # Root layout — fonts, TopNav, global background
│  ├─ globals.css           # Design tokens + glass utilities
│  ├─ page.tsx              # Landing
│  ├─ leaderboard/page.tsx
│  ├─ rewards/page.tsx
│  └─ c/[handle]/page.tsx   # Creator profile (statically generated per creator)
│
├─ components/
│  ├─ ui/                   # Primitives: GlassCard, Button, Avatar, TierBadge
│  ├─ nav/top-nav.tsx       # Sticky glass navigation
│  ├─ creators/             # Domain components for creators
│  ├─ leaderboard/          # Leaderboard widgets
│  └─ posts/                # Post cards with locked-preview UX
│
├─ data/
│  ├─ types.ts              # Creator / Post / LeaderboardEntry shapes
│  └─ mock.ts               # Deterministic mock data + selectors
│
└─ lib/
   ├─ cn.ts                 # className merger
   ├─ format.ts             # Currency / number / delta formatters
   └─ tiers.ts              # Tier + badge definitions, derivation helpers
```

---

## Design system

The look lives in two files:

- **`src/app/globals.css`** — CSS variables for colors, radii, easings + a
  small set of utility classes (`.glass`, `.glass-strong`, `.glass-nav`,
  `.shimmer`, `.float-in`, `.locked-blur`, `.text-gradient`, …).
- **`src/lib/tiers.ts`** — the 5-tier ladder (Bronze → Diamond) and the
  achievement-badge catalog.

Anywhere a creator is rendered, two things flow from `tier`:

1. A `<TierBadge tier={creator.tier} />` pill.
2. A ring color + shimmer applied to their avatar / progress bar.

That's the entire visual language for status. To add a new tier, just
append to `TIERS` and everything downstream updates.

---

## Mock data → real data

Every component imports from `@/data/mock`. When we wire up Postgres,
those calls become server actions or `fetch()`s that return the **same
shapes** declared in `@/data/types`. Concretely:

```ts
// today
import { CREATORS, leaderboard } from "@/data/mock";

// tomorrow (Prisma example)
import { db } from "@/lib/db";
const CREATORS = await db.creator.findMany();
```

No component changes required.

---

## What's intentionally NOT here yet

This is the **minimal** scaffold you asked for. The following are stubbed
or absent so the next steps are obvious:

- **Auth / OAuth** — `Sign in` and `Get started` buttons in the nav are
  visual only. Drop in [`next-auth` v5](https://authjs.dev) or
  [Clerk](https://clerk.com) in `src/app/layout.tsx` (provider) and a
  middleware file at `src/middleware.ts`.
- **Database** — pure mock data. Recommended next step:
  Prisma + SQLite (zero-config local) → swap to Postgres / Supabase /
  Neon when you deploy.
- **Payments** — the Subscribe button is visual only. Wire to Stripe
  (`@stripe/stripe-js` + a `/api/stripe/webhook` route) for fiat. For
  crypto, plan a separate `/api/crypto/charge` adapter using something
  like Coinbase Commerce, NOWPayments, or a self-hosted EVM wallet
  webhook. Either way, both should fulfill the same internal
  `Subscription` record so the UI doesn't care.
- **Content uploads** — no R2 / S3 / Mux yet. Posts are mock objects.
- **Real-time DMs** — UI shell not built. Plan: Pusher Channels or
  Supabase Realtime.
- **Search / discovery** — `⌘K` button is decorative. Plan: a Cmd+K
  palette wired to Postgres full-text or Algolia.
- **Creator dashboard** — analytics, payouts, content scheduler. Next
  big route group: `/dashboard/(creator)/...`.

---

## Decisions worth knowing

- **Static generation per creator.** `app/c/[handle]/page.tsx` exports
  `generateStaticParams` over `CREATORS`, so every profile is prerendered
  at build time. Once you switch to a DB, pivot to ISR (`revalidate`) or
  on-demand revalidation.
- **No external image assets.** Avatars and post covers are deterministic
  CSS gradients keyed off the creator's name/id. This keeps the repo
  light and avoids any awkwardness around stock imagery for an
  adult-platform MVP. Real assets slot into `Creator.avatarUrl` /
  `Post` thumbnails when ready.
- **Locked posts** use the `.locked-blur` utility — a single-line CSS
  class. Gates and pricing UX live in one place (`PostCard`).
- **Color system** is HSL-derived per creator, so two creators never
  look identical even with no real images.

---

## Roadmap (suggested)

1. **Auth + DB** — NextAuth v5 with Apple / Google / email; Prisma + SQLite locally.
2. **Stripe checkout** — subscriptions + tipping; webhook → DB.
3. **Creator dashboard** — `/dashboard` route group, analytics, payouts.
4. **Real content pipeline** — direct-to-R2 uploads, Mux for video, EXIF stripping.
5. **Crypto payments** — Coinbase Commerce or self-hosted USDC; same `Subscription` model.
6. **Realtime DMs** — Supabase Realtime or Pusher.
7. **Search + Cmd+K** — Postgres FTS or Algolia.
8. **Mobile** — Next.js PWA first, then React Native via shared types.

---

## License

Private / unreleased.
_________________________

Notes: note taking