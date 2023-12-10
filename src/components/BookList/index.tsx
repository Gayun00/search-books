import { BookProps } from "@/types";
import React from "react";
import Book from "../Book";

interface Props {
  title: string;
  subtitle?: string;
  bookList: BookProps[];
}

function BookList({ title, subtitle, bookList }: Props) {
  return (
    <section className="w-full py-12 min-w-[500px]">
      <div className="container grid gap-6 md:gap-8 px-4 md:px-6 max-w-xl mx-auto lg:max-w-none">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
          <div className="grid gap-1">
            <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
            {subtitle && (
              <p className="text-gray-500 dark:text-gray-400">{subtitle}</p>
            )}
          </div>
        </div>

        <div className="w-full grid lg:grid-cols-3 gap-8">
          {bookList.map((book) => (
            <Book
              key={book.url}
              title={book.title}
              subtitle={book.subtitle}
              image={book.image}
              url={book.url}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default BookList;
