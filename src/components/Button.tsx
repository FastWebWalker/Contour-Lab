"use client";

import * as React from "react";
import { ArrowRightIcon } from "./icons/ArrowRight";
import { ExternalLinkIcon } from "./icons/ExternalLink";

export type ButtonVariant = "primary" | "secondary" | "outline" | "outlineLight";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const sizeStyles = {
  sm: "h-11 px-5 text-[15px] gap-2.5 min-w-[140px]",
  md: "h-12 px-7 text-[16px] gap-3 min-w-[180px]",
  lg: "h-14 px-8 text-[17px] gap-3.5 min-w-[220px]",
};

const iconSizes = {
  sm: 18,
  md: 20,
  lg: 22,
};

const variantStyles = {
  primary: [
    "bg-[var(--color-red-main)] text-white",
    "hover:bg-[var(--color-red-dark)] active:bg-[var(--color-red-dark)]",
    "shadow-[0_1px_2px_rgba(0,0,0,0.12)]",
  ].join(" "),
  secondary: [
    "bg-white text-[var(--color-black)]",
    "border border-[#e8e8e8]",
    "hover:border-[#d0d0d0] hover:bg-[#fafafa]",
    "active:bg-[#f5f5f5]",
    "shadow-[0_1px_3px_rgba(0,0,0,0.04)]",
  ].join(" "),
  outline: [
    "bg-transparent text-[var(--color-red-main)]",
    "border-2 border-[var(--color-red-main)]",
    "hover:bg-[var(--color-red-main)] hover:text-white",
    "active:bg-[var(--color-red-dark)]",
  ].join(" "),
  outlineLight: [
    "bg-white text-[var(--color-red-main)]",
    "border border-[var(--color-red-main)]",
    "hover:bg-[var(--color-red-main)] hover:text-white",
    "active:bg-[var(--color-red-dark)]",
  ].join(" "),
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      children,
      leftIcon,
      rightIcon,
      fullWidth,
      className = "",
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type="button"
        className={[
          "inline-flex items-center justify-center font-medium rounded-full transition-all duration-200",
          "focus:outline-none focus:ring-2 focus:ring-[var(--color-red-main)] focus:ring-offset-2",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && "w-full min-w-0",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        style={{ fontFamily: "var(--font-sans)" }}
        {...props}
      >
        {leftIcon}
        <span className="tracking-[0.01em]">{children}</span>
        {rightIcon}
      </button>
    );
  }
);

Button.displayName = "Button";

/** Primary button with right arrow - "Make an Order" style */
export function PrimaryButton({
  size = "md",
  children = "Make an Order",
  ...props
}: Omit<ButtonProps, "variant" | "rightIcon" | "children"> & {
  children?: React.ReactNode;
}) {
  return (
    <Button
      variant="primary"
      size={size}
      rightIcon={
        <ArrowRightIcon className="shrink-0" size={iconSizes[size]} />
      }
      {...props}
    >
      {children}
    </Button>
  );
}

/** Outline light - white bg, red border - for header */
export function OutlineLightButton({
  size = "md",
  children = "Get in Touch",
  ...props
}: Omit<ButtonProps, "variant" | "leftIcon" | "children"> & {
  children?: React.ReactNode;
}) {
  return (
    <Button
      variant="outlineLight"
      size={size}
      leftIcon={
        <ExternalLinkIcon className="shrink-0" size={iconSizes[size]} />
      }
      {...props}
    >
      {children}
    </Button>
  );
}

/** Outline button with external link icon - "Get in Touch" for header */
export function OutlineButton({
  size = "md",
  children = "Get in Touch",
  ...props
}: Omit<ButtonProps, "variant" | "leftIcon" | "children"> & {
  children?: React.ReactNode;
}) {
  return (
    <Button
      variant="outline"
      size={size}
      leftIcon={
        <ExternalLinkIcon className="shrink-0" size={iconSizes[size]} />
      }
      {...props}
    >
      {children}
    </Button>
  );
}

/** Secondary button with left external link icon - "Get in Touch" style */
export function SecondaryButton({
  size = "md",
  children = "Get in Touch",
  ...props
}: Omit<ButtonProps, "variant" | "leftIcon" | "children"> & {
  children?: React.ReactNode;
}) {
  return (
    <Button
      variant="secondary"
      size={size}
      leftIcon={
        <ExternalLinkIcon className="shrink-0" size={iconSizes[size]} />
      }
      {...props}
    >
      {children}
    </Button>
  );
}
