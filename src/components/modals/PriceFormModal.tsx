"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { PrimaryButton } from "@/components/ui/Button";
import {
  FORM_INPUT_CLASSNAME,
  FORM_INPUT_STYLE,
} from "@/components/form/formInputStyles";

const labelStyle: React.CSSProperties = {
  color: "rgba(25, 25, 25, 0.9)",
  fontFamily: "var(--font-inter), Inter, sans-serif",
  fontSize: "20px",
  fontWeight: 400,
  lineHeight: "normal",
};

const RADIO_OPTIONS = [
  { value: "consult", label: "Отримати консультацію" },
  { value: "coop", label: "Цікавить співпраця" },
  { value: "contact", label: "Зв'яжіться зі мною" },
] as const;

type RadioValue = (typeof RADIO_OPTIONS)[number]["value"];

function RadioCheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      className="shrink-0"
      aria-hidden
    >
      <path
        d="M20 6L9 17L4 12"
        stroke="white"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export interface PriceFormModalProps {
  open: boolean;
  onClose: () => void;
}

export function PriceFormModal({ open, onClose }: PriceFormModalProps) {
  const [mounted, setMounted] = React.useState(false);
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [method, setMethod] = React.useState("telegram");
  const [reason, setReason] = React.useState<RadioValue>("coop");

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClose();
  };

  if (!mounted || !open) return null;

  return createPortal(
    <div
      role="presentation"
      className="fixed inset-0 z-[10050] flex items-center justify-center bg-black/45 p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="price-modal-title"
        className="relative flex h-[90vh] w-[90vw] max-h-[90vh] flex-col overflow-hidden rounded-[30px] bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full text-[var(--color-black)] transition-colors hover:bg-black/5"
          aria-label="Закрити"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M18 6L6 18M6 6l12 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <div className="relative flex min-h-0 flex-1 flex-col overflow-visible">
          <div
            className="pointer-events-none absolute inset-0 z-0 overflow-visible"
            aria-hidden
          >
            <Image
              src="/form/logo.svg"
              alt=""
              width={222}
              height={637}
              className="absolute bottom-[7px] left-0 hidden h-auto w-[222px] select-none min-[1024px]:block"
            />
            <Image
              src="/form/Group.svg"
              alt=""
              width={260}
              height={135}
              className="absolute hidden h-auto w-[260px] select-none min-[1024px]:block"
              style={{
                right: "0px",
                bottom: "85.481px",
              }}
            />
          </div>

          <div className="relative z-[1] flex min-h-0 flex-1 flex-col items-center overflow-y-auto px-5 py-10 pb-16 min-[768px]:px-10 min-[768px]:py-12">
            <div className="mx-auto w-full max-w-[480px]">
              <form
                onSubmit={handleSubmit}
                className="flex w-full flex-col gap-6"
              >
            <h2
              id="price-modal-title"
              className="text-[36px] font-normal leading-normal"
              style={{
                color: "var(--Black, #141414)",
                fontFamily:
                  "Gilroy-Medium, Gilroy, var(--font-sans), ui-sans-serif, system-ui, sans-serif",
              }}
            >
              Ви стоматолог і Вас цікавить співпраця?
            </h2>

            <p style={labelStyle}>Тоді заповніть форму нижче!</p>

            <div className="flex w-full min-w-0 flex-col gap-4 min-[480px]:flex-row min-[480px]:gap-4">
              <input
                type="text"
                name="firstName"
                autoComplete="given-name"
                placeholder="Ваше ім'я"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className={FORM_INPUT_CLASSNAME}
                style={FORM_INPUT_STYLE}
              />
              <input
                type="text"
                name="lastName"
                autoComplete="family-name"
                placeholder="Ваше Прізвище"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className={FORM_INPUT_CLASSNAME}
                style={FORM_INPUT_STYLE}
              />
            </div>

            <input
              type="tel"
              name="phone"
              autoComplete="tel"
              placeholder="Ваш Телефон"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={FORM_INPUT_CLASSNAME}
              style={FORM_INPUT_STYLE}
            />

            <div className="flex flex-col gap-3">
              <span style={labelStyle}>
                Яким методом вам надіслати прайс?
              </span>
              <select
                name="method"
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                className={`${FORM_INPUT_CLASSNAME} appearance-none bg-white pr-10`}
                style={{
                  ...FORM_INPUT_STYLE,
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M6 9l6 6 6-6' stroke='%23555' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 1rem center",
                  backgroundSize: "1.25rem",
                }}
              >
                <option value="telegram">Telegram</option>
                <option value="viber">Viber</option>
                <option value="email">Email</option>
              </select>
            </div>

            <div className="flex flex-col gap-4" role="radiogroup" aria-label="Мета звернення">
              {RADIO_OPTIONS.map(({ value, label }) => {
                const active = reason === value;
                return (
                  <div
                    key={value}
                    className="flex items-center gap-2 self-stretch min-[400px]:gap-2"
                  >
                    <button
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={() => setReason(value)}
                      className={[
                        "flex shrink-0 items-center justify-center rounded-[17.5px] transition-colors",
                        active
                          ? "h-[35px] w-[35px] gap-2.5 bg-[var(--color-red-purple)] p-[5px]"
                          : "h-[35px] w-[35px] border-[0.5px] border-[var(--color-grey-hard)] bg-[var(--color-white)]",
                      ].join(" ")}
                    >
                      {active ? <RadioCheckIcon /> : null}
                    </button>
                    <span
                      className="text-left text-[18px] min-[400px]:text-[20px]"
                      style={labelStyle}
                    >
                      {label}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="pt-2">
              <PrimaryButton type="submit" size="lg" fullWidth>
                Отримати прайс
              </PrimaryButton>
            </div>
            </form>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
