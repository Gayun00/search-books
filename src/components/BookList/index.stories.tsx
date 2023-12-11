import type { Meta } from "@storybook/react";
import BookList from ".";
import Book from "../Book";

const meta: Meta<typeof BookList> = {
  title: "Component/BookList",
  component: BookList,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

const bookList = [
  {
    title: "MongoDB in Action, 2nd Edition",
    subtitle: "Covers MongoDB version 3.0",
    image: "https://itbook.store/img/books/9781617291609.png",
    url: "https://itbook.store/books/9781617291609",
    isbn13: "https://itbook.store/books/9781617291609",
  },
  {
    title: "MongoDB in Action, 2nd Edition",
    subtitle: "Covers MongoDB version 3.0",
    image: "https://itbook.store/img/books/9781617291609.png",
    url: "https://itbook.store/books/9781617291609",
    isbn13: "https://itbook.store/books/9781617291609",
  },
  {
    title: "MongoDB in Action, 2nd Edition",
    subtitle: "Covers MongoDB version 3.0",
    image: "https://itbook.store/img/books/9781617291609.png",
    url: "https://itbook.store/books/9781617291609",
    isbn13: "https://itbook.store/books/9781617291609",
  },
];

const Template = () => (
  <BookList title="도서 목록">
    {bookList.map((book) => (
      <Book
        isbn13={book.isbn13}
        key={book.url}
        title={book.title}
        subtitle={book.subtitle}
        image={book.image}
        url={book.url}
      />
    ))}
  </BookList>
);

export const Default = Template.bind({});
