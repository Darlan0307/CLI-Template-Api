import fs from "fs";
import path from "path";
import chalk from "chalk";
import inquirer from "inquirer";
import ora from "ora";
import { createDirectoryStructure } from "./create-directory-structure.js";
import { createFiles } from "./create-files.js";

export async function createProject(projectName, options) {
  const projectPath = options.root
    ? path.join(process.cwd())
    : path.join(process.cwd(), projectName);

  if (fs.existsSync(projectPath) && !options.root) {
    if (options.force) {
      console.log(
        chalk.yellow(`Diretório ${projectName} já existe. Sobrescrevendo...`)
      );
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
        console.log(chalk.red("Operação cancelada."));
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
    console.log(chalk.cyan(`${projectName}/`));
    console.log(chalk.cyan(`├── src/`));
    console.log(chalk.cyan(`│   ├── @types/`));
    console.log(chalk.cyan(`│   ├── app/`));
    console.log(chalk.cyan(`│   ├── infra/`));
    console.log(chalk.cyan(`│   ├── shared/`));
    if (options.tests) {
      console.log(chalk.cyan(`│   ├── tests/`));
    }
    console.log(chalk.cyan(`│   ├── http-server.ts`));
    console.log(chalk.cyan(`│   └── main.ts`));
    console.log(chalk.cyan(`├── .env`));
    console.log(chalk.cyan(`├── .env.example`));
    console.log(chalk.cyan(`├── .gitignore`));
    console.log(chalk.cyan(`├── package.json`));
    console.log(chalk.cyan(`├── tsconfig.json`));
    console.log(chalk.cyan(`├── tsconfig.build.json`));
    console.log(chalk.cyan(`└── README.md`));

    console.log("\n🚀 Para iniciar o projeto:");
    if (!options.root) {
      console.log(chalk.yellow(`cd ${projectName}`));
    }
    console.log(chalk.yellow(`npm install`));
    console.log(chalk.yellow(`npm run dev`));
  } catch (error) {
    spinner.fail(chalk.red(`Erro ao criar projeto: ${error.message}`));
    process.exit(1);
  }
}
