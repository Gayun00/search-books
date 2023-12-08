"use client";

import { useCallback, useEffect, useState } from "react";
import { searchBooks } from "@/api";
import BookList from "@/components/BookList";
import SearchInput from "@/components/SearchInput";
import { BookData } from "@/types";
import { handleSearchResult } from "@/utils/handleKeywords";

export default function Home() {
  const [keywords, setKeywords] = useState("");
  const [books, setBooks] = useState<BookData[]>([]);

  const handleSubmit = (text: string) => {
    setKeywords(text);
  };

  const handleBookSearch = useCallback(async () => {
    const result = await handleSearchResult(keywords, searchBooks);
    setBooks(result || []);
  }, [keywords]);

  useEffect(() => {
    handleBookSearch();
  }, [keywords, handleBookSearch]);

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <SearchInput onSubmit={handleSubmit} />
      <BookList title="검색 결과" bookList={books} />
    </main>
  );
}
