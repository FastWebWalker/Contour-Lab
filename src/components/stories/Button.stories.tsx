import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button, PrimaryButton, SecondaryButton } from "../ui/Button";

const meta = {
  title: "Design System/Button",
  component: Button,
  parameters: {
    layout: "centered",
    background: "#f6f6f6",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "outline", "outlineLight"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Primary Large - red background, white text, right arrow */
export const PrimaryLarge: Story = {
  args: {
    variant: "primary",
    size: "lg",
    children: "Make an Order",
    rightIcon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        className="shrink-0"
      >
        <path
          d="M5 12H19M19 12L14 7M19 12L14 17"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
};

/** Primary Medium */
export const PrimaryMedium: Story = {
  args: {
    ...PrimaryLarge.args,
    size: "md",
  },
};

/** Primary Small */
export const PrimarySmall: Story = {
  args: {
    ...PrimaryLarge.args,
    size: "sm",
  },
};

/** Secondary Large - white background, dark text, left external link icon */
export const SecondaryLarge: Story = {
  args: {
    variant: "secondary",
    size: "lg",
    children: "Get in Touch",
    leftIcon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 30 30"
        fill="none"
        className="shrink-0"
      >
        <path
          d="M8.30806 8.30806C8.55214 8.06398 8.94777 8.06398 9.19185 8.30806L21.6918 20.8081L21.7346 20.8557C21.9348 21.1011 21.9207 21.463 21.6918 21.6918C21.463 21.9207 21.1011 21.9348 20.8557 21.7346L20.8081 21.6918L8.30806 9.19185C8.06398 8.94777 8.06398 8.55214 8.30806 8.30806Z"
          fill="currentColor"
        />
        <path
          d="M20.625 8.75C20.625 8.40482 20.9048 8.125 21.25 8.125C21.5952 8.125 21.875 8.40482 21.875 8.75V21.25C21.875 21.5952 21.5952 21.875 21.25 21.875H8.75C8.40482 21.875 8.125 21.5952 8.125 21.25C8.125 20.9048 8.40482 20.625 8.75 20.625H20.625V8.75Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
};

/** Secondary Medium */
export const SecondaryMedium: Story = {
  args: {
    ...SecondaryLarge.args,
    size: "md",
  },
};

/** Secondary Small */
export const SecondarySmall: Story = {
  args: {
    ...SecondaryLarge.args,
    size: "sm",
  },
};

/** All 6 variations as in Figma */
export const AllVariants: Story = {
  args: { variant: "primary", size: "md", children: "" },
  render: () => (
    <div className="flex flex-col gap-8 p-8 bg-[var(--color-light-grey)] rounded-xl">
      <div className="flex flex-wrap gap-4 items-end">
        <PrimaryButton size="lg" />
        <PrimaryButton size="md" />
        <PrimaryButton size="sm" />
      </div>
      <div className="flex flex-wrap gap-4 items-end">
        <SecondaryButton size="lg" />
        <SecondaryButton size="md" />
        <SecondaryButton size="sm" />
      </div>
    </div>
  ),
};
