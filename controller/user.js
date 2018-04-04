'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../model/user');
const authModel = require('../model/auth');
const config = require('../config');

let auth = {};

auth.registration = (req, res) => {
    let user = new userModel({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    user.save((err) => {
        if (err) {
            return res.status(500).json({status: false, message: err.message});
        }

        let token = jwt.sign({id: user._id}, config.jwtHash, {
            expiresIn: config.jwtExpiresIn
        });

        let auth = new authModel({
            user: user._id,
            token: token,
            died_date: Date.now() + config.jwtExpiresIn * 1000
        });

        auth.save((err) => {
            if (err) {
                return res.status(500).json({status: false, message: err.message});
            }

            res.status(200).json({status: true, data: {token: auth.token}});
        });
    });
};

auth.login = (req, res) => {
    let token = req.headers['x-access-token'];

    if (!token) {
        return res.status(401).json({status: false, message: 'No token provided.'});
    }

    jwt.verify(token, config.jwtHash, function (err, decoded) {
        if (err) {
            return res.status(500).json({status: false, message: err.message});
        }

        userModel.findById(decoded.id, '-passwor1d', function (err, user) {
            if (!user) {
                return res.status(404).json({status: false, message: "User not found"});
            }

            res.status(200).json({status: true, data: user});
        });
    });
};

auth.logout = (req, res) => {
    res.status(200).send({status: true, data: {token: null}});
};

module.exports = auth;