var express = require('express');
var path = require('path');
var router = require('routes');
var bodyParser = require('body-parser');
var app = express();
var cookieParser = require('cookie-parser');
var home = require('./routes/index');
var contact = require('./routes/contact');
var elements = require('./routes/elements');
var include = require('include')(__dirname,'views');
app.set('view engine','ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/',home);
app.use('/contact',contact);
app.use('/elements',elements);
app.get('/', function(req,res){
	res.render('index');
});
app.get('/contact', function(req,res){
	res.render('contact');
});
app.get('/elements', function(req,res){
	res.render('elements');
});

const server = app.listen(7000, () => {
  console.log(`Express running → PORT ${server.address().port}`);
});