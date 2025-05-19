#!/usr/bin/env node
import { program } from "commander";
import { createProject } from "./core/create-project.js";
import {
  promptProjectName,
  promptTestOptions,
  promptEslintAndPrettier,
  promptStackProject,
} from "./cli/prompts/prompts.js";
import { logger } from "./utils/logger.js";

const version = "1.0.5";

program
  .version(version)
  .description("CLI para gerar uma estrutura de API em Node.js com Express")
  .argument("[nome-do-projeto]", "Nome do projeto")
  .option("-f, --force", "Sobrescrever diretório se já existir", false)
  .option("-r, --root", "Criar template na raiz do projeto", false)
  .option("-t, --tests", "Criar ambiente de testes", false)
  .option("--lint", "Configurar o eslint e o prettier", false)
  .action(async (projectName, options) => {
    logger.info("🚀 Api Boilerplate");

    try {
      if (!projectName) {
        projectName = await promptProjectName();
      }

      let stackName = await promptStackProject();

      let eslintAndPrettierOption = {};
      if (!options.lint) {
        eslintAndPrettierOption = await promptEslintAndPrettier();
      }

      let testOptions = {};
      if (!options.tests) {
        testOptions = await promptTestOptions();
      }

      const projectOptions = {
        ...options,
        stack: stackName,
        tests: options.tests || testOptions.enableTests,
        lint: options.lint || eslintAndPrettierOption.eslintAndPrettier,
        typeTest:
          testOptions.testLibrary ||
          (options.tests
            ? await promptTestOptions(true).then((res) => res.testLibrary)
            : false),
      };

      await createProject(projectName, projectOptions);
    } catch (error) {
      logger.error(`Erro: ${error.message}`);
      process.exit(1);
    }
  });

program.parse(process.argv);
