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

  console.log(projectPath);

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
    console.log(chalk.cyan(`│   ├── controllers/`));
    console.log(chalk.cyan(`│   ├── models/`));
    console.log(chalk.cyan(`│   ├── routes/`));
    console.log(chalk.cyan(`│   ├── middlewares/`));
    console.log(chalk.cyan(`│   ├── config/`));
    console.log(chalk.cyan(`│   └── utils/`));
    console.log(chalk.cyan(`├── .env`));
    console.log(chalk.cyan(`├── .gitignore`));
    console.log(chalk.cyan(`├── package.json`));
    console.log(chalk.cyan(`└── README.md`));

    console.log("\n🚀 Para iniciar o projeto:");
    console.log(chalk.yellow(`cd ${projectName}`));
    console.log(chalk.yellow(`npm install`));
    console.log(chalk.yellow(`npm run dev`));
  } catch (error) {
    spinner.fail(chalk.red(`Erro ao criar projeto: ${error.message}`));
    process.exit(1);
  }
}
