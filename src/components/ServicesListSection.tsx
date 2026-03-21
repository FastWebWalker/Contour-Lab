"use client";

import React from "react";
import Image from "next/image";
import { Container } from "./Container";
import { Title } from "./Title";
import { Description } from "./Description";

const DESCRIPTION =
    "Ми є вашим надійним партнером у виробництві стоматологічних виробів. Ми створюємо функціональні та естетичні зубні протези, поєднуючи досвід, передові технології та індивідуальний підхід.";

const SERVICES = [
    {
        title: "Конструкції на гвинтовій фіксації",
        items: [
            "Постійна конструкція All on 4/6",
            "Повноанатомічний цирконій",
            "Цирконій на фрезерованій титановій балці (від рівня імплантатів, мультиблоків)",
            "Фрезерований титан (від рівня імплантатів, мультиюнітів) з композитним покриттям і зубами",
            "CoCr з керамічним покриттям",
            "Титанові, металеві Co-Cr та гібридні абатменти",
        ],
        image: "/ourServices/2e4825940834fa7ebc3566f2e5cf5d316dc69ed4.jpg",
    },
    {
        title: "Безметалеві конструкції",
        items: [
            "Повна анатомічна реставрація All on 4/6",
            "Повна анатомічна реставрація (на імплантаті)",
            "Цирконій з керамічним покриттям",
            "Реставрація з використанням імплантатів",
            "Гібридна керамічна (композитна) реставрація",
            "Фрезерований дисилікат літію",
            "Індивідуальна робота ART",
        ],
        image: "/ourServices/6f9df25b7aa784775d92e31ea80b8421d7db98e4.png",
    },
    {
        title: "CAD Моделювання і 3D Принтування",
        items: [
            "Моделюємо конструкції будь-якої складності",
            "Моделювання кукс та конструкцій на імплантатах",
            "Моделювання 3D-моделей, віск для вицвітання, тимчасові вироби, штучні ясна, бази, ковпачки/шаблони",
            "Вініри/фрезерований дисилікат літію",
        ],
        image: "/ourServices/7c93d4e891eae89e2641a4d88dd16a63affc8abf.png",
    },
    {
        title: "Інші типи робіт в лабораторії",
        items: [
            "Тимчасові конструкції All on 4/6",
            "Тимчасові реставрації",
            "Центрофікс",
            "Ваксап",
            "Пресування",
            "Лазерне спікання",
        ],
        image: "/ourServices/ad8374d49bed8a3a749198f55a6d011f30cba89f.png",
    },
];

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
            className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8 rounded-[30px] bg-[#F6F6F6] p-8 lg:min-h-[240px] w-full"
        >
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 lg:gap-10 flex-1 w-full">
                {/* Circle with number */}
                <div
                    className="flex w-[60px] h-[60px] shrink-0 items-center justify-center rounded-full border-[0.5px] border-[#B81B3A]"
                >
                    <span className="text-[36px] font-light text-[#7B0E23]" style={{ fontFamily: "var(--font-inter)" }}>
                        {index}
                    </span>
                </div>

                {/* Title and Items List grouped in a column */}
                <div className="flex flex-col gap-4 flex-1">
                    <h3
                        className="text-[28px] lg:text-[36px] font-normal leading-[1.1] text-[#141414]"
                        style={{ fontFamily: "var(--font-gilroy, Gilroy, sans-serif)" }}
                    >
                        {title}
                    </h3>

                    <div className="overflow-hidden">
                        <div className="flex flex-wrap items-center -ml-6 lg:-ml-8 gap-y-3">
                            {items.map((item) => (
                                <div
                                    key={item}
                                    className="relative pl-6 lg:pl-8 flex items-center"
                                >
                                    {/* The dot is always before EACH item, but for the first item on EACH line, 
                                        the parent's -ml-6 and overflow-hidden will clip it out of view. */}
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
                </div>
            </div>

            {/* Image */}
            <div className="relative w-full md:w-[259px] h-[159px] shrink-0 rounded-[12px] overflow-hidden">
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
    return (
        <section className="py-8 md:py-12 lg:py-16">
            <Container className="flex flex-col gap-6 md:gap-8 md:mb-[40px] mb-[32px]">
                <div className="flex flex-col items-stretch justify-between gap-4 min-[768px]:flex-row flex-col-reverse max-[500px]:flex-col max-[400px]:items-center min-[768px]:items-start min-[768px]:gap-8 min-[1440px]:flex-row">
                    <Title
                        as="h2"
                        className="min-w-0 shrink-0 min-[400px]:text-[36px] min-[400px]:leading-[36px]"
                    >
                        Наші послуги
                    </Title>
                    <Description className="min-w-0 max-w-[60ch]">
                        {DESCRIPTION}
                    </Description>
                </div>

                <div className="flex flex-col gap-6">
                    {SERVICES.map((service, idx) => (
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
