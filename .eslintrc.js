module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: 'standard-with-typescript',
  plugins: ['hexagonal-architecture'],
  overrides: [
    {
      files: ['src/*/*/.ts'],
      rules: { 'hexagonal-architecture/enforce': ['error'] }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
  }
}
