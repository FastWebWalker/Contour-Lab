"use client";

import Link from "next/link";

export interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

export function NavLink({ href, children }: NavLinkProps) {
  return (
    <Link
      href={href}
      className="px-4 py-2.5 rounded-full text-[15px] font-medium transition-colors border border-[#e8e8e8] bg-white hover:border-[#ddd] hover:bg-[#fafafa]"
      style={{
        color: "var(--color-black)",
        fontFamily: "var(--font-sans)",
      }}
    >
      {children}
    </Link>
  );
}
