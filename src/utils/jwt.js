import jwt_decode from "jwt-decode";
import { getUTCTimeStamp } from "./format-time";

export function isJwtExpired(jwt) {
  if (jwt == undefined || jwt.trim().length == 0) return true;
  const decoded = jwt_decode(jwt);
  const curTimeStamp = getUTCTimeStamp();
  return decoded.exp < curTimeStamp;
}
