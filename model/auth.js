'use strict';

const mongoose = require('mongoose');

let authSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    token: {
        type: String,
        unique: true,
        required: true
    },
    created_date: {
        type: Date,
        default: Date.now
    },
    died_date: {
        type: Date
    },

});

let authModel = mongoose.model('auth', authSchema);

module.exports = authModel;