'use strict';
var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

router.get('/', function(req,res){
res.render('index',{
	title: 'CerviTech | Home'
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

let argv = require('yargs').argv;

// console.log(argv);
// console.log(argv._[0]);
// console.log(argv.name);

let name = argv.name,
command = argv._[0];

// name = 'Steven';

//  var fullname = "";
//         var email = "";
//         var subject = "";
//         var message = "";

//          $("#contactForm").submit(function (e) {
//             e.preventDefault();
        
//             fullname = $("#name").val();
//             email = $("#email").val();
//             message = $("#message").val();
//             submit = $("#subject").val();
//         });
// console.log(fullname);


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



simple();