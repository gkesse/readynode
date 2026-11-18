import js from '@eslint/js';
import unusedImports from 'eslint-plugin-unused-imports';
import tseslint from 'typescript-eslint';

export default [
    {
        ignores: [
            '**/node_modules/**',
            '**/dist/**',
            '**/coverage/**',
            '**/public/**',
            '**/libs/**',
            '**/*.min.js'
        ]
    },

    js.configs.recommended,

    ...tseslint.configs.recommended,

    {
        files: ['**/*.ts'],

        plugins: {
            'unused-imports': unusedImports
        },

        languageOptions: {
            parserOptions: {
                project: './tsconfig.json'
            }
        },

        rules: {
            // Supprime automatiquement les imports inutilisés
            'unused-imports/no-unused-imports': 'error',

            // Gère les variables inutilisées
            '@typescript-eslint/no-unused-vars': 'off',

            'unused-imports/no-unused-vars': [
                'warn',
                {
                    vars: 'all',
                    varsIgnorePattern: '^_',
                    args: 'after-used',
                    argsIgnorePattern: '^_'
                }
            ],

            'no-console': 'off'
        }
    }
];
