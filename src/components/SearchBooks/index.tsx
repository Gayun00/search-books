import React, { useEffect, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { BookData } from "@/types";
import BookList from "@/components/BookList";
import SearchInput from "@/components/SearchInput";
import { searchBooks } from "@/api";
import Book from "../Book";
import { splitKeywords } from "@/utils/handleKeywords";

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
          <div key={idx}>
            {page?.books?.map((book: BookData) => (
              <Book
                key={book.url}
                title={book.title}
                subtitle={book.subtitle}
                image={book.image}
                url={book.url}
              />
            ))}
          </div>
        ))}
      </BookList>
      {hasNextPage && (
        <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
          {isFetchingNextPage ? "Loading more..." : "Load More"}
        </button>
      )}
    </div>
  );
}

export default SearchBooks;
