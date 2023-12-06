import type { Meta, StoryObj } from "@storybook/react";
import Example from ".";

const meta: Meta<typeof Example> = {
  title: "Example/Example",
  component: Example,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    title: { control: "string" },
  },
};

export default meta;
type Story = StoryObj<typeof Example>;

export const Default: Story = {
  args: {
    title: "title",
  },
};
