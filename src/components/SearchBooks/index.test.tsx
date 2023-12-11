import { act, fireEvent, waitFor } from "@testing-library/react";
import * as api from "@/api";
import SearchBooks from ".";
import { customRender } from "@/utils/testUtils";

jest.mock("@/api", () => ({
  searchBooks: jest.fn().mockImplementation(({ keyword }) => {
    return Promise.resolve([
      {
        title: `Book for ${keyword} 1`,
        subtitle: `Subtitle for ${keyword} 1`,
        url: `url for ${keyword} 1`,
        image: `https://books/${keyword}/1`,
      },
      {
        title: `Book for ${keyword} 2`,
        subtitle: `Subtitle for ${keyword} 2`,
        url: `url for ${keyword} 2`,
        image: `https://books/${keyword}/2`,
      },
    ]);
  }),
}));

describe("SearchBooks 테스트", () => {
  it("하나의 키워드만 입력하면 해당 키워드의 검색 결과를 표시한다", async () => {
    const { getByText, getByPlaceholderText } = customRender(<SearchBooks />);
    const inputField = getByPlaceholderText("검색어를 입력하세요");
    const submitButton = getByText("검색");

    act(() => {
      fireEvent.change(inputField, { target: { value: "python" } });
      fireEvent.click(submitButton);
    });

    waitFor(() => {
      expect(api.searchBooks).toHaveBeenCalledWith({ keyword: "python" });
      expect(getByText("Book for python 1")).toBeInTheDocument();
      expect(getByText("Book for python 2")).toBeInTheDocument();
    });
  });

  it("| 연산자를 포함한 두 개의 키워드를 입력하면 각각의 키워드 검색 결과를 합쳐 표시한다", async () => {
    const { getByText, getByPlaceholderText } = customRender(<SearchBooks />);
    const inputField = getByPlaceholderText("검색어를 입력하세요");
    const submitButton = getByText("검색");

    act(() => {
      fireEvent.change(inputField, { target: { value: "python|mongo" } });
      fireEvent.click(submitButton);
    });

    waitFor(() => {
      expect(getByText("Book for python 1")).toBeInTheDocument();
      expect(getByText("Book for python 2")).toBeInTheDocument();
      expect(getByText("Book for mongo 1")).toBeInTheDocument();
      expect(getByText("Book for mongo 2")).toBeInTheDocument();
    });
  });

  it("- 연산자를 포함해 두 개의 키워드를 입력하면 첫번째 키워드 검색 결과에서 두 번째 키워드를 포함한 제목을 갖는 결과를 제외해 표시한다", async () => {
    const { getByText, queryByText, getByPlaceholderText } = customRender(
      <SearchBooks />
    );
    const inputField = getByPlaceholderText("검색어를 입력하세요");
    const submitButton = getByText("검색");

    act(() => {
      fireEvent.change(inputField, { target: { value: "python-2" } });
      fireEvent.click(submitButton);
    });

    waitFor(() => {
      expect(getByText("Book for python 1")).toBeInTheDocument();
      expect(queryByText("Book for python 2")).not.toBeInTheDocument();
    });
  });
});
