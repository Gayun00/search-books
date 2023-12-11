import Example from "@/components/Example";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("react-query hook testing example", () => {
  const { getByText } = render(<Example title="example" />);
  it("ex", () => {
    expect(getByText("example")).toBeInTheDocument();
  });
});
