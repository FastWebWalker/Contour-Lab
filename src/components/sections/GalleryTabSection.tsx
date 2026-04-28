"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { ArrowRightIcon } from "../icons/ArrowRight";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Container } from "../ui/Container";
import { getImagesForTab } from "../gallery/galleryTabData";
import type { GalleryManifest, GalleryTabId } from "../gallery/galleryTypes";
import {
  fadeUpVariants,
  sectionViewport,
  MOTION_EASE,
  motionConfig,
} from "@/lib/motion";

const TAB_MSG_KEY: Record<GalleryTabId, "tabs.all" | "tabs.veneers" | "tabs.bridges" | "tabs.anatomy" | "tabs.allon"> = {
  all: "tabs.all",
  veneers: "tabs.veneers",
  bridges: "tabs.bridges",
  anatomy: "tabs.anatomy",
  allon: "tabs.allon",
};

const tabBaseClass =
  "inline-flex h-[54px] shrink-0 items-center justify-center gap-[10px] rounded-[30px] px-[16px] py-[12px] text-[20px] font-normal leading-normal not-italic whitespace-nowrap transition-all duration-200 cursor-pointer";

const tabTextStyle: React.CSSProperties = {
  color: "var(--Black, #141414)",
  fontFamily: "var(--font-inter), Inter, sans-serif",
};

export interface GalleryTabSectionProps {
  manifest: GalleryManifest;
}

export function GalleryTabSection({ manifest }: GalleryTabSectionProps) {
  const t = useTranslations("galleryTab");
  const reduced = useReducedMotion() ?? false;
  const [active, setActive] = React.useState<GalleryTabId>("all");
  const [selectedIdx, setSelectedIdx] = React.useState<number | null>(null);

  const images = React.useMemo(
    () => getImagesForTab(manifest, active),
    [manifest, active]
  );

  const openLightbox = (idx: number) => setSelectedIdx(idx);
  const closeLightbox = () => setSelectedIdx(null);
  const nextImage = () => {
    if (selectedIdx === null) return;
    setSelectedIdx((selectedIdx + 1) % images.length);
  };
  const prevImage = () => {
    if (selectedIdx === null) return;
    setSelectedIdx((selectedIdx - 1 + images.length) % images.length);
  };

  // Lock scroll when lightbox is open
  React.useEffect(() => {
    if (selectedIdx !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedIdx]);

  // Keyboard support
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIdx === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIdx, images.length]);

  return (
    <section
      aria-label={t("sectionAria")}
      className="w-full bg-white relative z-10 pt-6 pb-4 min-[1024px]:pt-20"
    >
      <Container>
        {/* Tabs — fade up on scroll */}
        <motion.div
          className="mb-8 min-[1024px]:mb-10 overflow-x-auto lg:overflow-x-visible scrollbar-hide -mx-4 min-[768px]:-mx-8 min-[1440px]:-mx-[80px] lg:mx-0"
          variants={fadeUpVariants(reduced)}
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport({ amount: 0.5 })}
        >
          <div
            className="flex flex-nowrap items-center justify-start min-[1024px]:justify-center gap-[10px] min-[480px]:gap-[16px] min-[1024px]:gap-[24px] pl-4 min-[768px]:pl-8 min-[1440px]:pl-[80px] lg:pl-0 py-1 after:content-[''] after:min-w-[16px] after:min-h-[1px] after:shrink-0 min-[768px]:after:min-w-[32px] min-[1440px]:after:min-w-[80px] lg:after:min-w-0"
            role="tablist"
            aria-label={t("tabsAria")}
          >
            {manifest.tabs.map(({ id }) => {
              const isActive = active === id;
              const label = t(TAB_MSG_KEY[id]);
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
                      ? "border-[1px] border-[#B9040F] bg-white shadow-[0_2px_12px_rgba(185,4,15,0.1)]"
                      : "border-[1px] border-[#D8D8D8] bg-white hover:border-[var(--color-grey)] hover:bg-[var(--color-light-grey)]/80",
                  ].join(" ")}
                  style={tabTextStyle}
                >
                  {label}
                </button>
              );
            })}

          </div>
        </motion.div>

        {/* Grid — AnimatePresence for tab switch, cascade fade-up per image */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            id="gallery-grid-panel"
            role="tabpanel"
            aria-labelledby={`gallery-tab-${active}`}
            className="grid grid-cols-1 gap-4 min-[640px]:grid-cols-2 min-[640px]:gap-5 lg:grid-cols-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: reduced ? 0 : 0.25,
              ease: MOTION_EASE,
            }}
          >
            {images.map((src, index) => (
              <motion.figure
                key={`${active}-${index}-${src}`}
                onClick={() => openLightbox(index)}
                className="group relative aspect-[26/17] w-full min-h-0 min-w-0 cursor-zoom-in overflow-hidden rounded-2xl bg-[var(--color-light-grey)] shadow-[0_1px_3px_rgba(0,0,0,0.06)] ring-1 ring-[rgba(20,20,20,0.06)] transition-[box-shadow,transform] duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)] hover:ring-2 hover:ring-[var(--color-red-main)]/15"
                initial={{ opacity: 0, y: motionConfig.offset.card }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: reduced ? 0 : motionConfig.duration.sectionCard,
                  delay: reduced ? 0 : index * 0.06,
                  ease: MOTION_EASE,
                }}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw"
                />
              </motion.figure>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Lightbox Overlay — rendered via Portal to escape stacking context */}
        {typeof document !== "undefined" && createPortal(
        <AnimatePresence>
          {selectedIdx !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/90 p-4 transition-colors"
              onClick={closeLightbox}
            >
              <motion.div
                key={images[selectedIdx]}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex h-full w-full max-w-7xl items-center justify-center"
              >
                <div
                  className="relative h-[85vh] w-full overflow-hidden rounded-lg"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Image
                    src={images[selectedIdx]}
                    alt=""
                    fill
                    className="object-contain"
                    priority
                    sizes="100vw"
                  />
                </div>

                {/* Close button */}
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
                  className="absolute top-4 right-4 flex h-[48px] w-[48px] items-center justify-center rounded-full border border-white/30 bg-black/40 backdrop-blur-sm text-white transition-all hover:bg-white/20 hover:border-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 cursor-pointer"
                  aria-label="Close"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>

                {/* Prev arrow */}
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); prevImage(); }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 hidden md:flex h-[60px] w-[60px] items-center justify-center rounded-full border border-white/30 bg-black/40 backdrop-blur-sm transition-all hover:bg-white/20 hover:border-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 cursor-pointer"
                  aria-label="Previous"
                >
                  <ArrowRightIcon className="rotate-180 text-white" size={32} />
                </button>

                {/* Next arrow */}
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); nextImage(); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 hidden md:flex h-[60px] w-[60px] items-center justify-center rounded-full border border-white/30 bg-black/40 backdrop-blur-sm transition-all hover:bg-white/20 hover:border-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 cursor-pointer"
                  aria-label="Next"
                >
                  <ArrowRightIcon className="text-white" size={32} />
                </button>

                {/* Counter */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 pb-4 text-white/50 font-['Inter'] text-sm">
                  {selectedIdx + 1} / {images.length}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
        )}
      </Container>
    </section>
  );
}
