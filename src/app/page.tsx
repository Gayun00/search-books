"use client";

import { searchBooks } from "@/api";
import SearchBooks from "@/components/SearchBooks";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <SearchBooks />
    </main>
  );
}
