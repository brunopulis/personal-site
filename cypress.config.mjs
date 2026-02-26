import { defineConfig } from 'cypress';

export default defineConfig({
  projectId: '76rfsp',
  e2e: {
    baseUrl: 'http://localhost:8080',
    setupNodeEvents(_on, _config) {
      // implement node event listeners here
    },
    viewportWidth: 1280,
    viewportHeight: 720,
    video: true,
    screenshotOnRunFailure: true,
    specPattern: 'cypress/e2e/**/*.cy.js',
  },
  component: {
    devServer: {
      framework: 'other',
      bundler: 'vite',
    },
  },
});
