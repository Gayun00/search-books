import React, { Fragment, useEffect, useState } from "react";
import { BookData } from "@/types";
import BookList from "@/components/BookList";
import SearchInput from "@/components/SearchInput";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import Book from "@/components/Book";
import NoData from "../fallbacks/NoData";
import Spinner from "../fallbacks/Spinner";
import { useSearchBooksQuery } from "@/queries";

function SearchBooks() {
  const [keywords, setKeywords] = useState("");

  const { data, fetchNextPage, isLoading, hasNextPage, isFetchingNextPage } =
    useSearchBooksQuery({ keywords });

  const hasNoSearchResults = !data?.pages[0].books.length;
  const hasSearchResults = !!(!isLoading && keywords.length);

  const { targetRef } = useIntersectionObserver({
    onIntersect: fetchNextPage,
  });

  const handleSubmit = (text: string) => {
    setKeywords(text);
  };

  useEffect(() => {
    fetchNextPage();
  }, [keywords, fetchNextPage]);

  return (
    <div className="flex min-h-screen flex-col items-center p-24 lg:min-w-[1000px]">
      <SearchInput onSubmit={handleSubmit} />
      <div className="w-full py-12 min-w-[500px]">
        {isLoading && <Spinner />}
        {hasSearchResults && (
          <>
            <BookList title="검색 결과">
              {data?.pages?.map((page, idx) => (
                <Fragment key={idx}>
                  {page?.books?.map((book: BookData) => (
                    <Book
                      key={book.url}
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

            {hasNoSearchResults && <NoData text="검색 결과가 없습니다" />}
          </>
        )}
      </div>

      {isFetchingNextPage && <Spinner />}
      {hasNextPage && !isFetchingNextPage && (
        <div ref={targetRef} className="h-200px bg-slate-500"></div>
      )}
    </div>
  );
}

export default SearchBooks;
