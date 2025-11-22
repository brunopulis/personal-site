/* eslint-disable @typescript-eslint/no-unused-vars */
import { defineConfig } from 'cypress';

export default defineConfig({
  projectId: '76rfsp',
  e2e: {
    baseUrl: 'http://localhost:4321',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
