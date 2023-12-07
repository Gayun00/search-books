"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

const FormSchema = z.object({
  keyword: z.string().min(1, {
    message: "Keyword must be at least 1 characters.",
  }),
});

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

function SearchInput() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      keyword: "",
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-center gap-x-3 justify-between w-full"
      >
        <FormField
          control={form.control}
          name="keyword"
          render={({ field }) => (
            <FormItem className="basis-3/4">
              <FormControl>
                <Input placeholder="검색어를 입력하세요" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="basis-1/4" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}

export default SearchInput;
