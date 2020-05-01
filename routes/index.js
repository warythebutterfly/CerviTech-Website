'use strict';
var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
let argv = require('yargs').argv;
var gplay = require('google-play-scraper'); 
var result = "";


router.get('/', async function(req,res){

var app = await gplay.app({appId: 'com.hashnet.cervitech'});
var reviews = await gplay.reviews({
  appId: 'com.hashnet.cervitech',
  sort: gplay.sort.HELPFULNESS
  
});
console.log(reviews);
var screenshots = app.screenshots;
console.log(screenshots);

res.render('index',{
	title: 'CerviTech | Home',
	response: reviews,
	screenshots : screenshots

});

});

router.post('/', function(req,res){
	console.log(req.body);
	var name = req.body.name;
	var email = req.body.email;
	var subject = req.body.subject;
	var message = req.body.message;
  console.log(name);
var transporter = nodemailer.createTransport({
	service:'gmail',
	auth: {
		user:'devs.cervitech@gmail.com',
		pass: 'anelpo14'
	}

});

var HelperOptions =
{
	from:'devs.cervitech@gmail.com',
	to: 'devs.cervitech@gmail.com',
	subject:email+" - "+subject,
	text:message
};

console.log(HelperOptions);

transporter.sendMail(HelperOptions,(error,info)=>{
	if(error){
		return console.log(error);
	}
	console.log('successful', info.messageId, info.response);
	console.log(info);
});

process.env["NODE_TLS_REJECT_UNAUTHORIZED"]=0;
});


//POST route from contact us form


module.exports = router;

 


// let name = "steven",
// command = argv._[0];

// const simple = function(){
// 	if(name){
// 		console.log(`Hi ${name}`);
// 	}else{
// 		console.log('hi!');
// 	}
// };

// const formal = function(){
// 	if(name){
// 		console.log(`Hello ${name} and welcome`);
// 	}
// 	else{
// 		console.log('hello and welcome');
// 	}
// };



// formal();