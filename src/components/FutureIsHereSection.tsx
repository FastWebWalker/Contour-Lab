"use client";

import * as React from "react";
import Image from "next/image";
import { CardWrapper } from "./CardWrapper";
import { Container } from "./Container";
import { Description } from "./Description";
import { Title } from "./Title";

const FUTURE_IMAGE = "/futureIsHere/1f0ee63fef39f6163a53b9f10627c496f2d7fdac.png";

const DESCRIPTION =
  "Наша лабораторія повністю перейшла на цифровий робочий протокол. Це включає в себе отримання сканів або оцифровку моделей за допомогою сканера та роботу з ними.";

const CARDS: { icon: string; text: string }[] = [
  {
    icon: "/futureIsHere/Files.svg",
    text: "Цифровий протокол дозволяє систематизовувати процеси в роботі, тим самим пришвидшуючи виконання.",
  },
  {
    icon: "/futureIsHere/Edit_Pencil_01.svg",
    text: "Ми можемо аналізувати наші роботи краще, адже бачимо більше, ніж якби ми це робили мануально",
  },
];

export interface FutureIsHereSectionProps
  extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

export function FutureIsHereSection({
  children,
  className = "",
  ...props
}: FutureIsHereSectionProps) {
  return (
    <section
      aria-label="Майбутнє вже тут!"
      className={["py-8 md:py-12 lg:py-16", className].filter(Boolean).join(" ")}
      {...props}
    >
      <Container>
        <div className="flex flex-col gap-[24px] min-[1024px]:flex-row min-[1024px]:items-stretch min-[1024px]:gap-12">
          {/* Left block: 50/50 з правим на 1024–1199px; далі flex-1 поруч із фіксованим правим */}
          <div className="flex min-w-0 w-full flex-1 flex-col items-stretch gap-6 min-[1024px]:min-w-0">
            <Title as="h2">Майбутнє вже тут!</Title>
            <Description className="w-full min-[1024px]:max-w-[624px]">
              {DESCRIPTION}
            </Description>
            <div className="flex w-full min-[1024px]:max-w-[624px] flex-col gap-2.5 rounded-[30px] p-0">
              <div className="flex w-full flex-col items-stretch gap-[10px] self-stretch">
                {CARDS.map(({ icon, text }) => (
                  <CardWrapper
                    key={icon}
                    paddingClassName="p-4 min-[768px]:p-8"
                    widthClassName="w-full"
                    className="gap-6"
                  >
                    <div className="flex h-[32px] w-[32px] shrink-0 items-center justify-center">
                      <Image src={icon} alt="" width={32} height={32} />
                    </div>
                    <p
                      className="text-[18px] font-normal leading-normal text-[var(--Black,#141414)] min-[768px]:text-[24px]"
                      style={{
                        fontFamily: "Gilroy-Regular, Gilroy, ui-sans-serif, system-ui, sans-serif",
                      }}
                    >
                      {text}
                    </p>
                  </CardWrapper>
                ))}
              </div>
            </div>
          </div>

          {/* Right block: 1024–1199px — 50/50 (flex-1); з 1200px — фіксована ширина 635px */}
          <div className="flex w-full min-w-0 shrink-0 justify-center min-[1024px]:min-w-0 min-[1024px]:flex-1 min-[1200px]:flex-none min-[1200px]:w-[635px] min-[1200px]:min-w-[635px] min-[1200px]:shrink-0">
            <div className="flex w-full max-w-full min-[1200px]:max-w-[635px] flex-shrink-0 flex-col items-center justify-center rounded-[30px] bg-[#F6F6F6] pt-[63.138px]">
              <div className="relative w-full aspect-[381/272] max-h-[549px] min-[1200px]:max-w-[635px]">
                <Image
                  src={FUTURE_IMAGE}
                  alt=""
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1023px) 100vw, 635px"
                />
              </div>
            </div>
          </div>
        </div>
        {children}
      </Container>
    </section>
  );
}
