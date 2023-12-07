import type { Meta } from "@storybook/react";
import SearchInput from ".";
import useSearchBooks from "./useSearchBooks";

const meta: Meta<typeof SearchInput> = {
  title: "Component/SearchInput",
  component: SearchInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

const Template = () => {
  const { form, FormSchema } = useSearchBooks();

  return (
    <div className="w-80">
      <SearchInput onSubmit={() => {}} form={form} FormSchema={FormSchema} />
    </div>
  );
};

export const Default = Template.bind({});
