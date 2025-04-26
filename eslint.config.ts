// @ts-check
import globals from 'globals';
import js from '@eslint/js';
import reactPlugin from 'eslint-plugin-react';
import hooksPlugin from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';

export default tseslint.config(js.configs.recommended, ...tseslint.configs.recommended, {
  files: ['**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}'],
  plugins: {
    react: reactPlugin,
    'react-hooks': hooksPlugin,
  },
  languageOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
    globals: {
      ...globals.browser,
      ...globals.node,
      document: 'readonly',
      navigator: 'readonly',
      window: 'readonly',
    },
  },
  rules: {
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'no-unused-vars': 'off', // Disable base rule as @typescript-eslint/no-unused-vars handles it
    '@typescript-eslint/no-unused-vars': 'warn',
    'no-console': 'warn',
  },
  ignores: ['node_modules/**', 'dist/**', 'release/**', '**/node_modules/**', 'tests/results/**'],
});
