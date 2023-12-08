import { act, fireEvent, render } from "@testing-library/react";

import SearchInput from ".";

describe("SearchInput 테스트", () => {
  const handleSubmit = jest.fn();

  it("검색어를 입력하지 않고 검색하면 '한 글자 이상 입력하세요' 표시", async () => {
    const { getByText } = render(<SearchInput onSubmit={handleSubmit} />);

    await act(() => {
      fireEvent.submit(getByText("검색"));
    });

    expect(getByText("한 글자 이상 입력하세요")).toBeInTheDocument();
  });

  it("키워드 최대 2개를 초과해 입력할 경우 '검색 키워드는 최대 2개까지 입력 가능합니다' 메시지 표시", async () => {
    const { getByText, getByPlaceholderText } = render(
      <SearchInput onSubmit={handleSubmit} />
    );
    const input = getByPlaceholderText(
      "검색어를 입력하세요"
    ) as HTMLInputElement;
    const submitButton = getByText("검색");

    await act(() => {
      fireEvent.change(input, { target: { value: "mongo|python-k" } });
      fireEvent.click(submitButton);
    });

    expect(
      getByText("검색 키워드는 최대 2개까지 입력 가능합니다")
    ).toBeInTheDocument();
  });

  it("검색어 입력 후 버튼 클릭 시 handleSubmit 호출", async () => {
    const { getByText, getByPlaceholderText } = render(
      <SearchInput onSubmit={handleSubmit} />
    );
    const submitButton = getByText("검색");
    const input = getByPlaceholderText(
      "검색어를 입력하세요"
    ) as HTMLInputElement;

    await act(() => {
      fireEvent.change(input, { target: { value: "text" } });
    });

    await act(() => {
      fireEvent.click(submitButton);
    });

    expect(input.value).toEqual("text");
    expect(handleSubmit).toBeCalledWith("text");
  });
});
