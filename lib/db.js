'use strict';

const mongoose = require('mongoose');
const logger = require('./logger')(module);
const config = require('../config');

mongoose.Promise = global.Promise;

mongoose.connect(config.mongoDbUrl);

mongoose.connection.on('error', (err) => {
    logger.error('DB error: %s', err);
});

mongoose.connection.once('open', () => {
    logger.debug('DB debug: Connect');
});

mongoose.connection.on('disconnected', () => {
    logger.debug('DB debug: Disconnect');
});

process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        logger.debug('DB debug: Connection close');
        process.exit(0);
    });
});

module.exports = mongoose;