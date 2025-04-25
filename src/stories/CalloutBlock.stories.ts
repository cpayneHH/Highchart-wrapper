// src/stories/CalloutBlock.stories.ts
import type { Meta, StoryFn } from '@storybook/vue3';
import CalloutBlock from '../blocks/CalloutBlock.vue';
import type { CalloutOptions } from '../types';

const meta: Meta<CalloutOptions> = {
    title: 'Blocks/CalloutBlock',
    component: CalloutBlock,
    argTypes: {
        title: {
            control: 'text',
            description: 'The heading text displayed prominently in the callout',
            table: { type: { summary: 'string' } }
        },
        description: {
            control: 'text',
            description: 'HTML description content for the callout',
            table: { type: { summary: 'string' } }
        },
    },
    parameters: {
        docs: {
            description: {
                component: 'A callout tile that displays a title and HTML-formatted description centered within a dashboard tile.'
            }
        }
    }
};
export default meta;

type Story = StoryFn<CalloutOptions>;

export const Default: Story = (args) => ({
    components: { CalloutBlock },
    setup() {
        const { title, description } = args;
        return { title, description };
    },
    template: '<CalloutBlock :title="title" :description="description" />',
});
Default.args = {
    title: 'Notice',
    description: '<p><strong>System maintenance</strong> scheduled for <em>02:00 AM</em> UTC.</p>',
};
