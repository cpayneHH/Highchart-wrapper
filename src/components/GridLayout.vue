<template>
  <div class="grid-layout" data-testid="grid-layout">
    <div
        v-for="(row, rowIndex) in props.layout"
        :key="rowIndex"
        class="row"
        data-testid="row"
    >
      <div
          v-for="(blockWidth, colIndex) in row"
          :key="colIndex"
          class="my-2"
          :class="'col-lg-' + getColNum(row, colIndex)"
          data-testid="col"
      >
        <BlockRenderer :items="[getContentRowData(rowIndex, row.length)[colIndex]]"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {defineProps, PropType} from 'vue';
import BlockRenderer from './BlockRenderer.vue';
import type {BlockItem, LayoutGrid} from '../types';

const props = defineProps({
  items: {
    type: Array as PropType<BlockItem[]>,
    default: () => [],
  },
  layout: {
    type: Array as PropType<LayoutGrid[]>,
    required: true,
  },
});

function getContentRowData(rowIndex: number, rowLength: number): BlockItem[] {
  const start = rowIndex * rowLength;
  const end = start + rowLength;

  if (!Array.isArray(props.items) || props.items.length === 0) {
    return [];
  }

  return props.items.slice(start, end);
}

function getColNum(row: number[], index: number): number {
  const gridColumns = 12;
  const totalUnits = row.reduce((a, b) => a + b, 0) || 1;
  return Math.floor((gridColumns / totalUnits) * row[index]);
}
</script>
