import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

interface Props {
  title: string;
  subtitle: string;
  url: string;
  image: string;
}

function Book({ title, subtitle, url, image }: Props) {
  return (
    <Card>
      <CardContent>
        <Image
          src={image}
          alt={`${title}_image`}
          className="rounded-lg object-cover w-full aspect-[3/4] "
          height={600}
          width={450}
        />
        <div className="space-y-3">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{subtitle}</CardDescription>
        </div>
      </CardContent>

      <CardFooter>
        <Link className="underline text-gray-400" href={url}>
          {url}
        </Link>
      </CardFooter>
    </Card>
  );
}

export default Book;