export interface BookProps {
  title: string;
  subtitle: string;
  image: string;
  url: string;
  isbn13: string;
}

export interface BookData {
  title: string;
  subtitle: string;
  image: string;
  url: string;
  price: string;
  isbn13: string;
}

export interface SearchBookResponse {
  page: string;
  error: string;
  books: BookData[];
  total: string;
}
