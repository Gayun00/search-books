import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getBook, searchBooks } from "@/api";
import { splitKeywords } from "@/utils/handleKeywords";

const handleResultsWithOrOp = (keywords: string, pageParam: number) => {
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
    page: pageParam,
    total: searchedBooks.total,
  };
};

export const useSearchBooksQuery = ({ keywords }: { keywords: string }) => {
  return useInfiniteQuery({
    queryKey: ["searchBooks", keywords],
    queryFn: async ({ pageParam }) => {
      const hasOrOperator = keywords.includes("|");
      const hasNotOperator = keywords.includes("-");

      if (hasOrOperator) {
        return handleResultsWithOrOp(keywords, pageParam);
      }

      if (hasNotOperator) {
        return handleResultsWithNotOp(keywords, pageParam);
      }

      return searchBooks({ keyword: keywords, page: pageParam });
    },
    getNextPageParam: (lastPage: any) => {
      const nextPage = lastPage.page + 1;
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
    queryKey: ["book"],
    queryFn: () => getBook({ isbn13 }),
  });
};
