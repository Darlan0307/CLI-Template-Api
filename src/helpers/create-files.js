import fs from "fs";
import path from "path";
import { generatePackageJson } from "./generates/generate-package-json.js";
import { generateGitignore } from "./generates/generate-gitignore.js";
import { generateReadme } from "./generates/generate-readme.js";
import { generateEnvFile } from "./generates/generate-env.js";
import { generateTsConfigJson } from "./generates/generate-tsconfig-json.js";
import { generateMainFile } from "./generates/generate-main-file.js";
import { generateHttpServerFile } from "./generates/generate-http-server-file.js";
import { generateLoggerFile } from "./generates/generate-logger-file.js";
import { generateVitestUnitConfig } from "./generates/generate-vitest-unit-config.js";
import { generateExampleTestUnit } from "./generates/generate-example-test-unit.js";

export async function createFiles(projectPath, projectName, options) {
  const packageJsonContent = generatePackageJson(projectName, options);
  fs.writeFileSync(
    path.join(projectPath, "package.json"),
    JSON.stringify(packageJsonContent, null, 2)
  );

  const tsconfigJsonContent = generateTsConfigJson();
  fs.writeFileSync(
    path.join(projectPath, "tsconfig.json"),
    JSON.stringify(tsconfigJsonContent, null, 2)
  );

  const tsconfigJsonBuildContent = generateTsConfigJson(true);
  fs.writeFileSync(
    path.join(projectPath, "tsconfig.build.json"),
    JSON.stringify(tsconfigJsonBuildContent, null, 2)
  );

  fs.writeFileSync(path.join(projectPath, ".env"), generateEnvFile(options));

  fs.writeFileSync(
    path.join(projectPath, ".env.example"),
    generateEnvFile(options)
  );

  fs.writeFileSync(path.join(projectPath, ".gitignore"), generateGitignore());

  fs.writeFileSync(
    path.join(projectPath, "README.md"),
    generateReadme(projectName)
  );

  fs.writeFileSync(
    path.join(projectPath, "src", "http-server.ts"),
    generateHttpServerFile()
  );

  fs.writeFileSync(
    path.join(projectPath, "src", "main.ts"),
    generateMainFile()
  );

  fs.writeFileSync(
    path.join(projectPath, "src", "infra", "logger.ts"),
    generateLoggerFile()
  );

  if (options.tests) {
    fs.writeFileSync(
      path.join(projectPath, "vitest.unit.config.mjs"),
      generateVitestUnitConfig()
    );

    fs.writeFileSync(
      path.join(projectPath, "src", "tests", "example-test", "sum.ts"),
      generateExampleTestUnit()
    );
    fs.writeFileSync(
      path.join(projectPath, "src", "tests", "example-test", "sum.spec.ts"),
      generateExampleTestUnit(true)
    );
  }
}
