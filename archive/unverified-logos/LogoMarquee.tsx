/**
 * Deliberately unlabeled (no "trusted by" / "companies we work with"
 * heading) so the marquee reads as ambient motion, not a claimed client
 * roster. Indus Health is a real, named client (see stories.ts); the rest
 * are illustrative placeholders — swap for real logos as they're confirmed.
 *
 * The PNGs in /public/logos are pre-processed into alpha-only silhouettes
 * (background stripped, logo shape kept as alpha, color discarded) and
 * rendered here as CSS masks over `bg-muted`, so every logo picks up the
 * site's own muted color and adapts with the theme instead of keeping each
 * brand's own colors and background box.
 *
 * Each entry's box width matches its source PNG's own aspect ratio at a
 * shared 44px height, rather than a single fixed box for every logo — a
 * uniform box made squarer marks render smaller than wider ones under
 * `mask-size: contain`, since contain scales to the tighter of the two
 * dimensions. Arclight and Vantora's PNGs are pre-cropped to their opaque
 * content's bounding box (the whitespace the original artwork left around
 * the mark trimmed off) since those two specifically still read small at
 * the shared height even with a matched aspect ratio — the other four keep
 * their original, uncropped canvas and ratio. `scale` shrinks an individual
 * entry's box below the shared height (Indus Health's cropped mark reads
 * oversized next to the rest at full height).
 */
const LOGO_HEIGHT = 44;
const LOGOS = [
  { name: "Nexora Systems", src: "/logos/nexora-systems.png", ratio: 282 / 130 },
  { name: "Vantix Technologies", src: "/logos/vantix-technologies.png", ratio: 474 / 164 },
  { name: "Indus Health", src: "/logos/indus-health.png", ratio: 672 / 155, scale: 0.7 },
  { name: "Vantora Hypermarket", src: "/logos/vantora-hypermarket.png", ratio: 240 / 108 },
  { name: "Arclight Logistics", src: "/logos/arclight-logistics.png", ratio: 231 / 152 },
  { name: "Westfield Education System", src: "/logos/westfield-education.png", ratio: 412 / 114 },
];

export function LogoMarquee() {
  const track = [...LOGOS, ...LOGOS];

  return (
    <div className="logo-marquee-viewport overflow-hidden" aria-hidden>
      <div className="logo-marquee-track flex w-max items-center gap-16">
        {track.map((logo, index) => {
          const height = LOGO_HEIGHT * (logo.scale ?? 1);
          return (
            <span
              key={`${logo.name}-${index}`}
              className="shrink-0 bg-muted/70"
              style={{
                height,
                width: Math.round(height * logo.ratio),
                WebkitMaskImage: `url(${logo.src})`,
                maskImage: `url(${logo.src})`,
                WebkitMaskSize: "contain",
                maskSize: "contain",
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskPosition: "center",
                maskPosition: "center",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
