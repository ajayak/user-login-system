/// <reference path="../typings/tsd.d.ts" />
import * as express from 'express';

var router = express.Router();

router.get('/', (req, res, next) => {
    res.send('Welcome to user route');
});

router.get('/register', (req, res, next) => {
    res.render('register', { title: 'register' });
});

router.post('/register', (req, res, next) => {
    var name = req.body.name;
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var password2 = req.body.password2;
});

router.get('/login', (req, res, next) => {
    res.render('login', { title: 'login' });
});

export = router;
