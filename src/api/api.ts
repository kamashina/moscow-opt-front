import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
import { cache } from "react";
import { Exception } from "../types";
import { setToken } from "../utils/setToken";
import { getFromLocalStorage } from "../constants";
import { OpenAPI } from "../openapi/requests";

OpenAPI.CREDENTIALS = "include";
OpenAPI.WITH_CREDENTIALS = true;
OpenAPI.TOKEN = getFromLocalStorage("token") || "";

const onError = async (error: Exception | any) => {
  const status = (error as Exception)?.status;
  const redirectUrl = new URLSearchParams(window.location.search).get(
    "redirectUrl"
  );

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
const getQueryClient = cache(
  () =>
    new QueryClient({
      queryCache: new QueryCache({ onError }),
      mutationCache: new MutationCache({ onError }),
      defaultOptions: { queries: { retry: 0, staleTime: 60 * 1000 } },
    })
);
export default getQueryClient;
