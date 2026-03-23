"use client";

import Image from "next/image";
import { Container } from "../ui/Container";
import { PrimaryButton } from "../ui/Button";
import Link from "next/link";
import { BLOG_POSTS, type BlogPost } from "../data/blogData";

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
                    <Link href={href}>
                        <PrimaryButton
                            size="md"
                            className="!px-6 !py-3 !text-[16px] min-w-0"
                        >
                            Читати Більше
                        </PrimaryButton>
                    </Link>
                </div>
            </div>
        </article>
    );
}

export interface BlogCardsSectionProps {
    limit?: number;
    excludeId?: number;
    isGridOnly?: boolean;
}

export function BlogCardsSection({ limit, excludeId, isGridOnly }: BlogCardsSectionProps) {
    let posts = BLOG_POSTS;

    if (excludeId !== undefined) {
        posts = posts.filter(p => p.id !== excludeId);
    }

    if (limit !== undefined) {
        posts = posts.slice(0, limit);
    }

    const grid = (
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-12">
            {posts.map((post) => (
                <BlogCard key={post.id} {...post} />
            ))}
        </div>
    );

    if (isGridOnly) return grid;

    return (
        <section className="py-10 md:py-[60px]">
            <Container>
                {grid}
            </Container>
        </section>
    );
}
