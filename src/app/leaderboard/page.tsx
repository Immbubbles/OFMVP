import { LeaderboardPreview } from "@/components/leaderboard/leaderboard-preview";

export const metadata = {
  title: "Leaderboard · Lumen",
};

export default function LeaderboardPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-12 pb-32">
      <div className="float-in">
        <p className="text-[11px] uppercase tracking-[0.16em] text-white/45">
          Live rankings
        </p>
        <h1 className="mt-2 text-[clamp(34px,5vw,52px)] tracking-[-0.025em] font-semibold text-balance">
          Leaderboard
        </h1>
        <p className="mt-3 text-white/65 text-[15px] max-w-xl text-pretty">
          Top earners and most subscribed creators across every time window.
          Rankings refresh continuously; tier perks lock in at month boundaries.
        </p>
      </div>

      <div className="mt-10">
        <LeaderboardPreview />
      </div>
    </div>
  );
}
