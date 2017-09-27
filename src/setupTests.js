// More globals! These are convenience globals that otherwise would need
// to be set up in 99% of our tests. React, enzyme, etc.

import './setup/setupJestGlobals';

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};

global.localStorage = localStorageMock;
