import {InjectionKey} from "vue";
import {FusionAuthConfig} from "./types.ts";

export const FusionAuthInjectionKey: InjectionKey<FusionAuthConfig> = Symbol("FusionAuthInjectionKey");
