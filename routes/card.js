'use strict';

let cardRoutes = (router, db) => {
    router.route('/card')
        .post((req, res) => {
            res.json({"message": "Create card"})
        })
        .get((req, res) => {
            res.json({"message": "Get card"})
        });

    router.route('/card/:id')
        .put((req, res) => {
            res.json({"message": "Update card"})
        })
        .delete((req, res) => {
            res.json({"message": "Delete card"})
        })
};

module.exports = cardRoutes;