export function generateTsConfigJson(isBuild) {
  if (isBuild) {
    return {
      extends: "./tsconfig.json",
      include: ["src/**/*"],
      exclude: ["**/*.test.ts", "**/*.spec.ts"],
    };
  }

  return {
    compilerOptions: {
      target: "ES2022",
      module: "commonjs",
      lib: ["ES2022"],
      esModuleInterop: true,
      forceConsistentCasingInFileNames: true,
      strict: true,
      skipLibCheck: true,
      outDir: "./dist",
      rootDir: "./",
      baseUrl: "./",
      paths: {
        "@app/*": ["./src/app/*"],
        "@infra/*": ["./src/infra/*"],
        "@shared/*": ["./src/shared/*"],
      },
    },
  };
}
