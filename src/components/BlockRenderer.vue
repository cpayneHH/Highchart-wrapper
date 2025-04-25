<template>
  <component
      v-for="block in props.items"
      :key="block.id"
      :is="componentMap[block.type]"
      v-bind="block.options"
  />
</template>

<script setup lang="ts">
import {defineProps} from 'vue';
import {BlockItem} from '../types';
import TitleBlock from '../blocks/TitleBlock.vue';
import CalloutBlock from '../blocks/CalloutBlock.vue';
import HighchartBlock from '../blocks/HighchartBlock.vue';

const props = defineProps<{ items: BlockItem[] }>();

const componentMap = {
  'title': TitleBlock,
  'callout': CalloutBlock,
  'chart': HighchartBlock
}
</script>
