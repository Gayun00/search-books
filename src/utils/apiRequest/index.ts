import { API_SERVER } from "@/constants";

interface RequestParams<TParams> {
  path: string;
  params?: TParams;
  method?: "get" | "post" | "put" | "delete";
}

export const apiRequest = <TParams>({
  path,
  method,
  params,
}: RequestParams<TParams>) => {
  return fetch(`${API_SERVER}${path}`, {
    method,
    body: JSON.stringify(params),
  }).then((res) => res.json());
};

export const request = {
  get<TParams, TResponse>(params: RequestParams<TParams>): Promise<TResponse> {
    return apiRequest<TParams>({ ...params, method: "get" });
  },

  post<TParams, TResponse>(params: RequestParams<TParams>): Promise<TResponse> {
    return apiRequest({ ...params, method: "post" });
  },

  put<TParams, TResponse>(params: RequestParams<TParams>): Promise<TResponse> {
    return apiRequest({ ...params, method: "put" });
  },

  delete<TParams, TResponse>(
    params: RequestParams<TParams>
  ): Promise<TResponse> {
    return apiRequest({ ...params, method: "delete" });
  },
};
