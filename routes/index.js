'use strict';

let routes = (route, db) => {
    require('./auth')(route, db);
    require('./card')(route, db);
};

module.exports = routes;