"use client";

import { useCallback, useRef } from "react";

/**
 * A CSS-built book cover (no image asset) that tilts in 3D toward the
 * cursor, mirroring the hover behavior on the reference book site.
 * Direct DOM style writes on mousemove, not React state, so it doesn't
 * re-render on every pointer event.
 */
export function PlaybookCover() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const wrap = wrapRef.current;
    const card = cardRef.current;
    if (!wrap || !card) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = wrap.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rotateY = (px - 0.5) * 22;
    const rotateX = (0.5 - py) * 22;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    card.style.setProperty("--sheen-x", `${px * 100}%`);
    card.style.setProperty("--sheen-y", `${py * 100}%`);
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
  }, []);

  return (
    <div
      ref={wrapRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group mx-auto w-full max-w-[340px] [perspective:1200px]"
    >
      <div
        ref={cardRef}
        className="relative aspect-[5/7] rounded-2xl transition-transform duration-300 ease-out will-change-transform [transform-style:preserve-3d]"
        style={{
          background: "linear-gradient(160deg, #0f1b33 0%, #1b2a4c 55%, #24365f 100%)",
          boxShadow: "0 30px 60px -20px rgba(10, 16, 32, 0.55), 0 10px 24px -12px rgba(10, 16, 32, 0.4)",
        }}
      >
        {/* Spine shadow along the left edge. */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-3 rounded-l-2xl"
          style={{ background: "linear-gradient(90deg, rgba(0,0,0,0.35), transparent)" }}
          aria-hidden
        />
        {/* Page edge along the right side. */}
        <div
          className="pointer-events-none absolute inset-y-1 -right-[5px] w-[6px] rounded-r-md"
          style={{
            background:
              "repeating-linear-gradient(180deg, #efe8d8 0px, #efe8d8 2px, #ddd4bd 2px, #ddd4bd 3px)",
          }}
          aria-hidden
        />
        {/* Cursor-following sheen. */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(circle at var(--sheen-x, 50%) var(--sheen-y, 30%), rgba(255,255,255,0.16), transparent 55%)",
          }}
          aria-hidden
        />

        <div className="relative flex h-full flex-col p-6 sm:p-8">
          <div className="flex items-center justify-between text-[10px] font-semibold tracking-[0.18em] uppercase" style={{ color: "#8093bd" }}>
            <span>DeosAI Labs</span>
            <span>Forward Deployed</span>
          </div>

          <div className="mt-8 flex flex-1 items-center justify-center">
            <svg viewBox="0 0 160 90" className="h-auto w-full max-w-[220px]" role="img" aria-label="Three connected workflow nodes">
              <g fill="none" stroke="#5b76ab" strokeWidth="1.2" opacity="0.7">
                <line x1="30" y1="45" x2="80" y2="20" />
                <line x1="80" y1="20" x2="130" y2="45" />
                <line x1="30" y1="45" x2="80" y2="70" />
                <line x1="80" y1="70" x2="130" y2="45" />
              </g>
              {[
                [30, 45],
                [80, 20],
                [130, 45],
                [80, 70],
              ].map(([cx, cy], i) => (
                <rect
                  key={i}
                  x={cx - 12}
                  y={cy - 9}
                  width="24"
                  height="18"
                  rx="4"
                  fill="none"
                  stroke="#9fb6ef"
                  strokeWidth="1.2"
                />
              ))}
              <circle cx="80" cy="45" r="3" fill="#9fb6ef" />
            </svg>
          </div>

          <div
            className="flex items-center gap-3 border-t pt-3 text-[9px] font-semibold tracking-[0.16em] uppercase"
            style={{ borderColor: "rgba(255,255,255,0.12)", color: "#7186ae" }}
          >
            <span>Map</span>
            <span aria-hidden>&middot;</span>
            <span>Build</span>
            <span aria-hidden>&middot;</span>
            <span>Deploy</span>
          </div>

          <h2 className="mt-4 text-2xl leading-[1.05] font-bold tracking-tight sm:text-3xl">
            <span style={{ color: "#f4f7fc" }}>The Forward Deployment</span>{" "}
            <span style={{ color: "#9fb6ef" }}>Playbook</span>
          </h2>

          <p className="mt-3 text-xs leading-relaxed" style={{ color: "#a6b4d4" }}>
            A workflow-by-workflow, industry-by-industry guide to where Digital FTEs belong inside
            the operations you already run.
          </p>

          <p className="mt-4 text-[10px] tracking-wide" style={{ color: "#5b6c92" }}>
            book.deosailabs.com
          </p>
        </div>
      </div>
    </div>
  );
}
