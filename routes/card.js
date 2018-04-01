'use strict';

let cardRoutes = (app, db) => {
    app.route('/card')
        .post((req, res) => {
            res.json({"message": "Create card"})
        })
        .get((req, res) => {
            res.json({"message": "Get card"})
        });

    app.route('/card/:id')
        .put((req, res) => {
            res.json({"message": "Update card"})
        })
        .delete((req, res) => {
            res.json({"message": "Delete card"})
        })
};

module.exports = cardRoutes;