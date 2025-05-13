<template>
  <component
      v-for="block in validBlocks"
      :key="block.id"
      :is="componentMap[block.type]"
      v-bind="block.options"
  />
</template>

<script setup lang="ts">
import {BlockItem} from '../types';
import TitleBlock from '../blocks/TitleBlock.vue';
import CalloutBlock from '../blocks/CalloutBlock.vue';
import HighchartBlock from '../blocks/HighchartBlock.vue';
import {computed} from "vue";

const props = defineProps<{ items: BlockItem[] }>();

const validBlocks = computed(() =>
    props.items.filter((b) => b?.type && componentMap[b.type])
);

const componentMap = {
  'title': TitleBlock,
  'callout': CalloutBlock,
  'chart': HighchartBlock
}
</script>
