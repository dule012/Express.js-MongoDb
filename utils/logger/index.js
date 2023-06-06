import winston from "winston";

const logFormat = winston.format.printf(
  (info) => `\n${info.level}: ${info.message}\n`
);

global.logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), logFormat),
    }),
  ],
});
