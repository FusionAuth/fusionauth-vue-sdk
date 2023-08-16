import {FusionAuthConfig} from "../types.ts";
import {doRedirectForPath} from "./doRedirectForPath.ts";

export const logout = (config: FusionAuthConfig) => {
  const path = config.logoutPath ?? '/app/logout';
  doRedirectForPath(config, path);
}
