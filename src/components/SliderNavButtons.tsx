"use client";

import * as React from "react";
import Image from "next/image";

const arrowButtonClass =
  "flex h-[104px] w-[105px] shrink-0 items-center justify-center gap-2.5 rounded-[59.5px] border-[0.5px] p-8 transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--color-red-main)] focus:ring-offset-2 disabled:opacity-60";

export interface SliderNavButtonsProps extends React.HTMLAttributes<HTMLDivElement> {
  canGoPrev: boolean;
  canGoNext: boolean;
  onPrev: () => void;
  onNext: () => void;
  /** aria-label для групи */
  navAriaLabel?: string;
}

/**
 * Круглі стрілки prev/next (як у Our Team). Використовує `/ourTeam/arrow-prev.svg` та `arrow-next.svg`.
 */
export function SliderNavButtons({
  canGoPrev,
  canGoNext,
  onPrev,
  onNext,
  navAriaLabel = "Навігація слайдера",
  className = "",
  ...props
}: SliderNavButtonsProps) {
  return (
    <div
      className={["flex gap-2.5", className].filter(Boolean).join(" ")}
      aria-label={navAriaLabel}
      role="group"
      {...props}
    >
      <button
        type="button"
        className={`${arrowButtonClass} border-[var(--color-grey-hard)] bg-transparent`}
        style={{
          borderColor: "var(--color-grey-hard, #555)",
          transform: "rotate(-90deg)",
        }}
        aria-label="Попередній"
        disabled={!canGoPrev}
        onClick={onPrev}
      >
        <Image
          src="/ourTeam/arrow-prev.svg"
          alt=""
          width={54}
          height={54}
          className="h-[54px] w-[54px] shrink-0"
          style={{ transform: "rotate(90deg)" }}
        />
      </button>
      <button
        type="button"
        className={`${arrowButtonClass} border-[var(--color-red-purple)] bg-transparent`}
        style={{
          borderColor: "var(--color-red-purple, #B81B3A)",
          transform: "rotate(-90deg)",
        }}
        aria-label="Наступний"
        disabled={!canGoNext}
        onClick={onNext}
      >
        <Image
          src="/ourTeam/arrow-next.svg"
          alt=""
          width={54}
          height={54}
          className="h-[54px] w-[54px] shrink-0"
          style={{ transform: "rotate(90deg)" }}
        />
      </button>
    </div>
  );
}
