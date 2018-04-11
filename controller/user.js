'use strict';

const jwt = require('jsonwebtoken');
const userModel = require('../model/user');
const authModel = require('../model/auth');
const config = require('../config');

let auth = {};

/**
 * User registration.
 * Generate auth token.
 * @param req
 * @param res
 * @param next
 */
auth.registration = (req, res, next) => {
    let user = new userModel({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    user.save((err) => {
        if (err) {
            res.status(500);
            return next(err);
        }

        let token = jwt.sign({id: user._id}, config.jwt.hash, {
            expiresIn: config.jwt.expiresIn
        });

        let auth = new authModel({
            user_id: user._id,
            token: token,
            died_date: Date.now() + config.jwt.expiresIn * 1000
        });

        auth.save((err) => {
            if (err) {
                res.status(500);
                return next(err);
            }

            user = user.toObject();
            user.token = auth.token;
            delete user.password;

            res.data = user;
            next();
        });
    });
};

/**
 * User login by email and password.
 * Generate auth token.
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
auth.login = (req, res, next) => {
    if (!req.body.email || !req.body.password) {
        res.status(500);
        return next(new Error('Email and password is required'));
    }

    userModel.findOne({email: req.body.email}, function (err, user) {
        if (!user) {
            res.status(401);
            return next(new Error('Invalid credentials'));
        }

        user.comparePassword(req.body.password, function (err, isMatch) {
            if (err) {
                return next(err);
            }
        });

        let token = jwt.sign({id: user._id}, config.jwt.hash, {
            expiresIn: config.jwt.expiresIn
        });

        let auth = {
            user_id: user._id,
            token: token,
            died_date: Date.now() + config.jwt.expiresIn * 1000
        };

        authModel.findOneAndUpdate({user_id: user._id}, auth, {new: true}, (err) => {
            if (err) {
                res.status(500);
                return next(err);
            }

            user = user.toObject();
            user.token = auth.token;
            delete user.password;

            res.data = user;
            next();
        });
    });
};

/**
 * User logout.
 * Check auth by token.
 * @param req
 * @param res
 * @param next
 */
auth.logout = (req, res, next) => {
    authModel.findOneAndRemove({user_id: req.decoded.id}, function (err) {
        if (err) {
            res.status(500);
            return next(err);
        }
        delete req.decoded.id;
        next();
    });
};

module.exports = auth;