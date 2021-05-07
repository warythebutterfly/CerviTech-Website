'use strict';

var express = require('express');

var router = express.Router();

var nodemailer = require('nodemailer');

require('dotenv').config();

var gplay = require('google-play-scraper');

var async = require('express-async-await');

var fetch = require('node-fetch');



router.get('/', async function (req, res) {
try{

	var app = await gplay.app({ appId: 'com.hashnet.cervitech' });
	var reviews = await gplay.reviews({
		appId: 'com.hashnet.cervitech',
		sort: gplay.sort.HELPFULNESS,
		num:10

	});
	//console.log(app);
	//console.log(reviews);


	var screenshots = app.screenshots;
	 var title = app.title;
	
	 //console.log(screenshots);

	res.render('index', {
		title: title,
		recommendations: reviews.data,
		screenshots: screenshots,


	});
}
	catch (err){
		res.render('index', {
			
			title: "CerviTech",
	
		});
	}

});


router.post('/sendmail', function (req, res) {

	var name = req.body.name;
	var email = req.body.email;
	var subject = req.body.subject;
	var message = req.body.message;

	var HelperOptions =
	{
		from: process.env.GMAIL_USER,
		to: process.env.GMAIL_USER,
		subject: 'New message from contact form',
		html: `<b>Subject</b> - ` +subject + `<br><b>Message</b> - ` + message + `<br><br>This mail was sent from ` + `<b>`+email + `(` + name + `)`+`</b>`
	};


	var transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: process.env.GMAIL_USER,
			pass: process.env.GMAIL_PASS
		}
	});

	transporter.sendMail(HelperOptions, (error, info) => {

		if (error) {
			console.log("error in transporter");
			console.log(error);
			var responseHeader = "Oops!"
			var response = "Error sending mail...Please do try again.";


			return res.send({
				responseHeader: responseHeader,
				responseText: response,
				success: "Updated Successfully",
				status: 200,

			});
		}
		console.log('successful', info.messageId, info.response);
		console.log(info);
		var responseHeader = "Thank you!"
		var response = "Thank you for reaching out to us...We would get back to you shortly...";
		return res.send({

			responseHeader: responseHeader,
			responseText: response,
			success: "Updated Successfully",
			status: 200,

		});

	})
	process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

});

module.exports = router;

