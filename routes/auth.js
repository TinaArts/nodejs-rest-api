'use strict';

const user = require('../controller/user');
const auth = require('../lib/auth');

let authRouter = (router) => {
    router.post('/registration', user.registration);

    router.post('/login', user.login);

    router.delete('/logout', auth, user.logout);
};

module.exports = authRouter;