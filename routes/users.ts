/// <reference path="../typings/tsd.d.ts" />
import * as express from 'express';
import {User, createUser, getUserByUsername, getUserById, comparePassword} from '../models/user';
// import User = require('../models/user');
import passport = require('passport');
var localStrategy = require('passport-local');

var router = express.Router();

router.get('/', (req, res, next) => {
    res.send('Welcome to user route');
});

router.get('/register', (req, res, next) => {
    res.render('register', { title: 'register' });
});

router.post('/register', (req, res, next) => {
    console.log(req.body.email);

    var name = req.body.name;
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var password2 = req.body.password2;

    
    // if(req.files.profileImage){
    //     console.log('Uploading File');
        
    //     var profileImageOriginalName = req.files.profileImage.originalName;
    //     var profileImageName = req.files.profileImage.name;
    //     var profileImageMime = req.files.profileImage.mimeType;
    //     var profileImagePath = req.files.profileImage.path;
    //     var profileImageExt = req.files.profileImage.extension;
    //     var profileImageSize = req.files.profileImage.size;
    // }else{
    //     //set a default image
    //     var profileImageName = 'noImage.png';
    // }
    
    //Form validation
    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email not valid').isEmail();
    req.checkBody('username', 'UserName is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password2', 'Passwords donot match').equals(req.body.password);
    
    //Check for errors
    var errors = req.validationErrors();
    if (errors) {
        res.render('register', {
            errors: errors,
            name: name,
            email: email,
            username: username,
            password: password,
            password2: password2
        });
    } else {
        console.log('no error');

        var newUser = new User({
            name: name,
            email: email,
            username: username,
            password: password,
            profileImage: 'profileImageName'
            // profileImage: profileImageName
        });
        
        //Create User
        createUser(newUser, (err, user) => {
            if (err) throw err;
            console.log(user);
        });
        
        //Success Message
        req.flash('success', 'You are now registered and may log in');

        res.location('/');
        res.redirect('/');
    }
});

router.get('/login', (req, res, next) => {
    res.render('login', { title: 'login' });
});

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    getUserById(id, (err, user) => {
        done(err, user);
    });
});

passport.use(new localStrategy((username, password, done) => {
    getUserByUsername(username, (err, user) => {
        if (err) throw err;
        if (!user) {
            console.log('Unknown user');
            return done(null, false, { message: 'Unknown User' });
        }

        comparePassword(passport, user.password, (error, isMatch) => {
            if (error) throw error;
            if (isMatch) {
                return done(null, user);
            } else {
                console.log('Invalid password');
                return done(null, false, 'Invalid password');
            }
        });
    });
}));

router.post('/login', passport.authenticate('local',
    { failureRedirect: '/users/login', failureFlash: 'Invalid username or password' }),
    (req, res) => {
        console.log('Authentication Successfull');
        req.flash('success', 'You are logged in');
        res.redirect('/');
    });

export = router;
