<template>
  <div v-for="(row, rowIndex) in props.layout" :key="rowIndex" class="row">
    <div
      v-for="(el, id) in getContentRowData(rowIndex, row.length)"
      class="my-2"
      :class="'col-lg-' + getColNum(row, id)"
    >
      <BlockRenderer :items="[el]" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { GridLayoutProps } from '../types';
import { defineEmits, defineProps } from 'vue';
import BlockRenderer from './BlockRenderer.vue';

const props = defineProps<GridLayoutProps>();
const emit = defineEmits<{
  (e: 'update:modelValue'): void;
}>();

const getContentRowData = (idRow, rowLength) => {
  // Step 1: Start of array. Create ones dimension array from layout, cut it by the rows id and get length.
  const start = [].concat(...props.layout.slice(0, idRow)).length;
  // Step 2: End of array.
  const end = start + rowLength;
  return props.items.slice(start, end);
};

function getColNum(row: number[], index: number): number {
  const gridColumns = 12;
  const totalUnits = row.reduce((a, b) => a + b, 0);
  return (gridColumns / totalUnits) * row[index];
}
</script>
