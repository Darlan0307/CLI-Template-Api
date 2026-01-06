import fs from 'fs';
import path from 'path';
import type { ProjectOptions, TestLibrary } from '../types/index.js';
import { generatePackageJson } from './generates/generate-package-json.js';
import { generateGitignore } from './generates/generate-gitignore.js';
import { generateReadme } from './generates/generate-readme.js';
import { generateEnvFile } from './generates/generate-env.js';
import { generateTsConfigJson } from './generates/generate-tsconfig-json.js';
import { generateMainFile } from './generates/generate-main-file.js';
import {
  generateExpressHttpServerFile,
  generateFastifyHttpServerFile,
  generateHonoHttpServerFile,
} from './generates/generate-http-server-file.js';
import { generateLoggerFile } from './generates/generate-logger-file.js';
import {
  generateConfigEslint,
  generateConfigPrettier,
} from './generates/generate-config-lint.js';
import {
  generateExampleTestUnit,
  generateExampleSumTest,
  generateConfigTest,
} from './generates/generate-example-test-unit.js';

export function createFiles(
  projectPath: string,
  projectName: string,
  options: ProjectOptions
): void {
  const packageJsonContent = generatePackageJson(projectName, options);
  fs.writeFileSync(
    path.join(projectPath, 'package.json'),
    JSON.stringify(packageJsonContent, null, 2)
  );

  const tsconfigJsonContent = generateTsConfigJson(false);
  fs.writeFileSync(
    path.join(projectPath, 'tsconfig.json'),
    JSON.stringify(tsconfigJsonContent, null, 2)
  );

  const tsconfigJsonBuildContent = generateTsConfigJson(true);
  fs.writeFileSync(
    path.join(projectPath, 'tsconfig.build.json'),
    JSON.stringify(tsconfigJsonBuildContent, null, 2)
  );

  fs.writeFileSync(path.join(projectPath, '.env'), generateEnvFile(options));

  fs.writeFileSync(
    path.join(projectPath, '.env.example'),
    generateEnvFile(options)
  );

  fs.writeFileSync(path.join(projectPath, '.gitignore'), generateGitignore());

  fs.writeFileSync(
    path.join(projectPath, 'README.md'),
    generateReadme(projectName)
  );

  const pathFileHttpServer = path.join(projectPath, 'src', 'http-server.ts');
  if (options.stack === 'express') {
    fs.writeFileSync(pathFileHttpServer, generateExpressHttpServerFile());
  } else if (options.stack === 'fastify') {
    fs.writeFileSync(pathFileHttpServer, generateFastifyHttpServerFile());
  } else {
    fs.writeFileSync(pathFileHttpServer, generateHonoHttpServerFile());
  }

  fs.writeFileSync(
    path.join(projectPath, 'src', 'main.ts'),
    generateMainFile(options)
  );

  fs.writeFileSync(
    path.join(projectPath, 'src', 'infra', 'logger.ts'),
    generateLoggerFile()
  );

  if (options.lint) {
    fs.writeFileSync(
      path.join(projectPath, 'eslint.config.mjs'),
      generateConfigEslint()
    );
    fs.writeFileSync(
      path.join(projectPath, '.prettierrc'),
      generateConfigPrettier()
    );
  }

  if (options.tests) {
    const typeTest = options.typeTest as TestLibrary;
    fs.writeFileSync(
      path.join(projectPath, 'src', 'tests', 'example-test', 'sum.ts'),
      generateExampleSumTest()
    );
    fs.writeFileSync(
      path.join(projectPath, 'src', 'tests', 'example-test', 'sum.spec.ts'),
      generateExampleTestUnit(typeTest)
    );

    if (typeTest === 'vitest' || typeTest === 'jest') {
      const nameFileConfigTest =
        typeTest === 'vitest' ? 'vitest.unit.config.mjs' : 'jest.config.json';

      fs.writeFileSync(
        path.join(projectPath, nameFileConfigTest),
        generateConfigTest(typeTest)
      );
    }
  }
}
