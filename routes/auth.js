'use strict';

let authRouter = (app, {}) => {
    app.post('/login', (req, res) => {
        res.json({'message': 'Login'});
    });

    app.delete('/logout/:user_id', (req, res) => {
        res.json({'message': 'Logout'});
    });
};

module.exports = authRouter;