// src/stories/TitleBlock.stories.ts
import type { Meta, StoryFn } from '@storybook/vue3';
import TitleBlock from '../blocks/TitleBlock.vue';
import type { TitleOptions } from '../types';

const meta: Meta<TitleOptions> = {
    title: 'Blocks/TitleBlock',
    component: TitleBlock,
    argTypes: {
        title: {
            control: 'text',
            description: 'The main heading text to display.',
            table: { type: { summary: 'string' } }
        },
        description: {
            control: 'text',
            description: 'Optional subtitle or additional information below the heading.',
            table: { type: { summary: 'string' }, defaultValue: { summary: 'undefined' } }
        }
    },
    parameters: {
        docs: {
            description: {
                component: 'Renders a prominent title block with centered heading and optional description.'
            }
        }
    }
};
export default meta;

type Story = StoryFn<TitleOptions>;

export const Default: Story = (args) => ({
    components: { TitleBlock },
    setup() {
        return { args };
    },
    template: '<TitleBlock v-bind="args" />',
});
Default.args = {
    title: 'Dashboard Overview',
    description: 'An at-a-glance view of your key metrics',
};
