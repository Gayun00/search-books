"use client";

import React from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { validateKeywords } from "@/utils/handleKeywords";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

interface Props {
  onSubmit: (text: string) => void;
}

const FormSchema = z.object({
  keyword: z
    .string()
    .refine((value) => value.length > 0, {
      message: "한 글자 이상 입력하세요",
    })
    .refine((value) => validateKeywords(value), {
      message: "검색 키워드는 최대 2개까지 입력 가능합니다",
    }),
});

function SearchInput({ onSubmit }: Props) {
  const onSubmitInput = (data: z.infer<typeof FormSchema>) => {
    onSubmit(data.keyword);
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      keyword: "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmitInput)}
        className="flex items-start gap-x-3 justify-between w-full max-w-3xl min-w-[500px]"
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
          검색
        </Button>
      </form>
    </Form>
  );
}

export default SearchInput;
