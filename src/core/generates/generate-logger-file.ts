export function generateLoggerFile(): string {
  return `import fs from "fs"
import path from "path"
import pino from "pino"
import { env } from "./env"

const logsDir = path.resolve("logs")
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true })
}

const isProd = env.NODE_ENV === "production"

export const logger = pino({
  level: env.LOG_LEVEL || (isProd ? "info" : "debug"),
  base: undefined,
  timestamp: pino.stdTimeFunctions.isoTime,
  transport: !isProd
    ? {
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "SYS:yyyy-mm-dd HH:MM:ss",
          ignore: "pid,hostname"
        }
      }
    : {
        targets: [
          {
            target: "pino/file",
            options: { destination: path.join(logsDir, "error.log") },
            level: "error"
          },
          {
            target: "pino/file",
            options: { destination: path.join(logsDir, "info.log") },
            level: "info"
          }
        ]
      }
})
`;
}
