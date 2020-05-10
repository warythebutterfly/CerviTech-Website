'use strict';
var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

let argv = require('yargs').argv;
require('dotenv').config();
var gplay = require('google-play-scraper'); 
var async  = require('express-async-await');
var fetch = require('node-fetch');



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
	recommendations: reviews,
	screenshots : screenshots,
	

});

});

  console.log(process.env.GMAIL_USER);
  console.log(process.env.GMAIL_USER);

router.post('/', function(req,res){
	console.log(req.body);

	var name = req.body.name;
	var email = req.body.email;	
	var subject = req.body.subject;
	var message = req.body.message;

	console.log(name);
	
var HelperOptions =
{
	from:process.env.GMAIL_USER,
	to: process.env.GMAIL_USER,
	subject: 'New message from contact form at cervitech.com.ng',
	text: subject + " - " + message + " from " + email + "(" + name + ")"
};


console.log(HelperOptions);

var transporter = nodemailer.createTransport({
	service:'gmail',
	auth: {
		user:process.env.GMAIL_USER,
		pass: process.env.GMAIL_PASS
	}
});
		var statusCode ={
		Successful:"00",
		BadRequest:"01",
		Failed:"02",
		UnknownError:"03"

		};


	
		transporter.sendMail(HelperOptions,(error,info)=>{
	// var statusCode ={
	// 	Successful:"00",
	// 	BadRequest:"01",
	// 	Failed:"02",
	// 	UnknownError:"03"
		
	// };
	
	if(error){
		console.log("error in transporter");
		console.log(error);
		//return result=statusCode.Failed;
		//return res.send(result => statusCode.Failed);
		
		var response = "Error sending mail";
		//success: "Thank you for contacting us...We would get back to you shortly...",
		
		return res.send(response);
	}
	console.log('successful', info.messageId, info.response);
	console.log(info);
	//result=statusCode.Successful;
	//return res.send(statusCode.Successful => result)
	// res.send({
	// 	result,
	// 	data
	// })
	
	 var response = "Thank you for contacting us...We would get back to you shortly...";
		//error: "Something went wrong...Please try again..."
		console.log(response);
		
		
	 //return res.send(response);
	 return res.end('{"success" : "Updated Successfully", "status" : 200}');
	//console.log(data.Successful);

		})




		process.env["NODE_TLS_REJECT_UNAUTHORIZED"]=0;


// res.send({
	// 	result,
	// 	data
	// })

//responses.push(data);
//return res.send(result);
//return res.send(data);
 
 });




module.exports = router;

