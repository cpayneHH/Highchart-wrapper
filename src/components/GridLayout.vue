<template>
  <div v-for="(row, rowIndex) in props.layout" :key="rowIndex" class="row">
    <div
        v-for="(colSpan, colIndex) in row"
        :key="colIndex"
        class="my-2"
        :class="`col-lg-${getColNum(row, colIndex)}`"
    >
      <slot :row="rowIndex" :col="colIndex" :span="colSpan" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { GridLayoutProps } from "../types";
import { defineProps, defineEmits } from "vue";

const props = defineProps<GridLayoutProps>();
const emit = defineEmits<{
  (e: 'update:modelValue'): void
}>()

function getColNum(row: number[], index: number): number {
  const gridColumns = 12;
  const totalUnits = row.reduce((a, b) => a + b, 0);
  return (gridColumns / totalUnits) * row[index];
}
</script>
