/**
 * Barra del logo de Bridge Capital (viewBox 219.11 × 436.52).
 * Cada pilar usa el alto y desfase exactos de su barra en el símbolo.
 */
export const LOGO_HEIGHT = 436.52;

export const LOGO_BARS = [
  { y: 71.25, h: 298.09 },
  { y: 95.95, h: 340.57 },
  { y: 41.23, h: 355.26 },
  { y: 0, h: 340.75 },
] as const;

const pct = (n: number) => `${((n / LOGO_HEIGHT) * 100).toFixed(2)}%`;

export default function PillarBar({
  index,
  className = "h-28 md:h-72",
  tone = "night",
}: {
  index: 0 | 1 | 2 | 3;
  className?: string;
  tone?: "night" | "paper";
}) {
  const bar = LOGO_BARS[index];
  return (
    <div className={`relative ${className}`} aria-hidden="true">
      <span
        className={`pillar-bar absolute left-0 w-2.5 md:w-4 ${
          tone === "paper" ? "bg-[var(--color-paper)]" : "bg-[var(--color-night)]"
        }`}
        style={{ top: pct(bar.y), height: pct(bar.h) }}
      />
    </div>
  );
}
