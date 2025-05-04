import inquirer from "inquirer";

export async function promptProjectName() {
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "projectName",
      message: "Nome do projeto:",
      default: "api-boilerplate",
      validate: (input) =>
        input.trim() ? true : "O nome do projeto é obrigatório",
    },
  ]);

  return answers.projectName;
}

export async function promptTestOptions(skipEnableQuestion = false) {
  let result = {};

  if (!skipEnableQuestion) {
    const enableTestsResult = await inquirer.prompt({
      type: "confirm",
      name: "enableTests",
      message: "A sua aplicação terá testes unitários?",
      default: false,
    });

    result.enableTests = enableTestsResult.enableTests;

    if (!result.enableTests) {
      return result;
    }
  } else {
    result.enableTests = true;
  }

  const testLibraryResult = await inquirer.prompt({
    type: "list",
    name: "testLibrary",
    message: "Qual biblioteca de testes você quer usar?",
    default: "vitest",
    choices: ["vitest", "jest", "test runner (nativo do NodeJS)"],
  });

  result.testLibrary = testLibraryResult.testLibrary;

  return result;
}

export async function promptEslintAndPrettier(skipEnableQuestion = false) {
  let result = {
    eslintAndPrettier: true,
  };

  if (skipEnableQuestion) return result;

  const answers = await inquirer.prompt([
    {
      type: "confirm",
      name: "eslintAndPrettier",
      message: "Configurar o eslint e o prettier?",
      default: false,
    },
  ]);

  result.eslintAndPrettier = answers.eslintAndPrettier;

  return result;
}
