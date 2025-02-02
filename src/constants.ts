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
