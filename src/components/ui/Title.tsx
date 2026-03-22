"use client";

import * as React from "react";

/** Базові стилі H2: колір, align-self, Gilroy-Medium (вага задається класами) */
const h2BaseStyle: React.CSSProperties = {
  alignSelf: "stretch",
  color: "var(--Black, #141414)",
  fontStyle: "normal",
  fontFamily: "Gilroy-Medium, Gilroy, ui-sans-serif, system-ui, sans-serif",
};

/**
 * Mobile (<768px): 32px, bold. Tablet+: 52px / 55px, font-weight 400.
 */
const h2ClassName =
  "text-[32px] font-normal leading-normal min-[768px]:text-[52px] min-[768px]:font-normal min-[768px]:leading-[55px]";

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
