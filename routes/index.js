'use strict';
var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

//let argv = require('yargs').argv;
require('dotenv').config();
var gplay = require('google-play-scraper');
var async = require('express-async-await');
var fetch = require('node-fetch');



router.get('/', async function (req, res) {

	var app = await gplay.app({ appId: 'com.hashnet.cervitech' });
	var reviews = await gplay.reviews({
		appId: 'com.hashnet.cervitech',
		sort: gplay.sort.HELPFULNESS

	});
	
	var screenshots = app.screenshots;
	

	res.render('index', {
		title: 'CerviTech | Home',
		recommendations: reviews,
		screenshots: screenshots,


	});

});


router.post('/sendmail', function (req, res) {
	console.log(req.body);

	var name = req.body.name;
	var email = req.body.email;
	var subject = req.body.subject;
	var message = req.body.message;

	console.log(name);

	var HelperOptions =
	{
		from: process.env.GMAIL_USER,
		to: process.env.GMAIL_USER,
		subject: 'New message from contact form at cervitech.com.ng',
		text: subject + " - " + message + " from " + email + "(" + name + ")"
	};


	console.log(HelperOptions);

	var transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: process.env.GMAIL_USER,
			pass: process.env.GMAIL_PASS
		}
	});
	// var statusCode = {
	// 	Successful: "00",
	// 	BadRequest: "01",
	// 	Failed: "02",
	// 	UnknownError: "03"

	// };



	transporter.sendMail(HelperOptions, (error, info) => {
		// var statusCode ={
		// 	Successful:"00",
		// 	BadRequest:"01",
		// 	Failed:"02",
		// 	UnknownError:"03"

		// };

		if (error) {
			console.log("error in transporter");
			console.log(error);
			var responseHeader = "Oops!"
			var response = "Error sending mail...Please do try again...";
			

			return res.send({
				responseHeader:responseHeader,
				responseText: response,
				success : "Updated Successfully",
				 status : 200, 
	
			});
		}
		console.log('successful', info.messageId, info.response);
		console.log(info);
		var responseHeader = "Thank you!"
		var response = "Thank you for reaching out to us...We would get back to you shortly...";
		return res.send({
			responseHeader:responseHeader,
			responseText: response,
			success : "Updated Successfully",
			 status : 200, 

		});
		//return res.end('{"success" : "Updated Successfully", "status" : 200, "responseText" : "Thank you for reaching out to us...We would get back to you shortly..."}');
		//return res.end('{"success" : "Updated Successfully", "status" : 200, "responseText" : '+ response + '}');
		

	})




	process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;


	// res.send({
	// 	result,
	// 	data
	// })

	//responses.push(data);
	//return res.send(result);
	//return res.send(data);

});




module.exports = router;

