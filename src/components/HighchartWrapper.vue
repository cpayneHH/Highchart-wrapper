<!-- src/HighchartWrapper.vue -->
<template>
  <div class="highchart-wrapper container">
    <!-- Always show the title title -->
    <h2 v-if="props?.title" role="heading" :aria-roledescription="props.title">{{ props.title }}</h2>

    <!-- isLoading data -->
    <template v-if="isLoading">
      <div class="p-4 text-center text-gray-400">Loading data, please wait...</div>
    </template>

    <!-- Failure to load data -->
    <template v-else-if="isError">
      <div class="p-4 text-center text-red-500">
        Failed to load data.
        <button @click="reloadData" class="mt-2 btn btn-error btn-sm">Retry</button>
      </div>
    </template>

    <!-- Show gridlayout or singular element -->
    <template v-else-if="!shouldShowFallback || hasData">
      <!-- If a non-empty layout was provided, use the grid-based layout -->
      <GridLayout v-if="props.layout?.length" :layout="props.layout" :items="dataItems">
      </GridLayout>

      <!-- Otherwise, render items one-by-one in the default BlockRenderer -->
      <BlockRenderer v-else :items="dataItems"/>
    </template>

    <!-- fallback text -->
    <template v-else>
      <div class="fallback-message p-4 text-center text-gray-500">
        Please provide an items array of objects or API endpoint to obtain data from.
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import {computed, onMounted, ref} from 'vue';
import type {BlockItem, WrapperProps} from '../types';
import {fetchItems} from '../services/api';

import GridLayout from './GridLayout.vue';
import BlockRenderer from './BlockRenderer.vue';

const isLoading = ref(false);
const isError = ref(false);

// 1) Grab props as defined in your types.ts
const props = defineProps<WrapperProps>();

// 2) Create a local, reactive copy of items
//    (start with whatever the consumer passed in)
const dataItems = ref<BlockItem[]>(props.items);

// 3) If no items were passed, but an endpoint exists, fetch on mount
onMounted(async () => {
  if ((!props.items || props.items.length === 0) && props.endpoint) {
    isLoading.value = true;
    isError.value = false;

    try {
      const response = await fetchItems(props.endpoint);
      // flat‐map all of their payload arrays into dataItems
      dataItems.value = response.payload;
    } catch (err) {
      console.error('HighchartWrapper: failed to fetch items from', props.endpoint, err);
      isError.value = true;
    } finally {
      isLoading.value = false;
    }
  }
});

const hasData = computed(() => dataItems.value?.length > 0);
const shouldShowFallback = computed(() => {
  return (!props.items || props.items.length === 0) && !props.endpoint;
});

async function reloadData() {
  if (!props.endpoint) return;

  isLoading.value = true;
  isError.value = false;

  try {
    const response = await fetchItems(props.endpoint);
    dataItems.value = response.payload;
  } catch (err) {
    console.error('HighchartWrapper: failed to refetch items from', props.endpoint, err);
    isError.value = true;
  } finally {
    isLoading.value = false;
  }
}
</script>
