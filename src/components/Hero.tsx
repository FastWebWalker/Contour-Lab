"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Description } from "./ui/Description";
import { Container } from "./ui/Container";
import { PrimaryButton } from "./ui/Button";
import { ArrowRightIcon } from "./icons/ArrowRight";
import { HeroText } from "./hero/HeroText";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface StatItem {
  value: string;
  label: string;
}

export interface HeroButton {
  label: string;
  href: string;
  variant: "primary" | "outline";
}

export interface SocialLink {
  href: string;
  src: string;
  label: string;
}

export interface HeroProps {
  /** Title content — pass JSX with <br/> and <span> for coloured words */
  titleContent: ReactNode;
  /** Subtitle / description text */
  subtitle: string;
  /** Path to background hero image */
  heroImage: string;
  /** Show CTA buttons */
  showButtons?: boolean;
  /** Buttons list (required when showButtons is true) */
  buttons?: HeroButton[];
  /** Show stats row */
  showStats?: boolean;
  /** Stats list (required when showStats is true) */
  stats?: StatItem[];
  /** Show social media icons */
  showSocialLinks?: boolean;
  /** Social links list (required when showSocialLinks is true) */
  socialLinks?: SocialLink[];
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function Hero({
  titleContent,
  subtitle,
  heroImage,
  showButtons = false,
  buttons = [],
  showStats = false,
  stats = [],
  showSocialLinks = false,
  socialLinks = [],
}: HeroProps) {
  return (
    <div className="m-5">
      <section
        className="relative min-h-[90vh] flex flex-col pt-[32px] md:pt-[40px] lg:pt-[146px]"
        style={{ backgroundColor: "var(--color-hero-bg)", borderRadius: "50px" }}
      >

        {/* 3D dental image — right bottom; mobile full-width, tablet 640×580, desktop 1100×800 */}
        <div
          className="absolute right-0 bottom-0 w-full aspect-[86/95] md:w-[640px] md:h-[580px] md:aspect-auto lg:w-[1100px] lg:h-[800px] z-10 pointer-events-none select-none"
          aria-hidden
        >
          <Image
            src={heroImage}
            alt=""
            fill
            className="object-contain object-right object-bottom mix-blend-lighten opacity-95"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 640px, 1100px"
            priority
          />
        </div>

        {/* Content */}
        <div className="relative flex-1 flex flex-col overflow-hidden min-h-0 pb-[32px] md:pb-[40px]">
          <div className="px-[8px] md:px-[16px] lg:px-[40px] z-[10]">
            {/* <Container className="relative z-10 flex-1 flex flex-col gap-10 lg:gap-8"> */}
            <HeroText>{titleContent}</HeroText>
            {/* Контент під заголовком: subtitle, CTAs, stats */}

            <div className="flex flex-col gap-6 lg:gap-8 w-full md:mb-[24px]">
              {/* Один ряд: лівий блок (description + кнопки), правий — social icons, space-between */}
              <div className="flex w-[100%] flex-col lg:flex-row lg:flex-wrap lg:justify-between items-start gap-4">
                <div className="flex flex-col gap-3">
                  <p
                    className="text-[16px] leading-normal lg:text-[20px] lg:max-w-[444px]"
                    style={{
                      color: "rgba(20, 20, 20, 0.85)",
                      fontFamily: "var(--font-inter)",
                    }}
                  >
                    {subtitle}
                  </p>
                  {showButtons && buttons.length > 0 && (
                    <div className="flex flex-wrap gap-3">
                      {buttons.map((btn) =>
                        btn.variant === "primary" ? (
                          <PrimaryButton key={btn.label} size="lg">
                            {btn.label}
                          </PrimaryButton>
                        ) : (
                          <Link
                            key={btn.label}
                            href={btn.href}
                            className="inline-flex items-center justify-center font-medium rounded-full h-14 px-8 text-[17px] gap-3.5 bg-white text-[var(--color-red-main)] border border-[var(--color-red-main)] hover:bg-[var(--color-red-main)] hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-red-main)] focus:ring-offset-2"
                            style={{ fontFamily: "var(--font-inter)" }}
                          >
                            {btn.label}
                            <ArrowRightIcon className="shrink-0" size={22} />
                          </Link>
                        )
                      )}
                    </div>
                  )}
                </div>
                {showSocialLinks && socialLinks.length > 0 && (
                  <div className="flex flex-row gap-2.5 shrink-0 md:flex-col lg:flex-col">
                    {socialLinks.map(({ href, src, label }) => (
                      <a
                        key={label}
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="flex w-12 h-12 shrink-0 items-center justify-center rounded-[30px] border-[0.5px] border-[var(--color-grey)] p-3 transition-opacity hover:opacity-90"
                        aria-label={label}
                      >
                        <Image src={src} alt="" width={24} height={24} className="shrink-0" />
                      </a>
                    ))}
                  </div>
                )}
              </div>
              {/* Statistics - full width row; NUMBER black, "+" red, DESCRIPTION grey. */}
              {showStats && stats.length > 0 && (
                <div className="flex w-full flex-row flex-wrap justify-between items-center gap-2">
                  {stats.map((stat) => (
                    <div key={stat.value} className="flex items-center gap-2">
                      <div>
                        <span
                          className="text-[28px] lg:text-[36px] font-normal leading-none"
                          style={{
                            color: "var(--color-black)",
                            fontFamily: "var(--font-sans)",
                          }}
                        >
                          {stat.value}
                        </span>
                        <span
                          className="text-[28px] lg:text-[36px] font-normal leading-none"
                          style={{
                            color: "var(--color-red-main)",
                            fontFamily: "var(--font-sans)",
                          }}
                        >
                          +
                        </span>
                      </div>
                      <span
                        className="text-[16px] lg:text-[20px] font-normal leading-normal max-w-[200px]"
                        style={{
                          color: "var(--color-grey-hard)",
                          fontFamily: "var(--font-inter)",
                        }}
                      >
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Spacer so content doesn't collide with image on large screens */}
              <div className="hidden lg:block flex-1 min-w-[4%]" />

            </div>
          </div>
          {/* </Container> */}

        </div>

        {/* Scroll indicator - за межами hero (нижня половина кола виходить за секцію), стрілка вниз */}
        <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-[35%] z-20 hidden lg:block">
          <a
            href="#content"
            className="flex w-[119px] h-[119px] shrink-0 items-center justify-center rounded-[59.5px] border-[0.5px] border-[var(--color-grey)] p-8 transition-opacity hover:opacity-90"
            aria-label="Прокрутити вниз"
          >
            <svg
              width={54}
              height={54}
              viewBox="0 0 54 54"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="shrink-0 rotate-360"
              aria-hidden
            >
              <path
                d="M28.125 42.75C28.125 43.3713 27.6213 43.875 27 43.875C26.3787 43.875 25.875 43.3713 25.875 42.75V11.25C25.875 10.6287 26.3787 10.125 27 10.125C27.6213 10.125 28.125 10.6287 28.125 11.25V42.75Z"
                fill="var(--color-grey-hard)"
              />
              <path
                d="M43.5455 26.2046C43.9848 26.6439 43.9848 27.356 43.5455 27.7954L27.7955 43.5454C27.3562 43.9847 26.644 43.9847 26.2047 43.5454L10.4547 27.7954C10.0153 27.356 10.0153 26.6439 10.4547 26.2046C10.894 25.7652 11.6062 25.7652 12.0455 26.2046L27.0001 41.1592L41.9547 26.2046C42.394 25.7652 43.1062 25.7652 43.5455 26.2046Z"
                fill="var(--color-grey-hard)"
              />
            </svg>
          </a>
        </div>
      </section>
    </div>
  );
}
