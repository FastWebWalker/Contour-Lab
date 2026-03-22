"use client";

import * as React from "react";
import Image from "next/image";
import { Container } from "./ui/Container";
import { Title } from "./ui/Title";
import { Button } from "./ui/Button";

const GALLERY_IMAGE = "/ourGallery/9005740cff7caa1d778c6ce31b0f337954155580.png";

export interface OurGallerySectionProps
  extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

export function OurGallerySection({
  children,
  className = "",
  ...props
}: OurGallerySectionProps) {
  return (
    <section
      aria-label="Наша галерея"
      className={["py-8 md:py-12 lg:py-16", className].filter(Boolean).join(" ")}
      {...props}
    >
      <Container>
        <div
          className="relative flex flex-col gap-8 overflow-hidden rounded-[30px] bg-[linear-gradient(100deg,#AD1B24_26.12%,#E99C9C_48.62%,#A2030D_77.87%)] px-6 py-6 text-white md:flex-row md:items-stretch md:gap-[73px] md:px-10 md:py-9"
        >
          {/* Left: image block */}
          <div
            className="w-full aspect-[665/499] rounded-[24px] md:rounded-[30px] md:basis-[56%]"
            style={{
              backgroundImage: `url(${GALLERY_IMAGE})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "-114.537px -154.12px",
              backgroundSize: "164.863% 146.276%",
              backgroundColor: "lightgray",
            }}
          />

          {/* Right: text + button */}
          <div className="flex flex-1 flex-col items-start gap-8 md:gap-10 self-stretch">
            <div className="flex flex-col items-start gap-[8px] md:gap-[16px] lg:gap-[40px] md:max-w-[420px] lg:max-w-[480px]">
              <Title
                as="h2"
                className="text-white"
                style={{
                  color: "#ffffff",
                  fontFamily:
                    "Gilroy-Medium, Gilroy, ui-sans-serif, system-ui, sans-serif",
                }}
              >
                Галерея
              </Title>
              <p
                className="text-[20px] w-full font-normal leading-normal"
                style={{
                  color: "rgba(255, 255, 255, 0.85)",
                  fontFamily: "var(--font-inter), Inter, sans-serif",
                }}
              >
                Дізнайтеся більше про нашу роботу та візуальне сприйняття,
                переглянувши нашу галерею робіт.
              </p>
            </div>

            <Button
              variant="secondary"
              size="md"
              className="mt-auto h-auto rounded-[40px] border-none bg-white px-6 py-3 gap-[6px] text-[18px] font-normal text-[var(--color-black)]"
              rightIcon={
                <Image
                  src="/ourServices/arrow-right.svg"
                  alt=""
                  width={36}
                  height={36}
                  className="h-[36px] w-[36px] text-[var(--color-black)]"
                />
              }
            >
              Переглянути галерею
            </Button>

            {children}
          </div>

          {/* Декоративні крапки: mobile/tablet — left/top, desktop — right/bottom */}
          <Image
            src="/ourGallery/gallery-dots.svg"
            alt=""
            width={194}
            height={68}
            className="pointer-events-none select-none absolute z-10 h-[33.338px] w-[101.004px] left-[193.996px] top-[152px] min-[768px]:h-[67.6px] min-[768px]:w-[194px] min-[768px]:left-[486px] min-[768px]:top-[166px] min-[768px]:right-auto min-[768px]:bottom-auto min-[1024px]:left-auto min-[1024px]:top-auto min-[1024px]:right-[-100px] min-[1024px]:bottom-[85px] min-[1024px]:h-[158px] min-[1024px]:w-[453px]"
          />
        </div>
      </Container>
    </section>
  );
}

