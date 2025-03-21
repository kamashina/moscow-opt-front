import { itemStatus, type } from "./openapi/requests";
import { CompanyTaxations, IETaxations } from "./types";

export const LIMIT = 20;

export const getFromLocalStorage = (key: string) => {
  if (!key || typeof window === "undefined") {
    return "";
  }

  return localStorage.getItem(key);
};

export const getInitials = (fullName: string) => {
  if (!fullName) return "";
  const parts = fullName.trim().split(/\s+/);
  return parts.length >= 2 ? `${parts[0][0]}${parts[1][0]}` : "";
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

export const BOX_TYPES_TRANlSATIONS: Record<string, string> = {
  box: "Коробка",
  customBox: "Кастомная коробка",
  dropshipping: "Поштучно",
};

export const createOptionsFromTranslations = (translation: {
  [key in any]: string;
}) => {
  return Object.keys(translation).map((key) => ({
    label: translation[key as keyof typeof translation],
    value: key,
  }));
};

export const priceSeparator = (price: number) =>
  price?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, " ");

export type AuthTabsTypes = "register" | "login";

export const AUTH_TABS_TRANSLATIONS: Record<AuthTabsTypes, string> = {
  login: "Вход",
  register: "Регистрация",
};

export const COMPANY_TYPES_TRANSLATIONS: Record<type, string> = {
  INDIVIDUAL: "ИП",
  LEGAL: "ООО",
};

export const COMPANY_TAXATION_TRANSLATIONS: Record<CompanyTaxations, string> = {
  company_with_VAT: "ООО с НДС",
  company_without_VAT: "ООО без НДС",
};

export const IE_TAXATION_TRANSTLATIONS: Record<IETaxations, string> = {
  IE_Professional_Income_Tax: "ИП на НДП",
  IE_with_VAT: "ИП с НДС",
  IE_without_VAT: "ИП без НДС",
  self_employed: "Самозанятый",
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

export const ITEM_STATUSES_TRANSLATIONS: Record<itemStatus, string> = {
  active: "Активно",
  draft: "Черновик",
  reject: "Отклонено",
};
