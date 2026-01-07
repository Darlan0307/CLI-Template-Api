#!/usr/bin/env node
import { program } from 'commander';
import type {
  CommandOptions,
  DatabaseType,
  ProjectOptions,
  StackType,
  TestLibrary,
} from './types/index.js';
import { createProject } from './core/create-project.js';
import {
  promptProjectName,
  promptTestOptions,
  promptEslintAndPrettier,
  promptStackProject,
  promptDocker,
  promptDatabase,
} from './cli/prompts/prompts.js';
import { logger } from './utils/logger.js';

const version = '2.0.0';

program
  .version(version)
  .description('CLI para gerar uma estrutura de API em Node.js com Express')
  .argument('[nome-do-projeto]', 'Nome do projeto')
  .option('-f, --force', 'Sobrescrever diretório se já existir', false)
  .option('-r, --root', 'Criar template na raiz do projeto', false)
  .option('-t, --tests', 'Criar ambiente de testes', false)
  .option('--lint', 'Configurar o eslint e o prettier', false)
  .action(async (projectName: string | undefined, options: CommandOptions) => {
    logger.info('🚀 Api Boilerplate');

    try {
      if (!projectName) {
        projectName = await promptProjectName();
      }

      const stackName = (await promptStackProject()) as StackType;

      const dockerOptions = await promptDocker();

      let databaseOptions: {
        enableDatabase: boolean;
        database?: DatabaseType;
      } = {
        enableDatabase: false,
        database: false,
      };

      if (dockerOptions.enableDocker) {
        databaseOptions = await promptDatabase();
      }

      let eslintAndPrettierOption = { eslintAndPrettier: false };
      if (!options.lint) {
        eslintAndPrettierOption = await promptEslintAndPrettier();
      }

      let testOptions: { enableTests: boolean; testLibrary?: TestLibrary } = {
        enableTests: false,
      };
      if (!options.tests) {
        testOptions = await promptTestOptions();
      }

      const projectOptions: ProjectOptions = {
        ...options,
        stack: stackName,
        tests: options.tests || testOptions.enableTests,
        lint: options.lint || eslintAndPrettierOption.eslintAndPrettier,
        typeTest:
          testOptions.testLibrary ||
          (options.tests
            ? await promptTestOptions(true).then((res) => res.testLibrary!)
            : false),
        docker: dockerOptions.enableDocker,
        database: databaseOptions.database || false,
      };

      await createProject(projectName, projectOptions);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      logger.error(`Erro: ${errorMessage}`);
      process.exit(1);
    }
  });

program.parse(process.argv);
