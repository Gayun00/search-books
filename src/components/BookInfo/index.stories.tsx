import type { Meta } from "@storybook/react";
import BookInfo from ".";
import Book from "../Book";

const meta: Meta<typeof BookInfo> = {
  title: "Component/BookInfo",
  component: BookInfo,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

const book = {
  error: "0",
  title: "Securing DevOps",
  subtitle: "Security in the Cloud",
  authors: "Julien Vehent",
  publisher: "Manning",
  isbn10: "1617294136",
  isbn13: "9781617294136",
  pages: "384",
  year: "2018",
  rating: "5",
  desc: "An application running in the cloud can benefit from incredible efficiencies, but they come with unique security threats too. A DevOps team's highest priority is understanding those risks and hardening the system against them.Securing DevOps teaches you the essential techniques to secure your cloud ...",
  price: "$26.98",
  image: "https://itbook.store/img/books/9781617294136.png",
  url: "https://itbook.store/books/9781617294136",
  pdf: {
    "Chapter 2": "https://itbook.store/files/9781617294136/chapter2.pdf",
    "Chapter 5": "https://itbook.store/files/9781617294136/chapter5.pdf",
  },
};

const Template = () => (
  <BookInfo
    isbn13={book.isbn13}
    title={book.title}
    subtitle={book.subtitle}
    image={book.image}
    url={book.url}
    desc={book.desc}
    rating={book.rating}
    publisher={book.publisher}
    pages={book.pages}
    price={book.price}
    authors={book.authors}
  />
);

export const Default = Template.bind({});
