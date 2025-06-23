import js from '@eslint/js'
import globals from 'globals'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { js },
    extends: ['js/recommended']
  },
  { files: ['**/*.{js,mjs,cjs}'], languageOptions: { globals: globals.node } },
  {
    rules: {
      'comma-dangle': ['error', 'never'],
      quotes: ['error', 'single'],
      semi: ['error', 'never'],
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }]
    }
  }
])
