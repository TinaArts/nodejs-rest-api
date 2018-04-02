'use strict';

// main const variable
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const logger = require('./lib/logger')(module);
const app = express();
const router = express.Router();

// requests of content-type - application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('json spaces', 40);

// routes
require('./routes')(router, {});
app.use('/api/v1', router);

// error handling
require('./lib/errorHandler')(app);

// listen
app.listen(8081, () => {
    console.log('Express server listening on port 8081');
});