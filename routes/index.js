'use strict';
var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
let argv = require('yargs').argv;
var gplay = require('google-play-scraper'); 
var result = "";


router.get('/', async function(req,res){

 // gplay.app({appId: 'com.hashnet.cervitech'})
 //   .then(result => console.log(result))
var reviews = await gplay.reviews({
  appId: 'com.hashnet.cervitech',
  sort: gplay.sort.NEWEST
  
});
console.log(reviews);

res.render('index',{
	title: 'CerviTech | Home',
	response: reviews
});

});

router.post('/', function(req,res){
	console.log(req.body);
	var name = req.body.name;
	var email = req.body.email;
	var subject = req.body.subject;
	var message = req.body.message;

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

module.exports = router;

 

// var comments = result.comments;
// var text = "";
// var i;
// for (i = 0; i < comments.length; i++) {
//   text += comments[i];
let name = "steven",
command = argv._[0];




const simple = function(){
	if(name){
		console.log(`Hi ${name}`);
	}else{
		console.log('hi!');
	}
};

const formal = function(){
	if(name){
		console.log(`Hello ${name} and welcome`);
	}
	else{
		console.log('hello and welcome');
	}
};



formal();