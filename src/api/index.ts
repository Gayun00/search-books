import { BookData } from "@/types";
import { request } from "@/utils/apiRequest";

export const searchBooks = ({ keyword }: { keyword: string }) => {
  return request.get<null, BookData[]>({
    // TODO: page 추가
    path: `/search/${keyword}/1`,
  });
};
