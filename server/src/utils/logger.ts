import * as winston from "winston"

export const winstonLogger = (service: string) =>
  winston.createLogger({
    level: "info",
    format: winston.format.json(),
    defaultMeta: { service: service },
    transports: [
      new winston.transports.File({ filename: "logs/combined.log" }),
      new winston.transports.File({ filename: "logs/error.log", level: "error" }),
    ],
  })
