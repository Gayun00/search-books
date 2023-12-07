import type { Meta, StoryObj } from "@storybook/react";
import Component from ".";

const meta: Meta<typeof Component> = {
  title: "Component/BookList",
  component: Component,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Component>;

export const Default: Story = {
  args: {
    title: "검색 목록",
    bookList: [
      {
        title: "MongoDB in Action, 2nd Edition",
        subtitle: "Covers MongoDB version 3.0",
        image: "https://itbook.store/img/books/9781617291609.png",
        url: "https://itbook.store/books/9781617291609",
      },
      {
        title: "MongoDB in Action, 2nd Edition",
        subtitle: "Covers MongoDB version 3.0",
        image: "https://itbook.store/img/books/9781617291609.png",
        url: "https://itbook.store/books/9781617291609",
      },
      {
        title: "MongoDB in Action, 2nd Edition",
        subtitle: "Covers MongoDB version 3.0",
        image: "https://itbook.store/img/books/9781617291609.png",
        url: "https://itbook.store/books/9781617291609",
      },
    ],
  },
};
