"use client";

import React, { useCallback, useEffect, useState } from "react";
import { searchBooks } from "@/api";
import { BookData } from "@/types";
import { handleSearchResult } from "@/utils/handleKeywords";
import BookList from "@/components/BookList";
import SearchInput from "@/components/SearchInput";

function SearchBooks() {
  const [keywords, setKeywords] = useState("");
  const [data, setData] = useState<BookData[]>([]);

  const handleSubmit = (text: string) => {
    setKeywords(text);
  };

  const handleBookSearch = useCallback(async () => {
    const result = await handleSearchResult(keywords, searchBooks);
    setData(result || []);
  }, [keywords]);

  useEffect(() => {
    handleBookSearch();
  }, [keywords, handleBookSearch]);

  return (
    <div className="flex min-h-screen flex-col items-center p-24">
      <SearchInput onSubmit={handleSubmit} />
      <BookList title="검색 결과" bookList={data} />
    </div>
  );
}

export default SearchBooks;
