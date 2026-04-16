"use client";

import * as React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { CardWrapper } from "./ui/CardWrapper";
import { Description } from "./ui/Description";
import { PrimaryButton } from "./ui/Button";
import { Title } from "./ui/Title";
import { FormCardDotsDecoration } from "./FormCardDotsDecoration";
import {
  fadeUpVariants,
  staggerContainerVariants,
  sectionViewport,
} from "@/lib/motion";

/** Як у QuestionMapFormSection */
const inputClassName =
  "flex w-full min-w-0 flex-1 items-center gap-2.5 rounded-[40px] border border-[#D0D0D0] bg-white p-4 text-[16px] font-normal leading-normal outline-none transition-[border-color,box-shadow] placeholder:text-[rgba(20,20,20,0.45)] focus:border-[var(--color-red-main)] focus:ring-1 focus:ring-[var(--color-red-main)] md:px-5 md:py-[22px] md:text-[20px]";

const inputStyle: React.CSSProperties = {
  color: "rgba(20, 20, 20, 0.85)",
  fontFamily: "var(--font-inter), Inter, sans-serif",
};

const CV_IMAGE_PATH =
  "/CVForm/9125c525f973226c4abe1da21d473b7982aa2681.png";

/** Upload «Завантажити CV»: 16px текст, py 12px px 16px, border 1px Red-Dark, radius 40px */
const fileUploadLabelClass =
  "inline-flex w-fit max-w-full cursor-pointer items-center justify-center gap-1 rounded-[40px] border border-[var(--color-red-dark)] bg-white px-[16px] py-[12px] text-[16px] font-medium text-[var(--color-red-dark)] transition-colors hover:bg-[var(--color-red-dark)]/5 focus-within:outline-none focus-within:ring-2 focus-within:ring-[var(--color-red-main)] focus-within:ring-offset-2";

export interface CVFormSectionProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  onSubmitForm?: (data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    cvFile: File | null;
  }) => void | Promise<void>;
}

export function CVFormSection({
  children,
  className = "",
  onSubmitForm,
  ...props
}: CVFormSectionProps) {
  const t = useTranslations("cvForm");
  const reduced = useReducedMotion() ?? false;
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [cvFile, setCvFile] = React.useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await onSubmitForm?.({
      firstName,
      lastName,
      email,
      phone,
      cvFile,
    });
  };

  return (
    <section
      id="cv-form"
      aria-label={t("sectionAria")}
      className={["w-full overflow-hidden", className].filter(Boolean).join(" ")}
      {...props}
    >
      <div className="mx-auto w-full px-4 py-8 min-[768px]:px-8 min-[1024px]:py-12 min-[1440px]:px-[59px]">
        <CardWrapper
          as="article"
          widthClassName="w-full max-w-full"
          paddingClassName="py-8 px-4 min-[1024px]:p-[35px]"
          className="relative overflow-hidden !flex !flex-col !items-stretch !justify-between gap-8 self-stretch min-[1024px]:!flex-row min-[1024px]:!items-center min-[1024px]:!justify-between min-[1024px]:!gap-8"
        >
          {/* Left: текст + форма; на desktop лише max-width 549px */}
          <motion.div
            variants={fadeUpVariants(reduced)}
            initial="hidden"
            whileInView="visible"
            viewport={sectionViewport({ amount: 0.2 })}
            className="relative flex min-w-0 w-full max-w-full flex-1 flex-col min-[1024px]:max-w-[549px]"
          >
            <div className="flex w-full flex-col gap-6">
              <Title as="h2">{t("title")}</Title>
              <Description className="w-full max-w-none">{t("description")}</Description>
            </div>

            <form
              className="mt-7 flex w-full min-w-0 flex-1 flex-col gap-2 md:gap-4"
              onSubmit={handleSubmit}
            >
              <div className="flex w-full min-w-0 flex-col gap-2 min-[480px]:flex-row min-[480px]:gap-4">
                <input
                  type="text"
                  name="firstName"
                  autoComplete="given-name"
                  placeholder={t("firstName")}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className={inputClassName}
                  style={inputStyle}
                />
                <input
                  type="text"
                  name="lastName"
                  autoComplete="family-name"
                  placeholder={t("lastName")}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className={inputClassName}
                  style={inputStyle}
                />
              </div>
              <input
                type="email"
                name="email"
                autoComplete="email"
                placeholder={t("email")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClassName}
                style={inputStyle}
              />
              <input
                type="tel"
                name="phone"
                autoComplete="tel"
                placeholder={t("phone")}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={inputClassName}
                style={inputStyle}
              />

              <div className="flex flex-row items-center gap-2 md:flex-row-reverse md:gap-4">
                <input
                  id="cv-file-input"
                  type="file"
                  name="cv"
                  accept=".pdf,.doc,.docx,application/pdf"
                  className="sr-only"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    setCvFile(f ?? null);
                  }}
                />
                <label
                  htmlFor="cv-file-input"
                  className={`${fileUploadLabelClass} shrink-0`}
                >
                  {t("upload")}
                </label>
                <p
                  className="min-w-0 text-[20px] font-normal leading-normal not-italic md:text-[24px] md:flex-1"
                  style={{
                    color: "var(--Black, #141414)",
                    fontFamily:
                      "Gilroy-Regular, Gilroy, ui-sans-serif, system-ui, sans-serif",
                  }}
                >
                  {t("resumeHint")}
                  {cvFile ? (
                    <span className="ml-2" style={{ color: "inherit" }}>
                      ({cvFile.name})
                    </span>
                  ) : null}
                </p>
              </div>

              <div>
                <PrimaryButton type="submit" size="lg">
                  {t("submit")}
                </PrimaryButton>
              </div>
            </form>
          </motion.div>

          {/* Right: зображення; на desktop ширина/пропорції адаптуються до в’юпорта */}
          <motion.div
            variants={fadeUpVariants(reduced)}
            initial="hidden"
            whileInView="visible"
            viewport={sectionViewport({ amount: 0.2 })}
            className="relative h-[clamp(220px,50vw,640px)] w-full min-w-0 shrink-0 overflow-hidden rounded-[30px] bg-[lightgray] min-[1024px]:h-auto min-[1024px]:max-h-[640px] min-[1024px]:w-[min(480px,42vw)] min-[1024px]:min-w-[min(260px,32vw)] min-[1024px]:max-w-[min(480px,48%)] min-[1024px]:shrink min-[1024px]:aspect-[4/5]"
          >
            <Image
              src={CV_IMAGE_PATH}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 1023px) 100vw, (max-width: 1440px) 42vw, 480px"
            />
          </motion.div>

          <FormCardDotsDecoration className="hidden min-[1024px]:block" />
        </CardWrapper>
        {children}
      </div>
    </section>
  );
}
