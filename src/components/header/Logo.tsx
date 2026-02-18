"use client";

import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="flex items-center group">
      <img
        src="/logo.svg"
        alt="Contour dental laboratory"
        width={147}
        height={58}
        className="h-12 w-auto object-contain"
      />
    </Link>
  );
}
