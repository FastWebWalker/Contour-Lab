import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Typography } from "../ui/Typography";

const meta = {
  title: "Design System/Typography",
  component: Typography,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "headline-1",
        "headline-2",
        "headline-3",
        "headline-4",
        "display-1",
        "display-2",
        "display-3",
      ],
    },
  },
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Headline1: Story = {
  args: {
    variant: "headline-1",
    children: "Headline 1",
  },
};

export const Headline2: Story = {
  args: {
    variant: "headline-2",
    children: "Headline 2",
  },
};

export const Headline3: Story = {
  args: {
    variant: "headline-3",
    children: "Headline 3",
  },
};

export const Headline4: Story = {
  args: {
    variant: "headline-4",
    children: "Headline 4",
  },
};

export const Display1: Story = {
  args: {
    variant: "display-1",
    children: "Display 1",
  },
};

export const Display2: Story = {
  args: {
    variant: "display-2",
    children: "Display 2",
  },
};

export const Display3: Story = {
  args: {
    variant: "display-3",
    children: "Display 3",
  },
};

export const AllVariants: Story = {
  args: { variant: "headline-1", children: "" },
  render: () => (
    <div className="flex flex-col gap-8 p-8 bg-[var(--color-light-grey)]">
      <div>
        <Typography variant="headline-1">110/100</Typography>
        <p className="text-sm text-[var(--color-grey)] mt-1">Headline 1</p>
      </div>
      <div>
        <Typography variant="headline-2">52/Auto</Typography>
        <p className="text-sm text-[var(--color-grey)] mt-1">Headline 2</p>
      </div>
      <div>
        <Typography variant="headline-3">36/Auto</Typography>
        <p className="text-sm text-[var(--color-grey)] mt-1">Headline 3</p>
      </div>
      <div>
        <Typography variant="headline-4">24/Auto</Typography>
        <p className="text-sm text-[var(--color-grey)] mt-1">Headline 4</p>
      </div>
      <div>
        <Typography variant="display-1">20/Auto</Typography>
        <p className="text-sm text-[var(--color-grey)] mt-1">Display 1</p>
      </div>
      <div>
        <Typography variant="display-2">20/Auto</Typography>
        <p className="text-sm text-[var(--color-grey)] mt-1">Display 2</p>
      </div>
      <div>
        <Typography variant="display-3">18/Auto</Typography>
        <p className="text-sm text-[var(--color-grey)] mt-1">Display 3</p>
      </div>
    </div>
  ),
};
