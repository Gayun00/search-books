export interface CommonResponse {
  total: string;
  error: string;
}

export interface BookData {
  title: string;
  subtitle: string;
  image: string;
  url: string;
  price: string;
  isbn13: string;
}

export interface SearchBookResponse extends CommonResponse {
  page: string;
  books: BookData[];
}

export interface GetBookResponse extends BookData, CommonResponse {
  authors: string;
  publisher: string;
  isbn10: string;
  pages: string;
  year: string;
  rating: string;
  desc: string;
  pdf: Record<string, string>;
}

export interface BookProps {
  title: string;
  subtitle: string;
  image: string;
  url: string;
  isbn13: string;
}
