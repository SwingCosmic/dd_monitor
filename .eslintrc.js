module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',

    'vue/no-unused-components': 'off',
    'vue/no-side-effects-in-computed-properties': 'warn',
    'vue/no-unused-vars': 'warn',
    'vue/this-in-template': 'warn',
    
    '@typescript-eslint/no-var-requires': "off",
    '@typescript-eslint/camelcase': "off",
    '@typescript-eslint/class-name-casing': "warn",
    'no-empty': 'warn',
  }
}
