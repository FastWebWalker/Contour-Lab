"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Container } from "../ui/Container";
import { Title } from "../ui/Title";
import { Description } from "../ui/Description";

const RED_DOT = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="9"
        height="9"
        viewBox="0 0 9 9"
        fill="none"
        className="shrink-0 mt-[0.4em]"
        aria-hidden
    >
        <circle cx="4.5" cy="4.5" r="4.5" fill="var(--color-red-main, #B9040F)" />
    </svg>
);

function ServiceCard({
    index,
    title,
    items,
    image,
}: {
    index: number;
    title: string;
    items: string[];
    image: string;
}) {
    return (
        <article
            className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-8 rounded-[30px] bg-[#F6F6F6] p-8 lg:min-h-[240px] w-full"
        >
            <div className="flex flex-col md:flex-row lg:items-center gap-6 lg:gap-10 flex-1 w-full relative">
                {/* Circle with number - hidden on mobile, visible on LG+ */}
                <div
                    className="hidden lg:flex w-[60px] h-[60px] shrink-0 items-center justify-center rounded-full border-[0.5px] border-[#B81B3A]"
                >
                    <span className="text-[36px] font-light text-[#7B0E23]" style={{ fontFamily: "var(--font-inter)" }}>
                        {index}
                    </span>
                </div>

                <div className="flex flex-col gap-4 lg:gap-4 flex-1 w-full">
                    {/* Title - stacks on mobile */}
                    <h3
                        className="text-[36px] lg:text-[36px] font-normal leading-[1.1] text-[#141414]"
                        style={{ fontFamily: "var(--font-gilroy, Gilroy, sans-serif)" }}
                    >
                        {title}
                    </h3>

                    {/* Divider Line - visible only on mobile/md */}
                    <div className="lg:hidden h-[0.5px] bg-[#555] w-full" />

                    {/* Desktop flowing layout (LG+) */}
                    <div className="hidden lg:block overflow-hidden">
                        <div className="flex flex-wrap items-center -ml-6 lg:-ml-8 gap-y-3">
                            {items.map((item) => (
                                <div
                                    key={item}
                                    className="relative pl-6 lg:pl-8 flex items-center"
                                >
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-6 lg:w-8 flex justify-center">
                                        {RED_DOT}
                                    </div>
                                    <span
                                        className="text-[16px] lg:text-[20px] font-normal leading-normal text-black"
                                        style={{ fontFamily: "var(--font-inter)" }}
                                    >
                                        {item}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Mobile vertical layout (Vertical list) */}
                    <ul className="lg:hidden flex flex-col gap-2">
                        {items.map((item) => (
                            <li
                                key={item}
                                className="flex items-start gap-3 text-[16px] md:text-[20px] font-normal leading-normal text-black"
                                style={{ fontFamily: "var(--font-inter)" }}
                            >
                                {RED_DOT}
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Image - stretches or centers */}
            <div className="relative w-full lg:w-[259px] h-[280px] lg:h-[180px] shrink-0 rounded-[12px] overflow-hidden">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover"
                />
            </div>
        </article>
    );
}

export function ServicesListSection() {
    const t = useTranslations("servicesList");
    const services = t.raw("services") as {
        title: string;
        items: string[];
        image: string;
    }[];

    return (
        <section className="py-8 md:py-12 lg:py-16">
            <Container className="flex flex-col gap-6 md:gap-8 md:mb-[40px] mb-[32px]">
                <div className="flex flex-col lg:flex-row justify-between gap-4 lg:gap-8 items-start">
                    <Title as="h2">
                        {t("titleHeading")}
                    </Title>
                    <Description className="min-w-0 max-w-[60ch]">
                        {t("description")}
                    </Description>
                </div>

                <div className="flex flex-col gap-6 lg:gap-8">
                    {services.map((service, idx) => (
                        <ServiceCard
                            key={service.title}
                            index={idx + 1}
                            title={service.title}
                            items={service.items}
                            image={service.image}
                        />
                    ))}
                </div>
            </Container>
        </section>
    );
}
