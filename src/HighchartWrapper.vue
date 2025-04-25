<!-- src/MyComponent.vue -->
<template>
  <div class="my-component">
    <slot />
  </div>
</template>

<script setup lang="ts">
import type { HighchartWrapper } from "./types";
import {onMounted, onUnmounted} from "vue";

const props = defineProps<HighchartWrapper.Props>();

onMounted(async () => {

});

onUnmounted(() => {

});

</script>

<style scoped>
/* Component styles */
</style>
