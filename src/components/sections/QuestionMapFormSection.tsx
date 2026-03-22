"use client";

import * as React from "react";
import { PrimaryButton } from "../ui/Button";
import { ContourGoogleMap } from "../maps/ContourGoogleMap";
import { Description } from "../ui/Description";
import { Title } from "../ui/Title";

const inputClassName =
  "flex w-full min-w-0 flex-1 items-center gap-2.5 rounded-[40px] border border-[#D0D0D0] bg-white p-4 text-[16px] font-normal leading-normal outline-none transition-[border-color,box-shadow] placeholder:text-[rgba(20,20,20,0.45)] focus:border-[var(--color-red-main)] focus:ring-1 focus:ring-[var(--color-red-main)] md:px-5 md:py-[22px] md:text-[20px]";

const inputStyle: React.CSSProperties = {
  color: "rgba(20, 20, 20, 0.85)",
  fontFamily: "var(--font-inter), Inter, sans-serif",
};

const TITLE = "Виникли запитання до нас?";
const DESC =
  "Залиште свої дані, і ми обов'язково зв'яжемося з вами!";

/** Статичний фон карти (≤1200px); додай `public/questionMap/map-bg.png` за потреби */
const MAP_BG_PATH = "/questionMap/map-bg.png";

export interface QuestionMapFormSectionProps
  extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  /** Обробник відправки форми (наприклад, API / Resend) */
  onSubmitForm?: (data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    message: string;
  }) => void | Promise<void>;
}

export function QuestionMapFormSection({
  children,
  className = "",
  onSubmitForm,
  ...props
}: QuestionMapFormSectionProps) {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [message, setMessage] = React.useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await onSubmitForm?.({
      firstName,
      lastName,
      email,
      phone,
      message,
    });
  };

  return (
    <section
      aria-label="Форма запитань та карта"
      className={["w-full", className].filter(Boolean).join(" ")}
      {...props}
    >
      <div className="mx-auto w-full px-4 py-8 min-[768px]:px-8 min-[1024px]:py-12 min-[1440px]:px-[59px]">
        <div className="flex w-full flex-col items-stretch gap-8 rounded-[30px] bg-[var(--Grey-Light,#F6F6F6)] p-8 min-[1201px]:flex-row min-[1201px]:items-center min-[1201px]:justify-between min-[1201px]:gap-8 min-[1201px]:p-[35px]">
          {/* Left: на desktop текст (title + опис) max 549px; форма на всю ширину колонки */}
          <div className="relative flex w-full min-w-0 flex-1 flex-col">
            <div className="flex w-full flex-col gap-6 min-[1201px]:max-w-[549px]">
              <Title as="h2">{TITLE}</Title>
              <Description className="w-full max-w-none">{DESC}</Description>
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
                  placeholder="Ваше Ім'я"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className={inputClassName}
                  style={inputStyle}
                />
                <input
                  type="text"
                  name="lastName"
                  autoComplete="family-name"
                  placeholder="Ваше Прізвище"
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
                placeholder="Ел. Пошта"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClassName}
                style={inputStyle}
              />
              <input
                type="tel"
                name="phone"
                autoComplete="tel"
                placeholder="Телефон"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={inputClassName}
                style={inputStyle}
              />
              <textarea
                name="message"
                rows={5}
                placeholder="Текст"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className={`${inputClassName} min-h-[140px] resize-y`}
                style={inputStyle}
              />
              <div>
                <PrimaryButton type="submit" size="lg">
                  Відправити
                </PrimaryButton>
              </div>
            </form>
          </div>

          {/* Карта: прихована на mobile (<768px); tablet+ як раніше (≤1200 column / ≥1201 row) */}
          <div
            className="relative hidden w-full min-w-0 shrink-0 self-stretch md:block max-[1200px]:h-[546.532px] max-[1200px]:overflow-hidden max-[1200px]:rounded-[29px] min-[1201px]:h-auto min-[1201px]:max-w-[576px] min-[1201px]:flex-[0_0_auto] min-[1201px]:rounded-[30px]"
            style={
              {
                backgroundColor: "lightgray",
                backgroundImage: `url(${MAP_BG_PATH})`,
                backgroundPosition: "-66.07px -242.965px",
                backgroundSize: "132.127% 184.494%",
                backgroundRepeat: "no-repeat",
              } as React.CSSProperties
            }
          >
            <div className="relative h-full min-h-[280px] w-full min-[1201px]:aspect-[109/137] min-[1201px]:min-h-[280px]">
              <div className="absolute inset-0 z-[1] overflow-hidden rounded-[29px] min-[1201px]:rounded-[30px]">
                <ContourGoogleMap className="h-full w-full" />
              </div>
            </div>
          </div>
        </div>
        {children}
      </div>
    </section>
  );
}
