// eslint-disable-next-line no-undef
module.exports = {
  verbose: true,
  setupFilesAfterEnv: ['<rootDir>/test/jest.setup.js'],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    "^.+\\.(css|less|sass|scss)$": require.resolve('babel-jest'),
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@locales/(.*)$': '<rootDir>/src/locales/$1',
    '^@styles/(.*)$': '<rootDir>/src/styles/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@containers/(.*)$': '<rootDir>/src/containers/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@assets/(.*)$': '<rootDir>/src/assets/$1',
    '^@contexts/(.*)$': '<rootDir>/src/contexts/$1',
    '^@constants/(.*)$': '<rootDir>/src/constants/$1',
    '^@services/(.*)$': '<rootDir>/src/services/$1',
  },
};