import type { TsConfigContent } from '../../types/index.js';

export function generateTsConfigJson(isBuild: boolean): TsConfigContent {
  if (isBuild) {
    return {
      extends: './tsconfig.json',
      include: ['src/**/*'],
      exclude: ['**/*.test.ts', '**/*.spec.ts'],
    };
  }

  return {
    compilerOptions: {
      target: 'ES2022',
      module: 'commonjs',
      lib: ['ES2022'],
      esModuleInterop: true,
      forceConsistentCasingInFileNames: true,
      strict: true,
      skipLibCheck: true,
      outDir: './dist',
      rootDir: './src',
      paths: {
        '@app/*': ['./src/app/*'],
        '@infra/*': ['./src/infra/*'],
        '@shared/*': ['./src/shared/*'],
      },
    },
  };
}
