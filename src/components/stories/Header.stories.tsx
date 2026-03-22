import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Header } from "../Header";
import { Logo } from "../header/Logo";
import { NavLink } from "../header/NavLink";
import { LanguageSelector } from "../header/LanguageSelector";
import { OutlineLightButton } from "../ui/Button";

const meta = {
  title: "Design System/Header",
  component: Header,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Full: Story = {
  parameters: { background: "#f9f9f9" },
};

export const LogoOnly: Story = {
  render: () => (
    <div className="p-8" style={{ backgroundColor: "var(--color-header-bg)" }}>
      <Logo />
    </div>
  ),
};

export const NavLinks: Story = {
  render: () => (
    <div className="flex gap-2 p-8 flex-wrap" style={{ backgroundColor: "var(--color-header-bg)" }}>
      <NavLink href="#general">General</NavLink>
      <NavLink href="#services">Services</NavLink>
      <NavLink href="#vacancies">Vacancies</NavLink>
      <NavLink href="#contacts">Contacts</NavLink>
      <NavLink href="#gallery">Gallery</NavLink>
    </div>
  ),
};

export const LanguageAndButton: Story = {
  render: () => (
    <div className="flex gap-4 items-center p-8" style={{ backgroundColor: "var(--color-header-bg)" }}>
      <LanguageSelector />
      <OutlineLightButton size="sm" />
    </div>
  ),
};
