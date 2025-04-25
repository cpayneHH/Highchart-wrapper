<template>
  <div class="w-100 d-flex align-items-center justify-content-center dashboard-tile-height">
    <div class="px-4">
      <div class="text-mulberry-dark font-size-md pb-2">{{ title }}</div>
      <div v-html="description" class="text-grey-darkest font-size-xs"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {defineProps} from 'vue';
import {CalloutOptions} from "../types";

const {title, description} = defineProps<CalloutOptions>();
</script>

<style scoped>
</style>
