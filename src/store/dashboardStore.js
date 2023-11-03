import { create } from "zustand";
import {
  apiGetCompletedOrders,
  apiGetWorkingOrders,
} from "src/services/dashboardService";

const initialState = {
  orders: [],
  completedOrders: [],
  products: [],
};

const store = (set) => ({
  ...initialState,
  setOrders: async () => {
    var res = await apiGetWorkingOrders();
    if (res == null) return;
    set({
      orders: res,
    });
  },
  setCompletedOrders: async () => {
    var res = await apiGetCompletedOrders();
    if (res == null) return;
    set({
      completedOrders: res,
    });
  },
});

const dashboardStore = create(store);

export default dashboardStore;
