import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Persistent primary-color halo, same glow language as the hero search bar,
 * industry scatter cards, and timeline steps — ambient at rest, brighter on
 * hover. Overrides Card's default border/shadow via twMerge, so pass after
 * any other className.
 */
export const glowCardClass =
  "border-primary/30 shadow-[0_0_0_1px_color-mix(in_srgb,var(--primary)_16%,transparent),0_0_16px_-4px_color-mix(in_srgb,var(--primary)_40%,transparent)] hover:border-primary/60 hover:shadow-[0_0_0_2px_color-mix(in_srgb,var(--primary)_26%,transparent),0_0_28px_-2px_color-mix(in_srgb,var(--primary)_60%,transparent),0_12px_32px_-16px_rgba(0,0,0,0.25)]";
