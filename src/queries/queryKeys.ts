export const searchBookQueryKeys = {
  all: ["searchBooks"],
  list: (keywords: string) => [...searchBookQueryKeys.all, keywords],
};

export const bookQueryKeys = {
  all: ["book"],
  list: (isbn13: string) => [...bookQueryKeys.all, isbn13],
};
