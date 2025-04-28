// .eslintrc.cjs
module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 2021,
        sourceType: 'module',
        extraFileExtensions: ['.vue'],
    },
    plugins: [
        'vue',
        '@typescript-eslint',
        'import',
        'prettier'
    ],
    extends: [
        'eslint:recommended',                  // base JS rules
        'plugin:vue/vue3-recommended',         // Vue3 style & best-practices
        'plugin:@typescript-eslint/recommended', // TS lint rules
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'plugin:prettier/recommended'          // runs Prettier as an ESLint rule
    ],
    settings: {
        'import/resolver': {
            typescript: {},                      // so `import Foo from '@/...'` works
        },
    },
    rules: {
        // enforce Prettier formatting
        'prettier/prettier': 'error',

        // your preferences
        'semi': ['error', 'always'],
        'quotes': ['error', 'single', {avoidEscape: true}],

        // TS: allow inferring return types on simple funcs
        '@typescript-eslint/explicit-module-boundary-types': 'off',

        // Vue specific tweaks
        'vue/html-indent': ['error', 2],
        'vue/script-indent': ['error', 2, {baseIndent: 1, switchCase: 1}],

        // Import order
        'import/order': [
            'error',
            {
                groups: ['builtin', 'external', 'internal', ['index', 'sibling', 'parent']],
                pathGroups: [
                    {pattern: '@/src/**', group: 'internal'}
                ],
                alphabetize: {order: 'asc', caseInsensitive: true},
                'newlines-between': 'always',
            }
        ],

        // turn off rules that conflict with Prettier
        'vue/max-attributes-per-line': 'off',
        'vue/singleline-html-element-content-newline': 'off',
        'vue/multiline-html-element-content-newline': 'off',
    },
};
