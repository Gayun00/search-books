import { Spin } from "antd";
import React from "react";

function Spinner() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Spin />
    </div>
  );
}

export default Spinner;
