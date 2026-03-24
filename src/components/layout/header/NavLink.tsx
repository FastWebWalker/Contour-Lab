"use client";

import Link from "next/link";

export interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function NavLink({ href, children, className = "", onClick }: NavLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`rounded-full font-medium transition-colors border border-[#e8e8e8] bg-white hover:border-[#ddd] hover:bg-[#fafafa] px-3 py-2 text-[13px] lg:px-[12px] lg:py-2 lg:text-[14px] xl:px-[16px] xl:py-[10px] xl:text-[15px] ${className}`.trim()}
      style={{
        color: "var(--color-black)",
        fontFamily: "var(--font-inter)",
      }}
    >
      {children}
    </Link>
  );
}
