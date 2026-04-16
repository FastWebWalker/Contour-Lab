"use client";

import * as React from "react";
import Image from "next/image";
import { CardWrapper } from "../ui/CardWrapper";
import { Button } from "../ui/Button";
import { ArrowRightIcon } from "../icons/ArrowRight";

const RED_DOT = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="9"
    height="9"
    viewBox="0 0 9 9"
    fill="none"
    className="mt-[0.35em] shrink-0"
    aria-hidden
  >
    <circle cx="4.5" cy="4.5" r="4.5" fill="var(--color-red-main, #B9040F)" />
  </svg>
);

export interface JobCardProps {
  title: string;
  dateText: string;
  salaryText: string;
  locationType: string;
  description: string;
  bullets: string[];
  applyLabel?: string;
  imageSrc: string;
  className?: string;
  onApplyClick?: () => void;
}

export function JobCard({
  title,
  dateText,
  salaryText,
  locationType,
  description,
  bullets,
  applyLabel = "Відгукнутись",
  imageSrc,
  className = "",
  onApplyClick,
}: JobCardProps) {
  return (
    <CardWrapper
      as="article"
      aria-label={title}
      widthClassName="w-full max-w-full"
      paddingClassName="p-4 md:p-8"
      className={[
        "!grid !grid-cols-1 !gap-8 !items-stretch min-[1281px]:!grid-cols-[minmax(0,3fr)_minmax(0,2fr)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="flex min-w-0 w-full flex-col gap-6">
        <div className="flex w-full flex-wrap items-center justify-between gap-3 self-stretch sm:gap-4">
          <h2
            className="text-[32px] font-normal leading-normal text-[var(--Black,#141414)]"
            style={{ fontFamily: "Gilroy-Medium, Gilroy, ui-sans-serif, sans-serif" }}
          >
            {title}
          </h2>
          <p
            className="shrink-0 text-[22px] font-normal leading-normal text-[var(--color-grey-hard)]"
            style={{ fontFamily: "Gilroy-Light, Gilroy, ui-sans-serif, sans-serif" }}
          >
            {dateText}
          </p>
        </div>

        <div className="flex w-full flex-wrap items-center justify-between gap-3 self-stretch sm:gap-4">
          <p
            className="text-[28px] font-normal leading-normal text-[var(--color-red-dark)]"
            style={{ fontFamily: "Gilroy-Medium, Gilroy, ui-sans-serif, sans-serif" }}
          >
            {salaryText}
          </p>
          <p
            className="shrink-0 text-[22px] font-normal leading-normal text-[var(--color-grey-hard)]"
            style={{ fontFamily: "Gilroy-Medium, Gilroy, ui-sans-serif, sans-serif" }}
          >
            {locationType}
          </p>
        </div>

        <p
          className="text-[24px] font-normal leading-normal text-[var(--Black,#141414)]"
          style={{ fontFamily: "Gilroy, ui-sans-serif, sans-serif" }}
        >
          {description}
        </p>

        <ul className="flex flex-col gap-2.5">
          {bullets.map((item) => (
            <li
              key={item}
              className="flex items-start gap-4 text-[20px] font-normal leading-normal text-black"
              style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
            >
              {RED_DOT}
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <Button
          type="button"
          variant="primary"
          size="md"
          rightIcon={<ArrowRightIcon className="shrink-0 text-white" size={22} />}
          className="!h-auto !min-h-0 !min-w-0 self-start rounded-[40px] px-6 py-3 !text-[17px] gap-1.5"
          onClick={onApplyClick}
        >
          {applyLabel}
        </Button>
      </div>

      <div
        className="relative w-full max-w-none shrink-0 overflow-hidden rounded-[30px] bg-[lightgray] min-w-0 max-[1280px]:h-[clamp(200px,50vw,640px)] max-[1280px]:min-h-0 min-[1281px]:h-full min-[1281px]:min-h-0 min-[1281px]:self-stretch"
        aria-hidden
      >
        <Image
          src={imageSrc}
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 1280px) 100vw, 40vw"
        />
      </div>
    </CardWrapper>
  );
}
