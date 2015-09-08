var express = require('express');
var nodemailer = require('nodemailer');
var router = express.Router();
/* GET Contact page. */
router.get('/', function (req, res, next) {
    res.render('contact', { title: 'contact' });
});
router.post('/send', function (req, res, next) {
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'ajayak731@gmail.com',
            pass: 'ak'
        }
    });
    var mailOptions = {
        from: 'Ajay Kumar <ajayak731@hotmail.com>',
        to: 'ajayak731@gmail.com',
        subject: 'Express App form',
        text: 'You have a new form submission with following details...Name: ' + req.body.name + ' , Email: ' + req.body.email + ' and Message: ' + req.body.message,
        html: '<p>You got a new form submission with the following details...</p><ul><li>Name: ' + req.body.name + '</li><li>Email: ' + req.body.email + '</li><li>Message: ' + req.body.message + '</li>',
    };
    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.log(err);
            res.redirect('/');
        }
        else {
            console.log('Message Sent ' + info.response);
            res.redirect('/');
        }
    });
});
module.exports = router;
