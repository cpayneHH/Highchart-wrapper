<template>
  <div class="callout-block w-100 d-flex align-items-center justify-content-center dashboard-tile-height"
       data-testid="callout">
    <div class="px-4">
      <div class="text-mulberry-dark font-size-md pb-2">{{ title }}</div>
      <div v-html="description" class="text-grey-darkest font-size-xs"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {CalloutOptions} from "../types";

const {title, description} = defineProps<CalloutOptions>();
</script>

<style scoped>
</style>
