import { SearchBookResponse } from "@/types";
import { request } from "@/utils/apiRequest";

export const searchBooks = ({ keyword }: { keyword: string }) => {
  return request
    .get<null, SearchBookResponse>({
      // TODO: page 추가
      path: `/search/${keyword}/1`,
    })
    .then((data) => data.books);
};
