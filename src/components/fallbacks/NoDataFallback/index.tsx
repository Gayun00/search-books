import React from "react";
import { Empty } from "antd";

interface Props {
  text?: string;
}

function NoDataFallback({ text }: Props) {
  return (
    <div className="flex flex-col items-center w-full">
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      {text && <p className="text-gray">{text}</p>}
    </div>
  );
}

export default NoDataFallback;
