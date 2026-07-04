import {defineConfig} from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8080',
    specPattern: 'tests/e2e/**/*.cy.js',
    supportFile: 'tests/e2e/support/e2e.js',
    fixturesFolder: false,
    viewportWidth: 1280,
    viewportHeight: 720
  }
});
