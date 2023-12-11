import { BookDetailProps } from "@/types";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";

interface Props extends BookDetailProps {}

function BookInfo({
  title,
  subtitle,
  desc,
  rating,
  authors,
  pages,
  image,
  publisher,
  isbn13,
}: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{subtitle}</CardDescription>
        <CardDescription>{desc}</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col items-center gap-y-5">
        <Image src={image} width={200} height={400} alt={`${title}_img`} />
        <CardWrapper title="Rating" data={rating} />
        <CardWrapper title="Publisher" data={publisher} />
        <CardWrapper title="Isbn13" data={isbn13} />
        <CardWrapper title="Pages" data={pages} />
        <CardWrapper title="Author" data={authors} />
      </CardContent>
    </Card>
  );
}

export default BookInfo;

function CardWrapper({ title, data }: { title: string; data: string }) {
  return (
    <Card className="p-5 w-full flex flex-col items-center gap-y-3">
      <CardTitle>{title}</CardTitle>
      <CardDescription>{data}</CardDescription>
    </Card>
  );
}
