import { cn } from "@/lib/utils";

interface CoverArtProps {
  /** Any stable string (slug, category) — same seed always renders the same art. */
  seed: string;
  className?: string;
}

/** Small deterministic PRNG seeded from a string, so a given seed always renders identically. */
function hashSeed(seed: string): number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return h || 1;
}

function makePick(h: number) {
  return (salt: number, min: number, max: number) => {
    const v = Math.sin(h * (salt + 1)) * 10000;
    const frac = v - Math.floor(v);
    return min + frac * (max - min);
  };
}

type Pick = (salt: number, min: number, max: number) => number;

/** Node-and-line diagram, echoing the Hero's workflow illustration. */
function FlowNodes({ pick }: { pick: Pick }) {
  const nodes = Array.from({ length: 5 }, (_, i) => ({
    x: pick(i * 2, 40, 360),
    y: pick(i * 2 + 1, 40, 200),
  }));

  return (
    <>
      <g stroke="var(--border)" strokeWidth="1" opacity="0.7">
        {nodes.slice(1).map((n, i) => (
          <line key={i} x1={nodes[i].x} y1={nodes[i].y} x2={n.x} y2={n.y} />
        ))}
      </g>
      {nodes.map((n, i) => (
        <g key={i}>
          <rect
            x={n.x - 16}
            y={n.y - 12}
            width="32"
            height="24"
            rx="6"
            fill="var(--surface)"
            stroke="var(--border)"
            strokeWidth="1"
          />
          <circle cx={n.x} cy={n.y} r="3" fill="var(--primary)" opacity={i === 0 ? 1 : 0.6} />
        </g>
      ))}
    </>
  );
}

/** Concentric arcs radiating from an off-canvas focal point. */
function ConcentricArcs({ pick }: { pick: Pick }) {
  const cx = pick(1, -60, 60);
  const cy = pick(2, 180, 300);
  const radii = [60, 100, 140, 180, 220];

  return (
    <>
      {radii.map((r, i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="var(--primary)"
          strokeWidth="1.5"
          opacity={0.55 - i * 0.09}
        />
      ))}
      <circle cx={cx} cy={cy} r="4" fill="var(--primary)" />
    </>
  );
}

/** A dot grid with one highlighted, connected cluster. */
function DotCluster({ pick }: { pick: Pick }) {
  const dots: { x: number; y: number }[] = [];
  for (let x = 20; x <= 380; x += 30) {
    for (let y = 20; y <= 220; y += 30) {
      dots.push({ x, y });
    }
  }
  const clusterX = Math.round(pick(3, 2, 10)) * 30 - 10;
  const clusterY = Math.round(pick(4, 1, 6)) * 30 - 10;
  const cluster = dots.filter(
    (d) => Math.abs(d.x - clusterX) <= 30 && Math.abs(d.y - clusterY) <= 30,
  );

  return (
    <>
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r="2" fill="var(--border)" />
      ))}
      <g stroke="var(--primary)" strokeWidth="1" opacity="0.5">
        {cluster.slice(1).map((d, i) => (
          <line key={i} x1={cluster[0].x} y1={cluster[0].y} x2={d.x} y2={d.y} />
        ))}
      </g>
      {cluster.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r="4" fill="var(--primary)" opacity={i === 0 ? 1 : 0.7} />
      ))}
    </>
  );
}

/** Overlapping, slightly rotated panels — an abstract stack of systems/documents. */
function LayeredPanels({ pick }: { pick: Pick }) {
  const panels = Array.from({ length: 4 }, (_, i) => {
    const w = pick(i * 4, 90, 170);
    const h = pick(i * 4 + 1, 60, 110);
    const x = pick(i * 4 + 2, 40, 400 - w - 40);
    const y = pick(i * 4 + 3, 30, 240 - h - 30);
    const rotation = pick(i * 4 + 3.5, -8, 8);
    return { x, y, w, h, rotation };
  });

  return (
    <>
      {panels.map((p, i) => {
        const isLast = i === panels.length - 1;
        return (
          <rect
            key={i}
            x={p.x}
            y={p.y}
            width={p.w}
            height={p.h}
            rx="12"
            fill={isLast ? "var(--primary)" : "var(--background)"}
            stroke={isLast ? "none" : "var(--border)"}
            strokeWidth="1.5"
            opacity={isLast ? 0.9 : 1}
            transform={`rotate(${p.rotation} ${p.x + p.w / 2} ${p.y + p.h / 2})`}
          />
        );
      })}
    </>
  );
}

export function CoverArt({ seed, className }: CoverArtProps) {
  const h = hashSeed(seed);
  const pick = makePick(h);
  const variant = h % 4;

  return (
    <div className={cn("relative overflow-hidden bg-surface", className)}>
      <svg
        viewBox="0 0 400 240"
        className="h-full w-full"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        {variant === 0 && <FlowNodes pick={pick} />}
        {variant === 1 && <ConcentricArcs pick={pick} />}
        {variant === 2 && <DotCluster pick={pick} />}
        {variant === 3 && <LayeredPanels pick={pick} />}
      </svg>
    </div>
  );
}
