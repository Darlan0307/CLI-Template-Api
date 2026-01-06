
  import pino from "pino";
import pretty from "pino-pretty";

const stream = pretty({
  colorize: true,
  translateTime: "SYS:yyyy-mm-dd HH:MM:ss.l o",
  ignore: "pid,hostname",
});

export const logger = pino(
  {
    level: process.env.LOG_LEVEL || "info",
    transport: {
      targets: [
        {
          target: "pino-pretty",
          options: { colorize: true },
          level: "debug",
        },
        {
          target: "pino/file",
          options: { destination: "./logs/app.log" },
          level: "info",
        },
      ],
    },
  },
  stream
);
  