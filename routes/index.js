'use strict';

const userModel = require('../model/user');

let routes = (route, db) => {

    // router.use('*', (req, res, next) => {
    //     if (!req.user) {
    //         return res.status(403).json({status: false, message: 'Forbidden'});
    //     }
    //
    //     userModel.findOne({'_id': req.user._id}, (err, res) => {
    //         if (err) {
    //             return res.status(err.status).json({status: false, message: err.message});
    //         }
    //
    //         next();
    //     });
    // });

    require('./auth')(route, db);
    require('./card')(route, db);
};

module.exports = routes;