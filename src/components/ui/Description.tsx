"use client";

import * as React from "react";

/** Display 1 / Display 4: Inter, rgba(20,20,20,0.85). Mobile 16px, tablet+ 20px. */
const baseStyle: React.CSSProperties = {
  color: "rgba(20, 20, 20, 0.85)",
  fontFamily: "var(--font-inter), Inter, sans-serif",
  fontStyle: "normal",
  fontWeight: 400,
};

const descriptionClassName =
  "text-[16px] font-normal leading-normal min-[768px]:text-[18px]";

export interface DescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  as?: "p" | "span" | "div";
  children: React.ReactNode;
}

export const Description = React.forwardRef<HTMLParagraphElement, DescriptionProps>(
  function Description(
    { as: Component = "p", className = "", style, children, ...props },
    ref
  ) {
    return (
      <Component
        ref={ref as React.Ref<HTMLParagraphElement & HTMLSpanElement & HTMLDivElement>}
        className={[descriptionClassName, className].filter(Boolean).join(" ")}
        style={{ ...baseStyle, ...style }}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Description.displayName = "Description";
