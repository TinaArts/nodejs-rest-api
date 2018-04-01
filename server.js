'use strict';

// main const variable
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const logger = require('./lib/logger')(module);
const config = require('./config');
const app = express();
const router = express.Router();

// requests of content-type - application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// routes
require('./routes/card')(router, {});
require('./routes/auth')(router, {});

app.use('/api/v1', router);

// listen
app.listen(8081, () => {
    console.log('Express server listening on port 8081');
});