<template>
  <button class="logout-button" @click="doLogout()">
    <slot>Logout</slot>
  </button>
</template>

<script setup lang="ts">
import {inject} from "vue";
import {logout} from "../utils";
import {FusionAuthInjectionKey} from "../FusionAuthInjectionKey";

const config = inject(FusionAuthInjectionKey);

function doLogout() {
  if (!config) throw new Error("FusionAuth config not found. Provide config when installing plugin.");
  logout(config);
}
</script>

<style lang="scss" scoped>
@import '../styles/button.scss';

.logout-button {
  @extend .fusionauth-button;
}
</style>
