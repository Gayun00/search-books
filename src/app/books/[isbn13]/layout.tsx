import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

function Layout({ children }: Props) {
  return (
    <div className="py-10 flex justify-center">
      <div className="max-w-[800px]">{children}</div>;
    </div>
  );
}

export default Layout;
