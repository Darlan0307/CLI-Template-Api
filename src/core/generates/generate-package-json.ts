import type { ProjectOptions, PackageJsonContent, TestLibrary } from '../../types/index.js';

export function generatePackageJson(
  projectName: string,
  options: ProjectOptions
): PackageJsonContent {
  const { lint, tests, typeTest, stack } = options;

  const dependencies: Record<string, string> = {
    pino: '^9.5.0',
    'pino-pretty': '^13.0.0',
    'tsconfig-paths': '^4.2.0',
    dotenv: '^16.5.0',
    'resolve-tspaths': '^0.8.19',
    rimraf: '^6.0.1',
  };

  const devDependencies: Record<string, string> = {
    '@types/node': '^22.15.3',
    typescript: '^5.6.3',
    tsx: '^4.19.4',
  };

  const overrides: Record<string, string> = {
    glob: '^9.0.0',
    inflight: 'npm:lru-cache@^7.0.0',
  };

  switch (stack) {
    case 'express':
      dependencies['express'] = '^5.1.0';
      dependencies['compression'] = '^1.7.5';
      dependencies['cors'] = '^2.8.5';
      dependencies['helmet'] = '^8.0.0';
      devDependencies['@types/compression'] = '^1.7.5';
      devDependencies['@types/cors'] = '^2.8.17';
      devDependencies['@types/express'] = '^5.0.1';
      break;
    case 'fastify':
      dependencies['fastify'] = '^5.3.3';
      dependencies['@fastify/cors'] = '^11.0.1';
      dependencies['@fastify/helmet'] = '^13.0.1';
      dependencies['@fastify/compress'] = '^8.0.1';
      break;
    case 'hono':
      dependencies['hono'] = '^4.7.10';
      dependencies['@hono/node-server'] = '^1.14.2';
      break;
    default:
      break;
  }

  if (lint) {
    devDependencies['@eslint/js'] = '^9.26.0';
    devDependencies['eslint'] = '^9.26.0';
    devDependencies['typescript-eslint'] = '^8.31.1';
    devDependencies['globals'] = '^16.0.0';
    devDependencies['prettier'] = '^3.5.3';
  }

  if (tests) {
    switch (typeTest) {
      case 'vitest':
        devDependencies['vitest'] = '3.1.2';
        devDependencies['vite-tsconfig-paths'] = '5.1.4';
        break;
      case 'jest':
        devDependencies['ts-jest'] = '^29.3.4';
        devDependencies['jest'] = '^29.7.0';
        devDependencies['@types/jest'] = '^29.5.14';
        break;
      default:
        devDependencies['ts-node'] = '^10.9.2';
        break;
    }
  }

  function getTestScript(type: TestLibrary | false): string {
    const map: Record<string, string> = {
      vitest: 'vitest run --config vitest.unit.config.mjs',
      jest: 'jest',
      default:
        "node -r ts-node/register -r tsconfig-paths/register --test 'src/**/*.spec.ts'",
    };

    if (!type || !map[type]) {
      return map.default;
    }

    return map[type];
  }

  const scripts: Record<string, string> = {
    start: 'NODE_ENV=production node -r dotenv/config dist/src/main.js',
    dev: 'tsx watch --clear-screen=false -r tsconfig-paths/register -r dotenv/config src/main.ts',
    build:
      'rimraf dist && tsc --project tsconfig.build.json && resolve-tspaths',
  };

  if (lint) {
    scripts['lint'] = 'eslint .';
    scripts['lint:fix'] = 'eslint . --fix';
    scripts['format'] =
      'prettier --write "src/**/*.{js,jsx,ts,tsx,json,css,scss,md}"';
  }

  if (tests) {
    scripts['test:unit'] = getTestScript(typeTest);
  }

  return {
    name: projectName.toLowerCase().replace(/\s+/g, '-'),
    version: '1.0.0',
    description: 'API gerada com api boilerplate',
    main: 'dist/src/main.js',
    scripts,
    keywords: ['api', 'nodejs'],
    author: '',
    license: 'MIT',
    dependencies,
    devDependencies,
    overrides,
  };
}
