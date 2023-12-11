import { customRender, waitFor } from "@/utils/testUtils";
import Page from "./Client";

jest.mock("@/api", () => ({
  getBook: jest.fn().mockImplementation(({ isbn13 }) => {
    if (isbn13 == "noData") {
      return {
        total: "700",
        page: "1",
        error: "0",
        books: [],
        isbn13: `isbn-${isbn13}`,
      };
    }
    return Promise.resolve({
      error: "0",
      title: `title ${isbn13}`,
      subtitle: `subtitle ${isbn13}`,
      authors: `authors ${isbn13}`,
      publisher: `publisher ${isbn13}`,
      isbn10: `isbn10 ${isbn13}`,
      isbn13: `isbn13 ${isbn13}`,
      pages: `pages ${isbn13}`,
      year: "2018",
      rating: `rating ${isbn13}`,
      desc: `desc ${isbn13}`,
      price: `price ${isbn13}`,
      image: `https://${isbn13}.png`,
      url: `https://books/${isbn13}`,
      pdf: {
        "Chapter 2": `https://books/${isbn13}_2.pdf`,
        "Chapter 5": `https://books/${isbn13}_5.pdf`,
      },
    });
  }),
}));

const ISBN_13 = "0203020";

describe("도서 상세페이지 테스트", () => {
  it("title, subtitle, authors, publisher, pages, rating, desc, price, image 프로퍼티가 표시된다.", async () => {
    const { getByText, getByAltText } = customRender(<Page isbn13={ISBN_13} />);
    await waitFor(() => {
      expect(getByText(`title ${ISBN_13}`)).toBeInTheDocument();
      expect(getByText(`subtitle ${ISBN_13}`)).toBeInTheDocument();
      expect(getByText(`authors ${ISBN_13}`)).toBeInTheDocument();
      expect(getByText(`publisher ${ISBN_13}`)).toBeInTheDocument();
      expect(getByText(`pages ${ISBN_13}`)).toBeInTheDocument();
      expect(getByText(`rating ${ISBN_13}`)).toBeInTheDocument();
      expect(getByText(`desc ${ISBN_13}`)).toBeInTheDocument();
      expect(getByText(`price ${ISBN_13}`)).toBeInTheDocument();
      expect(getByAltText(`title ${ISBN_13}_img`)).toBeInTheDocument();
    });
  });
});
