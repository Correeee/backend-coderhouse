import { createLogger, format, transports } from "winston";

const { combine, printf, timestamp, colorize } = format;

const logConfigDev = {
    level: 'silly',
    format: combine(
        timestamp({
            format: 'MMM-DD-YYYY HH:mm:ss'
        }),
        colorize(),
        printf((info) => `${info.level} | ${[info.timestamp]} | ${info.message}`)
    ),
    transports: [
        new transports.Console({ level: 'debug' }),
        new transports.File({ filename: './logs/dev-errors.log', level: 'error' }),
    ]
};

const logConfigProd = {
    level: 'silly',
    format: combine(
        timestamp({
            format: 'MMM-DD-YYYY HH:mm:ss'
        }),
        colorize(),
        printf((info) => `${info.level} | ${[info.timestamp]} | ${info.message}`)
    ),
    transports: [
        new transports.Console({ level: 'info' }),
        new transports.File({ filename: './logs/prod-errors.log', level: 'error' })
    ]
};


const ENV = process.env.ENV

export const logger = createLogger(ENV == 'dev' ? logConfigDev : logConfigProd);

export const loggerTest = () => {
    logger.silly('Mensaje con nivel Silly');
    logger.debug('Mensaje con nivel Debug');
    logger.verbose('Mensaje con nivel Verbose');
    logger.info('Mensaje con nivel Info');
    logger.http('Mensaje con nivel Http');
    logger.warn('Mensaje con nivel Warn');
    logger.error('Mensaje con nivel Error');
}



