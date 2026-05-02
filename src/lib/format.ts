/**
 * IMPORTANT: All formatters here must be SSR-deterministic. Node's bundled
 * ICU and browser ICU disagree subtly on `notation: "compact"` (e.g. Node
 * may render "833.0K" where the browser renders "833K"). We pin output by
 * always passing `trailingZeroDisplay: "stripIfInteger"` AND fixing the
 * fraction-digit range, so both runtimes produce the same string and React
 * hydration stays clean.
 */

export function formatCurrency(value: number, opts: { compact?: boolean } = {}) {
  const { compact = true } = opts;
  if (compact) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
      minimumFractionDigits: 0,
      maximumFractionDigits: 1,
      trailingZeroDisplay: "stripIfInteger",
    }).format(value);
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatNumber(value: number, opts: { compact?: boolean } = {}) {
  const { compact = true } = opts;
  return new Intl.NumberFormat("en-US", {
    notation: compact ? "compact" : "standard",
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
    trailingZeroDisplay: "stripIfInteger",
  }).format(value);
}

export function formatDelta(pct: number) {
  const sign = pct >= 0 ? "+" : "";
  return `${sign}${pct.toFixed(1)}%`;
}
