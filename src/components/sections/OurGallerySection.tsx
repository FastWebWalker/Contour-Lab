"use client";

import * as React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import {
  fadeUpVariants,
  motionConfig,
  sectionTransition,
  sectionViewport,
  staggerContainerVariants,
} from "@/lib/motion";
import { Container } from "../ui/Container";
import { Title } from "../ui/Title";

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

  const textStagger = staggerContainerVariants(reduced, {
    delayChildren: reduced ? 0 : 0.12,
  });
  const lineVariants = fadeUpVariants(reduced);

  return (
    <section
      aria-label={t("aria")}
      className={["py-8 md:py-12 lg:py-16", className].filter(Boolean).join(" ")}
      {...props}
    >
      <Container>
        <motion.div
          className="relative flex flex-col gap-8 overflow-hidden rounded-[30px] bg-[linear-gradient(100deg,#AD1B24_26.12%,#E99C9C_48.62%,#A2030D_77.87%)] px-6 py-6 text-white md:flex-row md:items-stretch md:gap-[73px] md:px-10 md:py-9"
          initial={reduced ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={sectionViewport()}
          transition={sectionTransition({
            reduced,
            duration: motionConfig.duration.slower,
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
            initial={reduced ? false : { opacity: 0, x: -22, scale: 0.98 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{
              once: motionConfig.viewport.once,
              amount: motionConfig.viewport.media,
            }}
            transition={sectionTransition({
              reduced,
              duration: motionConfig.duration.base,
              delay: reduced ? 0 : 0.06,
            })}
          />

          {/* Right: text + button */}
          <motion.div
            className="flex flex-1 flex-col items-start gap-8 md:gap-10 self-stretch"
            initial={reduced ? "visible" : "hidden"}
            whileInView="visible"
            viewport={sectionViewport()}
            variants={textStagger}
          >
            <motion.div
              variants={lineVariants}
              className="flex flex-col items-start gap-[8px] md:gap-[16px] lg:gap-[40px] md:max-w-[420px] lg:max-w-[480px]"
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
              <p
                className="text-[20px] w-full font-normal leading-normal"
                style={{
                  color: "rgba(255, 255, 255, 0.85)",
                  fontFamily: "var(--font-inter), Inter, sans-serif",
                }}
              >
                {t("description")}
              </p>
            </motion.div>

            <motion.div variants={lineVariants} className="mt-auto">
              <Link
                href="/gallery"
                className="group inline-flex h-auto items-center justify-center gap-[6px] rounded-[40px] border border-[#e8e8e8] bg-white px-6 py-3 text-[18px] font-normal text-[var(--color-black)] shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-[colors,transform] hover:border-[#d0d0d0] hover:bg-[#fafafa] active:bg-[#f5f5f5] hover:scale-[1.02] active:scale-[0.99]"
              >
                {t("cta")}
                <Image
                  src="/ourServices/arrow-right.svg"
                  alt=""
                  width={36}
                  height={36}
                  className="h-[36px] w-[36px] shrink-0 text-[var(--color-black)] transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>
            </motion.div>

            {children}
          </motion.div>

          <motion.div
            className="pointer-events-none select-none absolute z-10 left-[193.996px] top-[152px] h-[33.338px] w-[101.004px] min-[768px]:left-[486px] min-[768px]:top-[166px] min-[768px]:h-[67.6px] min-[768px]:w-[194px] min-[768px]:right-auto min-[768px]:bottom-auto min-[1024px]:left-auto min-[1024px]:top-auto min-[1024px]:right-[-100px] min-[1024px]:bottom-[85px] min-[1024px]:h-[158px] min-[1024px]:w-[453px]"
            aria-hidden
            initial={reduced ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{
              once: motionConfig.viewport.once,
              amount: motionConfig.viewport.section,
            }}
            transition={sectionTransition({
              reduced,
              duration: motionConfig.duration.medium,
              delay: reduced ? 0 : 0.28,
            })}
          >
            <motion.div
              className="h-full w-full"
              animate={reduced ? undefined : { y: [0, -5, 0] }}
              transition={
                reduced
                  ? undefined
                  : {
                      repeat: Infinity,
                      duration: 4.2,
                      ease: "easeInOut",
                    }
              }
            >
              <Image
                src="/ourGallery/gallery-dots.svg"
                alt=""
                width={194}
                height={68}
                className="h-full w-full object-contain object-right-bottom min-[1024px]:object-right-bottom"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
