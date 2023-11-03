import { create } from "zustand";

const initialState = {
  events: [{}],
  showMainEvent: true,
};

const store = (set, get) => ({
  ...initialState,
  getEvents: () => {},
  setShowMainEvent: (bool) => {
    set({ showMainEvent: bool });
  },
});

const eventStore = create(store);

export default eventStore;
