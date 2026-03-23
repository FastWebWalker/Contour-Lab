"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { BLOG_POSTS } from "@/components/data/blogData";
import { BlogCardsSection } from "@/components/sections/BlogCardsSection";

export default function BlogPostPage() {
    const params = useParams();
    const id = Number(params.id);
    const [activeSection, setActiveSection] = React.useState("article");

    const post = BLOG_POSTS.find((p) => p.id === id);

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { threshold: 0.3, rootMargin: "-10% 0px -40% 0px" }
        );

        const sections = ["article", "share-area", "other-articles"];
        sections.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    if (!post) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-white">
            <section className="mt-[30px] min-[1024px]:mt-[100px] py-[60px]">
                <Container>
                    <div className="grid grid-cols-1 min-[1024px]:grid-cols-[1fr_774px_1fr] gap-6 md:gap-8 relative overflow-visible">

                        {/* Share & Copy Buttons: Top/Mobile or Sticky Left/Desktop */}
                        <aside className="h-fit flex min-[1024px]:flex-col gap-3 items-center min-[1024px]:justify-self-start min-[1024px]:sticky min-[1024px]:top-[120px]">
                            <button
                                className="flex h-[33px] w-[33px] items-center justify-center rounded-full border border-[#E0E0E0] p-[5px] transition-all hover:bg-gray-100 hover:scale-105 active:scale-95"
                                aria-label="Share"
                                onClick={() => {
                                    if (navigator.share) {
                                        navigator.share({ title: post.title, url: window.location.href });
                                    }
                                }}
                            >
                                <Image src="/icons/blog/share.svg" alt="Share" width={16} height={16} />
                            </button>
                            <button
                                className="flex h-[33px] w-[33px] items-center justify-center rounded-full border border-[#E0E0E0] p-[5px] transition-all hover:bg-gray-100 hover:scale-105 active:scale-95"
                                aria-label="Copy Link"
                                onClick={() => {
                                    navigator.clipboard.writeText(window.location.href);
                                    alert("Link copied!");
                                }}
                            >
                                <Image src="/icons/blog/copy.svg" alt="Copy" width={16} height={16} />
                            </button>
                        </aside>

                        {/* Central Article Card */}
                        <article
                            id="article"
                            className="w-full max-w-[774px] justify-self-center shrink-0 rounded-[30px] bg-[#F6F6F6] p-4 md:p-8 shadow-sm"
                        >
                            <div className="flex flex-col gap-8">
                                {/* Feature Image */}
                                <div className="relative aspect-[710/400] w-full overflow-hidden rounded-[20px]">
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                </div>

                                {/* Article Content */}
                                <div className="flex flex-col gap-6">
                                    <h1
                                        className="text-[28px] font-medium leading-tight text-[#141414] md:text-[36px]"
                                        style={{ fontFamily: "Gilroy, ui-sans-serif, system-ui, sans-serif" }}
                                    >
                                        {post.title}
                                    </h1>

                                    <div
                                        className="prose prose-lg max-w-none text-[16px] leading-[1.6] text-[#555] md:text-[18px]"
                                        style={{ fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif" }}
                                        dangerouslySetInnerHTML={{ __html: post.content }}
                                    />
                                </div>

                                {/* Bottom Share links */}
                                <div id="share-area" className="flex gap-6 mt-4 border-t border-gray-200 pt-6">
                                    <button
                                        onClick={() => navigator.share?.({ title: post.title, url: window.location.href })}
                                        className="flex items-center gap-2 text-[14px] text-[#555] hover:text-[#7B0E23] transition-all font-medium"
                                    >
                                        <Image src="/icons/blog/share.svg" alt="Share" width={16} height={16} /> <span>Поширити</span>
                                    </button>
                                    <button
                                        onClick={() => {
                                            navigator.clipboard.writeText(window.location.href);
                                            alert("Link copied!");
                                        }}
                                        className="flex items-center gap-2 text-[14px] text-[#555] hover:text-[#7B0E23] transition-all font-medium"
                                    >
                                        <Image src="/icons/blog/copy.svg" alt="Copy" width={16} height={16} /> <span>Скопіювати</span>
                                    </button>
                                </div>
                            </div>
                        </article>

                        {/* Right sidebar: Navigation Indicator */}
                        <aside className="sticky top-[120px] h-fit hidden min-[1024px]:flex flex-col gap-3 w-fit justify-self-end">
                            <nav className="flex flex-col gap-3 w-fit">
                                <a href="#article" className="flex items-center gap-3 group">
                                    <Image
                                        src={activeSection === "article" ? "/icons/blog/indicator-active.svg" : "/icons/blog/indicator-inactive.svg"}
                                        alt="indicator"
                                        width={1}
                                        height={21}
                                    />
                                    <span
                                        className={`text-[14px] font-medium leading-[20px] transition-colors ${activeSection === "article" ? "text-[#7B0E23]" : "text-[#939393] group-hover:text-gray-600"}`}
                                        style={{ fontFamily: "Inter" }}
                                    >
                                        Стаття
                                    </span>
                                </a>
                                <a href="#share-area" className="flex items-center gap-3 group">
                                    <Image
                                        src={activeSection === "share-area" ? "/icons/blog/indicator-active.svg" : "/icons/blog/indicator-inactive.svg"}
                                        alt="indicator"
                                        width={1}
                                        height={21}
                                    />
                                    <span
                                        className={`text-[14px] font-medium leading-[20px] transition-colors ${activeSection === "share-area" ? "text-[#7B0E23]" : "text-[#939393] group-hover:text-gray-600"}`}
                                        style={{ fontFamily: "Inter" }}
                                    >
                                        Поширити
                                    </span>
                                </a>
                                <a href="#other-articles" className="flex items-center gap-3 group">
                                    <Image
                                        src={activeSection === "other-articles" ? "/icons/blog/indicator-active.svg" : "/icons/blog/indicator-inactive.svg"}
                                        alt="indicator"
                                        width={1}
                                        height={21}
                                    />
                                    <span
                                        className={`text-[14px] font-medium leading-[20px] transition-colors ${activeSection === "other-articles" ? "text-[#7B0E23]" : "text-[#939393] group-hover:text-gray-600"}`}
                                        style={{ fontFamily: "Inter" }}
                                    >
                                        Інші Матеріали
                                    </span>
                                </a>
                            </nav>
                        </aside>
                    </div>
                </Container>
            </section>

            {/* Other Articles Section */}
            <section id="other-articles" className="bg-white py-12 md:py-20 border-t border-gray-100 mt-10">
                <Container>
                    <div className="mb-10">
                        <h2
                            className="text-[32px] font-medium text-[var(--Black,#141414)] md:text-[52px]"
                            style={{ fontFamily: "Gilroy, ui-sans-serif, system-ui, sans-serif" }}
                        >
                            Інші Статті
                        </h2>
                    </div>
                    <BlogCardsSection limit={3} excludeId={post.id} isGridOnly={true} />
                </Container>
            </section>
        </main>
    );
}
