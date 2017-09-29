module.exports = {
  root: true,
  parser: 'babel-eslint',
  plugins: ['react', 'jest', 'flowtype'],
  extends: ['prettier', 'airbnb'],
  rules: {
    'react/jsx-uses-react': 2,
    'react/jsx-uses-vars': 2,
    'react/jsx-filename-extension': 0,
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
