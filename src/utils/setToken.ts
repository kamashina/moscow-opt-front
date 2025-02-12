import { OpenAPI } from "../openapi/requests";

export const setToken = (token?: string) => {
  localStorage.setItem("token", token || "");
  OpenAPI.TOKEN = token;
};
