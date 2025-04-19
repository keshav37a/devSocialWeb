import js from '@eslint/js'
import importPlugin from 'eslint-plugin-import'
import prettierPlugin from 'eslint-plugin-prettier'
import reactPlugin from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig } from 'eslint/config'
import globals from 'globals'

export default defineConfig([
    importPlugin.flatConfigs.recommended,
    { ignores: ['dist', '**/*.config.js'] },
    { files: ['**/*.{js,mjs,cjs,jsx}'], plugins: { js }, extends: ['js/recommended'] },
    { ...reactPlugin.configs.flat.recommended, ...reactPlugin.configs.flat['jsx-runtime'] },
    {
        files: ['**/*.{js,mjs,cjs,jsx}'],
        languageOptions: {
            ecmaVersion: 'latest',
            globals: { ...globals.browser, ...globals.serviceworker },
            parserOptions: {
                ecmaVersion: 'latest',
                ecmaFeatures: { jsx: true },
                sourceType: 'module',
            },
        },
        plugins: {
            js,
            prettier: prettierPlugin,
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
        },
        rules: {
            ...js.configs.recommended.rules,
            ...reactHooks.configs.recommended.rules,
            curly: ['error', 'all'],
            eqeqeq: ['error', 'always'],
            'no-console': 'warn',
            'no-var': 'error',
            'no-undef': 'error',
            'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
            'prefer-const': 'error',
            'prettier/prettier': 'error',
            'prefer-arrow-callback': 'warn',
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'error',
            'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
            'react/jsx-boolean-value': 'error',
            'react/jsx-pascal-case': 'error',
            'react/no-unescaped-entities': 'error',
            'react/jsx-uses-react': 'off',
            'react/jsx-fragments': 'error',
            'react/jsx-uses-vars': 'error',
            'react/react-in-jsx-scope': 'off',
            'react/prop-types': 'off',
            'react/jsx-handler-names': [
                'error',
                {
                    eventHandlerPrefix: 'handle',
                    eventHandlerPropPrefix: 'on',
                    checkLocalVariables: true,
                    checkInlineFunction: true,
                },
            ],
            'react/jsx-key': ['error', { checkFragmentShorthand: true, warnOnDuplicates: true }],
            'react/jsx-no-constructed-context-values': 'error',
            'react/jsx-no-duplicate-props': 'error',
            'react/jsx-no-leaked-render': ['error', { validStrategies: ['ternary', 'coerce'] }],
            'react/jsx-no-useless-fragment': 'error',
            'react/jsx-sort-props': ['error', { shorthandFirst: true }],
            'react/no-array-index-key': 'error',
            'react/no-multi-comp': ['error', { ignoreStateless: true }],
            'react/self-closing-comp': [
                'error',
                {
                    component: true,
                    html: true,
                },
            ],
            'react/jsx-props-no-spreading': 'error',
            'react/no-unknown-property': 'error',
            'react/no-children-prop': 'error',
            'react/no-unstable-nested-components': 'error',
            'react/destructuring-assignment': ['error', 'always', { destructureInSignature: 'always' }],
            'react/no-typos': 'warn',
            'require-await': 'warn',
            'import/no-named-as-default': 'off',
            'import/no-dynamic-require': 'warn',
            'import/order': [
                'error',
                {
                    groups: ['external', 'builtin', 'sibling', 'internal'],
                    pathGroups: [
                        {
                            pattern: 'react',
                            group: 'external',
                            position: 'before',
                        },
                        {
                            pattern: '*/*utils',
                            group: 'internal',
                            position: 'after',
                        },
                        {
                            pattern: '*/constants',
                            group: 'internal',
                            position: 'after',
                        },
                    ],
                    pathGroupsExcludedImportTypes: ['react'],
                    'newlines-between': 'always',
                    alphabetize: {
                        order: 'asc',
                        caseInsensitive: true,
                    },
                },
            ],
        },
    },
    {
        settings: {
            react: {
                version: 'detect',
            },
            'import/resolver': {
                alias: {
                    map: [
                        ['@Auth', './src/modules/Auth'],
                        ['@CoreUI', './src/modules/CoreUI'],
                        ['@Feed', './src/modules/Feed'],
                        ['@Profile', './src/modules/Profile'],
                        ['modules', './src/modules'],
                        ['services', './src/services'],
                        ['src', './src'],
                    ],
                    extensions: ['.js', '.jsx'],
                },
            },
        },
    },
])
