import type { Meta } from "@storybook/react";
import NoDataFallback from ".";

const meta: Meta<typeof NoDataFallback> = {
  title: "fallbacks/NoDataFallback",
  component: NoDataFallback,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

const Template = () => {
  return (
    <div className="w-80">
      <NoDataFallback />
    </div>
  );
};

const WithTextTemplate = () => {
  return (
    <div className="w-80 bg-slate-300">
      <NoDataFallback text="검색 결과가 없습니다." />
    </div>
  );
};

export const Default = Template.bind({});
export const WithText = WithTextTemplate.bind({});
