'use strict';

const logger = require('../lib/logger')(module);

let handler = (app) => {
    app.use((req, res) => {
        logger.error('Not found URL:  %s', req.url);
        return res.status(404).json({
            status: false,
            message: req.method + ' ' + req.originalUrl + ' not found'
        })
    });

    app.use((err, req, res, next) => {
        logger.error('Internal error(%d): %s', res.statusCode, err);
        return res.status(res.statusCode || 500).json({
            status: false,
            error: err.message
        });
    });
};

module.exports = handler;

