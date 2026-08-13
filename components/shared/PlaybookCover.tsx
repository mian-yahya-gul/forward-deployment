"use client";

import Link from "next/link";
import { useCallback, useRef } from "react";

import { playbookIntro } from "@/lib/data/playbook";

// Resting pose: the cover sits at a slight natural tilt even before hover,
// matching the reference's "photographed at an angle" presentation.
const BASE_ROTATE_X = 5;
const BASE_ROTATE_Y = -13;
const BASE_ROTATE_Z = -1.5;
const HOVER_RANGE = 16;

/**
 * A CSS-built book cover (no image asset) that tilts in 3D toward the
 * cursor, mirroring the hover behavior on the reference book site.
 * Direct DOM style writes on mousemove, not React state, so it doesn't
 * re-render on every pointer event.
 */
export function PlaybookCover() {
  const wrapRef = useRef<HTMLAnchorElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const applyTransform = useCallback((rotateX: number, rotateY: number, scale: number) => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${BASE_ROTATE_Z}deg) scale3d(${scale}, ${scale}, ${scale})`;
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      const wrap = wrapRef.current;
      const card = cardRef.current;
      if (!wrap || !card) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const rect = wrap.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;

      applyTransform(
        BASE_ROTATE_X + (0.5 - py) * HOVER_RANGE,
        BASE_ROTATE_Y + (px - 0.5) * HOVER_RANGE,
        1.03,
      );
      card.style.setProperty("--sheen-x", `${px * 100}%`);
      card.style.setProperty("--sheen-y", `${py * 100}%`);
    },
    [applyTransform],
  );

  const handleMouseLeave = useCallback(() => {
    applyTransform(BASE_ROTATE_X, BASE_ROTATE_Y, 1);
  }, [applyTransform]);

  return (
    <div className="relative mx-auto w-full max-w-[380px] py-10">
      {/* Ambient glow behind the book. */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(closest-side, rgba(46,70,128,0.55), rgba(10,14,26,0.25) 65%, transparent 80%)",
          filter: "blur(20px)",
        }}
        aria-hidden
      />

      <Link
        ref={wrapRef}
        href={playbookIntro.readingHref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group block [perspective:1400px]"
        aria-label={`Start reading — ${playbookIntro.title}`}
      >
        <div
          ref={cardRef}
          className="relative mx-auto aspect-[5/7] w-[86%] rounded-[10px] transition-transform duration-300 ease-out will-change-transform [transform-style:preserve-3d]"
          style={{
            transform: `rotateX(${BASE_ROTATE_X}deg) rotateY(${BASE_ROTATE_Y}deg) rotateZ(${BASE_ROTATE_Z}deg)`,
            background: "linear-gradient(160deg, #050810 0%, #0c1424 45%, #16233f 100%)",
            boxShadow:
              "0 50px 80px -25px rgba(3, 5, 12, 0.75), 0 20px 40px -18px rgba(3, 5, 12, 0.6)",
          }}
        >
          {/* Page block along the right edge — a skewed slab to fake perspective depth. */}
          <div
            className="pointer-events-none absolute top-[2%] bottom-[2%] left-full w-[7%] origin-left"
            style={{
              transform: "skewY(28deg)",
              background:
                "repeating-linear-gradient(180deg, #f2ead9 0px, #f2ead9 2px, #dcd0b4 2px, #dcd0b4 3px)",
              boxShadow: "inset -2px 0 4px rgba(0,0,0,0.25)",
            }}
            aria-hidden
          />
          {/* Shading where the pages meet the spine. */}
          <div
            className="pointer-events-none absolute inset-y-0 right-0 w-6 rounded-r-[10px]"
            style={{ background: "linear-gradient(90deg, transparent, rgba(0,0,0,0.3))" }}
            aria-hidden
          />

          {/* Cursor-following sheen. */}
          <div
            className="pointer-events-none absolute inset-0 rounded-[10px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background:
                "radial-gradient(circle at var(--sheen-x, 50%) var(--sheen-y, 25%), rgba(255,255,255,0.14), transparent 55%)",
            }}
            aria-hidden
          />

          <div className="relative flex h-full flex-col p-[6%]">
            <div
              className="flex items-center justify-between text-[9px] font-bold tracking-[0.2em] uppercase"
              style={{ color: "#f4f6fb" }}
            >
              <span>DeosAI Labs</span>
              <span style={{ color: "#7c8bb3", fontWeight: 600 }}>Forward Deployed</span>
            </div>
            <div className="mt-2 h-px w-full" style={{ background: "rgba(255,255,255,0.14)" }} />

            <div className="mt-[6%] flex justify-center">
              <PlaybookDiagram />
            </div>

            <p
              className="mt-auto text-[9px] font-bold tracking-[0.18em] uppercase"
              style={{ color: "#8fb0ef" }}
            >
              Map &middot; Build &middot; Deploy Digital FTEs
            </p>

            <h2 className="mt-[3%] text-[26px] leading-[0.98] font-extrabold tracking-tight sm:text-[30px]">
              <span className="block" style={{ color: "#f7f8fc" }}>
                The Forward
              </span>
              <span className="block" style={{ color: "#f7f8fc" }}>
                Deployment
              </span>
              <span className="block" style={{ color: "#9db8f5" }}>
                Playbook
              </span>
            </h2>

            <p className="mt-[4%] text-[11px] leading-snug font-semibold" style={{ color: "#e4e9f7" }}>
              A workflow-by-workflow, industry-by-industry guide to where Digital FTEs belong
              inside the operations you already run.
            </p>

            <p className="mt-[3%] text-[10px] leading-snug" style={{ color: "#6f7fa3" }}>
              Most companies don&rsquo;t have an AI problem. They have a workflow visibility
              problem.
            </p>

            <div className="mt-[5%] h-px w-full" style={{ background: "rgba(255,255,255,0.14)" }} />
            <p className="mt-[3%] text-[9px] font-semibold tracking-[0.16em]" style={{ color: "#5b6c92" }}>
              BOOK.DEOSAILABS.COM
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}

/** The blueprint-style workflow diagram: corner brackets, three connected
 * nodes with a labeled top rail, and a step track with a completion check. */
function PlaybookDiagram() {
  const nodes = [
    { cx: 55, cy: 62, label: "MAP" },
    { cx: 150, cy: 62, label: "BUILD" },
    { cx: 245, cy: 62, label: "DEPLOY" },
  ];

  return (
    <svg viewBox="0 0 300 150" className="h-auto w-full max-w-[280px]" role="img" aria-label="Workflow diagram: map, build, deploy">
      {/* Corner brackets */}
      <g stroke="#8fa8dd" strokeWidth="1.4" opacity="0.8" fill="none">
        <path d="M8,18 V8 H18" />
        <path d="M292,18 V8 H282" />
      </g>

      {/* Top label rail */}
      <g fill="#7d93c4" fontSize="7" fontWeight="700" letterSpacing="1.2" style={{ textTransform: "uppercase" }}>
        <text x={nodes[0].cx} y="24" textAnchor="middle">Intake</text>
        <text x={nodes[1].cx} y="24" textAnchor="middle">Assembly</text>
        <text x={nodes[2].cx} y="24" textAnchor="middle">Output</text>
      </g>
      <line x1="35" y1="32" x2="265" y2="32" stroke="#3a4a72" strokeWidth="1" opacity="0.8" />
      {nodes.map((n) => (
        <circle key={n.label} cx={n.cx} cy="32" r="2" fill="#8fa8dd" />
      ))}

      {/* Connecting lines between nodes */}
      <g stroke="#5b76ab" strokeWidth="1" opacity="0.6">
        <line x1={nodes[0].cx + 20} y1={nodes[0].cy - 10} x2={nodes[1].cx - 20} y2={nodes[1].cy - 10} />
        <line x1={nodes[1].cx + 20} y1={nodes[1].cy - 10} x2={nodes[2].cx - 20} y2={nodes[2].cy - 10} />
      </g>

      {/* Nodes */}
      {nodes.map((n, i) => (
        <g key={n.label}>
          <rect x={n.cx - 22} y={n.cy - 18} width="44" height="36" rx="5" fill="none" stroke="#9fb6ef" strokeWidth="1.3" />
          <rect x={n.cx - 22} y={n.cy - 18} width="5" height="5" fill="#5b76ab" opacity="0.7" />
          <rect x={n.cx + 17} y={n.cy + 13} width="5" height="5" fill="#5b76ab" opacity="0.7" />
          <circle cx={n.cx} cy={n.cy} r="5" fill="none" stroke="#9fb6ef" strokeWidth="1.2" />
          <circle cx={n.cx} cy={n.cy} r="1.6" fill="#c3d4f7" />
          {i === 2 && (
            <g transform={`translate(${n.cx + 16}, ${n.cy - 16})`}>
              <circle r="7" fill="#16233f" stroke="#9fb6ef" strokeWidth="1.2" />
              <path d="M-3,0 L-1,2.5 L3.5,-3" fill="none" stroke="#9fb6ef" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          )}
        </g>
      ))}

      {/* Step track */}
      <line x1="35" y1="108" x2="265" y2="108" stroke="#3a4a72" strokeWidth="1" opacity="0.8" />
      {nodes.map((n, i) => (
        <g key={`step-${n.label}`}>
          <circle cx={n.cx} cy="108" r="3" fill="#0c1424" stroke="#9fb6ef" strokeWidth="1.3" />
          <text x={n.cx} y="122" textAnchor="middle" fontSize="7" fontWeight="700" letterSpacing="0.8" fill="#8fa8dd" style={{ textTransform: "uppercase" }}>
            {`0${i + 1} · ${n.label}`}
          </text>
        </g>
      ))}

      {/* Flow caption */}
      <g fill="#5b6c92" fontSize="7" fontWeight="700" letterSpacing="1.4" style={{ textTransform: "uppercase" }}>
        <text x="150" y="144" textAnchor="middle">Flow &#8594; Digital FTE</text>
      </g>
    </svg>
  );
}
