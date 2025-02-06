import { BoxTypes } from "./types";

export const getFromLocalStorage = (key: string) => {
  if (!key || typeof window === "undefined") {
    return "";
  }

  return localStorage.getItem(key);
};

export const getPersistedStorage = () => {
  if (typeof window === "undefined") {
    return null;
  }

  return localStorage;
};

export const getServerFile = (file: string) => {
  return process.env.NEXT_PUBLIC_FILES_URL + file;
};

export const BOX_TYPES_TRANlSATIONS: Record<BoxTypes, string> = {
  box_characteristics: "Короб",
  box_single: "Упаковка",
};

export type AuthTabsTypes = "register" | "login";

export const AUTH_TABS_TRANSLATIONS: Record<AuthTabsTypes, string> = {
  login: "Вход",
  register: "Регистрация",
};
