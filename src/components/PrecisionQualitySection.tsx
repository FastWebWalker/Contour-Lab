"use client";

import * as React from "react";
import { Container } from "./ui/Container";
import { Description } from "./ui/Description";
import { IconTextCard } from "./IconTextCard";
import { Title } from "./ui/Title";

const HERO_IMAGE = "/precisionQuality/6c36403f29cc1121686fe876472a122deef845c3.png";
const CARD_ICON = "/precisionQuality/Search_Magnifying_Glass.svg";

const SECTION_DESCRIPTION =
  "Ми впевнені в точності наших робіт, адже перевіряємо кожну роботу під мікроскопом: посадку, прилягання у конструкціях будь-якого типу.";

const CARD_TEXT =
  "Мікроскоп – це наша гарантія точності та ідеальної посадки, гарантія що лікар, як і його пацієнт, будуть задоволений роботою.";

export interface PrecisionQualitySectionProps
  extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

export function PrecisionQualitySection({
  children,
  className = "",
  ...props
}: PrecisionQualitySectionProps) {
  return (
    <section
      aria-label="Точність та контроль якості"
      className={["py-8 md:py-12 lg:py-16", className].filter(Boolean).join(" ")}
      {...props}
    >
      <Container>
        <div className="flex flex-col gap-4 min-[768px]:gap-8 min-[1024px]:flex-row min-[1024px]:items-stretch min-[1024px]:gap-[50px]">
          {/* Mobile: title → description → card → image. Desktop: image зліва, текст справа; колонки 50/50 без фіксованої ширини */}
          <div className="order-1 flex w-full min-w-0 flex-col items-start gap-6 min-[1024px]:order-2 min-[1024px]:min-w-0 min-[1024px]:flex-1 min-[1024px]:basis-0 min-[1024px]:shrink">
            <Title as="h2">Точність та контроль якості</Title>
            <Description className="w-full">{SECTION_DESCRIPTION}</Description>
            <IconTextCard
              iconSrc={CARD_ICON}
              paddingClassName="p-8"
              widthClassName="w-full"
            >
              {CARD_TEXT}
            </IconTextCard>
          </div>

          <div
            className="order-2 flex w-full min-h-[280px] min-w-0 flex-col items-start justify-end gap-2.5 rounded-[30px] bg-[lightgray] p-8 aspect-[635/507] min-[1024px]:order-1 min-[1024px]:min-h-0 min-[1024px]:flex-1 min-[1024px]:basis-0 min-[1024px]:shrink"
            style={{
              backgroundImage: `url(${HERO_IMAGE})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "50% 50%",
              backgroundSize: "cover",
            }}
          />
        </div>
        {children}
      </Container>
    </section>
  );
}
