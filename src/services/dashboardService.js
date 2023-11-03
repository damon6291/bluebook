import Cookies from "js-cookie";
import { JWTTOKEN } from "src/constants/textConstants";
import { APIURL } from "src/constants/apiConstants";
import { toast } from "react-toastify";

export const apiGetWorkingOrders = async () => {
  let result = undefined;
  const jwtToken = Cookies.get(JWTTOKEN);
  // TODO: if JWT token expired
  try {
    const response = await fetch(`${APIURL}Owner/Orders`, {
      method: "GET",
      mode: "cors",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": `*`,
      },
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

export const apiGetCompletedOrders = async () => {
  let result = undefined;
  const jwtToken = Cookies.get(JWTTOKEN);
  // TODO: if JWT token expired
  try {
    const response = await fetch(`${APIURL}Owner/CompletedOrders`, {
      method: "GET",
      mode: "cors",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": `*`,
      },
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
