export function generateExampleSumTest() {
  return `export function sum(a:number, b:number) {
  return a + b
}`;
}

export function generateExampleTestUnit(typeTest) {
  if (typeTest === "vitest") {
    return `import { it, expect } from 'vitest'
import { sum } from './sum'

it('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3)
})
  `;
  } else if (typeTest === "jest") {
    return `
import { sum } from './sum'

it('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3)
})
  `;
  }

  return `import { test } from "node:test";
import assert from "node:assert/strict";
import { sum } from "./sum";

test("adds 1 + 2 to equal 3", () => {
  assert.strictEqual(sum(2, 1), 3);
});
`;
}

export function generateConfigTest(typeTest) {
  return typeTest === "vitest"
    ? `
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
  `
    : `{
  "preset": "ts-jest",
  "testEnvironment": "node",
  "roots": ["<rootDir>/src"],
  "testMatch": ["**/?(*.)+(spec|test).ts"],
  "transform": {
    "^.+\\\\.ts$": "ts-jest"
  },
  "moduleFileExtensions": ["ts", "js", "json", "node"]
}`;
}
