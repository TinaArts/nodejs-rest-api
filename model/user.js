'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

let userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        unique: true,
        required: true,
        min: 3
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true,
        validate: {
            validator: e => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(e),
            message: 'Please make sure your email is typed correctly.'
        }
    },
    password: {
        type: String,
        required: true,
        min: 3
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

// userSchema.index({email: 1});

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

userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) {
            return cb(err);
        }
    });
};

let userModel = mongoose.model('user', userSchema);

module.exports = userModel;