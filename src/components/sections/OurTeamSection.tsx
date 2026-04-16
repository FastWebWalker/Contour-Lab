"use client";

import * as React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { CardWrapper } from "../ui/CardWrapper";
import { Container } from "../ui/Container";
import { SliderNavButtons } from "../ui/SliderNavButtons";
import { Title } from "../ui/Title";
import {
  fadeUpVariants,
  sectionViewport,
  motionConfig,
  MOTION_EASE,
} from "@/lib/motion";

const CARD_WIDTH = 424;
const GAP = 24;
const CARD_STEP = CARD_WIDTH + GAP;

const TEAM_PHOTOS = [
  "/ourTeam/c9bd719131852d95e6b674a244d2f79fe7b3ae9f.jpg",
  "/ourTeam/1879ab55150dbe6bb5f3b324c17efc7655ea858c.jpg",
  "/ourTeam/1305dad7f27e9190b33821e2cdc3d5e7d86dc645.jpg",
  "/ourTeam/e920e345c84d78805f1fd565c021743da782891c.jpg",
  "/ourTeam/1 (38) 1.png",
  "/ourTeam/1 (9) 1.png",
] as const;

const socialLinks = [
  { href: "https://facebook.com", src: "/hero/Social Icons.svg", label: "Facebook" },
  { href: "https://instagram.com", src: "/hero/Social Icons2.svg", label: "Instagram" },
];

function TeamCard({ name, role, photo }: { name: string; role: string; photo: string }) {
  return (
    <CardWrapper as="article" widthClassName="w-[424px] shrink-0 max-w-full">
      <div className="flex h-[669px] flex-[1_0_0] flex-col items-start gap-6 self-stretch">
        <h3
          className="text-[28px] font-normal leading-normal text-[var(--Black,#141414)] font-['Gilroy-Medium','Gilroy',ui-sans-serif,system-ui,sans-serif] min-[768px]:text-[36px] min-[768px]:leading-[36px] min-[768px]:font-['Gilroy',ui-sans-serif,system-ui,sans-serif]"
        >
          {name}
        </h3>
        <p
          className="text-[16px] font-normal leading-normal text-[var(--color-grey-hard,#555)] [font-family:var(--font-inter),Inter,sans-serif] min-[768px]:text-[24px] min-[768px]:text-[rgba(20,20,20,0.85)] min-[768px]:font-['Gilroy',ui-sans-serif,system-ui,sans-serif]"
        >
          {role}
        </p>
        <div className="flex gap-2.5">
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
        <div className="relative self-stretch shrink-0 w-full h-[252.819px] aspect-[69/89] min-[768px]:h-[500px] min-[768px]:aspect-auto rounded-[16px] overflow-hidden bg-[lightgray]">
          <Image
            src={photo}
            alt=""
            fill
            className="object-cover object-top"
            sizes="424px"
          />
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
    photo: TEAM_PHOTOS[i] ?? TEAM_PHOTOS[0],
  }));

  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const canGoPrev = activeIndex > 0;
  const canGoNext = activeIndex < team.length - 1;

  React.useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ left: activeIndex * CARD_STEP, behavior: "smooth" });
  }, [activeIndex]);

  const goPrev = () => setActiveIndex((i) => Math.max(0, i - 1));
  const goNext = () => setActiveIndex((i) => Math.min(team.length - 1, i + 1));

  return (
    <section
      aria-label={t("aria")}
      className={["py-8 md:py-12 lg:py-16", className].filter(Boolean).join(" ")}
      {...props}
    >
      <Container className="flex flex-col gap-8">
        <motion.div
          className="mb-[16px] flex w-full min-w-0 flex-col gap-6 self-stretch sm:flex-row sm:items-center sm:justify-between sm:gap-6 md:mb-[32px] lg:mb-[40px]"
          variants={fadeUpVariants(reduced)}
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport({ amount: 0.3 })}
        >
          <Title as="h2" className="min-[1024px]:text-[32px] min-[1024px]:leading-[32px]">
            {t("title")}
          </Title>

          <SliderNavButtons
            canGoPrev={canGoPrev}
            canGoNext={canGoNext}
            onPrev={goPrev}
            onNext={goNext}
            navAriaLabel={tCommon("sliderNav")}
            className="shrink-0 self-start sm:self-auto"
          />
        </motion.div>

        {children}
      </Container>

      <motion.div
        className="relative ml-4 w-[calc(100vw-16px)] min-[768px]:ml-8 min-[768px]:w-[calc(100vw-32px)] min-[1440px]:ml-[80px] min-[1440px]:w-[calc(100vw-80px)]"
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
          className="flex w-full gap-[24px] overflow-x-auto overflow-y-hidden pb-4 scroll-smooth md:pb-0"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {team.map((member) => (
            <TeamCard
              key={member.photo}
              name={member.name}
              role={member.role}
              photo={member.photo}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
