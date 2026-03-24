import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  homeHeroTitle,
  homeHeroSubtitle,
  homeHeroImage,
  homeHeroButtons,
  homeHeroStats,
  homeHeroSocialLinks,
} from "../hero/homeHeroData";
import { Hero } from "../sections/Hero";

const meta = {
  title: "Sections/Hero",
  component: Hero,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Hero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    titleContent: homeHeroTitle,
    subtitle: homeHeroSubtitle,
    heroImage: homeHeroImage,
    showButtons: true,
    buttons: homeHeroButtons,
    showStats: true,
    stats: homeHeroStats,
    showSocialLinks: true,
    socialLinks: homeHeroSocialLinks,
  },
};
