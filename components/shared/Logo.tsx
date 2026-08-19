import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

// Source wordmark is 265x120 (cropped to content); scaled to a fixed
// display height everywhere the logo appears.
const RATIO = 265 / 120;
const HEIGHT = 36;
const WIDTH = Math.round(HEIGHT * RATIO);

/**
 * Two pre-rendered variants swap by theme: the light-mode PNG keeps the
 * source's original black-on-transparent + brand blue, the dark-mode PNG
 * has the black text recolored to white (with the blue accent brightened
 * to match --primary in dark mode) so the wordmark stays legible on a dark
 * header/footer — a plain `dark:invert` would also flip the blue's hue.
 */
export function Logo({ className }: LogoProps) {
  return (
    <Link href="/" className={cn("inline-flex items-center", className)} aria-label="DeosAI Labs">
      <Image
        src="/logo/wordmark-light.png"
        alt="DeosAI Labs"
        width={WIDTH}
        height={HEIGHT}
        priority
        className="dark:hidden"
      />
      <Image
        src="/logo/wordmark-dark.png"
        alt="DeosAI Labs"
        width={WIDTH}
        height={HEIGHT}
        priority
        className="hidden dark:block"
      />
    </Link>
  );
}
