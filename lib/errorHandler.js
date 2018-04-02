'use strict';

const logger = require('../lib/logger')(module);

let handler = (app) => {
    app.use((req, res, next) => {
        res.status(404);
        logger.error('Not found URL: %s', req.url);
        res.json({
            status: false,
            message: 'Not found URL'
        });
    });

    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        logger.error('Internal error(%d): %s', res.statusCode, err.message);
        res.json({
            status: false,
            error: err.message
        });
    });
};

module.exports = handler;