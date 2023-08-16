import {FusionAuthConfig} from "../types";
import {doRedirectForPath} from "./doRedirectForPath";

export const login = async (config: FusionAuthConfig, state?: string) => {
  const path = config.loginPath ?? '/app/login';
  doRedirectForPath(config, path, {state});
}
