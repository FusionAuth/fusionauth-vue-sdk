import {App} from "vue";
import {FusionAuthConfig} from "./types.ts";
import * as components from './components';
import {FusionAuthInjectionKey} from "./FusionAuthInjectionKey.ts";

/**
 * Installation method for the FusionAuthVuePlugin.
 *
 * @category Plugin
 * @param {App} app - The Vue app instance.
 * @param {FusionAuthConfig} options - The configuration options for the plugin.
 * @throws {Error} Will throw an error if the required options are missing.
 */
const FusionAuthVuePlugin = {
  install(app: App, options: FusionAuthConfig) {
    // Validate options
    if (!options.clientId) {
      throw new Error("clientId is required");
    }

    if (!options.serverUrl) {
      throw new Error("serverUrl is required");
    }

    // Provide the options to the app
    app.provide(FusionAuthInjectionKey, options);

    // Register the components
    Object.entries(components)
      .forEach(([key, component]) => {
        app.component(key, component);
      });
  }
}

export default FusionAuthVuePlugin;

export * from "./components";
export * from "./utils";
export * from "./types";
export {FusionAuthInjectionKey};
