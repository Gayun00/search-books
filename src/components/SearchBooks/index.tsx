"use client";

import React, { Fragment, useState } from "react";
import { BookData } from "@/types";
import { useSearchBooksQuery } from "@/queries";
import Book from "@/components/Book";
import NoDataFallback from "@/components/fallbacks/NoDataFallback";
import BookList from "@/components/BookList";
import SearchInput from "@/components/SearchInput";
import InfiniteScrollTrigger from "@/components/InfinitScrollTrigger";

function SearchBooks() {
  const [keywords, setKeywords] = useState("");

  const { data, fetchNextPage, isLoading, hasNextPage, isFetchingNextPage } =
    useSearchBooksQuery({ keywords });

  const hasNoSearchResults = !data?.pages[0].books.length;
  const hasSearchResults = !!(!isLoading && keywords.length);

  const handleSubmit = (text: string) => {
    setKeywords(text);
  };

  return (
    <div className="flex min-h-screen flex-col items-center p-24 lg:min-w-[1000px]">
      <SearchInput onSubmit={handleSubmit} />
      <div className="w-full py-12 min-w-[500px]">
        {hasSearchResults && (
          <>
            <BookList title="검색 결과">
              {data?.pages?.map((page, idx) => (
                <Fragment key={idx}>
                  {page?.books?.map((book: BookData) => (
                    <Book
                      key={book.isbn13}
                      title={book.title}
                      subtitle={book.subtitle}
                      image={book.image}
                      url={book.url}
                      isbn13={book.isbn13}
                    />
                  ))}
                </Fragment>
              ))}
            </BookList>

            <InfiniteScrollTrigger
              fetchNextPage={fetchNextPage}
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
            />

            {hasNoSearchResults && (
              <NoDataFallback text="검색 결과가 없습니다" />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default SearchBooks;
