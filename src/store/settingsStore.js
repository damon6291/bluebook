import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import Cookies from "js-cookie";

const initialState = {
  themeMode: "light", // 'light' or 'dark'
  language: Cookies.get("i18next") ?? "en",
};

const store = (set) => ({
  ...initialState,
  setThemeMode: (mode) => {
    set({ themeMode: mode });
  },
  setLanguage: (lan, i18n) => {
    i18n.changeLanguage(lan);
    Cookies.set("i18next", lan);
    set({ language: lan });
  },
});

const settingsStore = create(store);

export default settingsStore;
