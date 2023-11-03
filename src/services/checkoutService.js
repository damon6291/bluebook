import Cookies from "js-cookie";
import { JWTTOKEN } from "src/constants/textConstants";
import { APIURL } from "src/constants/apiConstants";
import { toast } from "react-toastify";

export const apiGetShoppingCart = async () => {
  let result = undefined;
  const jwtToken = Cookies.get(JWTTOKEN);
  // TODO: if JWT token expired
  try {
    const response = await fetch(`${APIURL}ShoppingCart/GetShoppingCart`, {
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

export const apiAddToShoppingCart = async (data) => {
  let result = false;
  const jwtToken = Cookies.get(JWTTOKEN);
  // TODO: if JWT token expired
  try {
    const response = await fetch(`${APIURL}ShoppingCart/AddToShoppingCart`, {
      method: "Post",
      mode: "cors",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": `*`,
      },
      body: JSON.stringify(data),
    });
    if (response.status == 200) {
      result = true;
    }
  } catch (err) {
    toast.error(err.message);
  }
  return result;
};

export const apiDeleteFromShoppingCart = async (id) => {
  let result = false;
  const jwtToken = Cookies.get(JWTTOKEN);
  // TODO: if JWT token expired
  try {
    const response = await fetch(
      `${APIURL}ShoppingCart/DeleteFromShoppingCart/${id}`,
      {
        method: "Post",
        mode: "cors",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": `*`,
        },
      }
    );
    if (response.status == 200) {
      result = true;
    }
  } catch (err) {
    toast.error(err.message);
  }
  return result;
};

export const apiUpdateShoppingCart = async (data) => {
  let result = false;
  const jwtToken = Cookies.get(JWTTOKEN);
  // TODO: if JWT token expired
  try {
    const response = await fetch(`${APIURL}ShoppingCart/UpdateQuantity`, {
      method: "Post",
      mode: "cors",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": `*`,
      },
      body: JSON.stringify(data),
    });
    if (response.status == 200) {
      result = true;
    }
  } catch (err) {
    toast.error(err.message);
  }
  return result;
};

export const apiCheckout = async (data) => {
  let result = "";
  const jwtToken = Cookies.get(JWTTOKEN);
  // TODO: if JWT token expired
  try {
    const response = await fetch(`${APIURL}ShoppingCart/Checkout`, {
      method: "Post",
      mode: "cors",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": `*`,
      },
      body: JSON.stringify(data),
    });
    if (response.status == 200) {
      var ret = await response.text();
      result = ret;
    }
  } catch (err) {
    toast.error(err.message);
  }
  return result;
};
