<template>
  <button class="login-button" @click="doLogin()">
    <slot>Login</slot>
  </button>
</template>

<script setup lang="ts">
import {inject} from "vue";
import {login} from "../utils";
import {FusionAuthInjectionKey} from "../FusionAuthInjectionKey";

const props = defineProps<{
  state?: string;
}>();

const config = inject(FusionAuthInjectionKey);

function doLogin() {
  if (!config) throw new Error("FusionAuth config not found. Provide config when installing plugin.");
  login(config, props.state);
}
</script>

<style lang="scss" scoped>
@import '../styles/button.scss';

.login-button {
  @extend .fusionauth-button;
}
</style>
