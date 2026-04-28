"use client";

import * as React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { CardWrapper } from "../ui/CardWrapper";
import { SliderNavButtons } from "../ui/SliderNavButtons";
import { Title } from "../ui/Title";
import {
  fadeUpVariants,
  sectionViewport,
  motionConfig,
  MOTION_EASE,
} from "@/lib/motion";

const TEAM_PHOTOS = [
  { desktop: "/ourTeam/Maria.jpg", mobile: "/ourTeam/Maria_mobile.jpeg" },
  { desktop: "/ourTeam/Iryna.jpg", mobile: "/ourTeam/Iryna.jpg" },
  { desktop: "/ourTeam/Katerina.jpg", mobile: "/ourTeam/Katerina_mobile.jpeg" },
  { desktop: "/ourTeam/Volodymir.jpg", mobile: "/ourTeam/Volodymir_mobile.jpeg" },
  { desktop: "/ourTeam/Mariyan.png", mobile: "/ourTeam/Mariyan_mobile.jpeg" },
  { desktop: "/ourTeam/Vitaliy.png", mobile: "/ourTeam/Vitaliy.png" },
] as const;

const socialLinks = [
  { href: "https://facebook.com", src: "/hero/Social Icons.svg", label: "Facebook" },
  { href: "https://instagram.com", src: "/hero/Social Icons2.svg", label: "Instagram" },
];

function TeamCard({ name, role, photo, photoMobile }: { name: string; role: string; photo: string; photoMobile: string }) {
  return (
    <CardWrapper as="article" widthClassName="w-[228px] min-[768px]:w-[424px] shrink-0 max-w-full">
      <div className="flex min-[768px]:h-[669px] flex-[1_0_0] flex-col items-start gap-1 md:gap-2 self-stretch">
        <Title as="h3" variant="h3" className="!text-[20px] !font-medium min-[768px]:!text-[32px]">
          {name}
        </Title>
        <p
          className="!text-[18px] font-normal leading-normal text-[var(--color-grey-hard,#555)] font-['Gilroy',ui-sans-serif,system-ui,sans-serif] min-[768px]:!text-[24px] min-[768px]:text-[rgba(20,20,20,0.85)]"
        >
          <span className="md:hidden">
            {role.replace(/Removable\s+|знімного\s+/i, "").replace(/^./, (c) => c.toUpperCase())}
          </span>
          <span className="hidden md:inline">{role}</span>
        </p>
        <div className="flex gap-2.5 my-2 md:my-4">
          {socialLinks.map(({ href, src, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[30px] border-[0.5px] border-[var(--color-grey)] bg-white p-3 transition-opacity hover:opacity-90"
              aria-label={label}
            >
              <Image src={src} alt="" width={24} height={24} className="shrink-0" />
            </a>
          ))}
        </div>
        <div className="relative self-stretch shrink-0 w-full h-[252px] aspect-[69/89] min-[768px]:h-[500px] min-[768px]:aspect-auto rounded-[16px] overflow-hidden bg-[lightgray]">
          {/* Desktop image */}
          <div className="hidden md:block absolute inset-0">
            <Image
              src={photo}
              alt=""
              fill
              className="object-cover object-top"
              sizes="424px"
            />
          </div>
          {/* Mobile image */}
          <div className="block md:hidden absolute inset-0">
            <Image
              src={photoMobile}
              alt=""
              fill
              className="object-cover object-top"
              sizes="424px"
            />
          </div>
        </div>
      </div>
    </CardWrapper>
  );
}

export interface OurTeamSectionProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

export function OurTeamSection({
  children,
  className = "",
  ...props
}: OurTeamSectionProps) {
  const t = useTranslations("ourTeam");
  const tCommon = useTranslations("common");
  const reduced = useReducedMotion() ?? false;
  const rawMembers = t.raw("members") as { name: string; role: string }[];
  const team = rawMembers.map((m, i) => ({
    ...m,
    photo: TEAM_PHOTOS[i]?.desktop ?? TEAM_PHOTOS[0].desktop,
    photoMobile: TEAM_PHOTOS[i]?.mobile ?? TEAM_PHOTOS[0].mobile,
  }));

  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [cardStep, setCardStep] = React.useState(0);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const canGoPrev = activeIndex > 0;
  const canGoNext = activeIndex < team.length - 1;

  React.useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const updateStep = () => {
      const firstCard = el.firstElementChild as HTMLElement | null;
      if (!firstCard) return;
      const styles = window.getComputedStyle(el);
      const gap = Number.parseFloat(styles.columnGap || styles.gap || "0") || 0;
      setCardStep(firstCard.offsetWidth + gap);
    };

    updateStep();
    window.addEventListener("resize", updateStep);
    return () => window.removeEventListener("resize", updateStep);
  }, [team.length]);

  React.useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    if (cardStep <= 0) return;
    el.scrollTo({ left: activeIndex * cardStep, behavior: "smooth" });
  }, [activeIndex, cardStep]);

  const goPrev = () => setActiveIndex((i) => Math.max(0, i - 1));
  const goNext = () => setActiveIndex((i) => Math.min(team.length - 1, i + 1));

  return (
    <section
      aria-label={t("aria")}
      className={["py-8 md:py-12 lg:py-16", className].filter(Boolean).join(" ")}
      {...props}
    >
      <div className="flex flex-col gap-8">
        <motion.div
          className="mb-[16px] flex w-full min-w-0 flex-col gap-6 self-stretch px-4 min-[768px]:px-8 min-[1440px]:px-[80px] sm:flex-row sm:items-center sm:justify-between sm:gap-6 md:mb-[32px] lg:mb-[40px]"
          variants={fadeUpVariants(reduced)}
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport({ amount: 0.3 })}
        >
          <Title as="h2">{t("title")}</Title>

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
      </div>

      <motion.div
        className="relative w-full overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={sectionViewport({ amount: 0.1 })}
        transition={{
          duration: reduced ? 0 : motionConfig.duration.base,
          ease: MOTION_EASE,
        }}
      >
        <div
          ref={scrollRef}
          className="flex gap-[24px] overflow-x-auto overflow-y-hidden px-4 pb-4 scroll-smooth min-[768px]:px-8 min-[1440px]:px-[80px] md:pb-0"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {team.map((member, i) => (
            <TeamCard
              key={i}
              name={member.name}
              role={member.role}
              photo={member.photo}
              photoMobile={member.photoMobile}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
