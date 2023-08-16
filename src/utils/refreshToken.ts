import {FusionAuthConfig} from "../types.ts";
import {getURLForPath} from "./getURLForPath.ts";

export const refreshToken = async (config: FusionAuthConfig): Promise<void> => {
  const path = `${config.tokenRefreshPath ?? '/app/refresh'}/${config.clientId}`;
  const uri = getURLForPath(config, path);
  const resp = await fetch(uri, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'text/plain',
    }
  });
  if (!(resp.status >= 200 && resp.status < 300)) {
    throw new Error('Error refreshing access token in fusionauth');
  }
}
