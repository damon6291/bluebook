import Cookies from "js-cookie";
import { JWTTOKEN } from "src/constants/textConstants";
import loadingStore from "src/store/loadingStore";
import { APIURL } from "src/constants/apiConstants";
import { toast } from "react-toastify";

export const apiRegisterUser = async (data) => {
  let result = undefined;
  try {
    const response = await fetch(`${APIURL}Login/Register`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": `*`,
      },
      body: JSON.stringify(data),
    });
    if (response.status == 200) {
      var ret = await response.json();
      result = ret;
    }
  } catch (err) {
    toast.error(err.message);
  }
  return result;
};

export const apiLoginUser = async (data) => {
  let result = undefined;
  try {
    const response = await fetch(`${APIURL}Login/Login`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": `*`,
      },
      body: JSON.stringify(data),
    });
    if (response.status == 200) {
      var ret = await response.json();
      result = ret;
    }
  } catch (err) {
    toast.error(err.message);
  }
  return result;
};

export const apiRefreshUser = async (data) => {
  let result = undefined;
  try {
    const response = await fetch(
      `${APIURL}Login/Refresh?refreshToken=${data}`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": `*`,
        },
      }
    );
    if (response.status == 200) {
      var ret = await response.json();
      result = ret;
    }
  } catch (err) {
    toast.error(err.message);
  }
  return result;
};

// export const sample = async () => {
//   const setIsLoading = loadingStore((state) => state.setIsLoading);
//   setIsLoading(true);
//   let result = undefined;
//   const jwtToken = Cookies.get(JWTTOKEN);
//   if (jwtToken !== undefined) {
//     try {
//       const response = await fetch(`${APIURL}User/Login`, {
//         method: "POST",
//         mode: "cors",
//         headers: {
//           "Content-Type": "application/json",
//           "Access-Control-Allow-Origin": `*`,
//         },
//         body: JSON.stringify(data),
//       });
//       if (response.status != 200) return 0;
//       var ret = await response.text();
//       result = parseInt(ret) ?? 0;
//     } catch (err) {
//       toast.error(err.message);
//     }
//   }
//   setIsLoading(false);
//   return result;
// };
