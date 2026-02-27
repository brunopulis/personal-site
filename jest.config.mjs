export default {
  testEnvironment: 'node',
  roots: ['<rootDir>/tests'],
  testMatch: ['**/unit/**/*.test.js', '**/integration/**/*.test.js'],
  collectCoverageFrom: ['src/_config/**/*.js', '!src/_config/**/*.njk'],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  verbose: true,
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(slugify|dayjs|deepmerge|markdown-it|entities|semver)/)',
  ],
  workerIdleMemoryLimit: '512MB',
};
