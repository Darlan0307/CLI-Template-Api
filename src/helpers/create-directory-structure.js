import fs from "fs";
import path from "path";

export async function createDirectoryStructure(projectPath, options) {
  if (!fs.existsSync(projectPath)) {
    fs.mkdirSync(projectPath);
  }

  // Criar subdiretórios
  const directories = [
    "src",
    "src/controllers",
    "src/models",
    "src/routes",
    "src/middlewares",
    "src/config",
    "src/utils",
    "tests",
  ];

  directories.forEach((dir) => {
    const dirPath = path.join(projectPath, dir);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  });
}
