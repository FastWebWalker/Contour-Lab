"use client";

import * as React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Container } from "../ui/Container";
import { IconTextCard } from "../cards/IconTextCard";
import { Description } from "../ui/Description";
import { Title } from "../ui/Title";

const FUTURE_IMAGE = "/futureIsHere/1f0ee63fef39f6163a53b9f10627c496f2d7fdac.png";

const CARD_ICONS = ["/futureIsHere/Files.svg", "/futureIsHere/Edit_Pencil_01.svg"] as const;

export interface FutureIsHereSectionProps
  extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

export function FutureIsHereSection({
  children,
  className = "",
  ...props
}: FutureIsHereSectionProps) {
  const t = useTranslations("futureIsHere");
  const cardTexts = t.raw("cards") as string[];

  return (
    <section
      aria-label={t("aria")}
      className={["py-8 md:py-12 lg:py-16", className].filter(Boolean).join(" ")}
      {...props}
    >
      <Container>
        <div className="flex flex-col gap-[24px] min-[1024px]:flex-row min-[1024px]:items-stretch min-[1024px]:gap-12">
          {/* Left block */}
          <div className="flex min-w-0 w-full flex-1 flex-col items-stretch gap-6 min-[1024px]:min-w-0 min-[1024px]:basis-0">
            <Title as="h2">{t("title")}</Title>
            <Description className="w-full min-[1024px]:max-w-[624px]">
              {t("description")}
            </Description>
            <div className="flex w-full min-[1024px]:max-w-[624px] flex-col gap-2.5 rounded-[30px] p-0">
              <div className="flex w-full flex-col items-stretch gap-[10px] self-stretch">
                {cardTexts.map((text, i) => {
                  const icon = CARD_ICONS[i];
                  return (
                    <IconTextCard
                      key={icon}
                      iconSrc={icon}
                      paddingClassName="p-4 min-[768px]:p-8"
                      widthClassName="w-full"
                    >
                      {text}
                    </IconTextCard>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right block */}
          <div className="flex w-full min-w-0 justify-center min-[1024px]:min-w-0 min-[1024px]:flex-1 min-[1024px]:basis-0 min-[1024px]:shrink">
            <div className="flex w-full max-w-full flex-col items-center justify-center rounded-[30px] bg-[#F6F6F6] pt-[63.138px]">
              <div className="relative w-full aspect-[381/272]">
                <Image
                  src={FUTURE_IMAGE}
                  alt=""
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1023px) 100vw, (max-width: 1920px) 45vw, 900px"
                />
              </div>
            </div>
          </div>
        </div>
        {children}
      </Container>
    </section>
  );
}
