"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, Trophy, Sparkles, Search } from "lucide-react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";

const NAV_ITEMS = [
  { href: "/",            label: "Discover",     icon: Compass },
  { href: "/leaderboard", label: "Leaderboard",  icon: Trophy  },
  { href: "/rewards",     label: "Rewards",      icon: Sparkles },
] as const;

export function TopNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full glass-nav">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 h-14 flex items-center gap-3">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold tracking-tight text-[15px]"
        >
          <span
            aria-hidden
            className="inline-block h-6 w-6 rounded-[7px]"
            style={{
              background:
                "conic-gradient(from 200deg at 60% 40%, #ff375f, #af52de, #0a84ff, #30d158, #ff9f0a, #ff375f)",
              boxShadow: "0 0 18px rgba(255,55,95,0.45)",
            }}
          />
          <span className="text-white">Lumen</span>
        </Link>

        <nav className="ml-2 hidden md:flex items-center gap-1 p-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl">
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
            const active =
              href === "/" ? pathname === "/" : pathname?.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "press relative inline-flex items-center gap-1.5 px-3 h-8 rounded-full text-[13px] transition-colors",
                  active
                    ? "text-white bg-white/12 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]"
                    : "text-white/65 hover:text-white hover:bg-white/8",
                )}
              >
                <Icon className="h-3.5 w-3.5" strokeWidth={2.25} />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <button
            aria-label="Search"
            className="press hidden sm:inline-flex items-center gap-2 h-9 px-3 rounded-full text-[12px] text-white/60 border border-white/10 bg-white/5 hover:bg-white/8 hover:text-white/85"
          >
            <Search className="h-3.5 w-3.5" />
            Search creators
            <kbd className="ml-2 text-[10px] text-white/45 border border-white/15 rounded px-1 py-0.5">
              ⌘K
            </kbd>
          </button>
          <Button variant="secondary" size="sm">
            Sign in
          </Button>
          <Button size="sm">Get started</Button>
        </div>
      </div>

      {/* Mobile nav row */}
      <nav className="md:hidden flex items-center gap-1 px-3 pb-2 overflow-x-auto">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active =
            href === "/" ? pathname === "/" : pathname?.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "press inline-flex items-center gap-1.5 px-3 h-8 rounded-full text-[12px] border whitespace-nowrap",
                active
                  ? "text-white border-white/20 bg-white/10"
                  : "text-white/65 border-white/10 bg-white/5",
              )}
            >
              <Icon className="h-3 w-3" />
              {label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
