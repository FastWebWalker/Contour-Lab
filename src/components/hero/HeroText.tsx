"use client";

/**
 * Hero headline — fluid typography: 320px viewport → 40px, 1440px → 110px (лінійна шкала).
 * Formula: 6.25vw + 20px (clamp 40px–110px).
 */
export function HeroText() {
  return (
    <h1
      className="font-normal text-left w-full mb-[32px] md:mb-[32px] lg:mb-[56px]"
      style={{
        fontFamily: "var(--font-sans)",
        color: "var(--color-black)",
        fontSize: "clamp(40px, 6.25vw + 20px, 110px)",
        lineHeight: "clamp(36px, 5.71vw + 17.72px, 100px)",
      }}
    >
      {/* Завжди 2 слова в рядку */}
      Цифрова зуботехнічна
      <br />
      лабораторія{" "}
      <span style={{ color: "var(--color-red-main)" }}>CONTOUR</span>
    </h1>
  );
}
