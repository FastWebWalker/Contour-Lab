"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Container } from "../ui/Container";

const iconBox =
  "relative flex h-[60px] w-[98px] shrink-0 items-center justify-center md:h-[95px] md:w-[153px]";

const iconSet = (
  <>
    <div
      className="flex shrink-0 items-center justify-center p-[2px] md:p-[4px] h-[60px] w-[98px] md:h-[95px] md:w-[153px]"
    >
      <Image
        src="/icons/smile-line.png"
        alt=""
        width={149}
        height={87}
        className="h-[56px] w-[94px] shrink-0 object-contain object-center md:h-[87px] md:w-[149px]"
      />
    </div>
    <div
      className="flex shrink-0 items-center justify-center pt-[16.5px] pr-[15px] pb-[15.5px] pl-[15px] md:pt-[30px] md:pr-[32px] md:pb-[29px] md:pl-[33px] h-[60px] w-[98px] md:h-[95px] md:w-[153px]"
    >
      <Image
        src="/icons/tri-logo.png"
        alt=""
        width={88}
        height={36}
        className="shrink-0 object-contain object-center"
      />
    </div>
    <div className={iconBox}>
      <Image
        src="/icons/partner2.svg"
        alt=""
        fill
        className="object-contain object-center"
        sizes="(max-width: 767px) 98px, 153px"
        unoptimized
      />
    </div>
    <div className={iconBox}>
      <Image
        src="/icons/ods.png"
        alt=""
        fill
        className="object-contain object-center"
        sizes="(max-width: 767px) 98px, 153px"
      />
    </div>
    <div className={iconBox}>
      <Image
        src="/icons/partner.svg"
        alt=""
        fill
        className="object-contain object-center"
        sizes="(max-width: 767px) 98px, 153px"
        unoptimized
      />
    </div>
    <div
      className="flex shrink-0 items-center justify-center pt-[21px] pr-[15px] pb-[20px] pl-[15px] md:pt-[33px] md:pr-[24px] md:pb-[32px] md:pl-[24px] h-[60px] w-[98px] md:h-[95px] md:w-[153px]"
    >
      <Image
        src="/icons/miyo.png"
        alt=""
        width={105}
        height={30}
        className="h-[19px] w-[67px] shrink-0 object-contain object-center md:h-[30px] md:w-[105px]"
      />
    </div>
    <div
      className="flex shrink-0 items-center justify-center pt-[17px] pr-[15px] pb-[16px] pl-[15px] md:pt-[27px] md:pr-[22.857px] md:pb-[26px] md:pl-[23px] h-[60px] w-[98px] md:h-[95px] md:w-[153px]"
    >
      <Image
        src="/icons/ameralabs.png"
        alt=""
        width={107.143}
        height={42}
        className="h-[27px] w-[69px] shrink-0 object-contain object-center md:h-[42px] md:w-[107.143px]"
        style={{ aspectRatio: "125/49" }}
      />
    </div>
  </>
);

export function IconsSection() {
  const t = useTranslations("iconsSection");
  return (
    <section
      className="flex w-full items-center self-stretch overflow-hidden py-2 md:py-4 lg:py-8"
      aria-label={t("aria")}
    >
      <Container className="overflow-hidden">
        <div
          className="flex shrink-0 items-center gap-8"
          style={{
            animation: "icons-carousel 40s linear infinite",
            width: "max-content",
          }}
        >
          {iconSet}
          {iconSet}
        </div>
      </Container>
    </section>
  );
}
