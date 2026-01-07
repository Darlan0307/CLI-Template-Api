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
  promptApiDocs,
} from './cli/prompts/prompts.js';
import { logger } from './utils/logger.js';

const version = '2.0.0';

program
  .version(version, '-v, --version', 'Mostrar versão do CLI')
  .description('CLI para gerar uma estrutura de API em Node.js com Express')
  .argument('[nome-do-projeto]', 'Nome do projeto')
  .option('-r, --root', 'Criar template na raiz do projeto', false)
  .option('-f, --force', 'Sobrescrever diretório se já existir', false)
  .option('--stack <type>', 'Framework (express, fastify, hono)')
  .option('--docker', 'Usar Docker na API', false)
  .option('--database <type>', 'Banco de dados (postgres, mysql, mongodb)')
  .option('-t, --tests', 'Criar ambiente de testes', false)
  .option('--lint', 'Configurar o eslint e o prettier', false)
  .option(
    '--api-docs',
    'Adicionar documentação de API (Swagger/OpenAPI)',
    false
  )
  .action(async (projectName: string | undefined, options: CommandOptions) => {
    logger.info('🚀 Api Boilerplate');

    try {
      // Valida opções fornecidas via flags antes de iniciar prompts
      if (options.database) {
        const validDatabases = ['postgres', 'mysql', 'mongodb'];
        if (!validDatabases.includes(options.database)) {
          logger.error(
            `Banco de dados inválido: ${options.database}. Opções válidas: postgres, mysql, mongodb`
          );
          process.exit(1);
        }
      }

      if (options.stack) {
        const validStacks = ['express', 'fastify', 'hono'];
        if (!validStacks.includes(options.stack)) {
          logger.error(
            `Stack inválida: ${options.stack}. Opções válidas: express, fastify, hono`
          );
          process.exit(1);
        }
      }

      if (!projectName) {
        projectName = await promptProjectName();
      }

      // Stack options
      let stackName: StackType;
      if (options.stack) {
        stackName = options.stack as StackType;
      } else {
        stackName = (await promptStackProject()) as StackType;
      }

      // Docker options
      let dockerEnabled = options.docker;
      if (!options.docker) {
        const dockerOptions = await promptDocker();
        dockerEnabled = dockerOptions.enableDocker;
      }

      // Database options
      let databaseValue: DatabaseType = false;
      if (options.database) {
        databaseValue = options.database as 'postgres' | 'mysql' | 'mongodb';
      } else if (dockerEnabled) {
        const databaseOptions = await promptDatabase();
        databaseValue = databaseOptions.database || false;
      }

      // ESLint and Prettier options
      let eslintAndPrettierOption = { eslintAndPrettier: false };
      if (!options.lint) {
        eslintAndPrettierOption = await promptEslintAndPrettier();
      }

      // Test options
      let testOptions: { enableTests: boolean; testLibrary?: TestLibrary } = {
        enableTests: false,
      };
      if (!options.tests) {
        testOptions = await promptTestOptions();
      }

      // API Docs options
      let apiDocsEnabled = options.apiDocs;
      if (!options.apiDocs) {
        const apiDocsOptions = await promptApiDocs();
        apiDocsEnabled = apiDocsOptions.enableApiDocs;
      }

      const projectOptions: ProjectOptions = {
        force: options.force,
        root: options.root,
        stack: stackName,
        tests: options.tests || testOptions.enableTests,
        lint: options.lint || eslintAndPrettierOption.eslintAndPrettier,
        typeTest:
          testOptions.testLibrary ||
          (options.tests
            ? await promptTestOptions(true).then((res) => res.testLibrary!)
            : false),
        docker: dockerEnabled,
        database: databaseValue,
        apiDocs: apiDocsEnabled,
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
