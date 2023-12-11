import React, { Fragment, useEffect, useState } from "react";
import { Spin } from "antd";
import { useInfiniteQuery } from "@tanstack/react-query";
import { BookData } from "@/types";
import BookList from "@/components/BookList";
import SearchInput from "@/components/SearchInput";
import { searchBooks } from "@/api";
import { splitKeywords } from "@/utils/handleKeywords";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import Book from "@/components/Book";

function SearchBooks() {
  const [keywords, setKeywords] = useState("");

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["searchBooks", keywords],
      queryFn: async ({ pageParam }) => {
        const hasOrOperator = keywords.includes("|");
        const hasNotOperator = keywords.includes("-");

        if (hasOrOperator) {
          const keywordArray = splitKeywords(keywords);
          const promises = keywordArray.map((keyword) => {
            return searchBooks({ keyword, page: pageParam });
          });

          return Promise.all(promises).then((results) => {
            const mergedResults = results.flatMap((result) => result.books);
            return {
              books: mergedResults,
              page: pageParam,
              total: results[pageParam].total,
            };
          });
        }

        if (hasNotOperator) {
          const [keyword1, keyword2] = splitKeywords(keywords);
          const searchedBooks = await searchBooks({
            keyword: keyword1,
            page: pageParam,
          });
          const filteredBooks = searchedBooks.books.filter(
            (book) => !book.title.toLowerCase().includes(keyword2.toLowerCase())
          );
          return {
            books: filteredBooks,
            page: pageParam,
            total: searchedBooks.total,
          };
        }

        return searchBooks({ keyword: keywords, page: pageParam });
      },
      getNextPageParam: (lastPage: any) => {
        const nextPage = parseInt(lastPage.page) + 1;
        const totalItems = parseInt(lastPage.total);
        if (nextPage * 10 <= totalItems) {
          return nextPage;
        }
      },
      initialPageParam: 1,
    });

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
    <div className="flex min-h-screen flex-col items-center p-24">
      <SearchInput onSubmit={handleSubmit} />
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
              />
            ))}
          </Fragment>
        ))}
      </BookList>

      {/* TODO: 스크롤 시 추가 렌더링되도록 변경 */}
      {isFetchingNextPage && <Spin />}
      {hasNextPage && !isFetchingNextPage && (
        <div ref={targetRef} className="h-200px bg-slate-500"></div>
      )}
    </div>
  );
}

export default SearchBooks;
