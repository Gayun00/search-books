import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { BookData } from "@/types";
import { searchBooks } from "@/api";
import { useEffect, useState } from "react";

const FormSchema = z.object({
  keyword: z.string().min(1, {
    message: "Keyword must be at least 1 characters.",
  }),
});

function useSearchBooks() {
  const [searchInput, setSearchInput] = useState("");
  const [data, setData] = useState<BookData[]>([]);

  const handleSubmit = (text: string) => {
    setSearchInput(text);
  };

  const handleBookSearch = async (text: string) => {
    const result = await searchBooks({ keyword: text });
    setData(result);
  };

  useEffect(() => {
    handleBookSearch(searchInput);
  }, [searchInput]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      keyword: "",
    },
  });

  return { handleSubmit, form, data, FormSchema };
}

export default useSearchBooks;
