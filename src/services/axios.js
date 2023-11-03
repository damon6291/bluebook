// Axios and SWR can be used for caching api request -> faster response

// import axios from "axios";
// // config
// import { APIURL } from "src/utils/apiConstants";

// // ----------------------------------------------------------------------

// const axiosInstance = axios.create({ baseURL: APIURL });

// axiosInstance.interceptors.response.use(
//   (res) => res,
//   (error) =>
//     Promise.reject(
//       (error.response && error.response.data) || "Something went wrong"
//     )
// );

// export default axiosInstance;

// // ----------------------------------------------------------------------

// export const fetcher = async (args) => {
//   const [url, config] = Array.isArray(args) ? args : [args];

//   const res = await axiosInstance.get(url, { ...config });

//   return res.data;
// };

// // ----------------------------------------------------------------------

// export const endpoints = {
//   chat: "/api/chat",
//   kanban: "/api/kanban",
//   calendar: "/api/calendar",
//   auth: {
//     me: "/api/auth/me",
//     login: "/api/auth/login",
//     register: "/api/auth/register",
//   },
//   mail: {
//     list: "/api/mail/list",
//     details: "/api/mail/details",
//     labels: "/api/mail/labels",
//   },
//   post: {
//     list: "/api/post/list",
//     details: "/api/post/details",
//     latest: "/api/post/latest",
//     search: "/api/post/search",
//   },
//   product: {
//     list: "/api/product/list",
//     details: "/api/product/details",
//     search: "/api/product/search",
//   },
// };
