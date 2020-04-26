module.exports = {
  browser: true,
  verbose: true,

  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/test/mocks/fileMock.js',
    '\\.(css|scss)$': '<rootDir>/test/mocks/styleMock.js'
  },

  testPathIgnorePatterns: [
    '<rootDir>/node_modules/'
  ],

  setupFiles: [
    '<rootDir>/test/setup.js',
    'jest-localstorage-mock'
  ],
  snapshotSerializers: [
    'enzyme-to-json/serializer'
  ],

  reporters: [
    'default'
  ],

  coverageThreshold: {
    global: {
      branches: 40,
      functions: 40,
      lines: 40,
      statements: 40
    },

    // The test folder should not be included in the coverage counting
    'test/**': {}
  }
};
