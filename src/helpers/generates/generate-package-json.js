export function generatePackageJson(projectName, options) {
  const dependencies = {
    compression: "^1.7.5",
    cors: "^2.8.5",
    express: "^4.21.1",
    helmet: "^8.0.0",
    pino: "^9.5.0",
    "pino-pretty": "^13.0.0",
    "tsconfig-paths": "^4.2.0",
    dotenv: "^16.4.5",
    "resolve-tspaths": "^0.8.19",
  };

  const devDependencies = {
    "@types/compression": "^1.7.5",
    "@types/cors": "^2.8.17",
    "@types/express": "^5.0.0",
    "@types/node": "^22.9.0",
    typescript: "^5.6.3",
    rimraf: "^6.0.1",
    "ts-node-dev": "2.0.0",
  };

  const scripts = {
    start: "NODE_ENV=production node -r dotenv/config dist/src/main.js",
    dev: "ts-node-dev --respawn --transpile-only -r tsconfig-paths/register -r dotenv/config src/main.ts",
    build:
      "rimraf dist && tsc --project tsconfig.build.json && resolve-tspaths",
  };

  return {
    name: projectName.toLowerCase().replace(/\s+/g, "-"),
    version: "1.0.0",
    description: "API gerada com express-api-generator",
    main: "dist/src/main.js",
    scripts,
    keywords: ["express", "api", "nodejs"],
    author: "",
    license: "MIT",
    dependencies,
    devDependencies,
  };
}
