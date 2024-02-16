module.exports = {
  env: {
    node: true, // This enables Node.js global variables
    es2021: true // Assuming you're using ES2021 features; adjust as needed
  },
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier'
  ],
  overrides: [
    {
      files: ['cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}'],
      extends: ['plugin:cypress/recommended']
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    semi: [2, 'never'],
    'import/no-commonjs': 'off'
  }
}
