import {FusionAuthConfig, UserInfo} from "../types";
import {getURLForPath} from "./getURLForPath";

export const getUserInfo = (config: FusionAuthConfig): Promise<UserInfo> => {
  const path = config.mePath ?? '/app/me';
  const uri = getURLForPath(config, path);
  return fetch(uri, {
    credentials: 'include',
  })
    .then(resp => resp.json());
}
