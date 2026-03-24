"use client";

import * as React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

const arrowButtonClass =
  "flex h-[44px] w-[44px] sm:h-[104px] sm:w-[105px] shrink-0 items-center justify-center rounded-full border-[0.5px] p-2 sm:p-8 transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--color-red-main)] focus:ring-offset-2 disabled:opacity-60";

export interface SliderNavButtonsProps extends React.HTMLAttributes<HTMLDivElement> {
  canGoPrev: boolean;
  canGoNext: boolean;
  onPrev: () => void;
  onNext: () => void;
  /** aria-label для групи */
  navAriaLabel?: string;
}

/**
 * Круглі стріarrows prev/next. На мобілці 44px, на десктопі 104px.
 */
export function SliderNavButtons({
  canGoPrev,
  canGoNext,
  onPrev,
  onNext,
  navAriaLabel: navAriaLabelProp,
  className = "",
  ...props
}: SliderNavButtonsProps) {
  const t = useTranslations("common");
  const navAriaLabel = navAriaLabelProp ?? t("sliderNav");
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
        aria-label={t("prev")}
        disabled={!canGoPrev}
        onClick={onPrev}
      >
        <div className="relative h-[20px] w-[20px] sm:h-[54px] sm:w-[54px]">
          <Image
            src="/ourTeam/arrow-prev.svg"
            alt=""
            fill
            className="shrink-0"
            style={{ transform: "rotate(90deg)" }}
          />
        </div>
      </button>
      <button
        type="button"
        className={`${arrowButtonClass} border-[var(--color-red-purple)] bg-transparent`}
        style={{
          borderColor: "var(--color-red-purple, #B81B3A)",
          transform: "rotate(-90deg)",
        }}
        aria-label={t("next")}
        disabled={!canGoNext}
        onClick={onNext}
      >
        <div className="relative h-[20px] w-[20px] sm:h-[54px] sm:w-[54px]">
          <Image
            src="/ourTeam/arrow-next.svg"
            alt=""
            fill
            className="shrink-0"
            style={{ transform: "rotate(90deg)" }}
          />
        </div>
      </button>
    </div>
  );
}
