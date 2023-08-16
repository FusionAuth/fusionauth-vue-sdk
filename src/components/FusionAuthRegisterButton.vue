<template>
  <button class="register-button" @click="doRegister()">
    <slot>Register</slot>
  </button>
</template>

<script setup lang="ts">
import {inject} from "vue";
import {register} from "../utils";
import {FusionAuthInjectionKey} from "../FusionAuthInjectionKey";

const props = defineProps<{
  state?: string;
}>();

const config = inject(FusionAuthInjectionKey);

function doRegister() {
  if (!config) throw new Error("FusionAuth config not found. Provide config when installing plugin.");
  register(config, props.state);
}
</script>

<style lang="scss" scoped>
@import '../styles/button.scss';

.register-button {
  @extend .fusionauth-button;
}
</style>
