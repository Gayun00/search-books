import React from "react";
import Spinner from "@/components/fallbacks/Spinner";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";

interface Props {
  fetchNextPage: any;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
}

function InfiniteScrollTrigger({
  fetchNextPage,
  isFetchingNextPage,
  hasNextPage,
}: Props) {
  const { targetRef } = useIntersectionObserver({
    onIntersect: fetchNextPage,
  });

  return (
    <>
      {isFetchingNextPage && <Spinner />}
      {hasNextPage && !isFetchingNextPage && <div ref={targetRef}></div>}
    </>
  );
}

export default InfiniteScrollTrigger;
