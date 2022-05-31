var express = require('express');

var path = require('path');

var bodyParser = require('body-parser');

var app = express();

var home = require('./routes/index');

var nodemailer = require('nodemailer');

require('dotenv').config();

var cron = require('node-cron');


app.set('view engine', 'ejs');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', home);

var MailOptions1 =
{
	from: process.env.GMAIL_USER,
	to: process.env.SUPER_ADMIN_GMAIL_USER + "," + process.env.SUPER_ADMIN2_GMAIL_USER,
	//cc: process.env.SUPER_ADMIN_GMAIL_USER,
	//bcc: process.env.SUPER_ADMIN_GMAIL_USER,
	subject: "CerviTech Landing Page Mail Service Working",
	html: "This is a daily mail. If you got this mail today, it means the contact form mail service is working. :)"
};

var transporter1 = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: process.env.GMAIL_USER,
		pass: process.env.GMAIL_PASS
	}
});

var MailOptions2 =
{
	from: process.env.DEVS_GMAIL_USER,
	to: process.env.SUPER_ADMIN_GMAIL_USER + "," + process.env.SUPER_ADMIN2_GMAIL_USER,
	//cc: process.env.SUPER_ADMIN_GMAIL_USER,
	//bcc: process.env.SUPER_ADMIN_GMAIL_USER,
	subject: "CerviTech CMS Mail Service Working",
	html: "This is a daily mail. If you got this mail today, it means the CMS mail service is working. :)"
};

var transporter2 = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: process.env.DEVS_GMAIL_USER,
		pass: process.env.DEVS_GMAIL_PASS
	}
});

// var MailOptions3 =
// {
// 	from: process.env.EMAIL_SERVICE_USER,
// 	to: process.env.SUPER_ADMIN_GMAIL_USER,
// 	//cc: process.env.SUPER_ADMIN_GMAIL_USER,
// 	//bcc: process.env.SUPER_ADMIN_GMAIL_USER,
// 	subject: "My Portfolio Mail Service Working",
// 	html: "This is a daily mail. If you got this mail today, it means the contact form for my portfolio mail service is working. :)"
// };

// var transporter3 = nodemailer.createTransport({
// 	service: 'gmail',
// 	auth: {
// 		user: process.env.EMAIL_SERVICE_USER,
// 		pass: process.env.EMAIL_SERVICE_USER_PASS
// 	}
// });

cron.schedule('0 7 * * *', () => {
	console.log("i reached here");
	transporter1.sendMail(MailOptions1, (error, info) => {

		if (error) console.log("error in transporter " + error);

		else console.log('successful ' + info.response);

	});

	transporter2.sendMail(MailOptions2, (error, info) => {

		if (error) console.log("error in transporter " + error);

		else console.log('successful ' + info.response);

	});

	// transporter3.sendMail(MailOptions3, (error, info) => {

	// 	if (error) console.log("error in transporter " + error);

	// 	else console.log('successful ' + info.response);

	// });
});

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

const server = app.listen(process.env.PORT || 7000, () => {
  console.log(`Express running on → PORT ${server.address().port}`);
});

