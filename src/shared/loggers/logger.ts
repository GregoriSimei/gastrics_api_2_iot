import { createLogger, format, transports } from 'winston';

export const logger = createLogger({
    level: 'debug',
    format: format.combine(
        format.colorize({ all: true }),
        format.timestamp(),
        format.printf(
            (info) => `${info.timestamp} ${info.level}: ${info.message}`,
        ),
    ),
    transports: [new transports.Console()],
});