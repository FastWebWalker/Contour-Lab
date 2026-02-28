"use client";

import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="flex items-center group">
      <img
        src="/logo.svg"
        alt="Contour dental laboratory"
        width={165}
        height={65}
        className="w-[103.829px] h-[41.109px] md:w-[164.171px] md:h-[65px] lg:w-[146.491px] lg:h-[58px] object-contain"
      />
    </Link>
  );
}
