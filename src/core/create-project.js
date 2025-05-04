import fs from "fs";
import path from "path";
import inquirer from "inquirer";
import ora from "ora";
import chalk from "chalk";
import { createDirectoryStructure } from "./create-directory-structure.js";
import { createFiles } from "./create-files.js";
import { logger } from "../utils/logger.js";

export async function createProject(projectName, options) {
  const projectPath = options.root
    ? path.join(process.cwd())
    : path.join(process.cwd(), projectName);

  if (fs.existsSync(projectPath) && !options.root) {
    if (options.force) {
      logger.warn(`Diretório ${projectName} já existe. Sobrescrevendo...`);
    } else {
      const { overwrite } = await inquirer.prompt([
        {
          type: "confirm",
          name: "overwrite",
          message: `Diretório ${projectName} já existe. Deseja sobrescrever?`,
          default: false,
        },
      ]);

      if (!overwrite) {
        logger.error("Operação cancelada.");
        return;
      }
    }
  }

  const spinner = ora("Criando estrutura do projeto...").start();

  try {
    await createDirectoryStructure(projectPath, options);
    await createFiles(projectPath, projectName, options);

    spinner.succeed(chalk.green("Estrutura do projeto criada com sucesso!"));

    console.log("\n📁 Estrutura do projeto:");

    logger.infoFolders(`${projectName}/`);
    logger.infoFolders(`├── src/`);
    logger.infoFolders(`│   ├── @types/`);
    logger.infoFolders(`│   ├── app/`);
    logger.infoFolders(`│   ├── infra/`);
    logger.infoFolders(`│   ├── shared/`);
    if (options.tests) {
      logger.infoFolders(`│   ├── tests/`);
    }
    logger.infoFolders(`│   ├── http-server.ts`);
    logger.infoFolders(`│   └── main.t`);
    logger.infoFolders(`├── .env`);
    logger.infoFolders(`├── .env.example`);
    logger.infoFolders(`├── .gitignore`);
    logger.infoFolders(`├── package.json`);
    logger.infoFolders(`├── tsconfig.json`);
    logger.infoFolders(`├── tsconfig.build.json`);
    logger.infoFolders(`└── README.md`);

    console.log("\n🚀 Para iniciar o projeto:");
    if (!options.root) {
      logger.warn(`cd ${projectName}`);
    }

    logger.warn(`npm install`);
    logger.warn(`npm run dev`);
  } catch (error) {
    spinner.fail(chalk.red(`Erro ao criar projeto: ${error.message}`));
    process.exit(1);
  }
}
