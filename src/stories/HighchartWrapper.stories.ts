// src/stories/HighchartWrapper.stories.ts
import type { Meta, StoryFn } from '@storybook/vue3';
import HighchartWrapper from '../HighchartWrapper.vue';
import type { WrapperProps, BlockItem } from '../types';

const meta: Meta<WrapperProps> = {
    title: 'HighchartWrapper',
    component: HighchartWrapper,
    argTypes: {
        title:    { control: 'text' },
        items:    { control: 'object' },
        layout:   { control: 'object' },
        endpoint: { control: 'text' },
    },
};

export default meta;

type Story = StoryFn<WrapperProps>;

// sample content items
const sampleItems: BlockItem[] = [
    {
        id: '1',
        type: 'title',
        options: {
            title:       'My Dashboard',
            description: 'Overview of key metrics',
        },
    },
    {
        id: '2',
        type: 'callout',
        options: {
            title:       'Alert',
            description: 'Server CPU usage > 80%',
        },
    },
    {
        id: '3',
        type: 'chart',
        options: {
            chart: {
                type: 'column',
            },
            title: {
                text: 'Monthly Sales',
            },
            series: [
                { name: 'Sales', data: [29, 71, 106, 129, 144] },
            ],
        },
    },
];

export const Default: Story = (args) => ({
    components: { HighchartWrapper },
    setup() { return { args }; },
    template: '<HighchartWrapper v-bind="args"  title="Default Title"/>',
});
Default.args = {
    title: 'Default View',
    items: sampleItems,
};

export const WithLayout: Story = (args) => ({
    components: { HighchartWrapper },
    setup() { return { args }; },
    template: '<HighchartWrapper v-bind="args"  title="Default Title"/>',
});
WithLayout.args = {
    ...Default.args,
    // two rows: first row spans full width for title, second splits chart + callout
    layout: [
        [1, 1, 1],    // row 1: one cell (title) spanning 3 columns
        [2, 1],       // row 2: chart in first col, callout in second (grid code handles span)
    ],
};
