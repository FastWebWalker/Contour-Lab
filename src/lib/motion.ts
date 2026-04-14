/**
 * Глобальні налаштування анімацій для секцій (Framer Motion).
 * У конкретній секції можна імпортувати `motionConfig` і перезаписати значення локально:
 *
 * @example
 * const duration = { ...motionConfig.duration, base: 0.6 };
 * transition={sectionTransition({ reduced, duration: duration.base })}
 */

import type { Variants } from "framer-motion";

/** Плавне гальмування — за замовчуванням для entrance-анімацій */
export const MOTION_EASE = [0.22, 1, 0.36, 1] as const;

/** Зворотна сумісність з hero */
export const HERO_EASE = MOTION_EASE;

export const motionConfig = {
  ease: MOTION_EASE,
  /** Тривалості (секунди) — семантичні імена; перезаписуйте під секцію */
  duration: {
    micro: 0.4,
    fast: 0.45,
    medium: 0.5,
    base: 0.55,
    slow: 0.65,
    slower: 0.7,
    /** Великі медіа / hero-зображення */
    heroMedia: 0.95,
    /** Текстовий блок у секції «чому ми» */
    sectionFadeUp: 0.52,
    sectionCard: 0.48,
    /** Великий заголовок hero (HeroText) */
    heroTitle: 0.7,
    /** Мініатюри в блоці зображення секції */
    thumbItem: 0.42,
  },
  /** Паузи між елементами в stagger */
  stagger: {
    /** Колонка блоків: заголовок → картка → сітка */
    sectionChildren: 0.09,
    delayChildrenSection: 0.08,
    /** Картки в сітці */
    gridChildren: 0.07,
    delayChildrenGrid: 0.04,
    heroButton: 0.07,
    heroSocial: 0.06,
    heroStat: 0.08,
    thumb: 0.08,
  },
  /** Абсолютні затримки (секунди) для послідовностей */
  delay: {
    heroImage: 0.08,
    heroSubtitle: 0.2,
    heroButtons: 0.32,
    heroSocial: 0.38,
    heroStats: 0.48,
    heroScroll: 0.85,
    thumbBase: 0.14,
    /** Кнопка «наступний слайд» після карток */
    servicesCarouselButton: 0.22,
  },
  /** whileInView: скільки елемента має бути видно */
  viewport: {
    once: true as const,
    section: 0.18,
    media: 0.2,
    thumb: 0.35,
    /** Горизонтальна стрічка карток (послуги) */
    carousel: 0.12,
  },
  /** Початкові зміщення (px) для fade / slide */
  offset: {
    fadeUp: 26,
    card: 20,
    heroTitle: 32,
    heroSubtitle: 18,
    heroButton: 16,
    heroSocial: 12,
    heroStat: 14,
    /** Кругла кнопка скролу вниз у hero */
    scrollHintY: 12,
    thumbX: 16,
    /** 3D-зображення в hero */
    heroImageY: 24,
    heroImageScale: 1.06,
    /** Кнопка стрілки каруселі послуг */
    carouselButtonX: 14,
  },
} as const;

/** whileInView — типові значення; можна підмінити `amount` / `margin` для конкретної секції */
export function sectionViewport(
  overrides?: Partial<{ once: boolean; amount: number; margin: string }>
) {
  return {
    once: overrides?.once ?? motionConfig.viewport.once,
    amount: overrides?.amount ?? motionConfig.viewport.section,
    margin: overrides?.margin ?? "0px 0px -100px 0px",
  };
}

export type SectionTransitionInput = {
  reduced: boolean;
  duration?: number;
  delay?: number;
  ease?: readonly [number, number, number, number];
};

/**
 * Стандартний transition з повагою до prefers-reduced-motion.
 */
export function sectionTransition({
  reduced,
  duration = motionConfig.duration.base,
  delay = 0,
  ease = motionConfig.ease,
}: SectionTransitionInput) {
  return {
    duration: reduced ? 0 : duration,
    delay: reduced ? 0 : delay,
    ease,
  };
}

/** Аліас для hero-компонентів */
export const heroTransition = sectionTransition;

/** Контейнер зі stagger для дочірніх variants */
export function staggerContainerVariants(
  reduced: boolean,
  overrides?: Partial<{
    staggerChildren: number;
    delayChildren: number;
  }>
): Variants {
  const stagger =
    overrides?.staggerChildren ?? motionConfig.stagger.sectionChildren;
  const delayChildren =
    overrides?.delayChildren ?? motionConfig.stagger.delayChildrenSection;
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduced ? 0 : stagger,
        delayChildren: reduced ? 0 : delayChildren,
      },
    },
  };
}

/** Stagger тільки для сітки карток */
export function staggerGridVariants(
  reduced: boolean,
  overrides?: Partial<{
    staggerChildren: number;
    delayChildren: number;
  }>
): Variants {
  const stagger =
    overrides?.staggerChildren ?? motionConfig.stagger.gridChildren;
  const delayChildren =
    overrides?.delayChildren ?? motionConfig.stagger.delayChildrenGrid;
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduced ? 0 : stagger,
        delayChildren: reduced ? 0 : delayChildren,
      },
    },
  };
}

/** Один блок: fade + рух по Y */
export function fadeUpVariants(
  reduced: boolean,
  overrides?: Partial<{
    y: number;
    duration: number;
  }>
): Variants {
  const y = overrides?.y ?? motionConfig.offset.fadeUp;
  const duration =
    overrides?.duration ?? motionConfig.duration.sectionFadeUp;
  return {
    hidden: { opacity: 0, y },
    visible: {
      opacity: 1,
      y: 0,
      transition: sectionTransition({ reduced, duration }),
    },
  };
}

/** Картка в сітці — трохи менший y */
export function fadeUpCardVariants(
  reduced: boolean,
  overrides?: Partial<{
    y: number;
    duration: number;
  }>
): Variants {
  const y = overrides?.y ?? motionConfig.offset.card;
  const duration =
    overrides?.duration ?? motionConfig.duration.sectionCard;
  return {
    hidden: { opacity: 0, y },
    visible: {
      opacity: 1,
      y: 0,
      transition: sectionTransition({ reduced, duration }),
    },
  };
}
