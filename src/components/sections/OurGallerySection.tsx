"use client";

import * as React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { Container } from "../ui/Container";
import { Title } from "../ui/Title";
import {
  sectionViewport,
  sectionTransition,
  motionConfig,
} from "@/lib/motion";

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
  const t = useTranslations("ourGallery");
  const reduced = useReducedMotion() ?? false;

  return (
    <section
      aria-label={t("aria")}
      className={["py-8 md:py-12 lg:py-16", className].filter(Boolean).join(" ")}
      {...props}
    >
      <Container>
        <motion.div
          className="relative flex flex-col gap-8 overflow-hidden rounded-[30px] bg-[linear-gradient(100deg,#AD1B24_26.12%,#E99C9C_48.62%,#A2030D_77.87%)] px-6 py-6 text-white md:flex-row md:items-stretch md:gap-[73px] md:px-10 md:py-9"
          initial={reduced ? false : { opacity: 0, y: motionConfig.offset.fadeUp }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={sectionViewport({ amount: 0.2 })}
          transition={sectionTransition({
            reduced,
            duration: motionConfig.duration.base,
          })}
        >
          {/* Left: image block */}
          <motion.div
            className="w-full aspect-[665/499] rounded-[24px] md:rounded-[30px] md:basis-[56%]"
            style={{
              backgroundImage: `url(${GALLERY_IMAGE})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "-114.537px -154.12px",
              backgroundSize: "164.863% 146.276%",
              backgroundColor: "lightgray",
            }}
            initial={reduced ? false : { opacity: 0, scale: 1.04 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={sectionViewport({ amount: 0.25 })}
            transition={sectionTransition({
              reduced,
              duration: motionConfig.duration.slow,
              delay: 0.15,
            })}
          />

          {/* Right: text + button */}
          <div className="flex flex-1 flex-col items-start gap-8 md:gap-10 self-stretch">
            <div className="flex flex-col items-start gap-[8px] md:gap-[16px] lg:gap-[40px] md:max-w-[420px] lg:max-w-[480px]">
              <motion.div
                initial={reduced ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={sectionViewport({ amount: 0.3 })}
                transition={sectionTransition({
                  reduced,
                  duration: motionConfig.duration.sectionFadeUp,
                  delay: 0.2,
                })}
              >
                <Title
                  as="h2"
                  style={{
                    color: "#ffffff",
                    fontFamily:
                      "Gilroy-Medium, Gilroy, ui-sans-serif, system-ui, sans-serif",
                  }}
                >
                  {t("title")}
                </Title>
              </motion.div>
              <motion.p
                className="text-[20px] w-full font-normal leading-normal"
                style={{
                  color: "rgba(255, 255, 255, 0.85)",
                  fontFamily: "var(--font-inter), Inter, sans-serif",
                }}
                initial={reduced ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={sectionViewport({ amount: 0.3 })}
                transition={sectionTransition({
                  reduced,
                  duration: motionConfig.duration.sectionFadeUp,
                  delay: 0.3,
                })}
              >
                {t("description")}
              </motion.p>
            </div>

            <motion.div
              className="mt-auto"
              initial={reduced ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={sectionViewport({ amount: 0.3 })}
              transition={sectionTransition({
                reduced,
                duration: motionConfig.duration.fast,
                delay: 0.4,
              })}
            >
              <Link
                href="/gallery"
                className="inline-flex h-auto items-center justify-center gap-[6px] rounded-[40px] border border-[#e8e8e8] bg-white px-6 py-3 text-[18px] font-normal text-[var(--color-black)] shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-colors hover:border-[#d0d0d0] hover:bg-[#fafafa] active:bg-[#f5f5f5]"
              >
                {t("cta")}
                <Image
                  src="/ourServices/arrow-right.svg"
                  alt=""
                  width={36}
                  height={36}
                  className="h-[36px] w-[36px] text-[var(--color-black)]"
                />
              </Link>
            </motion.div>

            {children}
          </div>

          <Image
            src="/ourGallery/gallery-dots.svg"
            alt=""
            width={194}
            height={68}
            className="pointer-events-none select-none absolute z-10 h-[33.338px] w-[101.004px] left-[193.996px] top-[152px] min-[768px]:h-[67.6px] min-[768px]:w-[194px] min-[768px]:left-[486px] min-[768px]:top-[166px] min-[768px]:right-auto min-[768px]:bottom-auto min-[1024px]:left-auto min-[1024px]:top-auto min-[1024px]:right-[-100px] min-[1024px]:bottom-[85px] min-[1024px]:h-[158px] min-[1024px]:w-[453px]"
          />
        </motion.div>
      </Container>
    </section>
  );
}
