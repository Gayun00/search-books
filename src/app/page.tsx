"use client";

import SearchInput from "@/components/SearchInput";
import useSearchBooks from "@/components/SearchInput/useSearchBooks";

export default function Home() {
  const { handleSubmit, form, FormSchema } = useSearchBooks();
  // TODO: data로 검색 목록 표시

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SearchInput
        onSubmit={handleSubmit}
        form={form}
        FormSchema={FormSchema}
      />
    </main>
  );
}
