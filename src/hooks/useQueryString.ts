import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function useQueryString() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const getSearchParams = (key: string) => {
    return decodeURI(searchParams.get(key) || "");
  };

  const updateSearchParams = (key: string, value: string) => {
    router.push(pathname + "?" + createQueryString(key, encodeURI(value)));
  };

  return { getSearchParams, updateSearchParams };
}

export default useQueryString;
