var express = require('express');
var path = require('path');
var nodemailer = require('nodemailer');
var router = require('routes');
var bodyParser = require('body-parser');
let argv = require('yargs').argv;
// var gplay = require('google-play-scraper'); 
var app = express();
var home = require('./routes/index');
require('dotenv').config();
var include = require('include')(__dirname,'views');

app.set('view engine','ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname, 'public')));


app.use('/', home);
// app.post(function(req, res, next){
//     next();
// });

// app.post('/', function(req,res){
//    //Instantiate the SMTP server
//     const smtpTrans = nodemailer.createTransport({
//       host: 'smtp.gmail.com',
//       port: 465,
//       secure: true,
//       auth:{
//         user: process.env.GMAIL_USER,
//         pass: process.env.GMAIL_PASS
//       }
//     })
//     console.log(req)
//     var object = req.body;
//     console.log(object);
//     //specify what the email will look like
//     const mailOpts = {
//       from: 'Your sender info here', //This is ignored by gmail
//       to: process.env.GMAIL_USER,
//       subject: 'New message from contact form at cervitech.com.ng',
//       text: `${req.body.name} (${req.body.email}) says: ${req.body.subject} - ${req.body.message}` 
//     }
    
//     //attempt to send the email
//     smtpTrans.sendMail(mailOpts,(error,response)=>{
//       if (error){
//         console.log("error : "+ error)
//         //res.render('contact-failure') //show a page indicating failure;
//       }
//       console.log("successful"+ response)
//       //res.render('contact-success') //shows a page indicating success
//     })
    
// })
// var response = gplay.app({appId: 'com.hashnet.cervitech'}).then(result => response = result);

// console.log(response);
  
// app.post('/contact-us',function(req,res){
// 	var sendMailTo = req.body.HelperOptions.to;
// 	return res.redirect('/')
// })

const server = app.listen(process.env.PORT||7000, () => {
  console.log(`Express running on → PORT ${server.address().port}`);
});

// app.get('/', (req, res) => {
// 	res.sendFile(path.join(__dirname,"/index.html"))
// 	const body = req.body;
// 	console.log(body)
// })