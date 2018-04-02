'use strict';

let authRouter = (router, {}) => {
    router.post('/login', (req, res) => {
        res.json({'message': 'Login'});
    });

    router.delete('/logout/:user_id', (req, res) => {
        res.json({'message': 'Logout'});
    });
};

module.exports = authRouter;