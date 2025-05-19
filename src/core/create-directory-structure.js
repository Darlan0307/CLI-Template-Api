import fs from "fs";
import path from "path";

export async function createDirectoryStructure(projectPath, options) {
  if (!fs.existsSync(projectPath)) {
    fs.mkdirSync(projectPath);
  }

  const directories = [
    "logs",
    "src",
    "src/@types",
    "src/app",
    "src/infra",
    "src/infra/errors",
    "src/infra/middlewares",
    "src/shared",
  ];

  if (options.tests) {
    directories.push("src/tests");
    directories.push("src/tests/example-test");
  }

  directories.forEach((dir) => {
    const dirPath = path.join(projectPath, dir);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  });
}
