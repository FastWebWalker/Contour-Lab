"use client";

import { useTranslations } from "next-intl";
import { CardWrapper } from "@/components/ui/CardWrapper";
import { NotFoundHomeButton } from "@/components/not-found/NotFoundHomeButton";

function SvgFour() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 148 188"
      fill="none"
      className="h-[108px] w-[85px] shrink-0 md:h-[188px] md:w-[148px]"
      aria-hidden
    >
      <path
        d="M106.532 0.5L106.164 1.22559L47.4131 117.148H84.8047V77.3818H128.753V117.148H147.311V157.385H128.753V187.077H84.8047V157.385H0.5V117.529L0.553711 117.422L59.6738 0.774414L59.8125 0.5H106.532Z"
        stroke="var(--color-black)"
        strokeWidth={1}
      />
    </svg>
  );
}

function SvgZero() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 154 195"
      fill="none"
      className="h-[111px] w-[87px] shrink-0 md:h-[193px] md:w-[151.113px]"
      aria-hidden
    >
      <path
        d="M76.5566 0.5C100.382 0.500078 119.003 9.39943 132.36 27.2061C145.878 44.8151 152.612 68.2632 152.612 97.5C152.612 126.736 145.878 150.27 132.362 168.055L132.363 168.056C119.005 185.689 100.382 194.5 76.5566 194.5C52.7313 194.5 34.021 185.689 20.4863 168.059L20.4834 168.055V168.054C7.14507 150.269 0.5 126.736 0.5 97.5C0.500003 68.2646 7.14441 44.8178 20.4844 27.209L20.4854 27.208C34.0192 9.4005 52.7295 0.5 76.5566 0.5ZM76.5566 42.8574C65.6794 42.8574 57.5603 47.3659 52.1309 56.4004C46.677 65.4756 43.918 79.1528 43.918 97.5C43.918 115.847 46.677 129.524 52.1309 138.6C57.5603 147.634 65.6794 152.143 76.5566 152.143C87.4337 152.142 95.5521 147.634 100.981 138.6C106.435 129.524 109.195 115.847 109.195 97.5C109.195 79.1528 106.435 65.4756 100.981 56.4004C95.5521 47.366 87.4336 42.8575 76.5566 42.8574Z"
        stroke="var(--color-red-main)"
        strokeWidth={1}
      />
    </svg>
  );
}

export default function NotFound() {
  const t = useTranslations("notFound");
  return (
    <div className="flex w-full flex-1 flex-col items-stretch justify-center p-[20px]">
      <CardWrapper
        as="article"
        paddingClassName="py-[80px] px-6 min-[768px]:px-12 min-[768px]:py-12"
        widthClassName="w-full max-w-full shrink-0"
        className="!h-[90vh] !w-full !items-center !justify-center !gap-6"
      >
        <h1
          className="w-full text-center text-[52px] font-normal leading-[55px] tracking-tight"
          style={{
            color: "var(--Black, #141414)",
            fontFamily:
              "Gilroy, var(--font-sans), ui-sans-serif, system-ui, sans-serif",
          }}
        >
          {t("title")}
        </h1>

        <div
          className="flex flex-row flex-wrap items-end justify-center gap-1 min-[400px]:gap-2"
          aria-hidden
        >
          <SvgFour />
          <SvgZero />
          <SvgFour />
        </div>

        <p
          className="w-full max-w-[505px] text-center text-[20px] font-normal leading-normal"
          style={{
            color: "rgba(20, 20, 20, 0.85)",
            fontFamily: "var(--font-inter), Inter, sans-serif",
          }}
        >
          {t("description")}
        </p>

        <NotFoundHomeButton />
      </CardWrapper>
    </div>
  );
}
