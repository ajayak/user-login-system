/// <reference path="../typings/tsd.d.ts" />

import mongoose = require('mongoose');
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

export var User = mongoose.model('User', UserSchema);

export function createUser(newUser, callback){
	newUser.save(callback);
}