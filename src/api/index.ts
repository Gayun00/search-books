import { SearchBookResponse } from "@/types";
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
