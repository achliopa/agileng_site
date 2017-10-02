var express = require('express');
var bodyParser = require('body-parser');
var Recaptcha = require('express-recaptcha');
var countries = require('./tmp/countries.json');
var nodemailer = require('nodemailer');


var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_FROM,
    pass: process.env.MAIL_PASS
  }
});

var app = express();
var recaptcha = new Recaptcha(process.env.SITE_KEY, process.env.SECRET_KEY);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/', function(req,res) {
    res.render('home', {countries : countries, captcha:recaptcha.render()});
});

app.post('/contact', function(req,res) {
    recaptcha.verify(req, function(error, data){
        if(!error) {
           var mailOptions = {
              from: process.env.MAIL_FROM,
              to: process.env.MAIL_TO,
              subject: 'Sending Email using Node.js',
              text: 'That was easy!'
            };
            transporter.sendMail(mailOptions, function(error, info){
              if (error) {
                console.log(error);
              } else {
                console.log('Email sent: ' + info.response);
              }
              res.redirect('/');
            });
        }
    });
});

// START APPLICATION

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("App has started!!!");
});