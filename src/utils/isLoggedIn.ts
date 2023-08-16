import {getExpTime} from "./getExpTime";

export const isLoggedIn = () => {
  return (getExpTime() ?? 0) > new Date().getTime();
}
