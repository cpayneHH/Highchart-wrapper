<template>
  <div v-for="(row, idRow) in layout" class="row">
    <div
        v-for="(el, id) in getContentRowData(idRow, row.length)"
        class="my-2"
        :class="'col-lg-' + getColNum(row, id)"
    >
      <slot :element="el"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted} from 'vue'
import {debug} from '../base'

/**
 * @component GridLayout
 * @purpose Grid component that creates slots according to layout definition
 */

interface Props {
  content: any[]
  layout: number[][]
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update:modelValue'): void
}>()

const content = props.content
const layout = props.layout

/**
 * @function onMounted
 * @purpose initialize the input when the component is mounted
 */
onMounted(() => {
  debug('GridLayout: onMounted:')
})

/**
 * @function getContentRowData
 * @purpose Returns the part of the Content array that is displayed in the current Layout row.
 */
const getContentRowData = (idRow: number, rowLength: number): any[] => {
  const start = [].concat(...layout.slice(0, idRow)).length
  const end = start + rowLength
  return content.slice(start, end)
}

/**
 * @function getColNum
 * @purpose Returns the number of columns used by the Content element according to Layout.
 */
const getColNum = (row: number[], id: number): number => {
  const gridColumns = 12
  return (gridColumns / row.reduce((a, b) => a + b, 0)) * row[id]
}
</script>
