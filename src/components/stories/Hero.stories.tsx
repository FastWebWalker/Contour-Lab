import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Hero } from "../Hero";
import {
  homeHeroTitle,
  homeHeroSubtitle,
  homeHeroImage,
  homeHeroButtons,
  homeHeroStats,
  homeHeroSocialLinks,
} from "../hero/homeHeroData";

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
