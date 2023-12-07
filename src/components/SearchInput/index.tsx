import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function SearchInput() {
  return (
    <div className="flex gap-x-3">
      <Input placeholder="검색어를 입력하세요" />
      <Button>검색</Button>
    </div>
  );
}

export default SearchInput;
