"use client";

import type { MouseEvent, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { PrimaryButton } from "../ui/Button";
import { ArrowRightIcon } from "../icons/ArrowRight";
import { HeroText } from "../hero/HeroText";
import { heroTransition, motionConfig } from "@/lib/motion";

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
  /** Клік по головній CTA (наприклад, відкрити модалку прайсу) */
  onPrimaryCtaClick?: () => void;
  /** Клік по outline CTA (наприклад, завантажити прайс) */
  onOutlineCtaClick?: () => void;
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
  onPrimaryCtaClick,
  onOutlineCtaClick,
}: HeroProps) {
  const reduced = useReducedMotion() ?? false;

  const scrollOneViewport = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const vh = window.innerHeight;
    window.scrollBy({ top: vh * 1.1, behavior: "smooth" });
  };

  return (
    <div className="relative m-5">
      <section
        className="relative h-auto min-h-0 pb-8 md:pb-0 md:min-h-[90vh] flex flex-col pt-[32px] md:pt-[40px] lg:pt-[146px] rounded-[24px] md:rounded-[30px] lg:rounded-[50px] overflow-hidden"
        style={{ backgroundColor: "var(--color-hero-bg)" }}
      >

        {/* 3D dental image — right bottom; mobile full-width, tablet 640×580, desktop 1100×800 */}
        <motion.div
          className="absolute right-0 -bottom-[50px] md:-bottom-[10px] w-[110%] h-[70%] md:w-[640px] md:h-[580px] lg:w-[800px] lg:h-[600px] xl:w-[1100px] xl:h-[800px] z-10 pointer-events-none select-none"
          aria-hidden
          initial={
            reduced
              ? false
              : {
                opacity: 0,
                scale: motionConfig.offset.heroImageScale,
                y: motionConfig.offset.heroImageY,
              }
          }
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={heroTransition({
            reduced,
            duration: motionConfig.duration.heroMedia,
            delay: motionConfig.delay.heroImage,
          })}
        >
          <Image
            src={heroImage}
            alt=""
            fill
            className="object-contain object-right object-bottom mix-blend-lighten opacity-95 translate-y-[58px] md:translate-y-[20px]"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 640px, 1100px"
            priority
          />
        </motion.div>

        {/* Content */}
        <div className="relative flex flex-col overflow-hidden min-h-0 pb-0 md:flex-1 md:pb-[40px]">
          <div className="px-[8px] md:px-[16px] lg:px-[40px] z-[10]">
            {/* <Container className="relative z-10 flex-1 flex flex-col gap-10 lg:gap-8"> */}
            <HeroText>{titleContent}</HeroText>
            {/* Контент під заголовком: subtitle, CTAs, stats */}

            <div className="flex flex-col gap-6 lg:gap-8 w-full md:mb-[24px]">
              {/* Один ряд: лівий блок (description + кнопки), правий — social icons, space-between */}
              <div className="flex w-[100%] flex-col lg:flex-row lg:flex-wrap lg:justify-between items-start gap-4">
                <div className="flex flex-col gap-3">
                  <motion.p
                    className="text-[16px] leading-normal lg:text-[18px] lg:max-w-[444px]"
                    style={{
                      color: "rgba(20, 20, 20, 0.85)",
                      fontFamily: "var(--font-inter)",
                    }}
                    initial={
                      reduced
                        ? false
                        : { opacity: 0, y: motionConfig.offset.heroSubtitle }
                    }
                    animate={{ opacity: 1, y: 0 }}
                    transition={heroTransition({
                      reduced,
                      duration: motionConfig.duration.medium,
                      delay: motionConfig.delay.heroSubtitle,
                    })}
                  >
                    {subtitle}
                  </motion.p>
                  {showButtons && buttons.length > 0 && (
                    <div className="flex flex-wrap gap-3">
                      {buttons.map((btn, i) =>
                        btn.variant === "primary" ? (
                          <motion.div
                            key={btn.label}
                            className="inline-flex"
                            initial={
                              reduced
                                ? false
                                : { opacity: 0, y: motionConfig.offset.heroButton }
                            }
                            animate={{ opacity: 1, y: 0 }}
                            transition={heroTransition({
                              reduced,
                              duration: motionConfig.duration.fast,
                              delay:
                                motionConfig.delay.heroButtons +
                                i * motionConfig.stagger.heroButton,
                            })}
                          >
                            <PrimaryButton
                              type="button"
                              size="lg"
                              onClick={onPrimaryCtaClick}
                            >
                              {btn.label}
                            </PrimaryButton>
                          </motion.div>
                        ) : onOutlineCtaClick ? (
                          <motion.div
                            key={btn.label}
                            className="inline-flex"
                            initial={
                              reduced
                                ? false
                                : { opacity: 0, y: motionConfig.offset.heroButton }
                            }
                            animate={{ opacity: 1, y: 0 }}
                            transition={heroTransition({
                              reduced,
                              duration: motionConfig.duration.fast,
                              delay:
                                motionConfig.delay.heroButtons +
                                i * motionConfig.stagger.heroButton,
                            })}
                          >
                            <button
                              type="button"
                              onClick={onOutlineCtaClick}
                              className="inline-flex items-center justify-center font-medium rounded-full h-14 px-8 text-[17px] gap-3.5 bg-white text-[var(--color-red-main)] border border-[var(--color-red-main)] hover:bg-[var(--color-red-main)] hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-red-main)] focus:ring-offset-2"
                              style={{ fontFamily: "var(--font-inter)" }}
                            >
                              {btn.label}
                              <ArrowRightIcon className="shrink-0" size={36} />
                            </button>
                          </motion.div>
                        ) : (
                          <motion.div
                            key={btn.label}
                            className="inline-flex"
                            initial={
                              reduced
                                ? false
                                : { opacity: 0, y: motionConfig.offset.heroButton }
                            }
                            animate={{ opacity: 1, y: 0 }}
                            transition={heroTransition({
                              reduced,
                              duration: motionConfig.duration.fast,
                              delay:
                                motionConfig.delay.heroButtons +
                                i * motionConfig.stagger.heroButton,
                            })}
                          >
                            <Link
                              href={btn.href}
                              className="inline-flex items-center justify-center font-medium rounded-full h-14 px-8 text-[17px] gap-3.5 bg-white text-[var(--color-red-main)] border border-[var(--color-red-main)] hover:bg-[var(--color-red-main)] hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-red-main)] focus:ring-offset-2"
                              style={{ fontFamily: "var(--font-inter)" }}
                            >
                              {btn.label}
                              <ArrowRightIcon className="shrink-0" size={36} />
                            </Link>
                          </motion.div>
                        )
                      )}
                    </div>
                  )}
                </div>
                {showSocialLinks && socialLinks.length > 0 && (
                  <div className="flex flex-row gap-2.5 shrink-0 md:flex-col lg:flex-col">
                    {socialLinks.map(({ href, src, label }, i) => (
                      <motion.a
                        key={label}
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="flex w-12 h-12 shrink-0 items-center justify-center rounded-[30px] border-[0.5px] border-[var(--color-grey)] p-3 transition-opacity hover:opacity-90"
                        aria-label={label}
                        initial={
                          reduced
                            ? false
                            : { opacity: 0, y: motionConfig.offset.heroSocial }
                        }
                        animate={{ opacity: 1, y: 0 }}
                        transition={heroTransition({
                          reduced,
                          duration: motionConfig.duration.micro,
                          delay:
                            motionConfig.delay.heroSocial +
                            i * motionConfig.stagger.heroSocial,
                        })}
                      >
                        <Image src={src} alt="" width={24} height={24} className="shrink-0" />
                      </motion.a>
                    ))}
                  </div>
                )}
              </div>
              {/* Spacer so content doesn't collide with image on large screens */}
              <div className="hidden lg:block flex-1 min-w-[4%]" />

            </div>
          </div>

          {/* Statistics - притиснуто до низу секції */}
          {showStats && stats.length > 0 && (
            <div className="mt-6 md:mt-auto px-[8px] md:px-[16px] lg:px-[40px] z-[10]">
              <div className="flex w-full flex-row flex-wrap justify-between items-center gap-2">
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.value}
                    className="flex items-center gap-2"
                    initial={
                      reduced
                        ? false
                        : { opacity: 0, y: motionConfig.offset.heroStat }
                    }
                    animate={{ opacity: 1, y: 0 }}
                    transition={heroTransition({
                      reduced,
                      duration: motionConfig.duration.medium,
                      delay:
                        motionConfig.delay.heroStats +
                        i * motionConfig.stagger.heroStat,
                    })}
                  >
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
                  </motion.div>
                ))}
              </div>
            </div>
          )}
          {/* </Container> */}

        </div>

      </section>

      {/* Scroll indicator — трохи вище низу, на одному рівні з блоком цифр */}
      <motion.div
        className="absolute left-1/2 bottom-0 -translate-x-1/2 -translate-y-[10%] z-20 hidden lg:block"
        initial={
          reduced ? false : { opacity: 0, y: motionConfig.offset.scrollHintY }
        }
        animate={{ opacity: 1, y: 0 }}
        transition={heroTransition({
          reduced,
          duration: motionConfig.duration.base,
          delay: motionConfig.delay.heroScroll,
        })}
      >
        <a
          href="#content"
          onClick={scrollOneViewport}
          className="hero-scroll-hint flex w-[119px] h-[119px] shrink-0 items-center justify-center rounded-[59.5px] border-[0.5px] border-[var(--color-grey)] p-8 transition-opacity hover:opacity-90"
          aria-label="Прокрутити вниз"
        >
          <svg
            width={54}
            height={54}
            viewBox="0 0 54 54"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="shrink-0"
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
      </motion.div>
    </div>
  );
}
