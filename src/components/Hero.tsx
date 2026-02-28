"use client";

import Image from "next/image";
import Link from "next/link";
import { Container } from "./Container";
import { PrimaryButton } from "./Button";
import { ArrowRightIcon } from "./icons/ArrowRight";
import { ArrowDownIcon } from "./icons/ArrowDown";
import { HeroText } from "./hero/HeroText";

const socialLinks = [
  { href: "mailto:info@contour-lab.com", src: "/hero/mail.svg", label: "Email" },
  { href: "https://facebook.com", src: "/hero/Social Icons.svg", label: "Facebook" },
  { href: "https://instagram.com", src: "/hero/Social Icons2.svg", label: "Instagram" },
];

export function Hero() {
  return (
    <div className="m-5">
      <section
        className="relative min-h-[100vh] flex flex-col lg:pt-20"
        style={{ backgroundColor: "var(--color-hero-bg)", borderRadius: "50px" }}
      >
        {/* Content + image */}
      <div className="relative flex-1 flex flex-col overflow-hidden min-h-0 lg:pb-24">
        {/* 3D dental image - right side */}
        <div
          className="absolute inset-0 pointer-events-none select-none"
          aria-hidden
        >
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[55vw] min-[1024px]:w-[50vw] h-[70vmin] min-[1024px]:h-[75vmin] relative">
            <Image
              src="/hero/7b7fbb3ad26234ca858aa8faaca96040a8017e3f.png"
              alt=""
              fill
              className="object-contain object-right mix-blend-lighten opacity-95"
              sizes="(max-width: 1024px) 55vw, 50vw"
              priority
            />
          </div>
        </div>

        <Container className="relative z-10 flex-1 flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-8">
        {/* Left: headline, subtitle, CTAs, stats */}
        <div className="flex flex-col gap-6 lg:gap-8 max-w-xl lg:max-w-[48%]">
          <HeroText />
          <p
            className="text-base lg:text-lg leading-relaxed"
            style={{
              color: "var(--color-grey-hard)",
              fontFamily: "var(--font-sans)",
            }}
          >
            Зробіть своє перше замовлення та отримайте тимчасову конструкцію на
            спеціальних умовах!
          </p>
          <div className="flex flex-wrap gap-3">
            <PrimaryButton size="lg">
              Зробити замовлення
            </PrimaryButton>
            <Link
              href="#price"
              className="inline-flex items-center justify-center font-medium rounded-full h-14 px-8 text-[17px] gap-3.5 bg-white text-[var(--color-red-main)] border border-[var(--color-red-main)] hover:bg-[var(--color-red-main)] hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-red-main)] focus:ring-offset-2"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Завантажити Прайс
              <ArrowRightIcon className="shrink-0" size={22} />
            </Link>
          </div>
          {/* Statistics - two lines, left-aligned (design: bottom left of hero) */}
          <div className="flex flex-col gap-2 mt-2">
            <div className="flex items-baseline gap-2">
              <span
                className="text-3xl lg:text-4xl font-bold"
                style={{
                  color: "var(--color-red-main)",
                  fontFamily: "var(--font-sans)",
                }}
              >
                600+
              </span>
              <span
                className="text-base lg:text-lg"
                style={{
                  color: "var(--color-grey-hard)",
                  fontFamily: "var(--font-sans)",
                }}
              >
                дуже задоволених клієнтів
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span
                className="text-3xl lg:text-4xl font-bold"
                style={{
                  color: "var(--color-red-main)",
                  fontFamily: "var(--font-sans)",
                }}
              >
                5,000+
              </span>
              <span
                className="text-base lg:text-lg"
                style={{
                  color: "var(--color-grey-hard)",
                  fontFamily: "var(--font-sans)",
                }}
              >
                успішно завершених кейсів
              </span>
            </div>
          </div>
        </div>

        {/* Spacer so content doesn't collide with image on large screens */}
        <div className="hidden lg:block flex-1 min-w-[4%]" />

        {/* Mobile: social row - white circle, red border, red icon (Figma) */}
        <div className="flex lg:hidden gap-3 justify-center">
          {socialLinks.map(({ href, src, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="w-12 h-12 rounded-full bg-white border-2 border-[var(--color-red-main)] flex items-center justify-center shrink-0 transition-opacity hover:opacity-90"
              aria-label={label}
            >
              <Image src={src} alt="" width={20} height={20} className="shrink-0" />
            </a>
          ))}
        </div>
      </Container>

      {/* Social icons - vertical stack, white circle + red border (Figma) */}
      <div className="hidden lg:flex flex-col gap-3 absolute right-6 xl:right-12 top-1/2 -translate-y-1/2 z-20 pointer-events-auto">
        {socialLinks.map(({ href, src, label }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="w-12 h-12 rounded-full bg-white border-2 border-[var(--color-red-main)] flex items-center justify-center shrink-0 transition-opacity hover:opacity-90"
            aria-label={label}
          >
            <Image src={src} alt="" width={20} height={20} className="shrink-0" />
          </a>
        ))}
      </div>

        {/* Scroll indicator - red circle, white arrow (design) */}
        <div className="flex justify-center pt-6 relative z-10">
          <a
            href="#content"
            className="w-14 h-14 rounded-full border-2 border-[var(--color-red-main)] bg-[var(--color-red-main)] flex items-center justify-center hover:opacity-90 transition-opacity"
            aria-label="Прокрутити вниз"
          >
            <ArrowDownIcon size={24} className="text-white shrink-0" />
          </a>
        </div>
      </div>
      </section>
    </div>
  );
}
