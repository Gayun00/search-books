import React, { ReactNode } from "react";

interface Props {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

function BookList({ title, subtitle, children }: Props) {
  return (
    <section className="w-full py-12 min-w-[500px]">
      <div className="container grid gap-6 md:gap-8 px-4 md:px-6 max-w-xl mx-auto lg:max-w-none">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
          <div className="grid gap-1">
            <span className="flex items-center gap-x-3">
              <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
            </span>
            {subtitle && (
              <p className="text-gray-500 dark:text-gray-400">{subtitle}</p>
            )}
          </div>
        </div>
        <div className="grid lg:grid-cols-3 gap-8">{children}</div>
      </div>
    </section>
  );
}

export default BookList;
