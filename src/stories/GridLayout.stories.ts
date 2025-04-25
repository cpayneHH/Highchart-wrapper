import type { Meta, StoryFn } from '@storybook/vue3';
import BlockRenderer from '../components/BlockRenderer.vue';
import type { BlockItem } from '../types';

const meta: Meta = {
    title: 'Components/BlockRenderer',
    component: BlockRenderer,
    argTypes: {
        items: { control: 'object' },
    },
};
export default meta;

type Story = StoryFn<{ items: BlockItem[] }>;

const sampleItems: BlockItem[] = [
    { id: '1', type: 'title',   options: { title: 'Hello',   description: 'World' } },
    { id: '2', type: 'callout', options: { title: 'Note',    description: 'Be aware' } },
    { id: '3', type: 'chart',   options: { chart: { type: 'pie' }, title: { text: 'Data' }, series: [ { name: '', data: [1,2,3] } ] } }
];

export const AllTypes: Story = (args) => ({
    components: { BlockRenderer },
    setup() { return { args }; },
    template: '<BlockRenderer v-bind="args" />',
});
AllTypes.args = {
    items: sampleItems,
};
