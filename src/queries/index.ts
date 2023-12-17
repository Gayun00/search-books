import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getBook, searchBooks } from "@/api";
import { SearchBookResponse } from "@/types";
import { splitKeywords } from "@/utils/handleKeywords";
import { bookQueryKeys, searchBookQueryKeys } from "./queryKeys";

const handleResultsWithOrOp = (keywords: string, pageParam: number) => {
  const keywordArray = splitKeywords(keywords);
  const promises = keywordArray.map((keyword) => {
    return searchBooks({ keyword, page: pageParam });
  });

  return Promise.all(promises).then((results) => {
    const mergedResults = results.flatMap((result) => result.books);
    return {
      books: mergedResults,
      page: pageParam.toString(),
      total: results[pageParam].total,
      error: "0",
    };
  });
};

const handleResultsWithNotOp = async (keywords: string, pageParam: number) => {
  const [keyword1, keyword2] = splitKeywords(keywords);
  const searchedBooks = await searchBooks({
    keyword: keyword1,
    page: pageParam,
  });
  const filteredBooks = searchedBooks.books.filter((book) => {
    return !book.title.toLowerCase().includes(keyword2.toLowerCase());
  });
  return {
    books: filteredBooks,
    page: pageParam.toString(),
    total: searchedBooks.total,
    error: "0",
  };
};

export const useSearchBooksQuery = ({ keywords }: { keywords: string }) => {
  return useInfiniteQuery({
    queryKey: searchBookQueryKeys.list(keywords),
    queryFn: async ({ pageParam }) => {
      const hasOrOperator = keywords.includes("|");
      const hasNotOperator = keywords.includes("-");

      if (hasOrOperator) {
        return await handleResultsWithOrOp(keywords, pageParam);
      }

      if (hasNotOperator) {
        return await handleResultsWithNotOp(keywords, pageParam);
      }

      return await searchBooks({
        keyword: keywords,
        page: pageParam,
      });
    },
    getNextPageParam: (lastPage: SearchBookResponse) => {
      const nextPage = parseInt(lastPage.page) + 1;
      const totalItems = parseInt(lastPage.total);
      if (nextPage * 10 <= totalItems) {
        return nextPage;
      }
    },
    initialPageParam: 1,
  });
};

export const useBookQuery = ({ isbn13 }: { isbn13: string }) => {
  return useQuery({
    queryKey: bookQueryKeys.list(isbn13),
    queryFn: () => getBook({ isbn13 }),
  });
};
