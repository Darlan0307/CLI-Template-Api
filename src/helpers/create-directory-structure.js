import fs from "fs";
import path from "path";

export async function createDirectoryStructure(projectPath, options) {
  if (!fs.existsSync(projectPath)) {
    fs.mkdirSync(projectPath);
  }

  const directories = [
    "src",
    "src/@types",
    "src/@types/express",
    "src/app",
    "src/infra",
    "src/shared",
  ];

  directories.forEach((dir) => {
    const dirPath = path.join(projectPath, dir);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  });
}
