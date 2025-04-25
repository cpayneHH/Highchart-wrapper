<template>
  <highcharts :options="options" class="dashboard-tile-shadow"></highcharts>
</template>

<script lang="ts" setup>
import {defineProps} from 'vue';
import * as highcharts from "highcharts";
import type {Options as HighchartsOptions} from 'highcharts';

const options = defineProps<HighchartsOptions>();
</script>

<style scoped>
</style>
