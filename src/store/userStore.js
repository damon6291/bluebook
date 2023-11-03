import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import Cookies from "js-cookie";
import { JWTTOKEN, REFRESHTOKEN } from "src/constants/textConstants";
import {
  apiRegisterUser,
  apiLoginUser,
  apiRefreshUser,
} from "src/services/userService";
import { getUTCTimeStamp, getUTCTimeStampDay } from "src/utils/format-time";
import { isJwtExpired } from "src/utils/jwt";

const initialState = {
  user: null,
};

const store = (set, get) => ({
  ...initialState,
  registerUser: async (object) => {
    var res = await apiRegisterUser(object);
    if (res == undefined) return false;
    Cookies.set(JWTTOKEN, res.jwtToken);
    localStorage.setItem(REFRESHTOKEN, JSON.stringify(res.refreshToken));
    set({
      user: res.user,
    });
    return true;
  },
  loginUser: async (object) => {
    var res = await apiLoginUser(object);
    if (res == undefined) return false;
    Cookies.set(JWTTOKEN, res.jwtToken);
    localStorage.setItem(REFRESHTOKEN, JSON.stringify(res.refreshToken));
    set({
      user: res.user,
    });
    return true;
  },
  refreshUser: async () => {
    console.log("Refresh User Start");
    var refreshToken = localStorage.getItem(REFRESHTOKEN);
    if (refreshToken == undefined || refreshToken.trim().length == 0) {
      set({ user: null });
      removeCookies();
      return false;
    }
    var refresh = JSON.parse(refreshToken);
    var dateTime = getUTCTimeStamp();
    if (refresh.expires < dateTime) {
      set({ user: null });
      removeCookies();
      return false;
    }
    // call user servers to refresh token
    var res = await apiRefreshUser(refresh.token);
    if (res == undefined) {
      set({ user: null });
      removeCookies();
      return false;
    }
    Cookies.set(JWTTOKEN, res.jwtToken);
    localStorage.setItem(REFRESHTOKEN, JSON.stringify(res.refreshToken));
    set({
      user: res.user,
    });
    console.log("Refresh User Success");
    return true;
  },
  isLoggedIn: () => {
    const jwt = Cookies.get(JWTTOKEN);
    const user = get().user;
    return jwt != undefined && !isJwtExpired(jwt) && user?.id && 0 > 0;
  },

  logout: () => {
    set({ user: null });
    removeCookies();
    return true;
  },
  reset: () => {
    set({ user: null });
    removeCookies();
    return true;
  },
});

const userStore = create(
  persist(store, {
    name: "user",
    storage: createJSONStorage(() => localStorage),
  })
);

export default userStore;

const removeCookies = () => {
  Cookies.remove(JWTTOKEN);
  localStorage.removeItem(REFRESHTOKEN);
  console.log("Cookies removed");
};
