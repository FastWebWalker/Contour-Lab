"use client";

import * as React from "react";
import Image from "next/image";
import { Container } from "./Container";
import { Title } from "./Title";

const DESCRIPTION =
  "Ми є вашим надійним партнером у виготовленні стоматологічних виробів. Ми створюємо функціональні та естетичні зубні протези, поєднуючи досвід, передові технології та індивідуальний підхід.";

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

const SERVICES: { title: string; items: string[] }[] = [
  {
    title: "Конструкції на гвинтовій фіксації",
    items: [
      "Постійна конструкція All on 4/6",
      "Цирконій на фрезерованій титановій балці (від рівня імплантатів, мультиблоків)",
      "Повноанатомічний цирконій",
      "Фрезерований титан (від рівня імплантатів, мультиюнітів) з композитним покриттям і зубами",
      "CoCr з керамічним покриттям",
      "Титанові, металеві Co-Cr та гібридні абатменти",
    ],
  },
  {
    title: "Безметалеві конструкції",
    items: [
      "Повна анатомічна реставрація All on 4/6",
      "Повна анатомічна реставрація (на імплантаті)",
      "Цирконій з керамічним покриттям",
      "Реставрація з використанням імплантатів",
      "Гібридна керамічна (композитна) реставрація",
      "Фрезерований дисилікат літію",
      "Індивідуальна робота ART",
    ],
  },
  {
    title: "CAD Моделювання і 3D Принтування",
    items: [
      "Моделюємо конструкції будь-якої складності",
      "Моделювання кукс та конструкцій на імплантатах",
      "Моделювання 3D-моделей, віск для вицвітання, тимчасові вироби, штучні ясна, бази, ковпачки/шаблони",
      "Вініри/фрезерований дисилікат літію",
    ],
  },
];

export interface OurServicesSectionProps
  extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

const CARD_WIDTH = 424;
const GAP = 10;
const CARD_STEP = CARD_WIDTH + GAP;
const SETS_COUNT = 3; // три копії для безкінечного скролу

function ServiceCard({
  title,
  items,
}: { title: string; items: string[] }) {
  return (
    <article
      className="flex w-[424px] shrink-0 flex-col items-start gap-2.5 rounded-[30px] bg-[var(--Grey-Light,#F6F6F6)] p-8"
    >
      <h3
        className="text-[36px] font-normal leading-[36px] text-[var(--color-black)]"
        style={{
          fontFamily: "Gilroy, ui-sans-serif, system-ui, sans-serif",
        }}
      >
        {title}
      </h3>
      <ul className="flex flex-col gap-2.5">
        {items.map((item) => (
          <li
            key={item}
            className="flex gap-2 text-[20px] font-normal leading-normal text-[#000]"
            style={{
              fontFamily: "var(--font-inter), Inter, sans-serif",
            }}
          >
            {RED_DOT}
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

export function OurServicesSection({
  children,
  className = "",
  ...props
}: OurServicesSectionProps) {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const setWidth = SERVICES.length * CARD_STEP;
  const isScrollingRef = React.useRef(false);

  const clampScroll = React.useCallback(() => {
    const el = scrollRef.current;
    if (!el || isScrollingRef.current) return;
    const { scrollLeft, scrollWidth } = el;
    const oneSet = setWidth;
    const maxScroll = oneSet * (SETS_COUNT - 1);
    if (scrollLeft >= oneSet * 2 - 20) {
      isScrollingRef.current = true;
      el.scrollLeft = oneSet;
      requestAnimationFrame(() => {
        isScrollingRef.current = false;
      });
    } else if (scrollLeft <= 20) {
      isScrollingRef.current = true;
      el.scrollLeft = oneSet * 2 - el.clientWidth;
      requestAnimationFrame(() => {
        isScrollingRef.current = false;
      });
    }
  }, [setWidth]);

  React.useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollLeft = setWidth;
  }, [setWidth]);

  React.useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handleScroll = () => clampScroll();
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [clampScroll]);

  const handleArrowClick = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: CARD_STEP, behavior: "smooth" });
    }
  };

  return (
    <section
      aria-label="Наші послуги"
      className={["py-8 md:py-12 lg:py-16", className].filter(Boolean).join(" ")}
      {...props}
    >
      <Container className="flex flex-col gap-6 md:gap-8">
        <div className="flex flex-col items-stretch justify-between gap-4 min-[768px]:flex-row min-[768px]:items-start min-[768px]:gap-8">
          <Title as="h2" className="min-w-0 shrink-0">
            Наші послуги
          </Title>
          <p
            className="min-w-0 max-w-[60ch] text-[20px] font-normal leading-normal"
            style={{
              color: "rgba(20, 20, 20, 0.85)",
              fontFamily: "var(--font-inter), Inter, sans-serif",
            }}
          >
            {DESCRIPTION}
          </p>
        </div>
        {children}
      </Container>

      {/* Слайдер без контейнера: від лівого margin до кінця екрану справа */}
      <div
        className="relative ml-4 w-[calc(100vw-16px)] min-[768px]:ml-8 min-[768px]:w-[calc(100vw-32px)] min-[1440px]:ml-[60px] min-[1440px]:w-[calc(100vw-60px)]"
      >
        <div
          ref={scrollRef}
          className="flex w-full gap-[10px] overflow-x-auto overflow-y-hidden pb-4 scroll-smooth md:pb-0"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {Array.from({ length: SETS_COUNT }, (_, setIndex) =>
            SERVICES.map(({ title, items }) => (
              <ServiceCard
                key={`${title}-${setIndex}`}
                title={title}
                items={items}
              />
            ))
          )}
        </div>

        <button
          type="button"
          onClick={handleArrowClick}
          className="absolute right-[57px] bottom-2 flex h-[119px] w-[119px] shrink-0 items-center justify-center rounded-[59.5px] border-[0.5px] border-[var(--color-red-purple)] bg-white p-8 transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--color-red-main)] focus:ring-offset-2"
          aria-label="Наступний слайд"
          style={{ transform: "rotate(-90deg)" }}
        >
          <Image
            src="/ourServices/arrow-right.svg"
            alt=""
            width={54}
            height={54}
            className="h-[54px] w-[54px]"
          />
        </button>
      </div>
    </section>
  );
}
