import {
  defaultShouldDehydrateQuery,
  isServer,
  MutationCache,
  QueryCache,
  QueryClient,
} from "@tanstack/react-query";
import { getFromLocalStorage } from "../constants";
import { AuthService, OpenAPI } from "../openapi/requests";
import { Exception } from "../types";
import { setToken } from "../utils/setToken";

OpenAPI.CREDENTIALS = "include";
OpenAPI.WITH_CREDENTIALS = true;
OpenAPI.TOKEN = getFromLocalStorage("token") || "";

const onError = async (status: Exception | any) => {
  if (status === 401 || status === 403) {
    try {
      const res = await AuthService.refreshToken();
      res.access_token && setToken(res.access_token);
    } catch (e) {
      window.location.hostname.includes("localhost") &&
        window.location.replace("/auth");
      const res = await AuthService.logout();
    }
  }
  return status;
};

OpenAPI.interceptors.response.use(async (response) => {
  if (!response?.status) return response;

  if (response.status >= 400) {
    // onError(response?.status);
    let errorMessage = response.statusText || `Error ${response.status}`;

    try {
      const jsonData = await response.json();
      if (jsonData?.message) {
        errorMessage = String(jsonData.message);
      }
    } catch {}

    return Promise.reject(new Error(errorMessage));
  }

  return response;
});

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
