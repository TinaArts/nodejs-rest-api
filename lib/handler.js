'use strict';

const logger = require('../lib/logger')(module);

let handler = (app) => {
    /**
     * Response handler
     */
    app.use(function (req, res, next) {
        if (!req.route) {
            logger.error('Not found URL:  %s', req.url);
            return res.status(404).json({
                status: false,
                message: req.method + ' ' + req.originalUrl + ' not found'
            });
        }
        res.status(res.statusCode).json({status: true, data: res.data || {}});
    });

    /**
     * Error handler
     */
    app.use((err, req, res, next) => {
        logger.error('Error (%d): %s', res.statusCode, err);
        return res.status(res.statusCode || 500).json({
            status: false,
            error: err.message
        });
    });
};

module.exports = handler;