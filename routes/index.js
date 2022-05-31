'use strict';

var express = require('express');

var bodyParser = require('body-parser');

var router = express.Router();

var nodemailer = require('nodemailer');

require('dotenv').config();

var gplay = require('google-play-scraper');

var async = require('express-async-await');

var fetch = require('node-fetch');

var cron = require('node-cron');


router.get('/', async function (req, res) {


	try{
		var app = gplay.app({ appId: 'com.hashnet.cervitech' });
		console.log(app);
		var reviews = await gplay.reviews({
			appId: 'com.hashnet.cervitech',
			sort: gplay.sort.NEWEST,
			num: 10

		});
		console.log(app);
		console.log(reviews);


		var screenshots = app.screenshots;
		var title = app.title;

		//console.log(screenshots);

		res.render('index', {
			title: title,
			recommendations: reviews.data,
			screenshots: screenshots,


		});
	}
		


	
	catch (err) {

		console.log("error rendering index properly");
		res.render('index', {

			title: "CerviTech",
			recommendations: null,



		});

		var email = process.env.DEVS_GMAIL_USER;
		var subject = "Google Play Scraper Npm Update";
		var message = "Error rendering landing page properly, please attend to this as soon as possible and deploy, thank you!";

		var HelperOptions =
		{
			from: process.env.GMAIL_USER,
			to: email,
			cc: process.env.SUPER_ADMIN_GMAIL_USER,
			//bcc: process.env.SUPER_ADMIN_GMAIL_USER,
			subject: subject,
			html: message
		};


		var transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: process.env.GMAIL_USER,
				pass: process.env.GMAIL_PASS
			}
		});

		transporter.sendMail(HelperOptions, (error, info) => {

			if (error) console.log("error in transporter " + error);

			else console.log('successful ' + info.response);

		});

		process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;


	}

});

//my contact form mail service
router.post('/sendmail', function (req, res) {

	var name = req.body.name;
	var subjectname = "CerviTech Contact Form"
	var email = req.body.email;
	var subject = req.body.subject;
	var message = req.body.message;

	var HelperOptions =
	{
		from: '"' + subjectname + '" <' + process.env.GMAIL_USER + '>',
		to: process.env.GMAIL_USER,
		//Dr Akodu
		cc: process.env.ADMIN_GMAIL_USER,
		bcc: process.env.SUPER_ADMIN_GMAIL_USER,
		subject: 'New message from contact form',
		html: `<b>Subject</b> - ` + subject + `<br><b>Message</b> - ` + message + `<br><br>This mail was sent from ` + `<b>` + email + `(` + name + `)` + `</b>`
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
				success: "Unable to send mail successfully",
				status: 500,

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

//my cms service
router.post('/sendemail', function (req, res) {

	var name = req.body.name;
	var email = req.body.email;
	var subject = req.body.subject;
	var message = req.body.message;

	console.log(message)

	var HelperOptions =
	{
		from: '"' + name + '" <' + process.env.DEVS_GMAIL_USER + '>',
		to: email,
		//bcc: process.env.SUPER_ADMIN_GMAIL_USER,
		subject: subject,
		html: message
	};

	console.log(HelperOptions);

	var transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: process.env.DEVS_GMAIL_USER,
			pass: process.env.DEVS_GMAIL_PASS
		}
	});



	transporter.sendMail(HelperOptions, (error, info) => {

		if (error) {
			console.log("error in transporter");
			console.log(error);
			var status = res.status(500).send(error.message);
			var responseHeader = "Oops!"
			var response = "Error in transporter...Please do try again. ";


			return res.send({
				responseHeader: responseHeader,
				responseText: response,
				success: status,
				status: 500,

			});
		}
		console.log('successful', info.messageId, info.response);
		console.log(info);
		//var responseHeader = "Thank you!"
		//var response = "Thank you for reaching out to us...We would get back to you shortly...";
		return res.send({

			responseHeader: "Successful",
			responseText: "Email sent successfully",
			success: "Updated Successfully",
			status: 200,

		});

	})
	process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

});

//my portfolio service
router.post('/send', function (req, res) {


	var name = req.body.name;
	var email = req.body.email;
	var subject = req.body.subject;
	var message = req.body.message;
	//var from = "";
	//from = '"' + name + '" <' + process.env.EMAIL_SERVICE_USER + '>';

	console.log(message)

	var HelperOptions =
	{
		from: '"' + name + '" <' + process.env.EMAIL_SERVICE_USER + '>',
		to: email,
		bcc: process.env.SUPER_ADMIN_GMAIL_USER,
		subject: subject,
		html: message
	};

	console.log(HelperOptions);

	var transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: process.env.EMAIL_SERVICE_USER,
			pass: process.env.EMAIL_SERVICE_USER_PASS
		}
	});



	transporter.sendMail(HelperOptions, (error, info) => {

		if (error) {
			console.log("error in transporter");
			console.log(error);
			var status = res.status(500).send(error.message);
			var responseHeader = "Oops!"
			var response = "Error in transporter...Please do try again. ";


			return res.send({
				responseHeader: responseHeader,
				responseText: response,
				success: status,
				status: 500,

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

