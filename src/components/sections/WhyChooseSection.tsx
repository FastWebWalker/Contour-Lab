"use client";

import * as React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { CardWrapper } from "../ui/CardWrapper";
import { Container } from "../ui/Container";
import { Title } from "../ui/Title";
import {
  fadeUpCardVariants,
  fadeUpVariants,
  heroTransition,
  motionConfig,
  staggerContainerVariants,
  staggerGridVariants,
} from "@/lib/motion";

/* Блок з основним зображенням та мініатюрами (Figma 139-999, 139-1002) */
const MAIN_IMAGE_SRC = "/whyChoose/main.png";
const SMALL_IMAGES_SRC = ["/whyChoose/1.png", "/whyChoose/2.png", "/whyChoose/3.png"];

const CARD_ICONS = [
  "/whyChoose/File_Edit.svg",
  "/whyChoose/Shield_Check.svg",
  "/whyChoose/Users.svg",
  "/whyChoose/Map_Pin.svg",
] as const;

export function WhyChooseImageBlock() {
  const reduced = useReducedMotion() ?? false;

  return (
    <motion.div
      className="mx-auto flex shrink-0 justify-end gap-2.5 rounded-[30px] p-8 w-full max-w-full aspect-[635/774] md:w-[635px] md:h-[774px] md:aspect-auto min-[1080px]:mx-0 min-[1080px]:w-[515px] min-[1080px]:h-[626px] min-[1220px]:w-[572px] min-[1220px]:h-[696px] min-[1440px]:w-[635px] min-[1440px]:h-[774px]"
      style={{
        backgroundImage: `url(${MAIN_IMAGE_SRC})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "0px -64.192px",
        backgroundSize: "100.316% 126.085%",
        backgroundColor: "lightgray",
      }}
      initial={reduced ? false : { opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{
        once: motionConfig.viewport.once,
        amount: motionConfig.viewport.media,
      }}
      transition={heroTransition({
        reduced,
        duration: motionConfig.duration.slower,
      })}
    >
      <div className="flex flex-col items-start gap-2.5">
        {SMALL_IMAGES_SRC.map((src, i) => (
          <motion.div
            key={src}
            className="relative h-[61px] w-[59px] shrink-0 overflow-hidden rounded-[15px] md:rounded-[30px] border border-[var(--color-grey)]/30 bg-[#e5e5e5] min-[768px]:h-[107px] min-[768px]:w-[102.603px]"
            style={{ aspectRatio: "59/61" }}
            initial={
              reduced ? false : { opacity: 0, x: motionConfig.offset.thumbX }
            }
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{
              once: motionConfig.viewport.once,
              amount: motionConfig.viewport.thumb,
            }}
            transition={heroTransition({
              reduced,
              duration: motionConfig.duration.thumbItem,
              delay:
                reduced ? 0 : motionConfig.delay.thumbBase + i * motionConfig.stagger.thumb,
            })}
          >
            <Image
              src={src}
              alt=""
              fill
              className="object-cover object-center"
              sizes="(max-width: 767px) 59px, 102.603px"
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export interface WhyChooseSectionProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

export function WhyChooseSection({
  children,
  className = "",
  ...props
}: WhyChooseSectionProps) {
  const t = useTranslations("whyChoose");
  const cards = t.raw("cards") as string[];
  const reduced = useReducedMotion() ?? false;

  const leftColumnVariants = staggerContainerVariants(reduced);

  const titleBlockVariants = fadeUpVariants(reduced);

  const gridVariants = staggerGridVariants(reduced);

  const cardItemVariants = fadeUpCardVariants(reduced);

  return (
    <section
      aria-label={t("aria")}
      className={["py-8 md:py-12 lg:py-10", className, "relative z-30"].filter(Boolean).join(" ")}
      {...props}
    >
      <Container
        className="relative z-10 grid grid-cols-1 items-start gap-6 md:gap-8 min-[1080px]:grid-cols-[minmax(0,1fr)_515px] min-[1080px]:gap-10 min-[1220px]:grid-cols-[minmax(0,1fr)_572px] min-[1440px]:grid-cols-[minmax(0,1fr)_635px]"
      >
        {/* Лівий блок: контент */}
        <motion.div
          className="flex min-w-0 flex-col gap-6 md:gap-8"
          initial={reduced ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{
            once: motionConfig.viewport.once,
            amount: motionConfig.viewport.section,
          }}
          variants={leftColumnVariants}
        >
          <motion.div variants={titleBlockVariants}>
            <Title as="h2">{t("title")}</Title>
          </motion.div>

          <motion.div variants={titleBlockVariants}>
            <CardWrapper paddingClassName="py-5 px-4" widthClassName="w-full min-w-0">
              <span
                className="self-stretch text-sm font-normal capitalize leading-normal"
                style={{
                  color: "rgba(0, 0, 0, 0.75)",
                  fontFamily: "var(--font-inter), Inter, sans-serif",
                }}
              >
                {t("missionLabel")}
              </span>
              <p
                className="self-stretch font-normal text-[var(--color-black)] text-[24px] leading-normal min-[768px]:text-[32px] min-[768px]:leading-[32px]"
                style={{ fontFamily: "Gilroy, ui-sans-serif, system-ui, sans-serif" }}
              >
                {t("missionBefore")}{" "}
                <strong
                  className="font-normal text-[var(--color-red-main)] text-[24px] leading-normal min-[768px]:text-[32px] min-[768px]:leading-[32px]"
                  style={{ fontFamily: "Gilroy, ui-sans-serif, system-ui, sans-serif" }}
                >
                  {t("missionStrong1")}
                </strong>{" "}
                {t("missionMiddle")}{" "}
                <strong
                  className="font-normal text-[var(--color-red-main)] text-[24px] leading-normal min-[768px]:text-[32px] min-[768px]:leading-[32px]"
                  style={{ fontFamily: "Gilroy, ui-sans-serif, system-ui, sans-serif" }}
                >
                  {t("missionStrong2")}
                </strong>
                .
              </p>
              <p
                className="self-stretch text-right text-base font-light leading-normal text-[var(--color-black)]"
                style={{
                  fontFamily: "var(--font-inter), Inter, sans-serif",
                }}
              >
                {t("ceo")}
              </p>
            </CardWrapper>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 gap-4 min-[1080px]:items-stretch"
            variants={gridVariants}
          >
            {cards.map((text, i) => {
              const icon = CARD_ICONS[i];
              return (
                <motion.div
                  key={icon}
                  variants={cardItemVariants}
                  className="min-h-0 min-[1080px]:flex min-[1080px]:h-full"
                >
                  <CardWrapper
                    paddingClassName="py-5 px-4"
                    widthClassName="w-full min-w-0"
                    className="min-[1080px]:h-full min-[1080px]:flex-1"
                  >
                    <Image
                      src={icon}
                      alt=""
                      width={32}
                      height={32}
                      className="h-6 w-6 shrink-0 min-[768px]:h-8 min-[768px]:w-8"
                    />
                    <span className="text-[18px] lg:text-[24px] leading-[var(--font-display-3-line)] text-[var(--color-black)] min-[768px]:text-[length:var(--font-display-3)]">
                      {text}
                    </span>
                  </CardWrapper>
                </motion.div>
              );
            })}
          </motion.div>

          {children}
        </motion.div>

        {/* Правий блок: фото з мініатюрами */}
        <WhyChooseImageBlock />
      </Container>
    </section>
  );
}
