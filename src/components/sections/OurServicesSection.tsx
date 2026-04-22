"use client";

import * as React from "react";
import Image from "next/image";
import { ArrowRightIcon } from "../icons/ArrowRight";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { CardWrapper } from "../ui/CardWrapper";
import { Container } from "../ui/Container";
import { Description } from "../ui/Description";
import { Title } from "../ui/Title";
import {
  fadeUpVariants,
  sectionViewport,
  motionConfig,
  MOTION_EASE,
} from "@/lib/motion";

const RED_DOT = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="9"
    height="9"
    viewBox="0 0 9 9"
    fill="none"
    className="shrink-0 mt-[0.4em]"
    aria-hidden
  >
    <circle cx="4.5" cy="4.5" r="4.5" fill="var(--color-red-main, #B9040F)" />
  </svg>
);

export interface OurServicesSectionProps
  extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

const CARD_WIDTH = 424;
// ВАЖЛИВО: має збігатися з gap-[24px] у контейнері слайдера
const GAP = 24;
const CARD_STEP = CARD_WIDTH + GAP;
const SETS_COUNT = 1; // один набір карток, цикл за індексом

function ServiceCard({
  title,
  items,
}: { title: string; items: string[] }) {
  return (
    <CardWrapper
      as="article"
      widthClassName="shrink-0 max-[767px]:max-w-none max-[767px]:w-[calc((100%-24px)/1.1)] min-[768px]:w-[424px] min-[768px]:max-w-full"
    >
      <Title as="h3" variant="h3" className="max-w-[337px]">
        {title}
      </Title>
      <span className="h-[0.5px] w-full bg-[var(--color-grey)] my-[16px] sm:my-[24px]"></span>
      <ul className="flex flex-col gap-2.5">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-[16px] max-w-[341px] text-[16px] font-normal leading-normal text-[#000]"
            style={{
              fontFamily: "var(--font-inter), Inter, sans-serif",
            }}
          >
            {RED_DOT}
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </CardWrapper>
  );
}

export function OurServicesSection({
  children,
  className = "",
  ...props
}: OurServicesSectionProps) {
  const t = useTranslations("ourServices");
  const reduced = useReducedMotion() ?? false;
  const services = t.raw("services") as { title: string; items: string[] }[];
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = React.useState(0);

  // Позиціонуємо вікно так, щоб зліва завжди була ціла активна картка.
  React.useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const target = activeIndex * CARD_STEP;
    el.scrollTo({ left: target, behavior: "smooth" });
  }, [activeIndex]);

  const handleArrowClick = () => {
    setActiveIndex((prev) => (prev + 1) % services.length);
  };

  return (
    <section
      aria-label={t("titleHeading")}
      className={["py-8 md:py-12 lg:py-16", className, "relative z-20 isolate overflow-x-hidden overflow-y-auto"].filter(Boolean).join(" ")}
      {...props}
    >
       <Image
          src="/logo-big.svg"
          alt=""
          width={436}
          height={960}
          aria-hidden
          className="pointer-events-none absolute right-[-44.577px] top-0 -z-10 h-[303.71px] w-[179.577px] md:right-[-87.538px] md:top-0 md:bottom-auto md:h-[727px] md:w-[404.538px] lg:left-[-98px] lg:top-0 lg:right-auto lg:bottom-auto lg:h-[959.658px] lg:w-[534px] lg:-translate-y-[30%]"
        />
      <Container className="relative z-10 flex flex-col gap-6 md:gap-8 md:mb-[40px] mb-[32px]">
        <motion.div
          className="flex w-full min-w-0 flex-col gap-6 self-stretch sm:flex-row sm:items-center sm:justify-between sm:gap-6"
          variants={fadeUpVariants(reduced)}
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport({ amount: 0.3 })}
        >
          <Title
            as="h2"
          >
            {t("titleHeading")}
          </Title>
          <Description className="min-w-0 max-w-[60ch]">
            {t("description")}
          </Description>
        </motion.div>
        {children}
      </Container>

      {/* Слайдер без контейнера: від лівого margin до кінця екрану справа */}
      <motion.div
        className="relative w-full overflow-visible"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={sectionViewport({ amount: 0.1 })}
        transition={{
          duration: reduced ? 0 : motionConfig.duration.base,
          ease: MOTION_EASE,
        }}
      >
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto overflow-y-hidden px-4 pb-4 scroll-smooth min-[768px]:px-8 min-[1440px]:px-[80px] md:gap-[24px] md:pb-0"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {Array.from({ length: SETS_COUNT }, (_, setIndex) =>
            services.map(({ title, items }) => (
              <ServiceCard
                key={`${title}-${setIndex}`}
                title={title}
                items={items}
              />
            ))
          )}
        </div>

        <motion.button
          type="button"
          onClick={handleArrowClick}
          className="absolute right-[57px] bottom-[-50px] hidden h-[119px] w-[119px] shrink-0 items-center justify-center rounded-[59.5px] border-[0.5px] border-[var(--color-red-purple)] bg-transparent cursor-pointer p-8 transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--color-red-main)] focus:ring-offset-2 min-[768px]:flex"
          aria-label={t("nextSlide")}
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={sectionViewport({ amount: 0.5 })}
          transition={{
            duration: reduced ? 0 : motionConfig.duration.medium,
            delay: reduced ? 0 : 0.3,
            ease: MOTION_EASE,
          }}
        >
          <ArrowRightIcon className="h-[54px] w-[54px] shrink-0 text-[var(--color-red-main)]" size={54} />
        </motion.button>
      </motion.div>
    </section>
  );
}
