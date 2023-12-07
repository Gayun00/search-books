import type { Meta } from "@storybook/react";
import SearchInput from ".";

const meta: Meta<typeof SearchInput> = {
  title: "Component/SearchInput",
  component: SearchInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

const Template = () => (
  <div className="w-80">
    <SearchInput />
  </div>
);

export const Default = Template.bind({});
