"use client";

import * as React from "react";

/** Той самий шейп, що й у OurGallerySection (`gallery-dots.svg`), залитий кольором. */
const GALLERY_DOTS_MASK = "url(/ourGallery/gallery-dots.svg)";

const dotsMaskStyle: React.CSSProperties = {
  backgroundColor: "#A4000A33",
  WebkitMaskImage: GALLERY_DOTS_MASK,
  maskImage: GALLERY_DOTS_MASK,
  WebkitMaskSize: "100% 100%",
  maskSize: "100% 100%",
  WebkitMaskRepeat: "no-repeat",
  maskRepeat: "no-repeat",
  WebkitMaskPosition: "center",
  maskPosition: "center",
};

export interface FormCardDotsDecorationProps {
  className?: string;
}

export function FormCardDotsDecoration({
  className = "",
}: FormCardDotsDecorationProps) {
  return (
    <div
      className={[
        "pointer-events-none select-none absolute z-10 h-[109.519px] w-[313.999px] left-[345.001px] bottom-[-18.519px]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={dotsMaskStyle}
      aria-hidden
    />
  );
}
