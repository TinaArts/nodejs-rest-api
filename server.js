'use strict';

// main const variable
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

// requests of content-type - application/json
// app.use(bodyParser.json());

// listen
app.listen(8081, () => {
    console.log('Express server listening on port 8081');
});

app.get('/api', (req, res) => {
    res.json({'message': 'API is running'});
});
