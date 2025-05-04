export function generatePackageJson(projectName, options) {
  const dependencies = {
    compression: "^1.7.5",
    cors: "^2.8.5",
    express: "^5.1.0",
    helmet: "^8.0.0",
    pino: "^9.5.0",
    "pino-pretty": "^13.0.0",
    "tsconfig-paths": "^4.2.0",
    dotenv: "^16.5.0",
    "resolve-tspaths": "^0.8.19",
  };

  const devDependencies = {
    "@types/compression": "^1.7.5",
    "@types/cors": "^2.8.17",
    "@types/express": "^5.0.1",
    "@types/node": "^22.15.3",
    typescript: "^5.6.3",
    rimraf: "^6.0.1",
    "ts-node-dev": "2.0.0",
  };

  if (options.tests) {
    devDependencies["vitest"] = "3.1.2";
    devDependencies["vite-tsconfig-paths"] = "5.1.4";
  }

  const scripts = {
    start: "NODE_ENV=production node -r dotenv/config dist/src/main.js",
    dev: "ts-node-dev --respawn --transpile-only -r tsconfig-paths/register -r dotenv/config src/main.ts",
    build:
      "rimraf dist && tsc --project tsconfig.build.json && resolve-tspaths",
  };
  if (options.tests) {
    scripts["test:unit"] = "vitest run --config vitest.unit.config.mjs";
  }

  return {
    name: projectName.toLowerCase().replace(/\s+/g, "-"),
    version: "1.0.0",
    description: "API gerada com api boilerplate",
    main: "dist/src/main.js",
    scripts,
    keywords: ["express", "api", "nodejs"],
    author: "",
    license: "MIT",
    dependencies,
    devDependencies,
  };
}
