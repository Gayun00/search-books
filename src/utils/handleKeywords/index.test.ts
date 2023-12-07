import { handleSearchResult, splitKeywords, validateKeywords } from ".";

const textWithOrOp = "keyword1|keyword2";
const textWithNotOp = "keyword1-keyword2";

describe("splitKeywords 테스트", () => {
  it("입력한 키워드는 |(and) 혹은 -(not)로 구분된다", () => {
    const keywordsWithOrOp = splitKeywords(textWithOrOp);
    const keywordsWithNotOp = splitKeywords(textWithNotOp);

    expect(keywordsWithOrOp).toEqual(["keyword1", "keyword2"]);
    expect(keywordsWithNotOp).toEqual(["keyword1", "keyword2"]);
  });
});

describe("validsteKeywords 테스트", () => {
  it("입력 가능한 최소 키워드 갯수는 1개, 최대 키워드 갯수는 2개이다", () => {
    const isValidKeywords1 = validateKeywords(textWithOrOp);
    const isValidKeywords2 = validateKeywords(textWithNotOp);
    const isValidKeywords3 = validateKeywords("keyword1");
    const isValidKeywords4 = validateKeywords("");
    const isValidKeywords5 = validateKeywords("keyword1|keyword2-keyword3");

    expect(isValidKeywords1).toBe(true);
    expect(isValidKeywords2).toBe(true);
    expect(isValidKeywords3).toBe(true);
    expect(isValidKeywords4).toBe(false);
    expect(isValidKeywords5).toBe(false);
  });
});

describe("handleSearchResult 테스트", () => {
  it("| (and) 연산자로 검색할 때, 두 개의 키워드 검색 결과를 합쳐 보여준다", async () => {
    const searchBooks = jest.fn().mockImplementation(({ keyword }) => {
      return Promise.resolve([
        { title: `Book for ${keyword} 1`, author: `Author for ${keyword} 1` },
        { title: `Book for ${keyword} 2`, author: `Author for ${keyword} 2` },
      ]);
    });

    const result = await handleSearchResult(textWithOrOp, searchBooks);

    expect(result).toEqual([
      { author: "Author for keyword1 1", title: "Book for keyword1 1" },
      { author: "Author for keyword1 2", title: "Book for keyword1 2" },
      { author: "Author for keyword2 1", title: "Book for keyword2 1" },
      { author: "Author for keyword2 2", title: "Book for keyword2 2" },
    ]);
  });

  it("- (not) 연산자로 검색할 때, 첫번째 키워드 검색 결과 중 두 번째 키워드를 제목에 포함하는 값을 제외해 보여준다", async () => {
    const searchBooks = jest.fn().mockImplementation(({ keyword }) => {
      return [
        { title: `Book for ${keyword} 1`, author: `Author for ${keyword} 1` },
        { title: `Book for ${keyword} 2`, author: `Author for ${keyword} 2` },
      ];
    });

    const text = "keyword1-2";
    const result = await handleSearchResult(text, searchBooks);

    expect(result).toEqual([
      { author: "Author for keyword1 1", title: "Book for keyword1 1" },
    ]);
  });
});
