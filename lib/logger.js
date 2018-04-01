'use strict';

const winston = require('winston');

let getLogger = (module) => {
    let path = module.filename.split('/').slice(-2).join('/');

    return new winston.Logger({
        transports: [
            new winston.transports.Console({
                colorize: true,
                level: 'debug',
                label: path,
            }),
            new winston.transports.File({
                level: 'error',
                filename: '../log/app.log',
                json: true,
                maxsize: 5242880, // 5MB
                maxFiles: 5
            })
        ]
    });
};

module.exports = getLogger;