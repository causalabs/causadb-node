import globals from "globals";
import eslint from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'
import tseslint from 'typescript-eslint'
import jestlint from 'eslint-plugin-jest'

export default [
  eslint.configs.recommended,
  ...tseslint.configs.stylisticTypeChecked,
  stylistic.configs.customize({
    // the following options are the default values
    indent: 2,
    quotes: 'single',
    semi: false,
    jsx: true,
    // ...
  }),
  {
    name: 'tsconfig-parser',
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    name: 'tests',
    files: ["**/*.test.ts"],
    ...jestlint.configs['flat/recommended'],
    rules: {
      'jest/no-disabled-tests': 'warn',  
    },
    languageOptions: {
      globals: {
          ...globals.jest,
      }
    }
  }
]
