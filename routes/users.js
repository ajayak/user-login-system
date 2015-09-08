/// <reference path="../typings/tsd.d.ts" />
var express = require('express');
var router = express.Router();
router.get('/', function (req, res, next) {
    res.send('Welcome to user route');
});
router.get('/register', function (req, res, next) {
    res.render('register', { title: 'register' });
});
router.post('/register', function (req, res, next) {
    var name = req.body.name;
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var password2 = req.body.password2;
});
router.get('/login', function (req, res, next) {
    res.render('login', { title: 'login' });
});
module.exports = router;
