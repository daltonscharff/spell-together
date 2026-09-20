import pino from "pino";

const logger =
  process.env.NODE_ENV === "production"
    ? pino({
        level: process.env.PINO_LOG_LEVEL || "info",
        transport: {
          target: "pino-roll",
          options: {
            frequency: "daily",
            limit: { count: 7 },
            mkdir: true,
            dateFormat: "yyyy-MM-dd",
            file: process.env.LOG_FILE_PATH,
            prefix: "cron",
          },
        },
      })
    : pino({
        level: process.env.PINO_LOG_LEVEL || "info",
        transport: {
          target: "pino-pretty",
          options: {
            colorize: true,
            translateTime: "SYS:standard",
            ignore: "pid,hostname",
          },
        },
      });

export default logger;
