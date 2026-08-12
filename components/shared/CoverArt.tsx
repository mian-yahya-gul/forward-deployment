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

/** Soft radial glow blobs with layered opacity. */
function GradientBlobs({ pick, seed }: { pick: Pick; seed: string }) {
  const gradId = `cover-blob-${seed}`;
  const blobs = Array.from({ length: 3 }, (_, i) => ({
    cx: pick(i * 3, 40, 360),
    cy: pick(i * 3 + 1, 20, 220),
    r: pick(i * 3 + 2, 70, 150),
  }));
  const dotX = pick(9, 100, 300);
  const dotY = pick(10, 60, 180);

  return (
    <>
      <defs>
        <radialGradient id={gradId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.55" />
          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
        </radialGradient>
      </defs>
      {blobs.map((b, i) => (
        <circle key={i} cx={b.cx} cy={b.cy} r={b.r} fill={`url(#${gradId})`} />
      ))}
      <circle cx={dotX} cy={dotY} r="4" fill="var(--primary)" />
    </>
  );
}

/** Thin rays fanning from an off-canvas point. */
function SunburstRays({ pick }: { pick: Pick }) {
  const ox = pick(1, -40, 40);
  const oy = pick(2, -20, 260);
  const count = 9;
  const rays = Array.from({ length: count }, (_, i) => {
    const angle = pick(i, -0.5, 0.9) + (i / count) * Math.PI * 0.9;
    const len = pick(i + 20, 260, 420);
    return {
      x2: ox + Math.cos(angle) * len,
      y2: oy + Math.sin(angle) * len,
      opacity: 0.18 + (i % 4) * 0.12,
    };
  });

  return (
    <>
      {rays.map((r, i) => (
        <line
          key={i}
          x1={ox}
          y1={oy}
          x2={r.x2}
          y2={r.y2}
          stroke="var(--primary)"
          strokeWidth="1.5"
          opacity={r.opacity}
        />
      ))}
      <circle cx={ox} cy={oy} r="5" fill="var(--primary)" />
    </>
  );
}

/** Two flowing ribbon paths with a few marker dots. */
function WaveRibbon({ pick }: { pick: Pick }) {
  const y0 = pick(1, 60, 100);
  const y1 = pick(2, 120, 180);
  const y2 = pick(3, 40, 90);
  const d1 = `M -20 ${y0} C 100 ${y0 - 40}, 200 ${y1 + 40}, 420 ${y1 - 20}`;
  const d2 = `M -20 ${y2} C 140 ${y2 + 60}, 260 ${y0 - 30}, 420 ${y0 + 30}`;
  const dots = Array.from({ length: 4 }, (_, i) => {
    const t = i / 3;
    return { x: -20 + t * 440, y: y2 + Math.sin(t * Math.PI) * 30 };
  });

  return (
    <>
      <path d={d1} fill="none" stroke="var(--border)" strokeWidth="2" />
      <path d={d2} fill="none" stroke="var(--primary)" strokeWidth="2.5" opacity="0.9" />
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r="3.5" fill="var(--primary)" opacity="0.8" />
      ))}
    </>
  );
}

/** A small 3-cube isometric stack, one cube highlighted. */
function IsometricBlocks({ pick }: { pick: Pick }) {
  const s = 46;
  function cube(cx: number, cy: number, fillTop: string, fillLeft: string, fillRight: string) {
    const top = [[cx, cy - s], [cx + s * 0.87, cy - s * 0.5], [cx, cy], [cx - s * 0.87, cy - s * 0.5]];
    const left = [[cx - s * 0.87, cy - s * 0.5], [cx, cy], [cx, cy + s], [cx - s * 0.87, cy + s * 0.5]];
    const right = [[cx + s * 0.87, cy - s * 0.5], [cx, cy], [cx, cy + s], [cx + s * 0.87, cy + s * 0.5]];
    const toPts = (pts: number[][]) => pts.map((p) => p.join(",")).join(" ");
    return (
      <g key={`${cx}-${cy}`}>
        <polygon points={toPts(top)} fill={fillTop} />
        <polygon points={toPts(left)} fill={fillLeft} />
        <polygon points={toPts(right)} fill={fillRight} />
      </g>
    );
  }

  const cx = pick(1, 160, 260);
  const cy = pick(2, 110, 150);

  return (
    <>
      {cube(cx - 70, cy + 30, "var(--surface)", "var(--border)", "var(--surface)")}
      {cube(cx + 20, cy - 10, "var(--primary)", "var(--primary)", "var(--primary)")}
      {cube(cx + 90, cy + 40, "var(--surface)", "var(--border)", "var(--surface)")}
    </>
  );
}

/** A right-angle circuit trace with junction dots. */
function CircuitPath({ pick }: { pick: Pick }) {
  let x = pick(1, 20, 60);
  let y = pick(2, 40, 200);
  const pts: [number, number][] = [[x, y]];
  for (let i = 0; i < 6; i++) {
    if (i % 2 === 0) x += pick(i + 10, 40, 90);
    else y += pick(i + 10, -60, 60);
    y = Math.max(20, Math.min(220, y));
    x = Math.min(380, x);
    pts.push([x, y]);
  }
  let d = `M ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) d += ` L ${pts[i][0]} ${pts[i][1]}`;

  return (
    <>
      <path d={d} fill="none" stroke="var(--primary)" strokeWidth="1.5" opacity="0.7" />
      {pts.map(([px, py], i) => (
        <circle
          key={i}
          cx={px}
          cy={py}
          r={i === pts.length - 1 ? 5 : 3}
          fill="var(--primary)"
          opacity={i === pts.length - 1 ? 1 : 0.7}
        />
      ))}
    </>
  );
}

/** Organic contour lines, one highlighted, like a topographic map. */
function TopoContours({ pick }: { pick: Pick }) {
  const baseY = pick(1, 140, 190);
  const amp1 = pick(2, 20, 45);
  const lines = Array.from({ length: 5 }, (_, i) => {
    const yOff = i * 22;
    const a = amp1 - i * 3;
    const d = `M -20 ${baseY - yOff} C 80 ${baseY - yOff - a}, 160 ${baseY - yOff + a}, 240 ${baseY - yOff - a * 0.6}, 420 ${baseY - yOff + a * 0.3}`;
    return { d, highlight: i === 2 };
  });

  return (
    <>
      {lines.map((l, i) => (
        <path
          key={i}
          d={l.d}
          fill="none"
          stroke={l.highlight ? "var(--primary)" : "var(--border)"}
          strokeWidth={l.highlight ? 2 : 1.3}
          opacity={l.highlight ? 0.9 : 0.8}
        />
      ))}
    </>
  );
}

export function CoverArt({ seed, className }: CoverArtProps) {
  const h = hashSeed(seed);
  const pick = makePick(h);
  const variant = h % 9;

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
        {variant === 3 && <GradientBlobs pick={pick} seed={seed} />}
        {variant === 4 && <SunburstRays pick={pick} />}
        {variant === 5 && <WaveRibbon pick={pick} />}
        {variant === 6 && <IsometricBlocks pick={pick} />}
        {variant === 7 && <CircuitPath pick={pick} />}
        {variant === 8 && <TopoContours pick={pick} />}
      </svg>
    </div>
  );
}
