// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import jestlint from 'eslint-plugin-jest'

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ["tests/**/*"],
    ...jestlint.configs['flat/recommended'],
    env: {
      "jest/globals": true
    },
    rules: {
      'jest/no-disabled-tests': 'warn',  
    }
  // },
  // {
  //   rules: {
  //     'no-new': 'off',
  //     'jest/no-disabled-tests': 'warn',  
  //   }
  }
);
