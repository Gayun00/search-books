import type { Meta, StoryObj } from "@storybook/react";
import Book from ".";

const meta: Meta<typeof Book> = {
  title: "components/Book",
  component: Book,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Book>;

export const Default: Story = {
  args: {
    title: "MongoDB in Action, 2nd Edition",
    subtitle: "Covers MongoDB version 3.0",
    image: "https://itbook.store/img/books/9781617291609.png",
    url: "https://itbook.store/books/9781617291609",
  },
};
