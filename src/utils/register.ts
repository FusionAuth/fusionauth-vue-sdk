import {FusionAuthConfig} from "../types";
import {doRedirectForPath} from "./doRedirectForPath";

export const register = async (config: FusionAuthConfig, state?: string) => {
  const path = config.registerPath ?? '/app/register';
  doRedirectForPath(config, path, {state});
}
