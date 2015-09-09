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

export function comparePassword(candidatePassword, hashedPassword, callback) {
	// compare using bcrypt
	// bcrypt.compare(candidatePassword, hashedPassword, (err, isMatch)=>{
	//	if(err) return callback(err);
	//	callback(null, isMatch);
	// })
	if (candidatePassword === hashedPassword) {
		callback(null, true);
	} else {
		callback(null, false);
	}
}

export function getUserByUsername(username, callback) {
	var query = { username: username };
	User.findOne(query, callback);
}

export function getUserById(id, callback) {
	User.findById(id, callback);
}