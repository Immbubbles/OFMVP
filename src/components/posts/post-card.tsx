"use client";

import { Heart, MessageCircle, Lock } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { formatNumber } from "@/lib/format";
import type { Post } from "@/data/types";

const ASPECT_CLASS: Record<Post["aspect"], string> = {
  square: "aspect-square",
  portrait: "aspect-[4/5]",
  landscape: "aspect-[16/10]",
};

interface PostCardProps {
  post: Post;
  /** Deterministic hue so each card looks distinct without real images. */
  seed: number;
  unlockPriceLabel?: string;
}

export function PostCard({ post, seed, unlockPriceLabel }: PostCardProps) {
  const h1 = (seed * 47) % 360;
  const h2 = (h1 + 60) % 360;
  const bg = `linear-gradient(135deg, hsl(${h1} 65% 32%) 0%, hsl(${h2} 65% 18%) 100%)`;

  return (
    <motion.article
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 26 }}
      className="group relative overflow-hidden rounded-[var(--radius-lg)] border border-white/10 bg-white/3"
    >
      <div className={cn("relative w-full", ASPECT_CLASS[post.aspect])} style={{ background: bg }}>
        {/* Decorative shape that gets blurred when locked */}
        <div
          className={cn(
            "absolute inset-0 transition-all duration-500",
            post.locked && "locked-blur",
          )}
          style={{
            background: `
              radial-gradient(60% 50% at 30% 30%, rgba(255,255,255,0.18), transparent 60%),
              radial-gradient(40% 40% at 80% 70%, rgba(255,255,255,0.10), transparent 60%)
            `,
          }}
        />

        {/* Locked overlay */}
        {post.locked && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <span className="inline-flex items-center justify-center h-12 w-12 rounded-full glass mb-3">
              <Lock className="h-5 w-5" />
            </span>
            <p className="text-[12px] text-white/85">Locked content</p>
            {unlockPriceLabel && (
              <p className="text-[11px] text-white/55 mt-0.5">
                Unlock for {unlockPriceLabel}
              </p>
            )}
          </div>
        )}

        {/* Bottom meta */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
          <div className="flex items-center gap-3 text-[11px] text-white/85">
            <span className="inline-flex items-center gap-1">
              <Heart className="h-3 w-3" /> {formatNumber(post.likes)}
            </span>
            <span className="inline-flex items-center gap-1">
              <MessageCircle className="h-3 w-3" /> {formatNumber(post.comments)}
            </span>
          </div>
        </div>
      </div>

      <div className="p-3">
        <p className="text-[13px] text-white/75 line-clamp-2 text-pretty">
          {post.caption}
        </p>
      </div>
    </motion.article>
  );
}
