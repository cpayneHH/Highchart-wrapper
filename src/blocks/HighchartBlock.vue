<!-- src/blocks/HighchartBlock.vue -->
<template>
  <Chart :options="options" class="dashboard-tile-shadow"></Chart>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { Chart } from 'highcharts-vue';
import type { Options as HighchartsOptions } from 'highcharts';

// Just grab whatever props the story gives you
const options = defineProps<HighchartsOptions>();
</script>

<style scoped></style>
