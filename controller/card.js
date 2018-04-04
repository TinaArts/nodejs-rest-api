"use strict";

let card = {};

card.view = (req, res) => {
    let token = req.headers['x-access-token'];

    if (!token)
        res.status(401).send({ status: false, message: 'No token provided.' });
};

module.exports = card;