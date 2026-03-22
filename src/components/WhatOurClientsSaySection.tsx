"use client";

import * as React from "react";
import Image from "next/image";
import { SliderNavButtons } from "./ui/SliderNavButtons";
import { Title } from "./ui/Title";

const GAP_PX = 24;

const TESTIMONIALS: {
  name: string;
  role: string;
  quote: string;
  avatar: string;
}[] = [
    {
      name: "Анатолій В.",
      role: "Стоматолог",
      quote:
        "Я дуже задоволений якістю роботи Contour Laboratory! Робота завжди точна, естетична та виконана вчасно. Рекомендую її своїм колегам!",
      avatar: "/ourTeam/1305dad7f27e9190b33821e2cdc3d5e7d86dc645.jpg",
    },
    {
      name: "Наталія Х.",
      role: "Стоматолог",
      quote:
        'Привіт! Команда "Smile Energy" оперативна, мобільна, професійна… Бажаю Вам процвітання, розвитку, креативності, творчості!',
      avatar: "/ourTeam/1879ab55150dbe6bb5f3b324c17efc7655ea858c.jpg",
    },
    {
      name: "Іван В.",
      role: "Стоматолог",
      quote:
        "Відмінна якість! Чудова посадка, якісні матеріали. Щиро дякую! Пацієнти дуже задоволені результатами!",
      avatar: "/ourTeam/c9bd719131852d95e6b674a244d2f79fe7b3ae9f.jpg",
    },
  ];

/** Розміри крапок пагінації зліва направо: 14 → 12 → 9 px */
const DOT_SIZES_PX = [14, 12, 9] as const;

function TestimonialCard({
  name,
  role,
  quote,
  avatar,
}: (typeof TESTIMONIALS)[number]) {
  return (
    <article
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
    </article>
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
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [cardStepPx, setCardStepPx] = React.useState(520 + GAP_PX);
  const n = TESTIMONIALS.length;
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
      aria-label="Що кажуть наші клієнти"
      className={["w-full", className].filter(Boolean).join(" ")}
      {...props}
    >
      {/* Шапка (title + стрілки), слайдер і точки — на всю ширину секції (без max-width) */}
      <div className="mx-auto flex w-full min-w-0 flex-col items-stretch gap-10 px-4 pb-0 pt-12 min-[768px]:px-8 min-[768px]:pt-16 min-[1440px]:px-[60px] min-[1440px]:pt-[80px]">
        <div className="flex w-full min-w-0 flex-col gap-6 self-stretch sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <Title
            as="h2"
            className="w-full min-w-0 text-left sm:flex-1"
          >
            Що кажуть Наші Клієнти
          </Title>
          <SliderNavButtons
            canGoPrev={canGoPrev}
            canGoNext={canGoNext}
            onPrev={goPrev}
            onNext={goNext}
            className="shrink-0 self-start sm:self-auto"
          />
        </div>

        {children}

        <div className="relative w-full min-w-0">
          <div
            ref={scrollRef}
            className="flex w-full min-w-0 gap-6 self-stretch overflow-x-auto overflow-y-hidden pb-4 scroll-smooth md:pb-0"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {TESTIMONIALS.map((item) => (
              <TestimonialCard key={item.name} {...item} />
            ))}
          </div>
        </div>

        <div
          className="flex items-center justify-center gap-3 pb-12 min-[768px]:pb-16 min-[1440px]:pb-[80px]"
          role="group"
          aria-label="Слайди відгуків"
        >
          {TESTIMONIALS.map((_, i) => {
            const size = DOT_SIZES_PX[i] ?? 10;
            const active = i === activeIndex;
            return (
              <button
                key={i}
                type="button"
                aria-current={active ? "true" : undefined}
                aria-label={`Слайд ${i + 1}`}
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
        </div>
      </div>
    </section>
  );
}
