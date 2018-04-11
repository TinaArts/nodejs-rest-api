"use strict";

module.exports = {
    mongoDbUrl: 'mongodb://mongodb:27017/api',
    jwt: {
        hash: 'nodejsapi',
        expiresIn: 86400, // 24h
    }
};