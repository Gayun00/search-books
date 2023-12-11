"use client";

import React from "react";
import BookInfo from "@/components/BookInfo";
import { useBookQuery } from "@/queries";

interface Props {
  isbn13: string;
}

function Client({ isbn13 }: Props) {
  const { data } = useBookQuery({ isbn13 });
  return (
    <>
      {data && (
        <BookInfo
          authors={data.authors}
          title={data.title}
          subtitle={data.subtitle}
          desc={data.desc}
          rating={data.rating}
          price={data.price}
          image={data.image}
          publisher={data.publisher}
          isbn13={data.isbn13}
          pages={data.pages}
          url={data.url}
        />
      )}
    </>
  );
}

export default Client;
