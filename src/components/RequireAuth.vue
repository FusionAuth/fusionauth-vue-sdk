<template>
  <template v-if="hasRole">
    <slot></slot>
  </template>
</template>

<script setup lang="ts">
import {inject, onMounted, ref} from "vue";
import {isLoggedIn, getUserInfo} from "../utils";
import {FusionAuthInjectionKey} from "../FusionAuthInjectionKey";
import {FusionAuthConfig} from "../types";

const props = defineProps<{
  withRole?: string | string[];
}>();

const hasRole = ref(false);

const config = inject(FusionAuthInjectionKey);

onMounted(async () => {
  if (!config) throw new Error("FusionAuth config not found. Provide config when installing plugin.");
  hasRole.value = await checkRole(config);
});

/**
 * Checks if the user has the specified role(s).
 *
 * @param {FusionAuthConfig} config - The configuration object for FusionAuth.
 * @returns {Promise<boolean>} - A promise that resolves to a boolean indicating if the user has the role(s).
 */
async function checkRole(config: FusionAuthConfig): Promise<boolean> {
  if (isLoggedIn()) {
    if (props.withRole) {
      const userInfo = await getUserInfo(config);
      const roles = Array.isArray(props.withRole) ? props.withRole : [props.withRole];
      return !!userInfo.roles?.some(role => roles.includes(role.name));
    }
    return true;
  }
  return false;
}
</script>
