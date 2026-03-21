"use client";

import * as React from "react";
import Image from "next/image";
import { CardWrapper } from "./CardWrapper";
import { Container } from "./Container";
import { Title } from "./Title";

/* Блок з основним зображенням та мініатюрами (Figma 139-999, 139-1002) */
const MAIN_IMAGE_SRC = "/whyChoose/main.png";
const SMALL_IMAGES_SRC = ["/whyChoose/1.png", "/whyChoose/2.png", "/whyChoose/3.png"];

export function WhyChooseImageBlock() {
  return (
    <div
      className="mx-auto flex shrink-0 justify-end gap-2.5 rounded-[30px] p-8 w-full max-w-full aspect-[635/774] md:w-[635px] md:h-[774px] md:aspect-auto min-[1080px]:mx-0 min-[1080px]:w-[515px] min-[1080px]:h-[626px] min-[1220px]:w-[572px] min-[1220px]:h-[696px] min-[1440px]:w-[635px] min-[1440px]:h-[774px]"
      style={{
        backgroundImage: `url(${MAIN_IMAGE_SRC})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "0px -64.192px",
        backgroundSize: "100.316% 126.085%",
        backgroundColor: "lightgray",
      }}
    >
      <div className="flex flex-col items-start gap-2.5">
        {SMALL_IMAGES_SRC.map((src) => (
          <div
            key={src}
            className="relative h-[61px] w-[59px] shrink-0 overflow-hidden rounded-[15px] md:rounded-[30px] border border-[var(--color-grey)]/30 bg-[#e5e5e5] min-[768px]:h-[107px] min-[768px]:w-[102.603px]"
            style={{ aspectRatio: "59/61" }}
          >
            <Image
              src={src}
              alt=""
              fill
              className="object-cover object-center"
              sizes="(max-width: 767px) 59px, 102.603px"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

const cards: { icon: string; text: string }[] = [
  {
    icon: "/whyChoose/File_Edit.svg",
    text: "Досвід роботи зі складними випадками",
  },
  {
    icon: "/whyChoose/Shield_Check.svg",
    text: "3 роки гарантії на роботу",
  },
  {
    icon: "/whyChoose/Users.svg",
    text: "Визначення помилок в процесі витрат",
  },
  {
    icon: "/whyChoose/Map_Pin.svg",
    text: "Працюємо по всій Україні та ЄС",
  },
];

export interface WhyChooseSectionProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

export function WhyChooseSection({
  children,
  className = "",
  ...props
}: WhyChooseSectionProps) {
  return (
    <section
      aria-label="Чому варто обрати CONTOUR"
      className={["py-8 md:py-12 lg:py-16", className].filter(Boolean).join(" ")}
      {...props}
    >
      <Container
        className="grid grid-cols-1 items-start gap-6 md:gap-8 min-[1080px]:grid-cols-[minmax(0,1fr)_515px] min-[1080px]:gap-10 min-[1220px]:grid-cols-[minmax(0,1fr)_572px] min-[1440px]:grid-cols-[minmax(0,1fr)_635px]"
      >
        {/* Лівий блок: контент */}
        <div className="flex min-w-0 flex-col gap-6 md:gap-8">
          <Title as="h2">Чому варто обрати CONTOUR?</Title>

          <CardWrapper paddingClassName="py-5 px-4" widthClassName="w-full min-w-0">
            <span
              className="self-stretch text-sm font-normal capitalize leading-normal"
              style={{
                color: "rgba(0, 0, 0, 0.75)",
                fontFamily: "var(--font-inter), Inter, sans-serif",
              }}
            >
              Наша Місія
            </span>
            <p
              className="self-stretch font-normal text-[var(--color-black)] text-[24px] leading-normal min-[768px]:text-[36px] min-[768px]:leading-[36px]"
              style={{ fontFamily: "Gilroy, ui-sans-serif, system-ui, sans-serif" }}
            >
              Ми лікуємо багатьох пацієнтів протягом{" "}
              <strong
                className="font-normal text-[var(--color-red-main)] text-[24px] leading-normal min-[768px]:text-[36px] min-[768px]:leading-[36px]"
                style={{ fontFamily: "Gilroy, ui-sans-serif, system-ui, sans-serif" }}
              >
                усього
              </strong>{" "}
              їхнього життя. Ми надаємо поради, рекомендації, консультації та{" "}
              <strong
                className="font-normal text-[var(--color-red-main)] text-[24px] leading-normal min-[768px]:text-[36px] min-[768px]:leading-[36px]"
                style={{ fontFamily: "Gilroy, ui-sans-serif, system-ui, sans-serif" }}
              >
                допомогу
              </strong>
              .
            </p>
            <p
              className="self-stretch text-right text-base font-light leading-normal text-[var(--color-black)]"
              style={{
                fontFamily: "var(--font-inter), Inter, sans-serif",
              }}
            >
              —CEO, Сергій Грибовський
            </p>
          </CardWrapper>

          <div className="grid gap-4 grid-cols-2">
            {cards.map(({ icon, text }) => (
              <CardWrapper key={text} paddingClassName="py-5 px-4" widthClassName="w-full min-w-0">
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
            ))}
          </div>

          {children}
        </div>

        {/* Правий блок: фото з мініатюрами */}
        <WhyChooseImageBlock />
      </Container>
    </section>
  );
}
