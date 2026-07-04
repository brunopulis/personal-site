import {defineConfig} from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['tests/unit/**/*.test.js'],
    coverage: {
      include: ['src/_config/**', 'src/_data/**', 'scripts/**'],
      reporter: ['text', 'lcov']
    }
  }
});
