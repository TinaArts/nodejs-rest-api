'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

let userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

// don't use arrow operator
userSchema.pre('save', function (next) {
    console.log(`Pre -> save - begin ...`);

    if (this.isModified('password') || this.isNew) {
        this.password = bcrypt.hashSync(this.password, 8);
    }

    next();
});

userSchema.post('save', (doc, next) => {
    console.log(`Post -> save - begin ...`);
    next();
});

let userModel = mongoose.model('user', userSchema);

module.exports = userModel;