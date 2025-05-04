export function generateExampleTestUnit(codeTest) {
  return codeTest
    ? `import { expect, test } from 'vitest'
import { sum } from './sum.ts'

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3)
})
  `
    : `export function sum(a:number, b:number):number {
  return a + b
}`;
}
