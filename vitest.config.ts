// vitest.config.ts
import path from 'path';
import {defineConfig} from 'vitest/config';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@components': path.resolve(__dirname, './src/components'),
            '@mocks': path.resolve(__dirname, './tests/mocks'),
            '@types': path.resolve(__dirname, './src/types.ts'),
        },
    },
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './tests/setup.ts',
    },
});
