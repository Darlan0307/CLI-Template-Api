export function generatePackageJson(projectName, options) {
  const dependencies = {
    express: "^4.18.2",
    dotenv: "^16.0.3",
    cors: "^2.8.5",
    helmet: "^6.0.1",
    morgan: "^1.10.0",
  };

  const devDependencies = {
    nodemon: "^2.0.20",
    jest: "^29.4.1",
  };

  if (options.auth) {
    dependencies["jsonwebtoken"] = "^9.0.0";
    dependencies["bcryptjs"] = "^2.4.3";
  }

  if (options.typescript) {
    devDependencies["typescript"] = "^4.9.5";
    devDependencies["@types/node"] = "^18.11.18";
    devDependencies["@types/express"] = "^4.17.17";
    devDependencies["ts-node"] = "^10.9.1";
    devDependencies["ts-node-dev"] = "^2.0.0";

    if (options.auth) {
      devDependencies["@types/jsonwebtoken"] = "^9.0.1";
      devDependencies["@types/bcryptjs"] = "^2.4.2";
    }
  }

  const scripts = {
    start: options.typescript ? "ts-node src/server.ts" : "node src/server.js",
    dev: options.typescript
      ? "ts-node-dev --respawn src/server.ts"
      : "nodemon src/server.js",
    test: "jest",
  };

  if (options.typescript) {
    scripts["build"] = "tsc";
  }

  return {
    name: projectName.toLowerCase().replace(/\s+/g, "-"),
    version: "1.0.0",
    description: "API gerada com express-api-generator",
    main: options.typescript ? "dist/server.js" : "src/server.js",
    scripts,
    keywords: ["express", "api", "nodejs"],
    author: "",
    license: "MIT",
    dependencies,
    devDependencies,
  };
}
