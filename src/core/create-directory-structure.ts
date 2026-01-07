import fs from 'fs';
import path from 'path';
import type { ProjectOptions } from '../types/index.js';

export function createDirectoryStructure(
  projectPath: string,
  options: ProjectOptions
): void {
  if (!fs.existsSync(projectPath)) {
    fs.mkdirSync(projectPath);
  }

  const directories: string[] = [
    'logs',
    'src',
    'src/@types',
    'src/app',
    'src/app/v1',
    'src/app/v1/example-users',
    'src/app/v1/example-users/http',
    'src/app/v1/example-users/repository',
    'src/app/v1/example-users/use-cases',
    'src/infra',
    'src/infra/errors',
    'src/infra/middlewares',
    'src/shared',
  ];

  if (options.tests) {
    directories.push('src/tests');
    directories.push('src/tests/example-test');
  }

  if (options.apiDocs) {
    directories.push('src/shared/swagger');

    // Para Express, adiciona estrutura de docs YAML
    if (options.stack === 'express') {
      directories.push('docs');
      directories.push('docs/openapi');
      directories.push('docs/openapi/common');
      directories.push('docs/openapi/v1');
      directories.push('docs/openapi/v1/paths');
      directories.push('docs/openapi/v1/schemas');
    }
  }

  directories.forEach((dir: string): void => {
    const dirPath = path.join(projectPath, dir);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  });
}
