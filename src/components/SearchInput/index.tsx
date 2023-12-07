"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";

interface Props {
  onSubmit: (text: string) => void;
  form: UseFormReturn<any>;
  FormSchema: z.ZodType;
}

function SearchInput({ onSubmit, form, FormSchema }: Props) {
  const onSubmitInput = (data: z.infer<typeof FormSchema>) => {
    onSubmit(data.keyword);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmitInput)}
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
