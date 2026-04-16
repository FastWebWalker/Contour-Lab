"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { heroTransition, motionConfig } from "@/lib/motion";

/**
 * Hero headline — fluid typography: 320px viewport → 40px, 1440px → 110px (лінійна шкала).
 * Formula: 6.25vw + 20px (clamp 40px–110px).
 */

interface HeroTextProps {
  children: ReactNode;
}

export function HeroText({ children }: HeroTextProps) {
  const reduced = useReducedMotion() ?? false;

  return (
    <motion.h1
      className="font-medium text-left w-full mb-[32px] md:mb-[32px] lg:mb-[56px] leading-[1] md:leading-[0.91]"
      style={{
        fontFamily: "var(--font-sans)",
        color: "var(--color-black)",
        fontSize: "clamp(40px, 6.25vw + 20px, 110px)",
      }}
      initial={
        reduced ? false : { opacity: 0, y: motionConfig.offset.heroTitle }
      }
      animate={{ opacity: 1, y: 0 }}
      transition={heroTransition({
        reduced,
        duration: motionConfig.duration.heroTitle,
      })}
    >
      {children}
    </motion.h1>
  );
}
