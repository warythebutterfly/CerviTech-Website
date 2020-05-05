'use strict';
var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

let argv = require('yargs').argv;
require('dotenv').config();
var gplay = require('google-play-scraper'); 
var async  = require('express-async-await');
var fetch = require('node-fetch');
var result = "";


router.get('/', async function(req, res){

var app = await gplay.app({appId: 'com.hashnet.cervitech'});
var reviews = await gplay.reviews({
  appId: 'com.hashnet.cervitech',
  sort: gplay.sort.HELPFULNESS
  
});
//console.log(reviews);
var screenshots = app.screenshots;
//console.log(screenshots);

res.render('index',{
	title: 'CerviTech | Home',
	response: reviews,
	screenshots : screenshots

});

});

//console.log(process.env);

router.post('/nodemailer', function(req,res){

	var name = req.body.name;
	var email = req.body.email;
	var subject = req.body.subject;
	var message = req.body.message;

	var HelperOptions =
	{
		from:'devs.cervitech@gmail.com',
		to: 'devs.cervitech@gmail.com',
		subject:email+" - "+subject,
		text:message
	};

  //console.log(name);
var transporter = nodemailer.createTransport({
	service:'gmail',
	auth: {
		user:process.env.GMAIL_USER,
		pass: process.env.GMAIL_PASS
	}
});

var HelperOptions =
{
	from:process.env.GMAIL_USER,
	to: process.env.GMAIL_USER,
	subject: 'New message from contact form at cervitech.com.ng',
	text:subject+" - "+message +" from "+email+"("+name+")"
};

console.log(HelperOptions);

transporter.sendMail(HelperOptions,(error,info)=>{
	if(error){
		return console.log(error);
	}
	console.log('successful', info.messageId, info.response);
	console.log(info);
})


process.env["NODE_TLS_REJECT_UNAUTHORIZED"]=0;
});




module.exports = router;

