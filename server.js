var express = require('express');
var path = require('path');
var router = require('routes');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var app = express();
var cookieParser = require('cookie-parser');
var home = require('./routes/index');
var contact = require('./routes/contact');
var elements = require('./routes/elements');
var include = require('include')(__dirname,'views');

var nodemailer = require('nodemailer');
// var transporter = nodemailer.createTransport({
// 	service:'gmail',
// 	auth: {
// 		user:'devs.cervitech@gmail.com',
// 		pass: 'anelpo14'
// 	}

// });

// var HelperOptions =
// {
// 	from:'devs.cervitech@gmail.com',
// 	to: 'temitoyosi@gmail.com',
// 	subject:req.body.subject,
// 	text:req.body.message
// };

// transporter.sendMail(HelperOptions,(error,info)=>{
// 	if(error){
// 		return console.log(error);
// 	}
// 	console.log('successful', info.messageId, info.response);
// 	console.log(info);
// });



app.set('view engine','ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use('/contact', contact);
app.use('/elements', elements);
app.use('/', home);

app.post('/contact-us',function(req,res){
	var sendMailTo = req.body.HelperOptions.to;
	return res.redirect('/')
})

process.env["NODE_TLS_REJECT_UNAUTHORIZED"]=0;

const server = app.listen(process.env.PORT||7000, () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
