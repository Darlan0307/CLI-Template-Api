import { program } from "commander";
import chalk from "chalk";
import inquirer from "inquirer";
import { createProject } from "./helpers/create-project.js";

const version = "1.0.0";

program
  .version(version)
  .description("CLI para gerar uma estrutura de API em Node.js com Express")
  .argument("[nome-do-projeto]", "Nome do projeto")
  .option("-f, --force", "Sobrescrever diretório se já existir", false)
  .option("-r, --root", "Criar template na raiz do projeto", false)
  .action(async (projectName, options) => {
    console.log(chalk.blue.bold("🚀 Express API Generator"));

    if (!projectName) {
      const answers = await inquirer.prompt([
        {
          type: "input",
          name: "projectName",
          message: "Nome do projeto:",
          default: "express-api",
          validate: (input) => {
            if (input.trim() === "") return "O nome do projeto é obrigatório";
            return true;
          },
        },
      ]);
      projectName = answers.projectName;
    }

    // Configurações adicionais via prompt
    // const answers = await inquirer.prompt([
    //   {
    //     type: "list",
    //     name: "database",
    //     message: "Qual banco de dados você deseja utilizar?",
    //     default: options.database,
    //     choices: ["mongodb", "mysql", "postgresql", "nenhum"],
    //   },
    //   {
    //     type: "confirm",
    //     name: "auth",
    //     message: "Incluir autenticação JWT?",
    //     default: options.auth,
    //   },
    //   {
    //     type: "confirm",
    //     name: "typescript",
    //     message: "Usar TypeScript?",
    //     default: options.typescript,
    //   },
    // ]);

    // Mesclar opções da linha de comando com respostas do prompt
    const projectOptions = {
      ...options,
      // database: answers.database,
      // auth: answers.auth,
      // typescript: answers.typescript,
    };

    // Criar estrutura do projeto
    await createProject(projectName, projectOptions);
  });

program.parse(process.argv);
