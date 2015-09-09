/// <reference path="../typings/tsd.d.ts" />

import mongoose = require('mongoose');
// import * as bcrypt from 'bcrypt';

mongoose.connect('mongodb://localhost/nodeauth');
var db = mongoose.connection;

var UserSchema = new mongoose.Schema({
	username: {
		type: String,
		index: true
	},
	password: {
		type: String,
		bcrypt: true,
		required: true
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

export function createUser(newUser, callback) {
	// problem with installtion of bcrypt module
	// bcrypt.hash(newUser.password, 10, (err, hash) => {
	// 	if (err) { throw err; }
	// 	//set hashed password
	// 	console.log(hash);
	// 	newUser.password = hash;
	// 	//create user
	// });
	newUser.save(callback);
}