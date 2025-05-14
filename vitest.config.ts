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
        coverage: {
            provider: 'v8',
            reporter: ['text', 'lcov', 'html'],
            reportsDirectory: 'coverage',
            exclude: [
                'node_modules/**',
                'dist/**',
                '.yarn/**',

                // config, scripts, typings
                '**/*.d.ts',
                '*.config.*',
                '.eslintrc.*',
                'vite.config.*',
                'vitest.config.*',
                'rollup.config.*',
                'package.json',
                'yarn.lock',

                // test files and mocks
                'tests/**',
                'tests/**/*.spec.*',
                'tests/mocks/**',

                // bootstrapping & typings you don’t need coverage on:
                'src/main.ts',
                'src/App.vue',
                'src/types.ts',
                'src/index.ts',
            ]
        }
    },
});
