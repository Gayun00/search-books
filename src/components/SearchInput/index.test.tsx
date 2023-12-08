import { act, fireEvent, render } from "@testing-library/react";
import SearchInput from ".";

describe("SearchInput 테스트", () => {
  it("검색어가 없으면 '한 글자 이상 입력하세요' 표시", async () => {
    const handleSubmit = jest.fn();

    const { getByText } = render(<SearchInput onSubmit={handleSubmit} />);

    await act(() => {
      fireEvent.submit(getByText("검색"));
    });

    expect(getByText("한 글자 이상 입력하세요")).toBeInTheDocument();
  });

  it("검색어 입력후 버튼 클릭 시 handleSubmit 호출", async () => {
    const handleSubmit = jest.fn();

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
