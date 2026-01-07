import fs from 'fs';
import path from 'path';
import inquirer from 'inquirer';
import ora from 'ora';
import chalk from 'chalk';
import type { ProjectOptions } from '../types/index.js';
import { createDirectoryStructure } from './create-directory-structure.js';
import { createFiles } from './create-files.js';
import { logger } from '../utils/logger.js';

export async function createProject(
  projectName: string,
  options: ProjectOptions
): Promise<void> {
  const projectPath = options.root
    ? path.join(process.cwd())
    : path.join(process.cwd(), projectName);

  if (fs.existsSync(projectPath) && !options.root) {
    if (options.force) {
      logger.warn(`Diretório ${projectName} já existe. Sobrescrevendo...`);
    } else {
      const { overwrite } = await inquirer.prompt<{ overwrite: boolean }>([
        {
          type: 'confirm',
          name: 'overwrite',
          message: `Diretório ${projectName} já existe. Deseja sobrescrever?`,
          default: false,
        },
      ]);

      if (!overwrite) {
        logger.error('Operação cancelada.');
        return;
      }
    }
  }

  const spinner = ora('Criando estrutura do projeto...').start();

  try {
    createDirectoryStructure(projectPath, options);
    createFiles(projectPath, projectName, options);

    spinner.succeed(chalk.green('Estrutura do projeto criada com sucesso!'));

    console.log('\n📁 Estrutura do projeto:');

    logger.infoFolders(`${projectName}/`);
    logger.infoFolders(`├── src/`);
    logger.infoFolders(`│   ├── @types/`);
    logger.infoFolders(`│   ├── app/`);
    logger.infoFolders(`│   │   └── v1/`);
    logger.infoFolders(`│   ├── infra/`);
    logger.infoFolders(`│   │   ├── errors/`);
    logger.infoFolders(`│   │   ├── middlewares/`);
    logger.infoFolders(`│   │   └── logger.ts`);
    logger.infoFolders(`│   ├── shared/`);
    if (options.apiDocs) {
      logger.infoFolders(`│   │   └── swagger/`);
    }
    if (options.tests) {
      logger.infoFolders(`│   ├── tests/`);
    }
    logger.infoFolders(`│   ├── http-server.ts`);
    logger.infoFolders(`│   └── main.ts`);
    if (options.apiDocs && options.stack === 'express') {
      logger.infoFolders(`├── docs/`);
      logger.infoFolders(`│   └── openapi/`);
    }
    logger.infoFolders(`├── .env`);
    logger.infoFolders(`├── .env.example`);
    logger.infoFolders(`├── package.json`);
    if (options.docker) {
      logger.infoFolders(`├── Dockerfile.dev`);
      logger.infoFolders(`├── docker-compose.yml`);
    }
    logger.infoFolders(`└── README.md`);

    console.log('\n🚀 Para iniciar o projeto:');
    if (!options.root) {
      logger.warn(`cd ${projectName}`);
    }

    if (options.docker) {
      logger.warn(`docker compose up -d`);
      if (options.database) {
        logger.info(
          `\n✓ Banco de dados ${options.database} configurado e será iniciado automaticamente!`
        );
      }
    } else {
      logger.warn(`npm install`);
      logger.warn(`npm run dev`);
    }

    if (options.apiDocs) {
      logger.info('\n📚 Documentação da API disponível em:');
      if (options.stack === 'express') {
        logger.warn(`http://localhost:3000/api/docs`);
        logger.warn(`http://localhost:3000/api/v1/docs`);
      } else if (options.stack === 'fastify') {
        logger.warn(`http://localhost:3000/api/docs`);
      } else if (options.stack === 'hono') {
        logger.warn(`http://localhost:3000/api/docs/ui (Swagger UI)`);
        logger.warn(
          `http://localhost:3000/api/docs/openapi.json (OpenAPI JSON)`
        );
      }
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    spinner.fail(chalk.red(`Erro ao criar projeto: ${errorMessage}`));
    process.exit(1);
  }
}
