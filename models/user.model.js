'use strict'
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
    local: {
        username: String,
        firstName: String,
        lastName: String,
        email: String,
        password: String,
    },

    facebook: {
        id: String,
        token: String,
        email: String,
        name: String

    },
});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, this.local.password);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);