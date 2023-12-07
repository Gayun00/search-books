import { splitKeywords, validateKeywords } from ".";

describe("SearchInput 테스트", () => {
  const textWithOrOp = "keyword1|keyword2";
  const textWithNotOp = "keyword1-keyword2";

  it("입력한 키워드는 |혹은 -로 구분된다", () => {
    const keywordsWithOrOp = splitKeywords(textWithOrOp);
    const keywordsWithNotOp = splitKeywords(textWithNotOp);

    expect(keywordsWithOrOp).toEqual(["keyword1", "keyword2"]);
    expect(keywordsWithNotOp).toEqual(["keyword1", "keyword2"]);
  });

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
