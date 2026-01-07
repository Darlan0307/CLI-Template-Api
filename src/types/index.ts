export interface CommandOptions {
  force: boolean;
  root: boolean;
  tests: boolean;
  lint: boolean;
}

export type StackType = 'express' | 'fastify' | 'hono';

export type TestLibrary = 'vitest' | 'jest' | 'test runner (nativo do NodeJS)';

export type DatabaseType = 'postgres' | 'mysql' | 'mongodb' | false;

export interface ProjectOptions extends CommandOptions {
  stack: StackType;
  typeTest: TestLibrary | false;
  docker: boolean;
  database: DatabaseType;
}

export interface PromptStackResult {
  stack: string;
}

export interface PromptTestOptionsResult {
  enableTests: boolean;
  testLibrary?: TestLibrary;
}

export interface PromptEslintPrettierResult {
  eslintAndPrettier: boolean;
}

export interface PromptProjectNameResult {
  projectName: string;
}

export interface PromptDockerResult {
  enableDocker: boolean;
}

export interface PromptDatabaseResult {
  enableDatabase: boolean;
  database?: DatabaseType;
}

export interface PackageJsonContent {
  name: string;
  version: string;
  description: string;
  main: string;
  scripts: Record<string, string>;
  keywords: string[];
  author: string;
  license: string;
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
  overrides: Record<string, string>;
}

export interface TsConfigContent {
  extends?: string;
  compilerOptions?: Record<string, unknown>;
  include?: string[];
  exclude?: string[];
}

export interface Logger {
  info(message: string): void;
  success(message: string): void;
  warn(message: string): void;
  error(message: string): void;
  infoFolders(message: string): void;
  debug(message: string): void;
}
