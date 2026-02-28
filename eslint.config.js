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
            'no-var': 'warn',
            'no-undef': 'error',
            'no-unused-vars': ['warn', { varsIgnorePattern: '^[A-Z_]' }],
            'prefer-const': 'warn',
            'prettier/prettier': 'error',
            'prefer-arrow-callback': 'warn',
            'react-hooks/rules-of-hooks': 'warn',
            'react-hooks/exhaustive-deps': 'warn',
            'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
            'react/jsx-boolean-value': 'warn',
            'react/jsx-pascal-case': 'warn',
            'react/no-unescaped-entities': 'warn',
            'react/jsx-uses-react': 'off',
            'react/jsx-fragments': 'warn',
            'react/jsx-uses-vars': 'warn',
            'react/react-in-jsx-scope': 'off',
            'react/prop-types': 'off',
            'react/jsx-handler-names': [
                'warn',
                {
                    eventHandlerPrefix: 'handle',
                    eventHandlerPropPrefix: 'on',
                    checkLocalVariables: true,
                    checkInlineFunction: true,
                },
            ],
            'react/jsx-key': ['error', { checkFragmentShorthand: true, warnOnDuplicates: true }],
            'react/jsx-no-constructed-context-values': 'warn',
            'react/jsx-no-duplicate-props': 'error',
            'react/jsx-no-leaked-render': ['error', { validStrategies: ['ternary', 'coerce'] }],
            'react/jsx-no-useless-fragment': 'warn',
            'react/jsx-sort-props': ['warn', { shorthandFirst: true }],
            'react/no-array-index-key': 'error',
            'react/no-multi-comp': ['warn', { ignoreStateless: true }],
            'react/self-closing-comp': [
                'warn',
                {
                    component: true,
                    html: true,
                },
            ],
            'react/no-unknown-property': 'warn',
            'react/no-children-prop': 'warn',
            'react/no-unstable-nested-components': 'warn',
            'react/destructuring-assignment': ['warn', 'always', { destructureInSignature: 'always' }],
            'react/no-typos': 'warn',
            'require-await': 'warn',
            'import/no-named-as-default': 'off',
            'import/no-dynamic-require': 'warn',
            'import/order': [
                'warn',
                {
                    groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
                    pathGroups: [
                        {
                            pattern: '{react,react-dom/client}',
                            group: 'external',
                            position: 'before',
                        },
                        {
                            pattern: '{@components,@components/**,**/components,**/components/**}',
                            group: 'internal',
                            position: 'after',
                        },
                        {
                            pattern: 'icons',
                            group: 'internal',
                            position: 'after',
                        },
                        {
                            pattern: '**/*{api,slice}',
                            group: 'internal',
                            position: 'after',
                        },
                        {
                            pattern: '{./store,**/*store}',
                            group: 'internal',
                            position: 'after',
                        },
                        {
                            pattern: 'services/**',
                            group: 'internal',
                            position: 'after',
                        },
                        {
                            pattern: '{hooks,**/hooks,**/hooks/**}',
                            group: 'internal',
                            position: 'after',
                        },
                        {
                            pattern: 'src/{utils,main}',
                            group: 'internal',
                            position: 'after',
                        },
                        {
                            pattern: '{**/constants,**/*constants}',
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
                        ['@auth', './src/modules/auth'],
                        ['@chat', './src/modules/chat'],
                        ['@components', './src/modules/components'],
                        ['@connections', './src/modules/connections'],
                        ['@connection-requests', './src/modules/connection-requests'],
                        ['@layout', './src/modules/layout'],
                        ['@feed', './src/modules/feed'],
                        ['@user-profile', './src/modules/user-profile'],
                        ['hooks', './src/hooks'],
                        ['icons', './src/icons'],
                        ['services', './src/services'],
                        ['src', './src'],
                    ],
                    extensions: ['.js', '.jsx'],
                },
            },
        },
    },
])
