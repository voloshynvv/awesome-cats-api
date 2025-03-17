import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import vitest from 'eslint-plugin-vitest';
import testingLibrary from 'eslint-plugin-testing-library';
import jestDom from 'eslint-plugin-jest-dom';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      vitest,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...vitest.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },
  {
    ...testingLibrary.configs['flat/react'],
  },
  {
    ...jestDom.configs['flat/recommended'],
  },
);
