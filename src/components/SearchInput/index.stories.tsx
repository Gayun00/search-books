import type { Meta } from "@storybook/react";
import SearchInput from ".";

const meta: Meta<typeof SearchInput> = {
  title: "components/SearchInput",
  component: SearchInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

const Template = () => {
  return (
    <div className="w-80">
      <SearchInput onSubmit={() => {}} />
    </div>
  );
};

export const Default = Template.bind({});
