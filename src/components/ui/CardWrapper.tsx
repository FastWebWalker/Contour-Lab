"use client";

import * as React from "react";

const baseClassName =
  "flex flex-col items-start gap-2.5 self-stretch rounded-[30px] bg-[var(--Grey-Light,#F6F6F6)]";

export interface CardWrapperProps extends React.HTMLAttributes<HTMLElement> {
  /** Тег обгортки (article — для карток у слайдерах тощо). */
  as?: "div" | "article";
  /** Класи padding (за замовчуванням 32px — `p-8`). */
  paddingClassName?: string;
  /** Класи ширини (за замовчуванням `w-[424px] max-w-full shrink-0`). */
  widthClassName?: string;
  children: React.ReactNode;
}

/**
 * Універсальна сіра картка: flex, gap 10px, radius 30px, Grey-Light.
 * Ширина та padding задаються через `widthClassName` / `paddingClassName`.
 */
export const CardWrapper = React.forwardRef<HTMLElement, CardWrapperProps>(
  function CardWrapper(
    {
      as: Component = "div",
      paddingClassName = "p-8",
      widthClassName = "w-[424px] max-w-full shrink-0",
      className = "",
      children,
      ...props
    },
    ref
  ) {
    const merged = [baseClassName, paddingClassName, widthClassName, className]
      .filter(Boolean)
      .join(" ");
    return (
      <Component ref={ref as never} className={merged} {...props}>
        {children}
      </Component>
    );
  }
);

CardWrapper.displayName = "CardWrapper";
