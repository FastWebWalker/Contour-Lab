"use client";

import React from "react";
import Image from "next/image";
import { Container } from "../ui/Container";

interface Advantage {
    title: string;
    description: string;
    icon: string;
}

const ADVANTAGES: Advantage[] = [
    {
        title: "Гарантія якості",
        description:
            "Ми настільки впевнені в якості нашої роботи, що надаємо гарантію до 3х років. Кожен наш дизайн проходить ретельний мікроскопічний контроль точності прилягання.",
        icon: "/icons/advantages/quality.svg",
    },
    {
        title: "Цифровий протокол",
        description:
            "Ми повністю перейшли на цифровий протокол, використовуючи сканери та сучасне програмне забезпечення. Це дозволяє нам досягати виняткової точності та швидкості у виробництві, а також мінімізувати будь-які помилки.",
        icon: "/icons/advantages/digital.svg",
    },
    {
        title: "Досвід роботи",
        description:
            "Наша команда має багаторічний досвід у створенні найскладніших конструкцій, включаючи протезування на імплантатах \"All on 4/6\". Ми здатні вирішити будь-яку клінічну проблему та створити функціональні та естетичні роботи.",
        icon: "/icons/advantages/experience.svg",
    },
    {
        title: "Спектр послуг",
        description:
            "Ми пропонуємо широкий асортимент матеріалів та дизайнів, від цирконієвих та титанових дисків до естетичних цирконієвих коронок, що дозволяє нам знайти ідеальне рішення для кожного пацієнта.",
        icon: "/icons/advantages/spectrum.svg",
    },
    {
        title: "Якісні матеріали",
        description:
            "Ми працюємо лише з матеріалами провідних світових виробників, що гарантує міцність, довговічність та сумісність нашої роботи. Це дозволяє нам досягти не лише функціональності, але і результату!",
        icon: "/icons/advantages/materials.svg",
    },
    {
        title: "Індивідуальний підхід",
        description:
            "Наші спеціалісти завжди готові надати консультації щодо планування вибору оптимальних матеріалів для кожного клінічного випадку. Це забезпечує ефективну співпрацю та найкращий результат для пацієнта.",
        icon: "/icons/advantages/approach.svg",
    },
];

function AdvantageCard({ advantage }: { advantage: Advantage }) {
    return (
        <div className="flex flex-col items-start gap-[10px] p-[20px] bg-[#F6F6F6] rounded-[16px] md:rounded-[30px] w-[240px] md:w-[340px] lg:w-full shrink-0 snap-center">
            <div className="w-[32px] h-[32px] relative shrink-0">
                <Image src={advantage.icon} alt="" fill className="object-contain" />
            </div>
            <h3
                className="text-[24px] md:text-[36px] font-normal leading-none text-[#141414] self-stretch mt-2"
                style={{ fontFamily: "var(--font-gilroy, Gilroy, sans-serif)" }}
            >
                {advantage.title}
            </h3>
            <p
                className="text-[16px] md:text-[20px] font-normal leading-normal text-[#141414]/85 self-stretch"
                style={{ fontFamily: "var(--font-inter, Inter, sans-serif)" }}
            >
                {advantage.description}
            </p>
        </div>
    );
}

export function AdvantagesSection() {
    return (
        <section
            className="py-[60px] md:py-[80px]"
            style={{
                background: "linear-gradient(297deg, #AD1B24 31.8%, #EA9F9F 49.67%, #8E030B 71.59%)",
            }}
        >
            <Container className="flex flex-col gap-[40px]">
                <h2
                    className="text-[36px] md:text-[52px] font-normal leading-[1.05] text-white"
                    style={{ fontFamily: "var(--font-gilroy, Gilroy, sans-serif)" }}
                >
                    Ми пишаємося нашими
                    <br />
                    перевагами!
                </h2>

                <div id="advantages-carousel" className="overflow-x-auto lg:overflow-x-visible scrollbar-hide -mx-5 px-5 lg:mx-0 lg:px-0 overflow-y-hidden">
                    <div className="flex lg:grid lg:grid-cols-3 gap-6 snap-x snap-mandatory">
                        {ADVANTAGES.map((advantage) => (
                            <AdvantageCard key={advantage.title} advantage={advantage} />
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
}
