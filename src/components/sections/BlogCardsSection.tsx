"use client";

import * as React from "react";
import Image from "next/image";
import { Container } from "../ui/Container";
import { PrimaryButton } from "../ui/Button";

interface BlogPost {
    id: number;
    title: string;
    description: string;
    image: string;
    href: string;
}

const BLOG_POSTS: BlogPost[] = [
    {
        id: 1,
        title: "Натхнення для дітей зі Smile Energy Group",
        description:
            "Як ми робимо візити до стоматолога святом. Соціальні ініціативи та турбота про здорове майбутнє наших маленьких пацієнтів.",
        image: "/blogSection/a29dac667cdbc3ae81cc046832a688ae7efe4469.png",
        href: "/blog/1",
    },
    {
        id: 2,
        title: "CAD/CAM: як цифрові технології змінюють усмішки",
        description:
            "Відмовтеся від ручного моделювання на користь бездоганної точності. Огляд передового обладнання для сучасних клінік та лабораторій.",
        image: "/blogSection/9f044ae8a901d8b238c5d8a7b2f6eed5b971329a.png",
        href: "/blog/2",
    },
    {
        id: 3,
        title: "Цифровий протокол: чому за 5–10 років аналогові методи зникнуть",
        description:
            "Дізнайтеся, як перехід на «цифру» прискорює лікування у 3 рази та гарантує ідеальну посадку конструкцій.",
        image: "/blogSection/124712ea29f5db0b4d0128959f6f63d64d9d8627.jpg",
        href: "/blog/3",
    },
    {
        id: 4,
        title: "Чому варто обрати циркон, а не металокераміку",
        description:
            "Порівняння міцності, естетики та біосумісності. Пояснюємо, чому діоксид цирконію став «золотим стандартом» протезування.",
        image: "/blogSection/607cafae74dde3fa8921f38515225041e4619746.jpg",
        href: "/blog/4",
    },
    {
        id: 5,
        title: "Топ-5 матеріалів, з якими працює сучасна зуботехнічна лабораторія",
        description:
            "Від склокераміки до гібридних композитів: детальний розбір характеристик матеріалів, що забезпечують природний вигляд зубів.",
        image: "/blogSection/a09fe16c369229f1c819664e0d93976c56fb644c.jpg",
        href: "/blog/5",
    },
    {
        id: 6,
        title: "Чому співпраця лікаря і лабораторії критично важлива",
        description:
            "Синергія, що мінімізує помилки. Як налагоджена комунікація між кабінетом та майстернею впливає на фінальний результат.",
        image: "/blogSection/0a1296d8b962b29022950cd04446a9a73ee1e261.jpg",
        href: "/blog/6",
    },
];

function BlogCard({ title, description, image, href }: BlogPost) {
    return (
        <article
            className="flex flex-col items-start gap-2.5 rounded-[30px] p-4 transition-shadow hover:shadow-md"
            style={{
                background: "var(--Grey-Light, #F6F6F6)",
                // Removed fixed height to allow content to breathe, but user requested 570px.
                // I'll set min-height or height if strict, but flex-col with space-between is better.
                minHeight: "570px",
            }}
        >
            {/* Image Container */}
            <div className="relative aspect-[380/236] w-full overflow-hidden rounded-[20px]">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
            </div>

            {/* Content Area */}
            <div className="flex flex-1 flex-col justify-between gap-4 self-stretch pt-2">
                <div className="flex flex-col gap-3">
                    <h3
                        className="line-clamp-3 text-[24px] font-medium leading-normal min-[768px]:text-[28px] min-h-[34px] lg:min-h-[102px]"
                        style={{
                            color: "var(--Black, #141414)",
                            fontFamily: "Gilroy, ui-sans-serif, system-ui, sans-serif",
                        }}
                    >
                        {title}
                    </h3>
                    <p
                        className="line-clamp-4 text-[18px] font-normal leading-normal min-[768px]:text-[20px]"
                        style={{
                            color: "var(--Grey-Hard, #555)",
                            fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
                            alignSelf: "stretch",
                        }}
                    >
                        {description}
                    </p>
                </div>

                <div>
                    <PrimaryButton
                        size="md"
                        className="!px-6 !py-3 !text-[16px] min-w-0"
                    >
                        Читати Більше
                    </PrimaryButton>
                </div>
            </div>
        </article>
    );
}

export function BlogCardsSection() {
    return (
        <section className="py-10 md:py-[60px]">
            <Container>
                <div className="grid grid-cols-1 gap-x-6 gap-y-10 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-12">
                    {BLOG_POSTS.map((post) => (
                        <BlogCard key={post.id} {...post} />
                    ))}
                </div>
            </Container>
        </section>
    );
}
