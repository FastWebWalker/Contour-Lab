import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NextIntlClientProvider } from "next-intl";
import ukMessages from "@/messages/uk";
import { homeHeroImage, homeHeroSocialLinks } from "../hero/homeHeroData";
import { Hero } from "../sections/Hero";

const meta = {
  title: "Sections/Hero",
  component: Hero,
  parameters: {
    layout: "fullscreen",
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [
    (Story) => (
      <NextIntlClientProvider locale="uk" messages={ukMessages}>
        <div className="min-h-screen bg-white">
          <Story />
        </div>
      </NextIntlClientProvider>
    ),
  ],
  tags: ["autodocs"],
} satisfies Meta<typeof Hero>;

export default meta;
type Story = StoryObj<typeof meta>;

const titleContent = (
  <>
    Цифрова зуботехнічна
    <br />
    лабораторія <span style={{ color: "var(--color-red-main)" }}>CONTOUR</span>
  </>
);

export const Default: Story = {
  args: {
    titleContent,
    subtitle:
      "Зробіть своє перше замовлення та отримайте тимчасову конструкцію на спеціальних умовах!",
    heroImage: homeHeroImage,
    showButtons: true,
    buttons: [
      { label: "Зробити замовлення", href: "#order", variant: "primary" },
      { label: "Завантажити Прайс", href: "#price", variant: "outline" },
    ],
    showStats: true,
    stats: [
      { value: "600", label: "дуже задоволених клієнтів" },
      { value: "5,000", label: "успішно завершених кейсів" },
    ],
    showSocialLinks: true,
    socialLinks: homeHeroSocialLinks,
  },
};
