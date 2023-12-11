import { BookData } from "@/types";

export const splitKeywords = (text: string) => {
  const resultArray = text.split(/[|-]/);
  const filteredArray = resultArray.filter((item) => item !== "");
  return filteredArray;
};

export const validateKeywords = (text: string) => {
  if (!text.length) return false;
  const keywordsCount = splitKeywords(text).length;
  return keywordsCount > 0 && keywordsCount <= 2;
};

export const handleSearchResult = async (
  text: string,
  callback: ({ keyword }: { keyword: string }) => Promise<BookData[]>
) => {
  const hasOrOperator = text.includes("|");
  const hasNotOperator = text.includes("-");

  if (hasOrOperator) {
    const [keyword1, keyword2] = splitKeywords(text);
    const firstSearchedBooks = await callback({ keyword: keyword1 });
    const secondSearchedBooks = await callback({ keyword: keyword2 });
    return [...firstSearchedBooks, ...secondSearchedBooks] || [];
  }

  if (hasNotOperator) {
    const [keyword1, keyword2] = splitKeywords(text);
    const searchedBooks = await callback({ keyword: keyword1 });
    return searchedBooks.filter(
      (result) => !result.title.toLowerCase().includes(keyword2.toLowerCase())
    );
  }
  const searchedBooks = await callback({ keyword: text });
  return searchedBooks;
};
