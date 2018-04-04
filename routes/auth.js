'use strict';

const user = require('../controller/user');

let authRouter = (router) => {
    router.post('/registration', (req, res) => {
        user.registration(req, res);
    });

    router.post('/login', (req, res) => {
        user.login(req, res);
    });

    router.delete('/logout', (req, res) => {
        user.logout(req, res);
    });
};

module.exports = authRouter;