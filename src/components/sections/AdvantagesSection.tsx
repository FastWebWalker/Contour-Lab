"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Container } from "../ui/Container";

const ADV_ICONS = [
  "/icons/advantages/quality.svg",
  "/icons/advantages/digital.svg",
  "/icons/advantages/experience.svg",
  "/icons/advantages/spectrum.svg",
  "/icons/advantages/materials.svg",
  "/icons/advantages/approach.svg",
] as const;

const fadeSlideUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const cardVariant = {
  hidden: { opacity: 0, scale: 0.95, y: 30 },
  visible: { opacity: 1, scale: 1, y: 0 },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

function AdvantageCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: string;
}) {
  return (
    <motion.div
      variants={cardVariant}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex flex-col items-start gap-[10px] p-[20px] bg-[#F6F6F6] rounded-[16px] md:rounded-[30px] w-[240px] md:w-[340px] lg:w-full shrink-0 snap-center"
    >
      <div className="w-[32px] h-[32px] relative shrink-0">
        <Image src={icon} alt="" fill className="object-contain" />
      </div>
      <h3
        className="text-[24px] md:text-[36px] font-normal leading-none text-[#141414] self-stretch mt-2"
        style={{ fontFamily: "var(--font-gilroy, Gilroy, sans-serif)" }}
      >
        {title}
      </h3>
      <p
        className="text-[16px] md:text-[20px] font-normal leading-normal text-[#141414]/85 self-stretch"
        style={{ fontFamily: "var(--font-inter, Inter, sans-serif)" }}
      >
        {description}
      </p>
    </motion.div>
  );
}

export function AdvantagesSection() {
  const t = useTranslations("advantages");
  const items = t.raw("items") as { title: string; description: string }[];

  return (
    <section
      className="py-[60px] md:py-[80px]"
      style={{
        background: "linear-gradient(297deg, #AD1B24 31.8%, #EA9F9F 49.67%, #8E030B 71.59%)",
      }}
    >
      <Container className="flex flex-col gap-[40px]">
        <motion.h2
          className="text-[36px] md:text-[52px] font-normal leading-[1.05] text-white"
          style={{ fontFamily: "var(--font-gilroy, Gilroy, sans-serif)" }}
          variants={fadeSlideUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {t("titleLine1")}
          <br />
          {t("titleLine2")}
        </motion.h2>

        <div
          id="advantages-carousel"
          className="overflow-x-auto lg:overflow-x-visible scrollbar-hide -mx-4 min-[768px]:-mx-8 lg:mx-0 overflow-y-hidden"
        >
          <motion.div
            className="flex lg:grid lg:grid-cols-3 gap-6 snap-x snap-mandatory pl-4 min-[768px]:pl-8 lg:pl-0"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {items.map((item, i) => {
              const icon = ADV_ICONS[i];
              return (
                <AdvantageCard
                  key={icon}
                  title={item.title}
                  description={item.description}
                  icon={icon}
                />
              );
            })}
            <div
              aria-hidden
              className="w-4 min-[768px]:w-8 lg:w-0 shrink-0"
            />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

