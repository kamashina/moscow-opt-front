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

export const TAB_VARIANT_REGISTRATION = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, x: 20, transition: { duration: 0.2 } },
};

export const TAB_VARIANT_LOGIN = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" } },
  exit: { opacity: 0, x: -50, transition: { duration: 0.2, ease: "easeIn" } },
};
