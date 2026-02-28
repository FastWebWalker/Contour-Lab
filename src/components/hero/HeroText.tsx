"use client";

/**
 * Hero headline from Figma (nodes 139-898, 173-2047, 173-2554).
 * Adaptive: font size and line breaks by viewport (4 lines on mobile, 2 on desktop).
 */
export function HeroText() {
  return (
    <h1
      className="font-bold tracking-tight text-left w-full leading-[1.15] text-[24px] sm:text-[30px] md:text-[36px] lg:text-[42px] xl:text-[52px]"
      style={{
        fontFamily: "var(--font-sans)",
        color: "var(--color-black)",
      }}
    >
      {/* Mobile (node 173-2554): 4 lines; tablet/desktop (139-898, 173-2047): 2 lines */}
      <span className="block sm:inline">Цифрова</span>{" "}
      <span className="block sm:inline">зуботехнічна</span>
      <br className="hidden sm:block" />
      <span className="block sm:inline">лабораторія</span>{" "}
      <span
        className="block sm:inline"
        style={{ color: "var(--color-red-main)" }}
      >
        CONTOUR
      </span>
    </h1>
  );
}
