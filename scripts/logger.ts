import pino from "pino";

export default pino({
  transport: {
    target: "pino-pretty",
    options: {
      colorize: false,
      translateTime: "SYS:standard",
      ignore: "pid,hostname",
    },
  },
});
