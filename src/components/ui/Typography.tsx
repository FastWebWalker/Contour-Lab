import * as React from "react";

type TypographyVariant =
  | "headline-1"
  | "headline-2"
  | "headline-3"
  | "headline-4"
  | "display-1"
  | "display-2"
  | "display-3";

const variantStyles: Record<
  TypographyVariant,
  React.CSSProperties & { className: string }
> = {
  "headline-1": {
    fontSize: "var(--font-headline-1)",
    lineHeight: "var(--font-headline-1-line)",
    fontWeight: 700,
    color: "var(--color-black)",
    className: "font-bold",
  },
  "headline-2": {
    fontSize: "var(--font-headline-2)",
    lineHeight: "var(--font-headline-2-line)",
    fontWeight: 500,
    color: "var(--color-black)",
    className: "font-medium",
  },
  "headline-3": {
    fontSize: "var(--font-headline-3)",
    lineHeight: "var(--font-headline-3-line)",
    fontWeight: 500,
    color: "var(--color-black)",
    className: "font-medium",
  },
  "headline-4": {
    fontSize: "var(--font-headline-4)",
    lineHeight: "var(--font-headline-4-line)",
    fontWeight: 500,
    color: "var(--color-black)",
    className: "font-medium",
  },
  "display-1": {
    fontSize: "var(--font-display-1)",
    lineHeight: "var(--font-display-1-line)",
    fontWeight: 500,
    color: "var(--color-black)",
    className: "font-medium",
  },
  "display-2": {
    fontSize: "var(--font-display-2)",
    lineHeight: "var(--font-display-2-line)",
    fontWeight: 500,
    color: "var(--color-black)",
    className: "font-medium",
  },
  "display-3": {
    fontSize: "var(--font-display-3)",
    lineHeight: "var(--font-display-3-line)",
    fontWeight: 500,
    color: "var(--color-black)",
    className: "font-medium",
  },
};

export interface TypographyProps {
  variant: TypographyVariant;
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function Typography({
  variant,
  as: Component = "span",
  children,
  className = "",
  style,
}: TypographyProps) {
  const { className: variantClass, ...variantStyle } = variantStyles[variant];

  return (
    <Component
      className={`${variantClass} ${className}`.trim()}
      style={{ ...variantStyle, ...style }}
    >
      {children}
    </Component>
  );
}
