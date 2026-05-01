"use client";

import * as React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import {
  fadeUpCardVariants,
  fadeUpVariants,
  heroTransition,
  motionConfig,
  sectionViewport,
  staggerContainerVariants,
} from "@/lib/motion";
import { IconTextCard } from "../cards/IconTextCard";
import { Container } from "../ui/Container";
import { Description } from "../ui/Description";
import { Title } from "../ui/Title";

const HERO_IMAGE = "/precisionQuality/6c36403f29cc1121686fe876472a122deef845c3.png";
const CARD_ICON = "/precisionQuality/Search_Magnifying_Glass.svg";

export interface PrecisionQualitySectionProps
  extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

export function PrecisionQualitySection({
  children,
  className = "",
  ...props
}: PrecisionQualitySectionProps) {
  const t = useTranslations("precisionQuality");
  const reduced = useReducedMotion() ?? false;

  const textStagger = staggerContainerVariants(reduced);
  const lineVariants = fadeUpVariants(reduced);
  const cardVariants = fadeUpCardVariants(reduced);
  const s = motionConfig.stagger;
  const d = motionConfig.duration;
  const imageDelay = reduced
    ? 0
    : s.delayChildrenSection + 2 * s.sectionChildren + d.sectionCard * 0.35;

  return (
    <section
      aria-label={t("aria")}
      className={["py-8 md:py-12 lg:py-16", className, "relative isolate"].filter(Boolean).join(" ")}
      {...props}
    >
      <Image
        src="/logo-big.svg"
        alt=""
        width={534}
        height={960}
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-[500px] w-[280px] md:hidden lg:block lg:h-[960px] lg:w-[534px] opacity-100"
      />
      <Container>
        <div className="flex flex-col gap-4 min-[768px]:gap-8 min-[1024px]:flex-row min-[1024px]:items-stretch min-[1024px]:gap-[50px]">
          <motion.div
            className="order-1 flex w-full min-w-0 flex-col items-start justify-center gap-2 min-[768px]:gap-4 min-[1024px]:gap-6 min-[1024px]:order-2 min-[1024px]:min-w-0 min-[1024px]:flex-1 min-[1024px]:basis-0 min-[1024px]:shrink"
            initial={reduced ? "visible" : "hidden"}
            whileInView="visible"
            viewport={sectionViewport()}
            variants={textStagger}
          >
            <motion.div variants={lineVariants}>
              <Title as="h2">{t("title")}</Title>
            </motion.div>
            <motion.div variants={lineVariants}>
              <Description className="w-full">{t("p1")}</Description>
            </motion.div>
            <motion.div variants={cardVariants} className="w-full">
              <IconTextCard
                iconSrc={CARD_ICON}
                paddingClassName="p-8"
                widthClassName="w-full"
              >
                {t("p2")}
              </IconTextCard>
            </motion.div>
          </motion.div>

          <motion.div
            className="order-2 flex w-full min-h-[280px] min-w-0 flex-col items-start justify-end gap-2.5 overflow-hidden rounded-[30px] bg-[lightgray] p-8 aspect-[635/507] mt-2 min-[768px]:mt-4 min-[1024px]:mt-0 min-[1024px]:order-1 min-[1024px]:min-h-0 min-[1024px]:flex-1 min-[1024px]:basis-0 min-[1024px]:shrink"
            style={{
              backgroundImage: `url(${HERO_IMAGE})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "50% 50%",
              backgroundSize: "cover",
            }}
            initial={reduced ? false : { opacity: 0, scale: 1.05 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={sectionViewport()}
            transition={heroTransition({
              reduced,
              duration: 0.2,
              delay: imageDelay,
            })}
          />
        </div>
        {children}
      </Container>
    </section>
  );
}
