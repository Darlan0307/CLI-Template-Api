import fs from "fs";
import path from "path";
import { generatePackageJson } from "./generates/generate-package-json.js";
import { generateGitignore } from "./generates/generate-gitignore.js";
import { generateReadme } from "./generates/generate-readme.js";
import { generateEnvFile } from "./generates/generate-env.js";

export async function createFiles(projectPath, projectName, options) {
  const packageJsonContent = generatePackageJson(projectName, options);
  fs.writeFileSync(
    path.join(projectPath, "package.json"),
    JSON.stringify(packageJsonContent, null, 2)
  );

  fs.writeFileSync(path.join(projectPath, ".env"), generateEnvFile(options));

  fs.writeFileSync(path.join(projectPath, ".gitignore"), generateGitignore());

  fs.writeFileSync(
    path.join(projectPath, "README.md"),
    generateReadme(projectName)
  );

  // Criar app.js ou app.ts
  // const mainFile = options.typescript ? "app.ts" : "app.js";
  // fs.writeFileSync(
  //   path.join(projectPath, "src", mainFile),
  //   generateAppFile(options)
  // );

  // Criar server.js ou server.ts
  // const serverFile = options.typescript ? "server.ts" : "server.js";
  // fs.writeFileSync(
  //   path.join(projectPath, "src", serverFile),
  //   generateServerFile(options)
  // );

  // Criar arquivo de configuração de banco de dados
  // if (options.database !== "nenhum") {
  //   const dbConfigFile = options.typescript ? "database.ts" : "database.js";
  //   fs.writeFileSync(
  //     path.join(projectPath, "src", "config", dbConfigFile),
  //     generateDbConfigFile(options)
  //   );
  // }

  // Se autenticação estiver ativada, criar arquivos relacionados
  // if (options.auth) {
  //   // Middleware de autenticação
  //   const authMiddlewareFile = options.typescript
  //     ? "auth.middleware.ts"
  //     : "auth.middleware.js";
  //   fs.writeFileSync(
  //     path.join(projectPath, "src", "middlewares", authMiddlewareFile),
  //     generateAuthMiddlewareFile(options)
  //   );
  // }
}
