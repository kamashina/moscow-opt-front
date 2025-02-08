import { getQueryClient } from "@/src/api/api";
import {
  QueryKey,
  FetchQueryOptions,
  UseQueryResult,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useCallback } from "react";

export type LazyQueryFunction<
  TParams = unknown,
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
> = (
  params?: TParams,
  options?: FetchQueryOptions<TQueryFnData, TError, TData, TQueryKey>
) => Promise<TData>;

export type UseLazyQueryResult<
  TParams = unknown,
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
> = [
  LazyQueryFunction<TParams, TQueryFnData, TError, TData, TQueryKey>,
  UseQueryResult<TData, TError>
];

export const useLazyQuery = <
  TParams = unknown,
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  queryKey: TQueryKey,
  queryFn: (params?: TParams) => Promise<TQueryFnData> | TQueryFnData,
  options?: FetchQueryOptions<TQueryFnData, TError, TData, TQueryKey>
): UseLazyQueryResult<TParams, TQueryFnData, TError, TData, TQueryKey> => {
  const query = useQuery<TQueryFnData, TError, TData, TQueryKey>({
    queryKey,
    enabled: false,
  });
  const clientQuery = useQueryClient();
  const fetchQuery = useCallback<
    LazyQueryFunction<TParams, TQueryFnData, TError, TData, TQueryKey>
  >(
    (params, fetchQueryOptions) =>
      clientQuery.fetchQuery<TQueryFnData, TError, TData, TQueryKey>({
        queryKey: queryKey,
        queryFn: () => queryFn(params),
        ...{
          cacheTime: 0,
          ...options,
          ...fetchQueryOptions,
        },
      }),
    [clientQuery, options, queryFn, queryKey]
  );

  return [fetchQuery, query];
};
