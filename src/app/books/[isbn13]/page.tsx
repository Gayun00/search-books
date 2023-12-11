import React from "react";

function Page({ params }: { params: { isbn13: string } }) {
  return <div>{params.isbn13}</div>;
}

export default Page;
