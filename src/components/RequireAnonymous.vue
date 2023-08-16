<template>
  <template v-if="isAnonymous">
    <slot></slot>
  </template>
</template>

<script setup lang="ts">
import {inject, onMounted, ref} from "vue";
import {isLoggedIn} from "../utils";
import {FusionAuthInjectionKey} from "../FusionAuthInjectionKey";

const isAnonymous = ref(false);

const config = inject(FusionAuthInjectionKey);

onMounted(async () => {
  if (!config) throw new Error("FusionAuth config not found. Provide config when installing plugin.");
  isAnonymous.value = !isLoggedIn();
});
</script>
