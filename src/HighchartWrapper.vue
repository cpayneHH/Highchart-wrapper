<!-- src/HighchartWrapper.vue -->
<template>
  <div class="highchart-wrapper">
    <!-- Always show the title title -->
    <h2>{{ props.title }}</h2>

    <!-- If a non-empty layout was provided, use the grid-based layout -->
    <GridLayout
        v-if="props.layout?.length"
        :layout="props.layout"
        :items="dataItems"
    />

    <!-- Otherwise, render items one-by-one in the default BlockRenderer -->
    <BlockRenderer
        v-else
        :items="dataItems"
    />
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted, defineProps} from 'vue';
import type {APIResponse, BlockItem, WrapperProps} from './types';

import GridLayout from './components/GridLayout.vue';
import BlockRenderer from './components/BlockRenderer.vue';

// 1) Grab props as defined in your types.ts
const props = defineProps<WrapperProps>();

// 2) Create a local, reactive copy of items
//    (start with whatever the consumer passed in)
const dataItems = ref<BlockItem[]>(props.items);

// 3) If no items were passed, but an endpoint exists, fetch on mount
onMounted(async () => {
  if ((!props.items || props.items.length === 0) && props.endpoint) {
    try {
      const res = await fetch(props.endpoint)
      // tell TS these are your APIResponse objects
      const responses = (await res.json()) as APIResponse[]

      // flat‐map all of their payload arrays into dataItems
      dataItems.value = responses.flatMap(r => r.payload)
    } catch (err) {
      console.error('MyComponent: failed to fetch items from', props.endpoint, err);
    }
  }
});
</script>

<style scoped>
/* Component styles */
</style>
