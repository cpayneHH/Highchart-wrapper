<template>
  <div class="w-100 d-flex align-items-center justify-content-center dashboard-tile-height dashboard-tile-shadow">
    <div class="px-4">
      <h1 class="display-4 fw-bold header text-center">{{ title }}</h1>
      <div class="text small fw-light text-center">{{ description }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {TitleOptions} from "../types";

const {title, description} = defineProps<TitleOptions>();
</script>

<style scoped>
</style>
