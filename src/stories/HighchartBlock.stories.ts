// src/stories/HighchartBlock.stories.ts
import type { Meta, StoryFn } from '@storybook/vue3';
import HighchartBlock from '../blocks/HighchartBlock.vue';
import type { Options as HighchartsOptions } from 'highcharts';

const meta: Meta<HighchartsOptions> = {
    title: 'Blocks/HighchartBlock',
    component: HighchartBlock,
    argTypes: {
        // You can fine-tune controls for commonly used props:
        chart: {
            control: 'object',
            description: 'Configuration for the chart itself (type, axes, etc.)',
            table: { type: { summary: 'Highcharts.ChartOptions' } }
        },
        title: {
            control: 'object',
            description: 'Chart title configuration',
            table: { type: { summary: 'Highcharts.TitleOptions' } }
        },
        series: {
            control: 'object',
            description: 'Data series to plot',
            table: { type: { summary: 'Highcharts.SeriesOptionsType[]' } }
        }
    },
    parameters: {
        docs: {
            description: {
                component: 'Renders a Highcharts chart.  Pass any valid Highcharts `Options` directly as props.',
            }
        }
    }
};
export default meta;

type Story = StoryFn<HighchartsOptions>;

export const ColumnChart: Story = (args) => ({
    components: { HighchartBlock },
    setup() {
        return { args };
    },
    template: '<HighchartBlock v-bind="args" />',
});
ColumnChart.args = {
    chart: { type: 'column' },
    title: { text: 'Monthly Revenue' },
    series: [
        { name: 'Revenue', data: [120, 200, 150, 80, 70, 110, 130] }
    ],
};
