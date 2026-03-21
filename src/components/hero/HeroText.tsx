"use client";

import type { ReactNode } from "react";

/**
 * Hero headline — fluid typography: 320px viewport → 40px, 1440px → 110px (лінійна шкала).
 * Formula: 6.25vw + 20px (clamp 40px–110px).
 */

interface HeroTextProps {
  children: ReactNode;
}

export function HeroText({ children }: HeroTextProps) {
  return (
    <h1
      className="font-normal text-left w-full mb-[32px] md:mb-[32px] lg:mb-[56px]"
      style={{
        fontFamily: "var(--font-sans)",
        color: "var(--color-black)",
        fontSize: "clamp(40px, 6.25vw + 20px, 110px)",
        lineHeight: "0.91",
      }}
    >
      {children}
    </h1>
  );
}
