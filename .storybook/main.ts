import type { StorybookConfig } from '@storybook/vue3-vite';

const config: StorybookConfig = {
  // Only pick up your own stories
  stories: ['../src/stories/**/*.stories.ts'],

  // Use the Vue 3 framework adapter
  framework: {
    name: '@storybook/vue3',
    options: {},
  },

  // Tell SB to use Vite under the hood
  core: {
    builder: '@storybook/builder-vite',
  },

  addons: [
    '@storybook/addon-essentials',
    '@chromatic-com/storybook'
  ],
};
export default config;
