"use client";

import * as React from "react";
import Image from "next/image";
import { CardWrapper } from "../ui/CardWrapper";

export interface IconTextCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Шлях до SVG/іконки у `public/` */
  iconSrc: string;
  iconAlt?: string;
  /** Текст картки (Gilroy-Regular, 18px mobile / 24px tablet+) */
  children: React.ReactNode;
  /** Padding CardWrapper (за замовчуванням як у FutureIsHere: 16px mobile, 32px tablet+) */
  paddingClassName?: string;
  /** Ширина CardWrapper */
  widthClassName?: string;
  /** Відступ між іконкою та текстом (за замовчуванням gap-6 = 24px) */
  contentGapClassName?: string;
}

/**
 * Картка з іконкою 32×32 та текстом на сірому фоні (CardWrapper).
 * Використовується в FutureIsHere, PrecisionQuality та ін.
 */
export function IconTextCard({
  iconSrc,
  iconAlt = "",
  children,
  paddingClassName = "p-4 min-[768px]:p-8",
  widthClassName = "w-full",
  /** 16px між іконкою та текстом (перебиває gap CardWrapper) */
  contentGapClassName = "!gap-4",
  className = "",
  ...props
}: IconTextCardProps) {
  return (
    <CardWrapper
      paddingClassName={paddingClassName}
      widthClassName={widthClassName}
      className={[contentGapClassName, className].filter(Boolean).join(" ")}
      {...props}
    >
      <div className="flex h-[32px] w-[32px] shrink-0 items-center justify-center">
        <Image src={iconSrc} alt={iconAlt} width={32} height={32} />
      </div>
      <p
        className="text-[18px] font-normal leading-normal text-[var(--Black,#141414)] min-[768px]:text-[24px]"
        style={{
          fontFamily: "Gilroy-Regular, Gilroy, ui-sans-serif, system-ui, sans-serif",
        }}
      >
        {children}
      </p>
    </CardWrapper>
  );
}
