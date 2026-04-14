"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { sectionViewport, MOTION_EASE } from "@/lib/motion";

const headingStyle: React.CSSProperties = {
  alignSelf: "stretch",
  color: "var(--Black, #141414)",
  fontFamily: "Gilroy-Medium, Gilroy, ui-sans-serif, system-ui, sans-serif",
  fontSize: 24,
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "normal",
};

const bodyStyle: React.CSSProperties = {
  alignSelf: "stretch",
  color: "var(--Black, #141414)",
  fontFamily: "Gilroy, ui-sans-serif, system-ui, sans-serif",
  fontSize: 20,
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "normal",
};

const socialIconPillClass =
  "box-border flex h-12 w-12 shrink-0 items-center justify-center gap-[10px] rounded-[30px] border-[0.5px] border-[#939393] p-3 outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-[var(--color-red-main)] focus-visible:ring-offset-2";

const CONTACT_SOCIAL_LINKS: { href: string; src: string; label: string }[] = [
  { href: "https://facebook.com", src: "/contacts/icons/Facebook.svg", label: "Facebook" },
  { href: "https://instagram.com", src: "/contacts/icons/Instagram.svg", label: "Instagram" },
  { href: "https://wa.me/380985894109", src: "/contacts/icons/WhatsApp.svg", label: "WhatsApp" },
  { href: "https://t.me/", src: "/contacts/icons/Telegram.svg", label: "Telegram" },
  { href: "viber://chat?number=380633556550", src: "/contacts/icons/Viber.svg", label: "Viber" },
];

export function ContactsInfoGridSection({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const t = useTranslations("contactsInfo");
  const reduced = useReducedMotion() ?? false;

  const addresses = [t("addressLine1"), t("addressLine2")];
  const emails = ["lab.contour@gmail.com", "kyivcontour@gmail.com"];

  return (
    <section
      aria-label={t("aria")}
      className={["w-full", className].filter(Boolean).join(" ")}
      {...props}
    >
      <div className="mx-auto w-full px-4 pb-10 pt-12 min-[768px]:px-8 min-[1440px]:px-[60px] min-[1440px]:pb-[60px] min-[1440px]:pt-[80px]">
        <div className="grid grid-cols-1 gap-y-[80px] min-[768px]:grid-cols-2 min-[768px]:gap-[80px] min-[1440px]:grid-cols-[repeat(4,auto)] min-[1440px]:justify-between min-[1440px]:gap-y-[80px] min-[1440px]:gap-x-0">
          {/* Колонка 1: адреса та пошта */}
          <motion.div
            className="flex min-w-0 flex-col gap-6"
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={sectionViewport({ amount: 0.3 })}
            transition={{ duration: reduced ? 0 : 0.6, delay: reduced ? 0 : 0, ease: MOTION_EASE }}
          >
            <img
              src="/contacts/address.svg"
              alt=""
              width={48}
              height={48}
              className="h-12 w-12 shrink-0"
            />
            <div className="flex flex-col gap-4">
              <h2 className="m-0" style={headingStyle}>
                {t("addressTitle")}
              </h2>
              <div className="flex flex-col gap-1" style={bodyStyle}>
                {addresses.map((address) => (
                  <p key={address} className="m-0">
                    {address}
                  </p>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <h2 className="m-0" style={headingStyle}>
                {t("emailTitle")}
              </h2>
              <div className="flex flex-col gap-1" style={bodyStyle}>
                {emails.map((email) => (
                  <a
                    key={email}
                    className="m-0 text-inherit underline-offset-2 hover:underline"
                    href={`mailto:${email}`}
                  >
                    {email}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Колонка 2: телефони */}
          <motion.div
            className="flex min-w-0 flex-col gap-6"
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={sectionViewport({ amount: 0.3 })}
            transition={{ duration: reduced ? 0 : 0.6, delay: reduced ? 0 : 0.15, ease: MOTION_EASE }}
          >
            <img
              src="/contacts/phone.svg"
              alt=""
              width={32}
              height={48}
              className="h-12 w-8 shrink-0"
            />
            <div className="flex flex-col gap-4">
              <h2 className="m-0" style={headingStyle}>
                {t("administratorTitle")}
              </h2>
              <a href="tel:+380675634655" className="m-0 w-fit" style={bodyStyle}>
                +38 067 563 46 55
              </a>
            </div>
            <div className="flex flex-col gap-4">
              <h2 className="m-0" style={headingStyle}>
                {t("clientManagerTitle")}
              </h2>
              <a href="tel:+380985894109" className="m-0 w-fit" style={bodyStyle}>
                +380 (98) 589 41 09
              </a>
            </div>
          </motion.div>

          {/* Колонка 3: Вайбер */}
          <motion.div
            className="flex min-w-0 flex-col gap-6"
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={sectionViewport({ amount: 0.3 })}
            transition={{ duration: reduced ? 0 : 0.6, delay: reduced ? 0 : 0.3, ease: MOTION_EASE }}
          >
            <img
              src="/contacts/viber-only.svg"
              alt=""
              width={48}
              height={48}
              className="h-12 w-12 shrink-0"
            />
            <div className="flex flex-col gap-4">
              <h2 className="m-0" style={headingStyle}>
                {t("viberOnlyTitle")}
              </h2>
              <a href="viber://chat?number=380633556550" className="m-0 w-fit" style={bodyStyle}>
                +38 063 355 65 50
              </a>
            </div>
          </motion.div>

          {/* Колонка 4: соцмережі */}
          <motion.div
            className="flex min-w-0 flex-col gap-6"
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={sectionViewport({ amount: 0.3 })}
            transition={{ duration: reduced ? 0 : 0.6, delay: reduced ? 0 : 0.45, ease: MOTION_EASE }}
          >
            <img
              src="/contacts/social.svg"
              alt=""
              width={48}
              height={48}
              className="h-12 w-12 shrink-0"
            />
            <div className="flex flex-col gap-4">
              <h2 className="m-0" style={headingStyle}>
                {t("socialTitle")}
              </h2>
              <div className="grid w-fit grid-cols-3 gap-2">
                {CONTACT_SOCIAL_LINKS.map(({ href, src, label }) => {
                  const isExternal = href.startsWith("http");
                  return (
                    <a
                      key={label}
                      href={href}
                      {...(isExternal
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className={socialIconPillClass}
                      aria-label={label}
                    >
                      <img
                        src={src}
                        alt=""
                        width={24}
                        height={24}
                        className="h-6 w-6 shrink-0 object-contain"
                        decoding="async"
                      />
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}