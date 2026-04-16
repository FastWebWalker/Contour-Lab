"use client";

import * as React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { SliderNavButtons } from "../ui/SliderNavButtons";
import { Title } from "../ui/Title";
import {
  fadeUpVariants,
  fadeUpCardVariants,
  staggerGridVariants,
  sectionViewport,
} from "@/lib/motion";

const GAP_PX = 24;

const TESTIMONIAL_AVATARS = [
  "/ourClients/anatolyi.png",
  "/ourClients/Natalia.jpg",
  "/ourClients/Ivan.jpeg",
] as const;

/** Розміри крапок пагінації зліва направо: 14 → 12 → 9 px */
const DOT_SIZES_PX = [14, 12, 9] as const;

function TestimonialCard({
  name,
  role,
  quote,
  avatar,
  reduced,
}: {
  name: string;
  role: string;
  quote: string;
  avatar: string;
  reduced: boolean;
}) {
  return (
    <motion.article
      variants={fadeUpCardVariants(reduced)}
      className="flex w-[min(520px,calc(100vw-2rem))] max-w-full shrink-0 flex-col items-start gap-2.5 self-stretch rounded-[30px] bg-[#F2F2F2] py-8 px-4 min-[1440px]:w-[min(640px,calc((100vw-120px-24px)/2))]"
    >
      <div className="flex w-full flex-col items-start gap-6 self-stretch">
        <div className="flex w-full items-start gap-4">
          <div className="relative h-[63px] w-[63px] shrink-0 overflow-hidden rounded-full bg-[lightgray]">
            <Image
              src={avatar}
              alt=""
              fill
              className="object-cover"
              sizes="63px"
            />
          </div>
          <div className="flex min-w-0 flex-1 flex-col items-start gap-0.5">
            <h3
              className="text-[28px] font-normal leading-normal text-[var(--Black,#141414)]"
              style={{
                fontFamily: "Gilroy-Medium, Gilroy, ui-sans-serif, system-ui, sans-serif",
              }}
            >
              {name}
            </h3>
            <p
              className="text-[16px] font-normal leading-normal"
              style={{
                color: "var(--color-grey-hard, #555)",
                fontFamily: "var(--font-inter), Inter, sans-serif",
              }}
            >
              {role}
            </p>
          </div>
        </div>
        <p
          className="text-[20px] font-normal leading-normal text-[var(--Black,#141414)]"
          style={{
            fontFamily: "var(--font-inter), Inter, sans-serif",
          }}
        >
          {quote}
        </p>
      </div>
    </motion.article>
  );
}

export interface WhatOurClientsSaySectionProps
  extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

export function WhatOurClientsSaySection({
  children,
  className = "",
  ...props
}: WhatOurClientsSaySectionProps) {
  const t = useTranslations("whatClientsSay");
  const tCommon = useTranslations("common");
  const reduced = useReducedMotion() ?? false;
  const rawTestimonials = t.raw("testimonials") as {
    name: string;
    role: string;
    quote: string;
  }[];
  const testimonials = rawTestimonials.map((item, i) => ({
    ...item,
    avatar: TESTIMONIAL_AVATARS[i] ?? TESTIMONIAL_AVATARS[0],
  }));

  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [cardStepPx, setCardStepPx] = React.useState(520 + GAP_PX);
  const n = testimonials.length;
  const canGoPrev = activeIndex > 0;
  const canGoNext = activeIndex < n - 1;

  React.useLayoutEffect(() => {
    const root = scrollRef.current;
    if (!root) return;

    const measure = () => {
      const first = root.querySelector("article");
      if (!first) return;
      const w = first.getBoundingClientRect().width;
      setCardStepPx(w + GAP_PX);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(root);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  React.useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ left: activeIndex * cardStepPx, behavior: "smooth" });
  }, [activeIndex, cardStepPx]);

  const goPrev = () => setActiveIndex((i) => Math.max(0, i - 1));
  const goNext = () => setActiveIndex((i) => Math.min(n - 1, i + 1));

  return (
    <section
      aria-label={t("aria")}
      className={["w-full", className].filter(Boolean).join(" ")}
      {...props}
    >
      <div className="mx-auto flex w-full min-w-0 flex-col items-stretch gap-10 px-4 pb-0 pt-12 min-[768px]:px-8 min-[768px]:pt-16 min-[1440px]:px-[60px] min-[1440px]:pt-[80px]">
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
            {t("title")}
          </Title>
          <SliderNavButtons
            canGoPrev={canGoPrev}
            canGoNext={canGoNext}
            onPrev={goPrev}
            onNext={goNext}
            navAriaLabel={tCommon("sliderNav")}
            className="shrink-0"
          />
        </motion.div>

        {children}

        <div className="relative w-full min-w-0">
          <motion.div
            ref={scrollRef}
            className="flex w-full min-w-0 gap-6 self-stretch overflow-x-auto overflow-y-hidden pb-4 scroll-smooth md:pb-0"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            variants={staggerGridVariants(reduced)}
            initial="hidden"
            whileInView="visible"
            viewport={sectionViewport({ amount: 0.3 })}
          >
            {testimonials.map((item) => (
              <TestimonialCard key={item.name} {...item} reduced={reduced} />
            ))}
          </motion.div>
        </div>

        <motion.div
          className="flex items-center justify-center gap-3 pb-12 min-[768px]:pb-16 min-[1440px]:pb-[80px]"
          role="group"
          aria-label={t("slidesAria")}
          variants={fadeUpVariants(reduced)}
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport({ amount: 0.3 })}
        >
          {testimonials.map((_, i) => {
            const size = DOT_SIZES_PX[i] ?? 10;
            const active = i === activeIndex;
            return (
              <button
                key={i}
                type="button"
                aria-current={active ? "true" : undefined}
                aria-label={t("slide", { n: i + 1 })}
                className="rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-red-main)] focus:ring-offset-2"
                style={{
                  width: size,
                  height: size,
                  backgroundColor: active
                    ? "var(--color-black, #141414)"
                    : "var(--color-grey, #939393)",
                  opacity: active ? 1 : 0.45,
                }}
                onClick={() => setActiveIndex(i)}
              />
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
