"use client";

import * as React from "react";

/** Базові стилі H2: колір, align-self, normal style */
const h2BaseStyle: React.CSSProperties = {
  color: "var(--Black, #141414)",
  fontStyle: "normal",
};

/**
 * Mobile (<768px): 32px / normal line-height / Gilroy-Medium.
 * Tablet+ (>=768px): 48px / 50px / Gilroy.
 */
const h2ClassName =
  "font-['Gilroy-Medium','Gilroy',ui-sans-serif,system-ui,sans-serif] text-[32px] font-normal leading-normal min-[768px]:font-['Gilroy',ui-sans-serif,system-ui,sans-serif] min-[768px]:text-[48px] min-[768px]:font-normal min-[768px]:leading-[50px]";

export interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  children: React.ReactNode;
  /** Варіант заголовка (поки що лише h2) */
  variant?: "h2";
}

export function Title({
  as: Component = "h2",
  variant = "h2",
  children,
  className = "",
  style,
  ...props
}: TitleProps) {
  const isH2 = variant === "h2";

  return (
    <Component
      className={isH2 ? `${h2ClassName} ${className}`.trim() : className}
      style={isH2 ? { ...h2BaseStyle, ...style } : style}
      {...props}
    >
      {children}
    </Component>
  );
}
