import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

interface Props {
  title: string;
  subtitle: string;
  image: string;
  url: string;
  isbn13: string;
}

function Book({ title, subtitle, url, image, isbn13 }: Props) {
  return (
    <Card className="flex flex-col justify-between">
      <Link href={`/books/${isbn13}`}>
        <CardContent>
          <Image
            src={image}
            alt={`${title}_image`}
            className="rounded-lg object-cover w-full aspect-[3/4] "
            height={600}
            width={450}
          />
          <div className="space-y-3">
            <CardTitle className="text-md overflow-ellipsis overflow-hidden line-clamp-2">
              {title}
            </CardTitle>
            <CardDescription className="overflow-ellipsis overflow-hidden line-clamp-2">
              {subtitle}
            </CardDescription>
          </div>
        </CardContent>
      </Link>

      <CardFooter>
        <Link
          className="underline text-gray-400 text-ellipsis overflow-hidden"
          href={url}
        >
          {url}
        </Link>
      </CardFooter>
    </Card>
  );
}

export default Book;
