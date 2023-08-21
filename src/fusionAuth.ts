import type {FusionAuth, FusionAuthConfig, UserInfo} from "./types";
import {doRedirectForPath, getExpTime, getURLForPath} from "./utils";

export const createFusionAuth = (config: FusionAuthConfig): FusionAuth => {

  async function getUserInfo(): Promise<UserInfo> {
    const path = config.mePath ?? '/app/me';
    const uri = getURLForPath(config, path);
    let resp = await fetch(uri, {
      credentials: 'include',
    });
    return await resp.json();
  }

  function isLoggedIn(): boolean {
    return (getExpTime() ?? 0) > new Date().getTime();
  }

  function login(state?: string): void {
    const path = config.loginPath ?? '/app/login';
    doRedirectForPath(config, path, {state});
  }

  function logout(): void {
    const path = config.logoutPath ?? '/app/logout';
    doRedirectForPath(config, path);
  }

  async function refreshToken(): Promise<void> {
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

  function register(state?: string): void {
    const path = config.registerPath ?? '/app/register';
    doRedirectForPath(config, path, {state});
  }

  return {
    getUserInfo,
    isLoggedIn,
    login,
    logout,
    refreshToken,
    register
  }
}
