/// <reference path="../typings/tsd.d.ts" />
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/nodeauth');
var db = mongoose.connection;
var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        index: true
    },
    password: {
        type: String
    },
    email: {
        type: String
    },
    name: {
        type: String
    },
    profileImage: {
        type: String
    }
});
exports.User = mongoose.model('User', UserSchema);
function createUser(newUser, callback) {
    newUser.save(callback);
}
exports.createUser = createUser;
