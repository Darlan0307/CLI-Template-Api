import inquirer from 'inquirer';
import type {
  PromptProjectNameResult,
  PromptStackResult,
  PromptTestOptionsResult,
  PromptEslintPrettierResult,
  PromptDockerResult,
  PromptDatabaseResult,
  PromptApiDocsResult,
  TestLibrary,
  DatabaseType,
} from '../../types/index.js';

export async function promptProjectName(): Promise<string> {
  const answers = await inquirer.prompt<PromptProjectNameResult>([
    {
      type: 'input',
      name: 'projectName',
      message: 'Nome do projeto:',
      default: 'api-boilerplate',
      validate: (input: string): boolean | string =>
        input.trim() ? true : 'O nome do projeto é obrigatório',
    },
  ]);

  return answers.projectName;
}

export async function promptStackProject(): Promise<string> {
  const answers = await inquirer.prompt<PromptStackResult>({
    type: 'list',
    name: 'stack',
    message: 'Qual framework você deseja usar?',
    default: 'Express',
    choices: ['Express', 'Fastify', 'Hono'],
  });

  return answers.stack.toLowerCase();
}

export async function promptTestOptions(
  skipEnableQuestion = false
): Promise<PromptTestOptionsResult> {
  const result: PromptTestOptionsResult = {
    enableTests: false,
  };

  if (!skipEnableQuestion) {
    const enableTestsResult = await inquirer.prompt<{ enableTests: boolean }>({
      type: 'confirm',
      name: 'enableTests',
      message: 'A sua aplicação terá testes unitários?',
      default: false,
    });

    result.enableTests = enableTestsResult.enableTests;

    if (!result.enableTests) {
      return result;
    }
  } else {
    result.enableTests = true;
  }

  const testLibraryResult = await inquirer.prompt<{
    testLibrary: TestLibrary;
  }>({
    type: 'list',
    name: 'testLibrary',
    message: 'Qual biblioteca de testes você quer usar?',
    default: 'vitest',
    choices: ['vitest', 'jest', 'test runner (nativo do NodeJS)'],
  });

  result.testLibrary = testLibraryResult.testLibrary;

  return result;
}

export async function promptEslintAndPrettier(
  skipEnableQuestion = false
): Promise<PromptEslintPrettierResult> {
  const result: PromptEslintPrettierResult = {
    eslintAndPrettier: true,
  };

  if (skipEnableQuestion) return result;

  const answers = await inquirer.prompt<PromptEslintPrettierResult>([
    {
      type: 'confirm',
      name: 'eslintAndPrettier',
      message: 'Você gostaria de usar o eslint e o prettier?',
      default: false,
    },
  ]);

  result.eslintAndPrettier = answers.eslintAndPrettier;

  return result;
}

export async function promptDocker(): Promise<PromptDockerResult> {
  const answers = await inquirer.prompt<PromptDockerResult>([
    {
      type: 'confirm',
      name: 'enableDocker',
      message: 'Você gostaria de usar Docker na sua API?',
      default: false,
    },
  ]);

  return answers;
}

export async function promptDatabase(): Promise<PromptDatabaseResult> {
  const result: PromptDatabaseResult = {
    enableDatabase: false,
  };

  const enableDatabaseResult = await inquirer.prompt<{ enableDatabase: boolean }>({
    type: 'confirm',
    name: 'enableDatabase',
    message: 'Você gostaria de usar algum banco de dados?',
    default: false,
  });

  result.enableDatabase = enableDatabaseResult.enableDatabase;

  if (!result.enableDatabase) {
    return result;
  }

  const databaseResult = await inquirer.prompt<{ database: DatabaseType }>({
    type: 'list',
    name: 'database',
    message: 'Qual banco de dados você quer usar?',
    choices: ['postgres', 'mysql', 'mongodb'],
  });

  result.database = databaseResult.database;

  return result;
}

export async function promptApiDocs(): Promise<PromptApiDocsResult> {
  const answers = await inquirer.prompt<PromptApiDocsResult>([
    {
      type: 'confirm',
      name: 'enableApiDocs',
      message: 'Você gostaria de adicionar documentação de API (Swagger/OpenAPI)?',
      default: false,
    },
  ]);

  return answers;
}
