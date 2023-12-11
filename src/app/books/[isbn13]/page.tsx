import { getBook } from "@/api";
import HydrateOnClient from "@/hooks/hydrateOnClient";
import getQueryClient from "@/utils/getQueryClient";
import { dehydrate } from "@tanstack/react-query";
import Client from "./Client";

interface Props {
  params: { isbn13: string };
}

async function Page({ params }: Props) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["book", params.isbn13],
    queryFn: () => getBook({ isbn13: params.isbn13 }),
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrateOnClient state={dehydratedState}>
      <Client isbn13={params.isbn13} />
    </HydrateOnClient>
  );
}

export default Page;
