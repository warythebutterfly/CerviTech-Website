var express = require('express');
var path = require('path');
var router = require('routes');
var bodyParser = require('body-parser');
let argv = require('yargs').argv;
// var gplay = require('google-play-scraper'); 
var app = express();
var home = require('./routes/index');

var include = require('include')(__dirname,'views');

app.set('view engine','ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname, 'public')));


app.use('/', home);
app.post(function(req, res, next){
    next();
});


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