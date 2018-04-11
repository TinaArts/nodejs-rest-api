'use strict';

// main const variable
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();
const port = process.env.PORT || 8081;

require('./lib/db');

// requests of content-type - application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// routes
require('./routes')(router);
app.use('/api/v1', router);

// error handling
require('./lib/handler')(app);


// listen
app.listen(port, () => {
    console.log('Express server listening on port ' + port);
});