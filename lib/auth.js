"use strict";

const jwt = require('jsonwebtoken');
const config = require('../config');

/**
 * Middleware for check auth by token
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
let auth = (req, res, next) => {
    let token = req.headers['x-access-token'];

    if (token) {
        jwt.verify(token, config.jwt.hash, function (err, decoded) {
            if (err) {
                res.status(401);
                return next(err);
            }
            req.decoded = decoded;
            next();
        });
    } else {
        res.status(401);
        return next(new Error('No token provided'));
    }
};

module.exports = auth;