#!/usr/bin/env node

import { program } from "commander";
import chalk from "chalk";
import inquirer from "inquirer";
import { createProject } from "./helpers/create-project.js";

const version = "1.0.3";

program
  .version(version)
  .description("CLI para gerar uma estrutura de API em Node.js com Express")
  .argument("[nome-do-projeto]", "Nome do projeto")
  .option("-f, --force", "Sobrescrever diretório se já existir", false)
  .option("-r, --root", "Criar template na raiz do projeto", false)
  .option("-t, --tests", "Criar ambiente de testes", false)
  .action(async (projectName, options) => {
    console.log(chalk.blue.bold("🚀 Api Boilerplate"));

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
    let resultTestPrompt;
    if (!options.tests) {
      resultTestPrompt = await inquirer.prompt({
        type: "confirm",
        name: "tests",
        message: "A sua aplicação terá testes unitários?",
        default: options.tests,
      });
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
    // ]);

    const projectOptions = {
      ...options,
      tests: resultTestPrompt?.tests ?? options.tests,
    };

    await createProject(projectName, projectOptions);
  });

program.parse(process.argv);
