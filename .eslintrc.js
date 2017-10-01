module.exports = {
  root: true,
  parser: 'babel-eslint',
  plugins: ['react', 'jest', 'flowtype', 'jsx-a11y'],
  extends: ['prettier', 'airbnb', 'react-app', 'plugin:jsx-a11y/recommended'],
  rules: {
    'react/jsx-uses-react': 2,
    'react/jsx-uses-vars': 2,
    'react/jsx-filename-extension': 0,
    'jsx-a11y/href-no-hash': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-unresolved': 0,
    'import/extensions': 0,
    'no-restricted-globals': 0,
  },
  globals: {
    toJson: true,
    shallow: true,
    React: true,
    ReactDOM: true,
    document: true,
    window: true,
  },
  env: {
    'jest/globals': true,
  },
};
