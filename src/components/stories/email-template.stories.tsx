import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { EmailTemplate } from "../email/email-template";

const meta = {
  title: "Email/EmailTemplate",
  component: EmailTemplate,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "Заголовок листа",
    },
    fields: {
      control: "object",
      description: "Поля форми для рендеру в листі",
    },
  },
} satisfies Meta<typeof EmailTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Contour Lab: New form submission",
    fields: [
      { label: "First name", value: "User" },
      { label: "Email", value: "user@example.com" },
      { label: "Message", value: "Hello from Storybook" },
    ],
  },
};

export const WithCustomName: Story = {
  args: {
    title: "Contour Lab: CV submission",
    fields: [
      { label: "First name", value: "Dmytro" },
      { label: "Last name", value: "Skorohodov" },
      { label: "CV file", value: "cv-dmytro.pdf" },
    ],
  },
};
