export function generateMainFile(options) {
  return `
  import { logger } from "@infra/logger";
import HttpServer from "./http-server";

enum ExitStatus {
  Failure = 1,
  Success = 0,
}

async function main() {
  try {
    const PORT = process.env.PORT || 3000;
    const httpServer = new HttpServer();
    const port = Number(PORT);
    // sinais do sistema operacional que o programa monitorará para saber quando dever parar
    const exitSignals: NodeJS.Signals[] = ["SIGINT", "SIGTERM", "SIGQUIT"];

    // Monitorando os sinais do sistema operacional
    exitSignals.map((sig) =>
      process.on(sig, async () => {
        try {
          httpServer.stop();
          logger.info("Existing app with success");
          process.exit(ExitStatus.Success);
        } catch (error) {
          logger.error(\`App exited with error: \$\{error\}\`);
          process.exit(ExitStatus.Failure);
        }
      })
    );

    const app = await httpServer.createApp();

    ${
      options.stack === "fastify"
        ? "app.listen({port},() => logger.info(`Running on port ${port}`));"
        : "app.listen(port, () => logger.info(`Running on port ${port}`));"
    }
  } catch (error) {
    logger.error(\`App exited with error: \$\{error\}\`);
    process.exit(ExitStatus.Failure);
  }
}

main();
  `;
}
