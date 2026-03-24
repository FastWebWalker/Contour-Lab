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
    firstName: {
      control: "text",
      description: "Ім'я одержувача в привітанні",
    },
  },
} satisfies Meta<typeof EmailTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    firstName: "User",
  },
};

export const WithCustomName: Story = {
  args: {
    firstName: "Dmytro",
  },
};
