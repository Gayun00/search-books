import type { Meta } from "@storybook/react";
import NoData from ".";

const meta: Meta<typeof NoData> = {
  title: "fallbacks/NoData",
  component: NoData,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

const Template = () => {
  return (
    <div className="w-80">
      <NoData />
    </div>
  );
};

const WithTextTemplate = () => {
  return (
    <div className="w-80 bg-slate-300">
      <NoData text="검색 결과가 없습니다." />
    </div>
  );
};

export const Default = Template.bind({});
export const WithText = WithTextTemplate.bind({});
