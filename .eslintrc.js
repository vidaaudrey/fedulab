module.exports = {
  root: true,
  plugins: ['react'],
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
    document: true,
    window: true,
  },
};
