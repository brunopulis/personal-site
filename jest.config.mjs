export default {
  testEnvironment: 'node',
  roots: ['<rootDir>/tests'],
  testMatch: ['**/unit/**/*.test.js', '**/integration/**/*.test.js', '**/unit/**/*.test.ts'],
  collectCoverageFrom: ['src/_config/**/*.{js,ts}', '!src/_config/**/*.njk'],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  verbose: true,
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^(\\.{1,2}/.*)\\.js$': '$1',
    '^(\\.{1,2}/.*)\\.ts$': '$1',
  },
  transform: {
    '^.+\\.jsx?$': ['babel-jest', { configFile: './babel.config.cjs' }],
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        configFile: './tsconfig.json',
        diagnostics: { ignoreCodes: ['TS151002'] },
      },
    ],
  },
  transformIgnorePatterns: [
    'node_modules/(?!(slugify|dayjs|deepmerge|markdown-it|entities|semver)/)',
  ],
  workerIdleMemoryLimit: '512MB',
  testPathIgnorePatterns: ['/node_modules/', '/cypress/'],
};
