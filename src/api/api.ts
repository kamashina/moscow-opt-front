import {
  defaultShouldDehydrateQuery,
  isServer,
  MutationCache,
  QueryCache,
  QueryClient,
} from "@tanstack/react-query";
import { getFromLocalStorage } from "../constants";
import { OpenAPI } from "../openapi/requests";
import { Exception } from "../types";

OpenAPI.CREDENTIALS = "include";
OpenAPI.WITH_CREDENTIALS = true;
OpenAPI.TOKEN =
  getFromLocalStorage("token") ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3RfbmFtZSI6InN0cmluZyIsInBob3RvIjpudWxsLCJsYXN0X25hbWUiOiJzdHJpbmciLCJyb2xlIjoic2VsbGVyIiwibWlkZGxlX25hbWUiOiJzdHJpbmciLCJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20iLCJwaG9uZSI6InN0cmluZyIsImlhdCI6MTczODU1OTQ4MywiZXhwIjoxNzM4NjQ1ODgzfQ.U2p96iG2jkTLfyHCdek_614HrkZhK05YPnvlWJ_yKNk";

const onError = async (error: Exception | any) => {
  const status = (error as Exception)?.status;

  // const redirectUrl = new URLSearchParams(window.location.search).get(
  //   "redirectUrl"
  // );
  // if (status === 401 || status === 403) {
  //   try {
  //     const res = await AuthService.refresh();
  //     setToken((res as AuthLoginResponse).access_token);
  //     window.location.reload();
  //   } catch (e) {
  //     const res = await AuthService.logout();
  //     window.location.replace(
  //       redirectUrl ? `/signin?redirectUrl=${redirectUrl}` : "/signin"
  //     );
  //   }
  // }
};

function makeQueryClient() {
  return new QueryClient({
    queryCache: new QueryCache({ onError }),
    mutationCache: new MutationCache({ onError }),
    defaultOptions: {
      queries: {
        retry: 0,
        staleTime: 60 * 1000,
      },
      dehydrate: {
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === "pending",
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
  if (isServer) return makeQueryClient();

  if (!browserQueryClient) browserQueryClient = makeQueryClient();
  return browserQueryClient;
}
