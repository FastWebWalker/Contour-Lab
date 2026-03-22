"use client";

import * as React from "react";
import Image from "next/image";
import { CardWrapper } from "../ui/CardWrapper";
import { Container } from "../ui/Container";
import { SliderNavButtons } from "../ui/SliderNavButtons";
import { Title } from "../ui/Title";

const CARD_WIDTH = 424;
const GAP = 24;
const CARD_STEP = CARD_WIDTH + GAP;

const TEAM: { name: string; role: string; photo: string }[] = [
  { name: "Марія Бондар", role: "СЕО компанії", photo: "/ourTeam/1305dad7f27e9190b33821e2cdc3d5e7d86dc645.jpg" },
  { name: "Ірина Дзюбенко", role: "Старший Кераміст", photo: "/ourTeam/1879ab55150dbe6bb5f3b324c17efc7655ea858c.jpg" },
  { name: "Катя Микитюк", role: "CAD Дизайнер", photo: "/ourTeam/c9bd719131852d95e6b674a244d2f79fe7b3ae9f.jpg" },
  { name: "Ім'я члена команди", role: "Посада та короткий опис", photo: "/ourTeam/e920e345c84d78805f1fd565c021743da782891c.jpg" },
];

const socialLinks = [
  { href: "https://facebook.com", src: "/hero/Social Icons.svg", label: "Facebook" },
  { href: "https://instagram.com", src: "/hero/Social Icons2.svg", label: "Instagram" },
];

function TeamCard({ name, role, photo }: { name: string; role: string; photo: string }) {
  return (
    <CardWrapper as="article" widthClassName="w-[424px] shrink-0 max-w-full">
      <div className="flex h-[669px] flex-[1_0_0] flex-col items-start gap-6 self-stretch">
        <h3
          className="text-[36px] font-normal leading-[36px] text-[var(--color-black,#141414)]"
          style={{ fontFamily: "Gilroy, ui-sans-serif, system-ui, sans-serif" }}
        >
          {name}
        </h3>
        <p
          className="text-[24px] font-normal leading-normal"
          style={{
            color: "rgba(20, 20, 20, 0.85)",
            fontFamily: "Gilroy, ui-sans-serif, system-ui, sans-serif",
          }}
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
            className="object-cover"
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
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const canGoPrev = activeIndex > 0;
  const canGoNext = activeIndex < TEAM.length - 1;

  React.useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ left: activeIndex * CARD_STEP, behavior: "smooth" });
  }, [activeIndex]);

  const goPrev = () => setActiveIndex((i) => Math.max(0, i - 1));
  const goNext = () => setActiveIndex((i) => Math.min(TEAM.length - 1, i + 1));

  return (
    <section
      aria-label="Наша команда"
      className={["py-8 md:py-12 lg:py-16", className].filter(Boolean).join(" ")}
      {...props}
    >
      <Container className="flex flex-col gap-8">
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:items-center lg:mb-[40px] md:mb-[32px] mb-[16px] sm:justify-between">
          <Title className="text-center sm:self-center" as="h2" style={{ alignSelf: "center" }}>Наша команда</Title>

          <SliderNavButtons
            canGoPrev={canGoPrev}
            canGoNext={canGoNext}
            onPrev={goPrev}
            onNext={goNext}
          />
        </div>

        {children}
      </Container>

      <div className="relative ml-4 w-[calc(100vw-16px)] min-[768px]:ml-8 min-[768px]:w-[calc(100vw-32px)] min-[1440px]:ml-[60px] min-[1440px]:w-[calc(100vw-60px)]">
        <div
          ref={scrollRef}
          className="flex w-full gap-[24px] overflow-x-auto overflow-y-hidden pb-4 scroll-smooth md:pb-0"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {TEAM.map((member) => (
            <TeamCard
              key={member.photo}
              name={member.name}
              role={member.role}
              photo={member.photo}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
