'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
//var deepPopulate = require('mongoose-deep-populate')(mongoose);

var schema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    password: {
        type: String
    },
    salt: {
        type: String
    },
    google: {
        id: String
    },
    photo: {
        type: String,
        default: '/images/default-img.png'
    },
    cards: [{
        type: ObjectId, ref: "Cards"
    }],
    level: {
        type: Number,
        max: 50,
        default: 0
    }
});

//schema.plugin(deepPopulate, {});



// generateSalt, encryptPassword and the pre 'save' and 'correctPassword' operations
// are all used for local authentication security.
var generateSalt = function () {
    return crypto.randomBytes(16).toString('base64');
};

var encryptPassword = function (plainText, salt) {
    var hash = crypto.createHash('sha1');
    hash.update(plainText);
    hash.update(salt);
    return hash.digest('hex');
};

schema.pre('save', function (next) {

    if (this.isModified('password')) {
        this.salt = this.constructor.generateSalt();
        this.password = this.constructor.encryptPassword(this.password, this.salt);
    }

    next();

});

schema.statics.generateSalt = generateSalt;
schema.statics.encryptPassword = encryptPassword;

schema.method('correctPassword', function (candidatePassword) {
    return encryptPassword(candidatePassword, this.salt) === this.password;
});

mongoose.model('User', schema);