"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { BLOG_POSTS } from "@/components/data/blogData";
import { BlogCardsSection } from "@/components/sections/BlogCardsSection";

export default function BlogPostPage() {
    const params = useParams();
    const id = Number(params.id);

    const post = BLOG_POSTS.find((p) => p.id === id);

    if (!post) {
        notFound();
    }

    return (
        <main className="min-h-screen">
            <section className="py-12 md:py-20 mt-25">
                <Container>
                    <div className="mx-auto max-w-[900px]">

                        {/* Feature Image */}
                        <div className="relative mb-12 aspect-[16/9] w-full overflow-hidden rounded-[30px]">
                            <Image
                                src={post.image}
                                alt={post.title}
                                fill
                                className="object-cover"
                                priority
                                sizes="(max-width: 1024px) 100vw, 900px"
                            />
                        </div>

                        {/* Article Header */}
                        <h1
                            className="mb-8 text-[32px] font-medium leading-tight text-[var(--Black,#141414)] md:text-[48px]"
                            style={{ fontFamily: "Gilroy, ui-sans-serif, system-ui, sans-serif" }}
                        >
                            {post.title}
                        </h1>

                        {/* Article Content */}
                        <div
                            className="prose prose-lg max-w-none text-[18px] leading-relaxed text-[var(--Grey-Hard,#555)] md:text-[20px]"
                            style={{ fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif" }}
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />
                    </div>
                </Container>
            </section>

            {/* Other Articles Section */}
            <section className="bg-[var(--Grey-Light,#F6F6F6)] py-12 md:py-20">
                <Container>
                    <div className="mb-10 flex items-center justify-between">
                        <h2
                            className="text-[32px] font-medium text-[var(--Black,#141414)] md:text-[52px]"
                            style={{ fontFamily: "Gilroy, ui-sans-serif, system-ui, sans-serif" }}
                        >
                            Інші Статті
                        </h2>
                        <Link
                            href="/blog"
                            className="text-[16px] font-medium text-[var(--color-red-main)] hover:underline"
                        >
                            Всі новини →
                        </Link>
                    </div>
                    <BlogCardsSection limit={3} excludeId={post.id} isGridOnly={true} />
                </Container>
            </section>
        </main>
    );
}
