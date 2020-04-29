var express = require('express');
var path = require('path');
var router = require('routes');
var bodyParser = require('body-parser');

var unifiedCrawler = require('appstore-playstore-crawler-api');

unifiedCrawler.google.getSearchResult('Uber', 100)
  .then(result => console.log(result))

  var gplay = require('google-play-scraper'); 
  gplay.app({appId: 'com.hashnet.cervitech'})
   .then(console.log, console.log);

// var nodemailer = require('nodemailer');
var app = express();
// var cookieParser = require('cookie-parser');
 var home = require('./routes/index');
// var contact = require('./routes/contact');
// var elements = require('./routes/elements');
 var include = require('include')(__dirname,'views');

app.set('view engine','ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/contact', contact);
// app.use('/elements', elements);
app.use('/', home);
app.post(function(req, res, next){
    next();
});

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