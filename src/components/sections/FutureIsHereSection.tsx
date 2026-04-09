"use client";

import * as React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "../ui/Container";
import { IconTextCard } from "../cards/IconTextCard";
import { Description } from "../ui/Description";
import { Title } from "../ui/Title";
import {
  fadeUpVariants,
  sectionViewport,
  sectionTransition,
  motionConfig,
  MOTION_EASE,
} from "@/lib/motion";

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
  const reduced = useReducedMotion() ?? false;
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
            <motion.div
              variants={fadeUpVariants(reduced)}
              initial="hidden"
              whileInView="visible"
              viewport={sectionViewport({ amount: 0.3 })}
            >
              <Title as="h2">{t("title")}</Title>
            </motion.div>

            <motion.div
              initial={reduced ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={sectionViewport({ amount: 0.3 })}
              transition={sectionTransition({
                reduced,
                duration: motionConfig.duration.sectionFadeUp,
                delay: 0.1,
              })}
            >
              <Description className="w-full min-[1024px]:max-w-[624px]">
                {t("description")}
              </Description>
            </motion.div>

            <div className="flex w-full min-[1024px]:max-w-[624px] flex-col gap-2.5 rounded-[30px] p-0">
              <div className="flex w-full flex-col items-stretch gap-[10px] self-stretch">
                {cardTexts.map((text, i) => {
                  const icon = CARD_ICONS[i];
                  return (
                    <motion.div
                      key={icon}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={sectionViewport({ amount: 0.2 })}
                      transition={{
                        duration: reduced ? 0 : motionConfig.duration.sectionCard,
                        delay: reduced ? 0 : 0.2 + i * 0.1,
                        ease: MOTION_EASE,
                      }}
                    >
                      <IconTextCard
                        iconSrc={icon}
                        paddingClassName="p-4 min-[768px]:p-8"
                        widthClassName="w-full"
                      >
                        {text}
                      </IconTextCard>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right block */}
          <motion.div
            className="flex w-full min-w-0 justify-center min-[1024px]:min-w-0 min-[1024px]:flex-1 min-[1024px]:basis-0 min-[1024px]:shrink"
            initial={reduced ? false : { opacity: 0, scale: 1.04 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={sectionViewport({ amount: motionConfig.viewport.media })}
            transition={sectionTransition({
              reduced,
              duration: motionConfig.duration.slow,
              delay: 0.15,
            })}
          >
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
          </motion.div>
        </div>
        {children}
      </Container>
    </section>
  );
}
