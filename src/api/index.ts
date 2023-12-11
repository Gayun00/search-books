import { GetBookResponse, SearchBookResponse } from "@/types";
import { request } from "@/utils/apiRequest";

export const searchBooks = ({
  keyword,
  page,
}: {
  keyword: string;
  page: number;
}) => {
  return request.get<null, SearchBookResponse>({
    path: `/search/${keyword}/${page}`,
  });
};

export const getBook = ({ isbn13 }: { isbn13: string }) => {
  return request.get<null, GetBookResponse>({
    path: `/books/${isbn13}`,
  });
};
