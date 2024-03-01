const path = require('path');
const projectPaths = require('../paths');

const IS_INTEGRATION = !!process.env.INTEGRATION;
const IS_CI = !!process.env.CI;

module.exports = function(options = {}) {
  const { baseDir, ...rest } = options;

  const paths = projectPaths(baseDir);
  const testsFolder = IS_INTEGRATION ? 'integration' : 'unit';
  // CI env is setup by default in Jenkins
  const ciConfig = IS_CI ? {
    coverageReporters: [ 'lcovonly' ],
    maxWorkers: 1,
    reporters: [ 'default' ]
  } : {};

  const commonConfig = {
    collectCoverage: true,
    collectCoverageFrom: [
      '<rootDir>/src/**/*.{js,jsx}',
      '!<rootDir>/src/**/__mocks__/**/*',
      '!<rootDir>/src/{constants,config,jsdocs}/**/*',
      '!<rootDir>/src/{main.jsx,.eslintrc.js}'
    ],
    coverageDirectory: path.resolve(paths.basePath, `test/results/${ testsFolder }/coverage`),
    coverageReporters: [ 'lcov' ],
    moduleNameMapper: {
      // ignore modules
      '^.+\\.(css|less|scss|png|jpg|ttf|woff|woff2|svg)$': require.resolve('babel-jest'),
      // local common modules
      '^@root(.*)$': path.join(paths.root, '$1'),
      '^@common-components(.*)$': path.resolve(paths.common.src, 'components$1'),
      '^@common-config(.*)$': path.resolve(paths.common.src, 'config$1'),
      '^@common-constants(.*)$': path.resolve(paths.common.src, 'constants$1'),
      '^@common-contexts(.*)$': path.resolve(paths.common.src, 'contexts$1'),
      '^@common-hooks(.*)$': path.resolve(paths.common.src, 'hooks$1'),
      '^@common-jsdocs(.*)$': path.resolve(paths.common.src, 'jsdocs$1'),
      '^@common-mappers(.*)$': path.resolve(paths.common.src, 'mappers$1'),
      '^@common-services(.*)$': path.resolve(paths.common.src, 'services$1'),
      '^@common-styles(.*)$': path.resolve(paths.common.src, 'styles$1'),
      '^@common-utils(.*)$': path.resolve(paths.common.src, 'utils$1'),
      '^@tests/render$': path.resolve(paths.common.basePath, 'test/render.jsx'),
      '^@tests/utils$': path.resolve(paths.common.basePath, 'test/utils.js'),
      '^@tests/helpers(.*)$': path.resolve(paths.common.basePath, 'test/helpers$1'),
      '^@common-fixtures$': path.resolve(paths.common.basePath, 'fixtures/index.js'),
      '^@common(.*)$': path.resolve(paths.common.basePath, '$1'),
      // external common modules
      '^lodash-es': path.resolve(paths.common.nodeModules, 'lodash'),
      '^i18next-icu': path.resolve(paths.common.nodeModules, 'i18next-icu'),
      '^i18next': path.resolve(paths.common.nodeModules, 'i18next'),
      '^react$': path.resolve(paths.common.nodeModules, 'react'),
      '^react-dom$': path.resolve(paths.common.nodeModules, 'react-dom'),
      'yarn-design-system-react-components': require.resolve('yarn-design-system-react-components/css'),
      // root modules
      '^@locales(.*)$': path.resolve(paths.root, 'locales$1'),
      // project specific modules
      '^@config(.*)$': '<rootDir>/src/config$1',
      '^@constants(.*)$': '<rootDir>/src/constants$1',
      '^@containers(.*)$': '<rootDir>/src/containers$1',
      '^@contexts(.*)$': '<rootDir>/src/contexts$1',
      '^@components(.*)$': '<rootDir>/src/components$1',
      '^@hooks(.*)$': '<rootDir>/src/hooks$1',
      '^@mappers(.*)$': '<rootDir>/src/mappers$1',
      '^@services(.*)$': '<rootDir>/src/services$1',
      '^@test/app$': '<rootDir>/test/renderApp.jsx',
      '^@test/msw(.*)$': '<rootDir>/test/msw$1',
      '^@utils(.*)$': '<rootDir>/src/utils$1'
    },
    modulePaths: [ paths.common.nodeModules, paths.nodeModules ],
    reporters: [
      'default',
      require.resolve('jest-slow-test-reporter')
    ],
    rootDir: paths.basePath,
    setupFiles: [ path.resolve(paths.basePath, `test/setup/${ testsFolder }/setup-files.js`) ],
    setupFilesAfterEnv: [ path.resolve(paths.basePath, `test/setup/${ testsFolder }/setup-files-after-env.js`) ],
    transform: {
      '^.+\\.(jsx?)$': [ 'babel-jest', { configFile: path.resolve(paths.common.basePath, '.babelrc.js') }]
    },
    testEnvironment: 'jsdom',
    testMatch: [ path.resolve(paths.basePath, `test/specs/${ testsFolder }/**/*.spec.{js,jsx}`) ],
    testTimeout: 30000,
    ...ciConfig,
    ...rest
  };

  return commonConfig;
};
