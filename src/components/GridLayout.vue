<template>
  <div class="grid-layout" data-testid="grid-layout">
    <div
        v-for="(row, rowIndex) in layout"
        :key="rowIndex"
        class="row"
        data-testid="row"
    >
      <div
          v-for="(width, colIndex) in row"
          :key="colIndex"
          class="my-2"
          :class="'col-lg-' + getColNum(row, colIndex)"
          data-testid="col"
      >
        <BlockRenderer v-if="flattenedItems[rowOffsets[rowIndex] + colIndex]"
                       :items="[flattenedItems[rowOffsets[rowIndex] + colIndex]]"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, PropType} from 'vue';
import BlockRenderer from './BlockRenderer.vue';
import type {BlockItem, LayoutGrid} from '@types';

const props = defineProps({
  layout: {
    type: Array as PropType<LayoutGrid[]>,
    required: true
  },
  items: {
    type: Array as PropType<BlockItem[]>,
    default: () => []
  }
});

// Flatten layout to track where each row starts
const rowOffsets = computed(() => {
  const offsets: number[] = [];
  let current = 0;
  for (const row of props.layout) {
    offsets.push(current);
    current += row.length;
  }
  return offsets;
});

const flattenedItems = computed(() => props.items ?? []);

function getColNum(row: number[], index: number): number {
  const gridColumns = 12;
  const totalUnits = row.reduce((a, b) => a + b, 0) || 1;
  return Math.floor((gridColumns / totalUnits) * row[index]);
}
</script>
