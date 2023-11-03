import { create } from "zustand";

const initialState = {
  isLoading: false,
};

const store = (set) => ({
  ...initialState,
  setIsLoading: (bool) => {
    set({ isLoading: bool });
  },
});

const loadingStore = create(store);

export default loadingStore;
