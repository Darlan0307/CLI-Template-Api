export function generateVitestUnitConfig() {
  return `
  import { configDefaults, defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    bail: 1,
    exclude: [
      ...configDefaults.exclude,
      'dist/*',
      '*/**/fixtures.ts',
      '**/*e2e.spec.ts',
    ],
  },
});
  `;
}
