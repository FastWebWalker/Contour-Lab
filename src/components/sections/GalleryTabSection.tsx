"use client";

import * as React from "react";
import Image from "next/image";
import { Container } from "../ui/Container";
import { getImagesForTab } from "../gallery/galleryTabData";
import type { GalleryManifest, GalleryTabId } from "../gallery/galleryTypes";

const tabBaseClass =
  "inline-flex h-[54px] shrink-0 items-center justify-center gap-2.5 rounded-[30px] px-4 py-3 text-[20px] font-normal leading-normal not-italic transition-all duration-200";

const tabTextStyle: React.CSSProperties = {
  color: "var(--Black, #141414)",
  fontFamily: "var(--font-inter), Inter, sans-serif",
};

export interface GalleryTabSectionProps {
  manifest: GalleryManifest;
}

export function GalleryTabSection({ manifest }: GalleryTabSectionProps) {
  const [active, setActive] = React.useState<GalleryTabId>("all");
  const images = React.useMemo(
    () => getImagesForTab(manifest, active),
    [manifest, active]
  );

  return (
    <section
      aria-label="Галерея робіт за категоріями"
      className="w-full bg-transparent pt-16 pb-4 min-[1024px]:pt-20"
    >
      <Container>
        {/* Tabs */}
        <div
          className="mb-8 flex min-[1024px]:mb-10 flex-nowrap items-center justify-center gap-2.5 overflow-x-auto pb-px scrollbar-hide min-[480px]:gap-6 min-[1024px]:gap-[44px]"
          role="tablist"
          aria-label="Категорії галереї"
        >
          {manifest.tabs.map(({ id, label }) => {
            const isActive = active === id;
            return (
              <button
                key={id}
                type="button"
                role="tab"
                id={`gallery-tab-${id}`}
                aria-selected={isActive}
                aria-controls="gallery-grid-panel"
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActive(id)}
                className={[
                  tabBaseClass,
                  isActive
                    ? "border border-[var(--color-red-main)] bg-white shadow-[0_2px_12px_rgba(185,4,15,0.1)]"
                    : "border border-[#D8D8D8] bg-white hover:border-[var(--color-grey)] hover:bg-[var(--color-light-grey)]/80",
                ].join(" ")}
                style={tabTextStyle}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div
          id="gallery-grid-panel"
          role="tabpanel"
          aria-labelledby={`gallery-tab-${active}`}
          className="grid grid-cols-1 gap-4 min-[640px]:grid-cols-2 min-[640px]:gap-5 lg:grid-cols-4"
        >
          {images.map((src, index) => (
            <figure
              key={`${active}-${index}-${src}`}
              className="group relative aspect-[26/17] w-full min-h-0 min-w-0 overflow-hidden rounded-2xl bg-[var(--color-light-grey)] shadow-[0_1px_3px_rgba(0,0,0,0.06)] ring-1 ring-[rgba(20,20,20,0.06)] transition-[box-shadow,transform] duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)] hover:ring-2 hover:ring-[var(--color-red-main)]/15"
            >
              <Image
                src={src}
                alt=""
                fill
                className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw"
              />
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
